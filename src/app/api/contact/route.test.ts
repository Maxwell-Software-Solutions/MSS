/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server';
import { POST, OPTIONS } from './route';

describe('POST /api/contact', () => {
  const originalEnv = process.env;
  const fetchMock = jest.fn();
  const originalFetch = global.fetch;

  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...originalEnv,
      CONTACT_APPS_SCRIPT_URL: 'https://script.google.com/macros/s/mock/exec',
      CONTACT_APPS_SCRIPT_TOKEN: 'shared-token',
      CONTACT_ALLOWED_ORIGINS: '',
    };
    fetchMock.mockReset();
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  afterEach(() => {
    process.env = originalEnv;
    global.fetch = originalFetch;
  });

  it('forwards the payload to Google Apps Script and returns success', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      text: async () => JSON.stringify({ ok: true }),
    } as Response);

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        origin: 'http://localhost:3000',
        'x-forwarded-for': '203.0.113.5',
      },
      body: JSON.stringify({
        firstName: 'Ada',
        lastName: 'Lovelace',
        email: 'ada@example.com',
        phone: '1234567890',
        description: 'Interested in a code audit',
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://script.google.com/macros/s/mock/exec',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const [, fetchInit] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(fetchInit.body).toBe(
      JSON.stringify({
        token: 'shared-token',
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        phone: '1234567890',
        message: 'Interested in a code audit',
        ip: '203.0.113.5',
      })
    );
  });

  it('rejects disallowed origins', async () => {
    const request = new NextRequest('https://evil.example.com/api/contact', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        origin: 'https://evil.example.com',
      },
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({ success: false, message: 'Origin not allowed' });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('returns 502 when upstream responds with an error payload', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      text: async () => JSON.stringify({ ok: false, error: 'Too many requests' }),
    } as Response);

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        origin: 'http://localhost:3000',
      },
      body: JSON.stringify({
        firstName: 'Grace',
        email: 'grace@example.com',
        description: 'Help me',
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({ success: false, message: 'Too many requests' });
  });

  it('returns 500 when contact service is not configured', async () => {
    process.env.CONTACT_APPS_SCRIPT_URL = '';
    process.env.CONTACT_APPS_SCRIPT_TOKEN = '';

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        origin: 'http://localhost:3000',
      },
      body: JSON.stringify({
        firstName: 'Alan',
        email: 'alan@example.com',
        description: 'Ping',
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({ success: false, message: 'Contact form misconfigured' });
  });

  it('supports legacy environment variable names', async () => {
    process.env.CONTACT_APPS_SCRIPT_URL = '';
    process.env.CONTACT_APPS_SCRIPT_TOKEN = '';
    process.env.APPS_SCRIPT_URL = 'https://script.google.com/macros/s/legacy/exec';
    process.env.SHARED_TOKEN = 'legacy-token';

    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      text: async () => JSON.stringify({ ok: true }),
    } as Response);

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        origin: 'http://localhost:3000',
      },
      body: JSON.stringify({
        firstName: 'Ada',
        email: 'ada@example.com',
        description: 'Legacy env check',
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://script.google.com/macros/s/legacy/exec',
      expect.objectContaining({
        method: 'POST',
      })
    );

    const [, fetchInit] = fetchMock.mock.calls[0] as [string, RequestInit];
    const parsedBody = JSON.parse(fetchInit.body as string);
    expect(parsedBody).toEqual({
      token: 'legacy-token',
      name: 'Ada',
      email: 'ada@example.com',
      message: 'Legacy env check',
    });
  });
});

describe('OPTIONS /api/contact', () => {
  const originalEnv = process.env;
  const originalFetch = global.fetch;

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      CONTACT_APPS_SCRIPT_URL: 'https://script.google.com/macros/s/mock/exec',
      CONTACT_APPS_SCRIPT_TOKEN: 'shared-token',
    };
  });

  afterEach(() => {
    process.env = originalEnv;
    global.fetch = originalFetch;
  });

  it('allows CORS preflight for approved origins', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'OPTIONS',
      headers: {
        origin: 'http://localhost:3000',
      },
    });

    const response = await OPTIONS(request);
    expect(response.status).toBe(204);
    expect(response.headers.get('access-control-allow-origin')).toBe('http://localhost:3000');
    expect(response.headers.get('access-control-allow-methods')).toBe('POST,OPTIONS');
  });

  it('blocks preflight for disallowed origins', async () => {
    const request = new NextRequest('https://malicious.com/api/contact', {
      method: 'OPTIONS',
      headers: {
        origin: 'https://malicious.com',
      },
    });

    const response = await OPTIONS(request);
    expect(response.status).toBe(403);
  });
});
