import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactElement } from 'react';
import StructuredData from '@/app/components/StructuredData';
import ListCompareTool from './ListCompareTool';
import { PAGES, SITE_CONFIG } from '@/lib/seo/data';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';

/**
 * Free Lithuanian tool: paste two lists (say an invoice and a delivery note) and see what does not match.
 *
 * Everything runs in the visitor's browser: no upload, no server call, no storage, no analytics on the content.
 * Same rules as the document-check page it leads to: its own /lt/ address, so the middleware marks it and the root layout
 * renders <html lang="lt">; no price, client name or statistic in the copy.
 */
const PAGE = PAGES.listCompareLt!;
const PAGE_URL = `${SITE_CONFIG.url}${PAGE.canonical}`;

const image = { url: '/opengraph-image', width: 1200, height: 630, alt: SITE_CONFIG.name };

export const metadata: Metadata = {
  // The whole title, without the site's " | Maxwell Software Solutions" suffix, so it fits a search result
  title: { absolute: PAGE.title },
  description: PAGE.description,
  keywords: PAGE.keywords,
  alternates: {
    canonical: PAGE.canonical,
    // The page exists in Lithuanian only: it points at itself, for Lithuanian readers and for everyone else
    languages: { lt: PAGE.canonical, 'x-default': PAGE.canonical },
  },
  // A page's own openGraph replaces the layout's, so it names the image and the Lithuanian locale itself
  openGraph: {
    title: PAGE.title,
    description: PAGE.description,
    type: 'website',
    url: PAGE_URL,
    siteName: SITE_CONFIG.name,
    locale: 'lt_LT',
    images: [image],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE.title,
    description: PAGE.description,
    images: [image.url],
  },
};

export default function ListComparePage(): ReactElement {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Pradžia', url: '/' },
    { name: 'Sąrašų palyginimas', url: PAGE.canonical },
  ]);
  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: PAGE.title,
    description: PAGE.description,
    inLanguage: 'lt',
    isPartOf: { '@type': 'WebSite', url: SITE_CONFIG.url },
  };

  return (
    <>
      <StructuredData schema={[breadcrumb, webPage]} />

      <header className="wrap page-head">
        <div className="eyebrow">Nemokamas įrankis</div>
        <h1>Palyginkite du sąrašus ir pamatykite, kas nesutampa</h1>
        <p className="lead">
          Įklijuokite du sąrašus, nukopijuotus iš Excel ar PDF, pavyzdžiui, sąskaitos ir važtaraščio eilutes. Iš karto
          matysite, kurie kodai ar kiekiai skiriasi.
        </p>
      </header>

      <section aria-labelledby="tool-heading" className="section">
        <div className="wrap">
          <div className="section-head">
            <h2 id="tool-heading">Įklijuokite sąrašus</h2>
          </div>
          <ListCompareTool />
        </div>
      </section>

      <section className="band" aria-labelledby="more-heading">
        <div className="wrap band-split">
          <h2 id="more-heading">Reikia daugiau nei paprastų sąrašų?</h2>
          <p>
            Sudėtingesniems dokumentams (PDF, skenuoti, užsienio kalbomis) – DI agentas su žmogaus patvirtinimu. Pirmą
            rinkinį patikriname nemokamai.
          </p>
          <div className="band-actions">
            <Link href="/lt/dokumentu-sutikrinimas" className="btn btn-accent btn-lg">
              Dokumentų sutikrinimas su DI agentu
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
