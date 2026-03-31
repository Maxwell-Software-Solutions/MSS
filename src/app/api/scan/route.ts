import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const SECURITY_HEADERS = [
  'content-security-policy',
  'x-frame-options',
  'x-content-type-options',
  'strict-transport-security',
  'referrer-policy',
  'permissions-policy',
] as const;

interface TechDetection {
  name: string;
  confidence: 'high' | 'medium';
}

interface ScanResult {
  ssl: boolean;
  headers: Record<string, boolean>;
  tech: TechDetection[];
  metaGenerator: string | null;
  statusCode: number;
}

function detectTech(html: string): TechDetection[] {
  const detections: TechDetection[] = [];

  const signatures: Array<{ name: string; patterns: RegExp[]; confidence: 'high' | 'medium' }> = [
    { name: 'Next.js', patterns: [/__NEXT_DATA__/i, /_next\/static/i], confidence: 'high' },
    { name: 'React', patterns: [/react[-.]/, /__REACT/], confidence: 'medium' },
    { name: 'Vue.js', patterns: [/__VUE/, /vue[-.]/, /v-cloak/], confidence: 'high' },
    { name: 'Angular', patterns: [/ng-version/, /ng-app/], confidence: 'high' },
    { name: 'WordPress', patterns: [/wp-content/, /wp-includes/], confidence: 'high' },
    { name: 'Shopify', patterns: [/cdn\.shopify\.com/, /shopify/i], confidence: 'high' },
    { name: 'Svelte', patterns: [/svelte/, /__svelte/], confidence: 'medium' },
    { name: 'Nuxt.js', patterns: [/__NUXT__/, /_nuxt\//], confidence: 'high' },
    { name: 'Gatsby', patterns: [/gatsby/, /__gatsby/], confidence: 'high' },
    { name: 'Tailwind CSS', patterns: [/tailwindcss/, /tw-/], confidence: 'medium' },
    { name: 'Bootstrap', patterns: [/bootstrap\.min/, /bootstrap\.css/], confidence: 'high' },
    { name: 'jQuery', patterns: [/jquery[-.]/, /jquery\.min/], confidence: 'high' },
    { name: 'Wix', patterns: [/wix\.com/, /wixstatic/], confidence: 'high' },
    { name: 'Squarespace', patterns: [/squarespace/, /sqsp/], confidence: 'high' },
    { name: 'Webflow', patterns: [/webflow/, /wf-/], confidence: 'high' },
  ];

  for (const sig of signatures) {
    if (sig.patterns.some((p) => p.test(html))) {
      detections.push({ name: sig.name, confidence: sig.confidence });
    }
  }

  return detections;
}

function extractMetaGenerator(html: string): string | null {
  const match = html.match(/<meta[^>]+name=["']generator["'][^>]+content=["']([^"']+)["']/i);
  return match?.[1] ?? null;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { url } = body as { url: string };

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return NextResponse.json({ error: 'Only HTTP and HTTPS URLs are supported' }, { status: 400 });
    }

    const ssl = parsedUrl.protocol === 'https:';

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    let response: Response;
    try {
      response = await fetch(parsedUrl.toString(), {
        signal: controller.signal,
        headers: {
          'User-Agent': 'MSS-WebsiteScanner/1.0 (https://maxwellsoftwaresolutions.com)',
        },
        redirect: 'follow',
      });
    } catch (err) {
      clearTimeout(timeout);
      const message = err instanceof Error ? err.message : 'Failed to fetch';
      return NextResponse.json({ error: `Could not reach the website: ${message}` }, { status: 502 });
    }
    clearTimeout(timeout);

    const headers: Record<string, boolean> = {};
    for (const header of SECURITY_HEADERS) {
      headers[header] = response.headers.has(header);
    }

    const html = await response.text();

    const tech = detectTech(html);
    const metaGenerator = extractMetaGenerator(html);

    const result: ScanResult = {
      ssl,
      headers,
      tech,
      metaGenerator,
      statusCode: response.status,
    };

    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
