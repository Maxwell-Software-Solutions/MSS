/** @jest-environment node */
import http, { type IncomingMessage } from 'node:http';
import https from 'node:https';
import { PassThrough, Readable } from 'node:stream';
import { NextRequest } from 'next/server';
import { POST } from './route';

// Every hostname resolves to a private address, as a rebinding attacker's DNS would answer
jest.mock('node:dns', () => ({
  ...jest.requireActual('node:dns'),
  lookup: (_host: string, _options: unknown, callback: (err: null, addresses: object[]) => void) =>
    callback(null, [{ address: '10.0.0.5', family: 4 }]),
}));

const post = (body: string): Promise<Response> =>
  POST(new NextRequest('http://localhost/api/scan', { method: 'POST', body }));
const scan = (url: string): Promise<Response> => post(JSON.stringify({ url }));

type Reply = { status: number; headers?: Record<string, string>; body?: string };
const replyWith = (reply: (url: URL) => Reply | Error): typeof http.request =>
  ((url: URL, _options: unknown, onResponse: (res: IncomingMessage) => void) => {
    const req = new PassThrough();
    const answer = reply(url);
    setImmediate(() =>
      answer instanceof Error
        ? req.emit('error', answer)
        : onResponse(
            Object.assign(Readable.from([Buffer.from(answer.body ?? '')]), {
              statusCode: answer.status,
              headers: answer.headers ?? {},
            }) as unknown as IncomingMessage,
          ),
    );
    return req;
  }) as unknown as typeof http.request;

describe('website scanner address check', () => {
  afterEach(() => jest.restoreAllMocks());

  it('refuses local, private and non-standard addresses', async () => {
    const blocked = [
      'http://127.0.0.1/',
      'http://localhost/',
      'http://intranet.example/',
      'http://2130706433/',
      'http://10.0.0.5/',
      'http://192.168.1.1/',
      'http://169.254.169.254/latest/meta-data/',
      'http://[::1]/',
      'http://[2::1]/',
      'http://[::ffff:127.0.0.1]/',
      'http://[fd00::1]/',
      'http://93.184.216.34:8080/',
      'http://user:pw@93.184.216.34/',
    ];
    for (const url of blocked) expect([url, (await scan(url)).status]).toEqual([url, 400]);
  });

  it('stops at a redirect to a private address', async () => {
    const request = jest
      .spyOn(http, 'request')
      .mockImplementation(replyWith(() => ({ status: 302, headers: { location: 'http://127.0.0.1/admin' } })));
    expect((await scan('http://93.184.216.34/')).status).toBe(400);
    expect(request).toHaveBeenCalledTimes(1);
  });

  it('gives up after too many redirects', async () => {
    const request = jest
      .spyOn(http, 'request')
      .mockImplementation(replyWith(() => ({ status: 302, headers: { location: 'http://93.184.216.34/next' } })));
    expect((await scan('http://93.184.216.34/')).status).toBe(400);
    expect(request).toHaveBeenCalledTimes(6);
  });

  it('follows a redirect to a public address and scans it', async () => {
    jest
      .spyOn(http, 'request')
      .mockImplementation(replyWith(() => ({ status: 301, headers: { location: 'https://93.184.216.34/' } })));
    jest
      .spyOn(https, 'request')
      .mockImplementation(replyWith(() => ({ status: 200, headers: { 'x-frame-options': 'DENY' }, body: '<html></html>' })));
    const response = await scan('http://93.184.216.34/');
    expect(response.status).toBe(200);
    const result = await response.json();
    expect(result.ssl).toBe(true);
    expect(result.headers['x-frame-options']).toBe(true);
  });

  it('hides connection errors and rejects a malformed body', async () => {
    jest.spyOn(http, 'request').mockImplementation(replyWith(() => new Error('connect ECONNREFUSED 93.184.216.34:80')));
    const response = await scan('http://93.184.216.34/');
    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({ error: 'Could not reach the website' });
    expect((await post('{not json')).status).toBe(400);
  });
});
