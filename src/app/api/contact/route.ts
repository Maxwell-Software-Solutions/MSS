import { NextResponse, type NextRequest } from 'next/server';

export const runtime = 'nodejs';

const DEFAULT_ALLOWED_ORIGINS = [
  'https://www.maxwellsoftwaresolutions.com',
  'https://maxwellsoftwaresolutions.com',
  'https://mss-gamma.vercel.app',
  'http://localhost:3000',
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REQUEST_TIMEOUT_MS = 10000;

function getEnvValue(...keys: string[]): string | undefined {
  for (const key of keys) {
    const value = key ? process.env[key] : undefined;
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed) return trimmed;
    }
  }
  return undefined;
}

function parseEnvList(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

const allowedOriginEntries = new Set(
  [...DEFAULT_ALLOWED_ORIGINS, ...parseEnvList(process.env.CONTACT_ALLOWED_ORIGINS)].flatMap((entry) => {
    try {
      const url = new URL(entry);
      return [url.origin, url.hostname];
    } catch {
      return [entry];
    }
  })
);

function isOriginAllowed(originHeader: string | null): boolean {
  if (!originHeader) return true;
  if (allowedOriginEntries.has(originHeader)) return true;

  try {
    const url = new URL(originHeader);
    return allowedOriginEntries.has(url.origin) || allowedOriginEntries.has(url.hostname);
  } catch {
    return false;
  }
}

function getClientIp(request: NextRequest): string | undefined {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (!forwardedFor) return undefined;
  return forwardedFor.split(',')[0]?.trim();
}

function normaliseInput(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function buildResponse(payload: Record<string, unknown>, status: number, originHeader: string | null): NextResponse {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  };
  if (originHeader && isOriginAllowed(originHeader)) {
    headers['Access-Control-Allow-Origin'] = originHeader;
  }
  return NextResponse.json(payload, { status, headers });
}

export async function OPTIONS(request: NextRequest): Promise<NextResponse> {
  const origin = request.headers.get('origin');
  if (!isOriginAllowed(origin)) {
    return buildResponse({ success: false, message: 'Origin not allowed' }, 403, origin);
  }

  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
  if (origin) headers['Access-Control-Allow-Origin'] = origin;

  return new NextResponse(null, { status: 204, headers });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const origin = request.headers.get('origin');
  if (!isOriginAllowed(origin)) {
    return buildResponse({ success: false, message: 'Origin not allowed' }, 403, origin);
  }

  const scriptUrl = getEnvValue('CONTACT_APPS_SCRIPT_URL', 'APPS_SCRIPT_URL');
  const sharedToken = getEnvValue('CONTACT_APPS_SCRIPT_TOKEN', 'SHARED_TOKEN');

  if (!scriptUrl || !sharedToken) {
    return buildResponse({ success: false, message: 'Contact form misconfigured' }, 500, origin);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return buildResponse({ success: false, message: 'Invalid JSON payload' }, 400, origin);
  }

  if (typeof body !== 'object' || body === null) {
    return buildResponse({ success: false, message: 'Invalid request body' }, 400, origin);
  }

  const firstName = normaliseInput((body as Record<string, unknown>).firstName);
  const lastName = normaliseInput((body as Record<string, unknown>).lastName);
  const email = normaliseInput((body as Record<string, unknown>).email);
  const phone = normaliseInput((body as Record<string, unknown>).phone);
  const description = normaliseInput((body as Record<string, unknown>).description);

  if (!firstName && !lastName) {
    return buildResponse({ success: false, message: 'Please provide your name.' }, 400, origin);
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return buildResponse({ success: false, message: 'Please provide a valid email address.' }, 400, origin);
  }

  if (!description) {
    return buildResponse({ success: false, message: 'Tell us a little about what you need.' }, 400, origin);
  }

  const name = `${firstName} ${lastName}`.trim();
  const ip = getClientIp(request);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let upstreamResponse: globalThis.Response;
  try {
    upstreamResponse = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: sharedToken,
        name,
        email,
        phone: phone || undefined,
        message: description,
        ip,
      }),
      signal: controller.signal,
    });
  } catch {
    clearTimeout(timeout);
    return buildResponse(
      { success: false, message: 'We could not reach the mail service. Please try again later.' },
      502,
      origin
    );
  }

  clearTimeout(timeout);

  const text = await upstreamResponse.text();
  let json: Record<string, unknown> | undefined;
  try {
    json = text ? (JSON.parse(text) as Record<string, unknown>) : undefined;
  } catch {
    json = undefined;
  }

  if (!upstreamResponse.ok || !json || json.ok !== true) {
    const message = (json?.error as string) || (json?.message as string);
    return buildResponse(
      {
        success: false,
        message: message || 'We could not send your message. Please try again later.',
      },
      upstreamResponse.ok ? 502 : upstreamResponse.status,
      origin
    );
  }

  return buildResponse({ success: true }, 200, origin);
}
