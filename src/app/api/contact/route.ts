import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  description?: string;
};

const CONTACT_RECIPIENT = process.env.CONTACT_RECIPIENT_EMAIL ?? 'admin@maxwellsoftwaresolutions.com';
const CONTACT_FROM =
  process.env.CONTACT_FROM_EMAIL ?? 'Maxwell Software Solutions <contact@maxwellsoftwaresolutions.com>';
const resendClient = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function isValidEmail(value: string): boolean {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
}

function sanitize(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.replace(/[\r\n]/g, ' ').trim();
}

function buildTextBody({ firstName, lastName, email, phone, description }: Required<ContactPayload>): string {
  return [
    'New website contact submission',
    '',
    `First name: ${firstName || 'N/A'}`,
    `Last name: ${lastName || 'N/A'}`,
    `Email: ${email}`,
    `Phone: ${phone || 'N/A'}`,
    '',
    'Description:',
    description,
  ].join('\n');
}

function buildHtmlBody({ firstName, lastName, email, phone, description }: Required<ContactPayload>): string {
  return `
    <h2 style="font-family:Arial,sans-serif">New website contact submission</h2>
    <p><strong>First name:</strong> ${firstName || 'N/A'}</p>
    <p><strong>Last name:</strong> ${lastName || 'N/A'}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
    <p><strong>Description:</strong></p>
    <p style="white-space:pre-line">${description}</p>
  `;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch (error) {
    console.error('Invalid JSON payload received for contact form', error);
    return NextResponse.json({ success: false, message: 'Invalid JSON payload.' }, { status: 400 });
  }

  const data: Required<ContactPayload> = {
    firstName: sanitize(payload.firstName),
    lastName: sanitize(payload.lastName),
    email: sanitize(payload.email),
    phone: sanitize(payload.phone),
    description: (payload.description ?? '').toString().trim(),
  };

  if (!data.email || !isValidEmail(data.email)) {
    return NextResponse.json({ success: false, message: 'Please provide a valid email address.' }, { status: 422 });
  }

  if (!data.description) {
    return NextResponse.json({ success: false, message: 'Description is required.' }, { status: 422 });
  }

  if (!resendClient) {
    console.error('RESEND_API_KEY is not configured.');
    return NextResponse.json(
      { success: false, message: 'Email service is not configured. Please try again later.' },
      { status: 500 }
    );
  }

  try {
    await resendClient.emails.send({
      from: CONTACT_FROM,
      to: [CONTACT_RECIPIENT],
      replyTo: data.email,
      subject: `New contact request from ${data.firstName || 'someone'} ${data.lastName || ''}`.trim(),
      text: buildTextBody(data),
      html: buildHtmlBody(data),
    });

    return NextResponse.json(
      { success: true, message: 'Thanks! Your message is on its way to our team.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to send contact email', error);
    return NextResponse.json(
      { success: false, message: 'We could not relay your message. Please try again later.' },
      { status: 502 }
    );
  }
}

export function OPTIONS(): NextResponse {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        Allow: 'POST',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
