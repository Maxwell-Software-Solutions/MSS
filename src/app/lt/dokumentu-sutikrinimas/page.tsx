import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactElement, ReactNode } from 'react';
import StructuredData from '@/app/components/StructuredData';
import DemoClip from './DemoClip';
import { PAGES, SITE_CONFIG } from '@/lib/seo/data';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';

/**
 * Lithuanian landing page for document cross-checking.
 *
 * Plain invoice scanning is already offered in Lithuania, so the pitch is the check between documents:
 * an AI flags what does not match, and a named person approves each line, all remotely.
 *
 * Its own /lt/ address (not the site's cookie or `?lang=` switch) so search engines and shared links always get
 * Lithuanian text. The middleware marks /lt/ requests, and the root layout then renders <html lang="lt">.
 * No price, client name or figure belongs on this page; the only offer is a free first check.
 */
const PAGE = PAGES.documentCrossCheckLt!;
const PAGE_URL = `${SITE_CONFIG.url}${PAGE.canonical}`;

/** Where the "send one set" button writes to, with the subject already filled in. */
const CHECK_MAILTO = `mailto:mantas@maxwellsoftwaresolutions.com?subject=${encodeURIComponent('Dokumentų rinkinys patikrai')}`;
const CHECK_LABEL = 'Atsiųskite vieną dokumentų rinkinį – grąžinsime patikrintą';
const BOOK_LABEL = 'Rezervuoti 30 min. pokalbį';

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

const examples = [
  {
    title: 'Siuntos rinkinys',
    body: 'Sąskaita, važtaraštis, CMR ir pakavimo lapas, dažnai skirtingomis kalbomis. Lyginame kiekius, svorius, prekių kodus, gavėją ir datas.',
    flag: 'Pavyzdys: sąskaitoje didesnis kiekis nei važtaraštyje.',
  },
  {
    title: 'Brėžinys ir detalių sąrašas',
    body: 'Brėžinio pozicijos prieš detalių sąrašą ar užsakymą. Tikriname pozicijas, kiekius, medžiagas ir žymėjimus.',
    flag: 'Pavyzdys: brėžinyje nurodyta viena medžiaga, užsakyme – kita.',
  },
  {
    title: 'Sertifikatai',
    body: 'Kokybės ir medžiagų sertifikatai prie gautos siuntos. Tikriname partiją, produktą, standartą ir galiojimo datą.',
    flag: 'Pavyzdys: sertifikate kita partija nei važtaraštyje arba pasibaigęs galiojimas.',
  },
];

const steps = [
  { title: 'Atsiunčiate', body: 'Vieną dokumentų rinkinį el. paštu: PDF arba skenuotus failus.' },
  {
    title: 'DI palygina',
    body: 'DI sutikrina dokumentus tarpusavyje ir pažymi kiekvieną nesutapimą: kuriuose dokumentuose ir kokios reikšmės skiriasi.',
  },
  {
    title: 'Žmogus tvirtina',
    body: 'Kiekvieną eilutę patvirtina vardu nurodytas žmogus. Jums grąžiname patikrintą rinkinį.',
  },
];

const questions: Array<{ question: string; answer: ReactNode }> = [
  {
    question: 'Ar tai sąskaitų nuskaitymas?',
    answer: 'Ne. Sąskaitų skaitmeninimas yra kita užduotis. Mes lyginame dokumentus tarpusavyje ir ieškome, kas nesutampa.',
  },
  {
    question: 'Ar dokumentai gali būti ne lietuvių kalba?',
    answer: 'Taip. Pavyzdžiui, CMR ir pakavimo lapai iš užsienio tiekėjų dažnai būna kitomis kalbomis.',
  },
  {
    question: 'Ar DI gali suklysti?',
    answer: 'Gali, todėl jis nieko netvirtina pats. Kiekvieną eilutę patvirtina arba atmeta žmogus.',
  },
  {
    question: 'Ką daryti su asmens duomenimis dokumentuose?',
    answer: (
      <>
        Jei dokumentuose yra asmens duomenų, kurių patikrai nereikia, prieš siųsdami juos užtamsinkite. Kaip tvarkome
        duomenis, aprašyta <Link href="/privacy?lang=lt" className="link">Privatumo politikoje</Link>.
      </>
    ),
  },
];

