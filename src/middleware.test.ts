/** @jest-environment node */
import { NextRequest } from 'next/server';
import { middleware } from './middleware';
import { PAGE_LANGUAGE_HEADER } from '@/lib/page-language';

// NextResponse.next({ request: { headers } }) reports the request headers it sets under this prefix
const forwarded = (response: Response | void, name: string): string | null =>
  response ? response.headers.get(`x-middleware-request-${name}`) : null;

describe('middleware page-language header', () => {
  it('marks pages under /lt/ as Lithuanian', () => {
    const response = middleware(new NextRequest('http://localhost/lt/dokumentu-sutikrinimas'));
    expect(forwarded(response, PAGE_LANGUAGE_HEADER)).toBe('lt');
  });

  it('leaves every other page alone, even when the request tries to set the header', () => {
    const spoofed = new NextRequest('http://localhost/services', { headers: { [PAGE_LANGUAGE_HEADER]: 'lt' } });
    const response = middleware(spoofed);
    expect(forwarded(response, PAGE_LANGUAGE_HEADER)).toBeNull();
    expect((response?.headers.get('x-middleware-override-headers') ?? '').split(',')).not.toContain(PAGE_LANGUAGE_HEADER);
  });
});
