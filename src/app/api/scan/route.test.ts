/** @jest-environment node */
import { NextRequest } from 'next/server';
import { POST } from './route';

const scan = (url: string): Promise<Response> =>
  POST(new NextRequest('http://localhost/api/scan', { method: 'POST', body: JSON.stringify({ url }) }));

describe('website scanner address check', () => {
  const realFetch = global.fetch;
  const fetchMock = jest.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    global.fetch = fetchMock as unknown as typeof fetch;
  });
  afterAll(() => {
    global.fetch = realFetch;
  });

  it('refuses local, private and non-standard addresses without fetching them', async () => {
    const blocked = [
      'http://127.0.0.1/',
      'http://localhost/',
      'http://2130706433/',
      'http://10.0.0.5/',
      'http://192.168.1.1/',
      'http://169.254.169.254/latest/meta-data/',
      'http://[::1]/',
      'http://[::ffff:127.0.0.1]/',
      'http://[fd00::1]/',
      'http://93.184.216.34:8080/',
      'http://user:pw@93.184.216.34/',
    ];
    for (const url of blocked) expect([url, (await scan(url)).status]).toEqual([url, 400]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('stops at a redirect to a private address', async () => {
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 302, headers: { location: 'http://127.0.0.1/admin' } }));
    expect((await scan('http://93.184.216.34/')).status).toBe(400);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('follows a redirect to a public address and scans it', async () => {
    fetchMock
      .mockResolvedValueOnce(new Response(null, { status: 301, headers: { location: 'https://93.184.216.34/' } }))
      .mockResolvedValueOnce(new Response('<html></html>', { status: 200, headers: { 'x-frame-options': 'DENY' } }));
    const response = await scan('http://93.184.216.34/');
    expect(response.status).toBe(200);
    expect((await response.json()).headers['x-frame-options']).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
