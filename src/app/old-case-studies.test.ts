/** @jest-environment node */
import sitemap from './sitemap';
import nextConfig from '../../next.config';

describe('old case studies', () => {
  it('are gone from the sitemap, which lists the new case studies page once', () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls.filter((url) => url.includes('/project-showcase'))).toEqual([]);
    expect(urls.filter((url) => url.endsWith('/case-studies'))).toHaveLength(1);
  });

  it('redirect permanently to the case studies page', async () => {
    const redirects = (await nextConfig.redirects?.()) ?? [];
    const rule = redirects.find((redirect) => redirect.source.startsWith('/project-showcase'));
    expect(rule).toEqual({ source: '/project-showcase/:path*', destination: '/case-studies', permanent: true });
  });

  it('keep the existing redirects next to the new one', async () => {
    const redirects = (await nextConfig.redirects?.()) ?? [];
    const sources = redirects.map((redirect) => redirect.source);
    expect(sources).toEqual(expect.arrayContaining(['/consulting-process', '/project-showcase/:path*', '/book']));
    expect(sources.indexOf('/consulting-process')).toBeLessThan(sources.indexOf('/project-showcase/:path*'));
  });
});