export default function DocumentCrossCheckPage(): ReactElement {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Pradžia', url: '/' },
    { name: 'Dokumentų sutikrinimas', url: PAGE.canonical },
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
    about: {
      '@type': 'Service',
      name: 'Dokumentų sutikrinimas su DI',
      description: PAGE.description,
      serviceType: 'Dokumentų sutikrinimas',
      areaServed: { '@type': 'Country', name: 'Lietuva' },
      provider: { '@id': `${SITE_CONFIG.url}/#organization` },
    },
  };

  return (
    <>
      <StructuredData schema={[breadcrumb, webPage]} />

      <header className="wrap page-head">
        <div className="doc-hero">
          <div className="doc-hero-copy">
            <div className="eyebrow">Dokumentų sutikrinimas su DI</div>
            <h1>Sąskaitoje vienas kiekis, važtaraštyje – kitas. Mes randame nesutapimus.</h1>
            <p className="lead">
              DI palygina jūsų dokumentus tarpusavyje – sąskaitą su važtaraščiu, CMR su pakavimo lapu, brėžinį su detalių
              sąrašu, sertifikatus su užsakymu – ir pažymi, kas nesutampa. Kiekvieną eilutę tvirtina žmogus.
            </p>
            <p>
              Tai ne sąskaitų nuskaitymas. Mes lyginame skirtingų tipų dokumentus, taip pat užsienio kalbomis, ir parodome,
              kur jie prieštarauja vienas kitam.
            </p>
            <p>
              Pirmą rinkinį patikriname nemokamai. Iš jūsų reikia tik dokumentų: be vizitų, viskas nuotoliu. Jei laiško
              langas neatsidaro, rašykite adresu
              mantas@maxwellsoftwaresolutions.com.
            </p>
            <div className="page-actions">
              <a href={CHECK_MAILTO} className="btn btn-accent btn-lg">
                {CHECK_LABEL}
              </a>
              <a href="/book" className="btn btn-lg" target="_blank" rel="noopener noreferrer">
                {BOOK_LABEL}
              </a>
            </div>
            <p className="form-note">
              Paprastus sąrašus galite palyginti patys:{' '}
              <Link href="/lt/sarasu-palyginimas" className="link">
                nemokamas sąrašų palyginimo įrankis
              </Link>
              .
            </p>
          </div>
          <DemoClip />
        </div>
      </header>

      <section aria-labelledby="examples-heading" className="section">
        <div className="wrap">
          <div className="section-head section-head-split">
            <h2 id="examples-heading">Ką sutikriname: trys pavyzdžiai</h2>
            <p className="lead">Dokumentai, kurie turėtų sutapti, bet ne visada sutampa. Štai kaip atrodo patikra.</p>
          </div>
          <div className="columns columns-3">
            {examples.map((example) => (
              <article key={example.title} className="service">
                <h3>{example.title}</h3>
                <p>{example.body}</p>
                <p className="service-meta">{example.flag}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="approval-heading" className="section section-tone">
        <div className="wrap">
          <div className="section-head section-head-split">
            <h2 id="approval-heading">Kiekvieną eilutę tvirtina žmogus</h2>
            <p className="lead">
              DI siūlo, sprendžia žmogus. Kiekvieną pažymėtą eilutę peržiūri ir patvirtina arba atmeta vardu nurodytas
              žmogus, o ne programa.
            </p>
          </div>
          <ol className="steps steps-3">
            {steps.map((step, index) => (
              <li key={step.title} className="step">
                <div className="step-index">{index + 1}</div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="section">
        <div className="wrap split split-sticky">
          <h2 id="faq-heading">Dažni klausimai</h2>
          <div>
            {questions.map((item) => (
              <div key={item.question} className="qa-item">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="start-heading">
        <div className="wrap band-split">
          <h2 id="start-heading">Pradėkite nuo vieno rinkinio</h2>
          <p>
            Atsiųskite vieną dokumentų rinkinį adresu mantas@maxwellsoftwaresolutions.com. Grąžinsime patikrintą:
            nesutapimai pažymėti, kiekvieną eilutę patvirtino žmogus. Pirmas rinkinys – nemokamai. Viskas vyksta nuotoliu.
          </p>
          <div className="band-actions">
            <a href={CHECK_MAILTO} className="btn btn-accent btn-lg">
              {CHECK_LABEL}
            </a>
            <a href="/book" className="btn btn-lg" target="_blank" rel="noopener noreferrer">
              {BOOK_LABEL}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
