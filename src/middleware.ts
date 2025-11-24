import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const CANONICAL_HOST = process.env.NEXT_PUBLIC_CANONICAL_HOST ?? 'www.maxwellsoftwaresolutions.com';
const CANONICAL_PROTOCOL = 'https';

const isLocalLikeHost = (host: string): boolean =>
  host.includes('localhost') || host.startsWith('127.0.0.1') || host.endsWith('.vercel.app');

/**
 * Middleware for URL normalization and canonical enforcement
 *
 * Runs on every request before rendering to ensure:
 * - Lowercase URLs (case-insensitive routing)
 * - No duplicate slashes
 * - Consistent URL structure
 *
 * Uses 301 redirects to preserve SEO and pass PageRank.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 */
export function middleware(request: NextRequest): NextResponse | void {
  const { pathname } = request.nextUrl;
  const host = request.headers.get('host') ?? '';
  const protocol = request.headers.get('x-forwarded-proto') ?? request.nextUrl.protocol.replace(':', '');

  if (host && !isLocalLikeHost(host)) {
    if (host !== CANONICAL_HOST) {
      const url = request.nextUrl.clone();
      url.host = CANONICAL_HOST;
      url.protocol = `${CANONICAL_PROTOCOL}:`;
      return NextResponse.redirect(url, { status: 301 });
    }

    if (protocol !== CANONICAL_PROTOCOL) {
      const url = request.nextUrl.clone();
      url.protocol = `${CANONICAL_PROTOCOL}:`;
      return NextResponse.redirect(url, { status: 301 });
    }
  }

  // 1. Lowercase enforcement (case-insensitive URLs)
  // /Services → /services
  if (pathname !== pathname.toLowerCase()) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url, { status: 301 });
  }

  // 2. Remove duplicate slashes
  // /services//pricing → /services/pricing
  if (pathname.includes('//')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/\/+/g, '/');
    return NextResponse.redirect(url, { status: 301 });
  }

  // 3. Allow request to proceed
  return NextResponse.next();
}

/**
 * Configure which paths middleware runs on
 *
 * Excludes:
 * - Next.js internals (_next/static, _next/image)
 * - Static files (favicon, robots, sitemap)
 * - Public images directory
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, robots.txt, sitemap.xml (root static files)
     * - images/ (public images)
     * - api/ (API routes - handle their own redirects)
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images/|api/).*)',
  ],
};
