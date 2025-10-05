/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server';

const sendMock = jest.fn();

jest.mock('resend', () => ({
  Resend: jest.fn(() => ({ emails: { send: sendMock } })),
  __esModule: true,
}));

describe('POST /api/contact', () => {
  const createRequest = (body: unknown): NextRequest =>
    new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(body),
    });

  beforeEach(() => {
    jest.resetModules();
    sendMock.mockReset();
    process.env.RESEND_API_KEY = 'test-api-key';
    process.env.CONTACT_RECIPIENT_EMAIL = 'admin@example.com';
    process.env.CONTACT_FROM_EMAIL = 'Acme <contact@example.com>';
  });

  afterEach(() => {
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_RECIPIENT_EMAIL;
    delete process.env.CONTACT_FROM_EMAIL;
  });

  it('rejects requests with invalid email', async () => {
    const { POST } = await import('./route');
    const response = await POST(createRequest({ email: 'invalid', description: 'Need help' }));

    expect(response.status).toBe(422);
    const payload = await response.json();
    expect(payload).toEqual(expect.objectContaining({ success: false }));
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('sends email via Resend when payload is valid', async () => {
    sendMock.mockResolvedValueOnce({ id: 'email-id' });
    const { POST } = await import('./route');
    const response = await POST(
      createRequest({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        phone: '555-0101',
        description: 'Looking for help',
      })
    );

    expect(response.status).toBe(200);
    const payload = await response.json();
    expect(payload).toEqual(expect.objectContaining({ success: true }));

    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'Acme <contact@example.com>',
        to: ['admin@example.com'],
        replyTo: 'jane@example.com',
      })
    );
  });

  it('returns error when Resend fails', async () => {
    sendMock.mockRejectedValueOnce(new Error('Resend failure'));
    const { POST } = await import('./route');
    const response = await POST(createRequest({ email: 'jane@example.com', description: 'Need help' }));

    expect(response.status).toBe(502);
    const payload = await response.json();
    expect(payload).toEqual(expect.objectContaining({ success: false }));
  });
});
