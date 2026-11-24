import { lookup } from 'node:dns';
import { type IncomingMessage, request as httpRequest } from 'node:http';
import { request as httpsRequest } from 'node:https';
import { isIP, type LookupFunction } from 'node:net';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const MAX_REDIRECTS = 5;
const MAX_BODY_BYTES = 2 * 1024 * 1024;
const TIMEOUT_MS = 15000;
const BLOCKED = 'EBLOCKED';
const PRIVATE_IPV4 = /^(0|10|127|169\.254|172\.(1[6-9]|2\d|3[01])|192\.168|100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])|22[4-9]|2[3-5]\d)\./;

// Public addresses only: no localhost, private networks, cloud metadata or other internal services.
// IPv6 is allowed only in the global unicast range (2000::/3).
const isPublicAddress = (address: string): boolean =>
  isIP(address) === 6 ? /^[23][0-9a-f]{3}:/i.test(address) : !PRIVATE_IPV4.test(address);

// Runs as the connection's own lookup, so the address checked is the address connected to.
const publicLookup: LookupFunction = (hostname, options, callback) =>
  lookup(hostname, { ...options, all: true }, (err, addresses) => {
    if (err) return callback(err, '');
    const [first] = addresses;
    if (!first || !addresses.every((a) => isPublicAddress(a.address))) {
      return callback(Object.assign(new Error('Blocked address'), { code: BLOCKED }), '');
    }
    callback(null, options.all ? addresses : first.address, first.family);
  });

// Standard ports only, no credentials. Literal IPs are checked here because no lookup runs for them.
function isAllowedUrl(url: URL): boolean {
  const host = url.hostname.replace(/^\[|\]$/g, '');
  return (
    ['http:', 'https:'].includes(url.protocol) &&
    !url.username &&
    !url.password &&
    (!url.port || url.port === '80' || url.port === '443') &&
    (!isIP(host) || isPublicAddress(host))
  );
}

function get(url: URL, signal: AbortSignal): Promise<IncomingMessage> {
  return new Promise((resolve, reject) => {
    const options = {
      lookup: publicLookup,
      signal,
      headers: { 'User-Agent': 'MSS-WebsiteScanner/1.0 (https://maxwellsoftwaresolutions.com)' },
    };
    const req = url.protocol === 'https:' ? httpsRequest(url, options, resolve) : httpRequest(url, options, resolve);
    req.on('error', reject).end();
  });
}

async function readBody(response: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of response) {
    chunks.push(chunk);
    if ((size += chunk.length) >= MAX_BODY_BYTES) break;
  }
  return Buffer.concat(chunks).toString('utf8', 0, MAX_BODY_BYTES);
}

const blocked = (): NextResponse => NextResponse.json({ error: 'This address cannot be scanned' }, { status: 400 });

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
  const body: unknown = await request.json().catch(() => null);
  const url = (body as { url?: unknown } | null)?.url;

  if (!url || typeof url !== 'string') {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  let target: URL;
  try {
    target = new URL(url);
  } catch {
    return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
  }

  if (!['http:', 'https:'].includes(target.protocol)) {
    return NextResponse.json({ error: 'Only HTTP and HTTPS URLs are supported' }, { status: 400 });
  }

  // One time limit covers every redirect and the body
  const signal = AbortSignal.timeout(TIMEOUT_MS);
  try {
    let response: IncomingMessage;
    // Redirects are followed by hand so every hop is checked
    for (let hop = 0; ; hop++) {
      if (hop > MAX_REDIRECTS || !isAllowedUrl(target)) return blocked();
      response = await get(target, signal);
      const status = response.statusCode ?? 0;
      const location = response.headers.location;
      if (status < 300 || status >= 400 || !location) break;
      response.destroy();
      target = new URL(location, target);
    }

    const headers: Record<string, boolean> = {};
    for (const header of SECURITY_HEADERS) {
      headers[header] = header in response.headers;
    }

    const html = await readBody(response);

    const result: ScanResult = {
      ssl: target.protocol === 'https:',
      headers,
      tech: detectTech(html),
      metaGenerator: extractMetaGenerator(html),
      statusCode: response.statusCode ?? 0,
    };

    return NextResponse.json(result);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === BLOCKED) return blocked();
    return NextResponse.json({ error: 'Could not reach the website' }, { status: 502 });
  }
}
