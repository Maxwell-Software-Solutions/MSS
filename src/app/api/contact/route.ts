import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { AxiosError } from 'axios';
import axios from 'axios';

const FALLBACK_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbw07RGMM-G5b6uFbwiiHh7YpXNyEKpxCyiFAiwyScStx0MiuBOZpgnsyyREcW9JjzUKQg/exec';

const REQUIRED_FIELDS = ['email', 'description'] as const;
const KNOWN_FIELDS = ['firstName', 'lastName', 'email', 'phone', 'description'] as const;

type ContactPayload = Record<(typeof KNOWN_FIELDS)[number], string>;

function normalizePayload(payload: Partial<ContactPayload>): ContactPayload {
  const normalized = KNOWN_FIELDS.reduce((acc, key) => {
    const value = payload[key];
    acc[key] = typeof value === 'string' ? value.trim() : '';
    return acc;
  }, {} as ContactPayload);
  return normalized;
}

function validatePayload(payload: ContactPayload): string[] {
  const missing = REQUIRED_FIELDS.filter((field) => !payload[field as keyof ContactPayload]);
  return missing;
}

function extractResponseMessage(data: unknown): string | undefined {
  if (typeof data === 'string') return data.trim() || undefined;
  if (data && typeof data === 'object' && 'message' in data) {
    const message = (data as { message?: unknown }).message;
    if (typeof message === 'string') {
      return message.trim() || undefined;
    }
  }
  return undefined;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const endpoint = process.env.APPS_SCRIPT_URL ?? FALLBACK_APPS_SCRIPT_URL;

  if (!endpoint) {
    return NextResponse.json({ message: 'Contact form endpoint has not been configured.' }, { status: 500 });
  }

  let payload: Partial<ContactPayload>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
  }

  const normalized = normalizePayload(payload);
  const missingFields = validatePayload(normalized);

  if (missingFields.length > 0) {
    return NextResponse.json(
      {
        message: `Missing required field${missingFields.length > 1 ? 's' : ''}: ${missingFields.join(', ')}`,
      },
      { status: 400 }
    );
  }

  const params = new URLSearchParams();
  KNOWN_FIELDS.forEach((field) => {
    params.append(field, normalized[field]);
  });

  try {
    const externalResponse = await axios.post(endpoint, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const message = extractResponseMessage(externalResponse.data);

    return NextResponse.json(
      {
        message: message ?? "Thanks for reaching out! We'll be in touch soon.",
      },
      { status: 200 }
    );
  } catch (error) {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status ?? 502;
    const message = extractResponseMessage(axiosError.response?.data);

    return NextResponse.json(
      {
        message: message ?? 'We were unable to send your message. Please try again later.',
      },
      { status }
    );
  }
}
