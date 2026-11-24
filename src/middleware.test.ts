/** @jest-environment node */
import { readdirSync } from 'fs';
import { join } from 'path';
import { NextRequest } from 'next/server';
import { middleware } from './middleware';

// NextResponse.rewrite reports where it sends the request in this header
const rewrittenTo = (response: Response | void): string | null => {
  const target = response ? response.headers.get('x-middleware-rewrite') : null;
  return target ? new URL(target).pathname : null;
};

const request = (path: string, cookie?: string): NextRequest =>
  new NextRequest(`http://localhost${path}`, cookie ? { headers: { cookie } } : undefined);

describe('middleware page language', () => {
  it('serves pages from the English build by default', () => {
    expect(rewrittenTo(middleware(request('/services')))).toBe('/en/services');
    expect(rewrittenTo(middleware(request('/')))).toBe('/en');
  });

  it('follows the language cookie', () => {
    expect(rewrittenTo(middleware(request('/about', 'language=lt')))).toBe('/lt/about');
  });

  it('keeps pages under /lt/ Lithuanian whatever the cookie says', () => {
    expect(rewrittenTo(middleware(request('/lt/dokumentu-sutikrinimas', 'language=en')))).toBe(
      '/lt/lt/dokumentu-sutikrinimas'
    );
  });

  it('lets a ?lang= link choose the language over the cookie', () => {
    expect(rewrittenTo(middleware(request('/privacy?lang=lt', 'language=en')))).toBe('/lt/privacy');
    expect(rewrittenTo(middleware(request('/privacy?lang=xx', 'language=lt')))).toBe('/lt/privacy');
  });

  it('leaves public files and the share image at their own addresses', () => {
    for (const path of ['/logo.svg', '/.well-known/security.txt', '/opengraph-image']) {
      expect(rewrittenTo(middleware(request(path)))).toBeNull();
    }
  });
});

describe('middleware old language-prefixed addresses', () => {
  const redirectedTo = (response: Response | void): string | null => {
    if (!response || response.status !== 308) return null;
    const target = new URL(response.headers.get('location')!);
    return target.pathname + target.search;
  };

  it('moves /en/ and /lt/ addresses to the clean path, keeping Lithuanian by ?lang=lt', () => {
    expect(redirectedTo(middleware(request('/en/services')))).toBe('/services');
    expect(redirectedTo(middleware(request('/en/blog/some-post')))).toBe('/blog/some-post');
    expect(redirectedTo(middleware(request('/lt/services')))).toBe('/services?lang=lt');
    expect(redirectedTo(middleware(request('/lt/about?ref=x')))).toBe('/about?ref=x&lang=lt');
  });

  it('keeps every Lithuanian-only page under /lt/', () => {
    const pages = readdirSync(join(__dirname, 'app', '[lang]', 'lt'));
    expect(pages.length).toBeGreaterThan(0);
    for (const page of pages) {
      const response = middleware(request(`/lt/${page}`));
      expect(redirectedTo(response)).toBeNull();
      expect(rewrittenTo(response)).toBe(`/lt/lt/${page}`);
    }
  });
});
