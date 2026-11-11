/** @jest-environment node */
import sitemap from './sitemap';
import nextConfig from '../../next.config';
import { COMPANY } from '@/lib/legal/company';
import { generateLocalBusinessSchema, generateOrganizationSchema } from '@/lib/seo/structured-data';
import en from '@/lib/translations/en.json';
import lt from '@/lib/translations/lt.json';

const RETIRED = ['pricing', 'free-audit'];

describe('retired pages /pricing and /free-audit', () => {
  it('are not in the sitemap', () => {
    const urls = sitemap().map((entry) => entry.url);
    for (const page of RETIRED) expect(urls.filter((url) => url.includes(`/${page}`))).toEqual([]);
  });

  it('redirect to /contact, not permanently, with any subpath or /en, /lt prefix', async () => {
    const redirects = (await nextConfig.redirects?.()) ?? [];
    for (const page of RETIRED) {
      for (const source of [`/${page}/:path*`, `/:lang(en|lt)/${page}/:path*`]) {
        expect(redirects).toContainEqual({ source, destination: '/contact', permanent: false });
      }
    }
  });
});

describe('retired page /founders', () => {
  it('is not in the sitemap', () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls.filter((url) => url.includes('/founders'))).toEqual([]);
  });

  it('redirects to /about, not permanently, with or without an /en, /lt prefix', async () => {
    const redirects = (await nextConfig.redirects?.()) ?? [];
    for (const source of ['/founders', '/:lang(en|lt)/founders']) {
      expect(redirects).toContainEqual({ source, destination: '/about', permanent: false });
    }
  });

  it('leaves no name of a former team member in either language', () => {
    for (const text of [...Object.values(en), ...Object.values(lt)]) {
      expect(text).not.toMatch(/Maxwell Archer|Rolinskij|Wolosewicz/);
    }
  });
});

describe('structured data address', () => {
  it('is the registered seat shown in the footer', () => {
    type Located = { address: { streetAddress: string; postalCode: string; addressLocality: string } };
    const schemas = [generateLocalBusinessSchema(), generateOrganizationSchema()] as unknown as Located[];
    for (const { address } of schemas) {
      expect(address.streetAddress).toBe(COMPANY.street);
      expect(COMPANY.city).toBe(`${address.postalCode} ${address.addressLocality}`);
    }
  });
});

describe('support hours', () => {
  it('say Vilnius time in both languages, with no round-the-clock or US Central claim', () => {
    expect(en['footer.hours']).toBe('Mon–Fri, 9:00–17:00 (Vilnius time)');
    expect(lt['footer.hours']).toBe('I–V, 9:00–17:00 (Vilniaus laiku)');
    expect(en['contactPage.hours']).toBe(en['footer.hours']);
    expect(lt['contactPage.hours']).toBe(lt['footer.hours']);
    for (const text of [...Object.values(en), ...Object.values(lt)]) {
      expect(text).not.toMatch(/around the clock|24\/7/i);
      expect(text).not.toMatch(/\bCT\b/);
    }
  });
});
