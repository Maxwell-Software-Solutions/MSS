import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

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
