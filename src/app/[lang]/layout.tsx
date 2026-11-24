import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { notFound } from 'next/navigation';
import HeaderNav from '@/app/components/HeaderNav';
import { IBM_Plex_Sans } from 'next/font/google';
import '../globals.css';
import '../styles/tokens.css';
import GoogleAnalytics from '@/app/components/GoogleAnalytics';
import Cookiebot from '@/app/components/Cookiebot';
import ClientOnlyComponents from '@/app/components/ClientOnlyComponents';
import { LanguageProvider } from '@/lib/LanguageContext';
import StructuredData from '@/app/components/StructuredData';
import { generateOrganizationSchema, generateWebSiteSchema, generateLocalBusinessSchema } from '@/lib/seo/structured-data';
import { loadServerTranslations, getCriticalTranslations } from '@/lib/server-translations';
import { SITE_CONFIG, PAGES } from '@/lib/seo/data';
import { CANONICAL_BASE_URL } from '@/lib/seo/url';

const siteUrl = CANONICAL_BASE_URL;

// First load only: if the page is still loading 0.4 s in, html[data-loading] shows the header's loader until the load
// event (10 s at most). A fast page never sets it, and nothing on the page waits for it.
const FIRST_LOAD_SCRIPT =
  "(function(){var d=document.documentElement,s=setTimeout(function(){d.setAttribute('data-loading','')},400);" +
  "function done(){clearTimeout(s);d.removeAttribute('data-loading')}addEventListener('load',done);setTimeout(done,10000)})()";

// One variable family for the whole site. latin-ext covers the Lithuanian letters (ą č ę ė į š ų ū ž);
// the browser only downloads that subset when a page actually uses those characters.
const plexSans = IBM_Plex_Sans({
  variable: '--font-plex-sans',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

/**
 * Enhanced root metadata using central data registry
 * Data source: SITE_CONFIG and PAGES.home from @/lib/seo/data
 */
export const metadata: Metadata = {
  // Title with template for child pages
  title: {
    default: PAGES.home!.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },

  // Description from central registry
  description: PAGES.home!.description,

  // Keywords array
  keywords: PAGES.home!.keywords,

  // Author information
  authors: [
    {
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  ],

  // Creator/Publisher for rich snippets
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,

  // Metadata base URL for all relative paths
  metadataBase: new URL(siteUrl),

  // Canonical URL. No hreflang: the language switches by cookie on the same URL, so there is no per-language URL to point at.
  alternates: {
    canonical: '/',
  },

  // Enhanced Open Graph metadata
  openGraph: {
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.title}`,
    description: SITE_CONFIG.description,
    type: 'website',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: SITE_CONFIG.locale,
    alternateLocale: [SITE_CONFIG.alternateLocale],

    // OG Image (generated dynamically)
    images: [
      {
        url: '/opengraph-image', // Next.js auto-discovers opengraph-image.tsx
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} — ${SITE_CONFIG.title}`,
        type: 'image/png',
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.title}`,
    description: SITE_CONFIG.description,
    creator: SITE_CONFIG.social.twitter,
    images: ['/opengraph-image'],
  },

  // Enhanced robots configuration
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1, // No limit
      'max-image-preview': 'large', // Large image previews
      'max-snippet': -1, // No snippet length limit
    },
  },

  // Verification tokens (add from Google Search Console)
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    // yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    // bing: process.env.NEXT_PUBLIC_BING_VERIFICATION,
  },

  // App manifest. The icons come from favicon.ico, icon.svg, icon1-4.png and apple-icon.png in this folder.
  manifest: '/manifest.json',

  // Additional metadata for categorization
  category: 'technology',

  // App-specific metadata
  applicationName: SITE_CONFIG.name,

  // Format detection (disable auto phone number detection)
  formatDetection: {
    telephone: false, // Prevents accidental phone number linking
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5, // Allow zoom for accessibility
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbfbfa' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

// Every page is built ahead of time in both languages. The middleware picks one per request (/lt/ addresses are always
// Lithuanian, the rest follow the language cookie), so pages come from the CDN instead of a server render each time.
export function generateStaticParams(): Array<{ lang: 'en' | 'lt' }> {
  return [{ lang: 'en' }, { lang: 'lt' }];
}
export const dynamicParams = false;

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>): Promise<ReactElement> {
  const { lang } = await params;
  if (lang !== 'en' && lang !== 'lt') notFound();
  const initialLang = lang;

  // Load critical translations for server-side injection to reduce flashes
  const fullTranslations = await loadServerTranslations(initialLang);
  const criticalTranslations = getCriticalTranslations(fullTranslations);

  // Generate enhanced structured data schemas
  const organizationSchemaNew = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <html lang={initialLang} className={plexSans.variable}>
      <head>
        {/* Preconnect to critical origins for faster resource loading */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="//fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="//fonts.gstatic.com" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: FIRST_LOAD_SCRIPT }} />
      </head>
      <body className="antialiased">
        <LanguageProvider initialLanguage={initialLang} criticalTranslations={criticalTranslations}>
          {/* Enhanced Structured Data: Organization + WebSite + LocalBusiness (Vilnius) */}
          <StructuredData schema={[organizationSchemaNew, websiteSchema, localBusinessSchema]} />
          {/* Cookiebot */}
          <Cookiebot cbid={process.env.NEXT_PUBLIC_COOKIEBOT_CBID || 'c99c6734-f40a-4c0f-842f-aea763f24ee7'} />
          {/* Google Analytics */}
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-Z934MSEFV5'} />
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>

          <header className="site-header fixed top-0 left-0 right-0 z-50" role="banner">
            <HeaderNav />
            <div className="site-loader" aria-hidden="true" />
          </header>
          <div style={{ height: 'var(--header-height)' }} aria-hidden="true" />
          <main id="main-content" role="main" tabIndex={-1}>
            {children}
          </main>
          <ClientOnlyComponents />
        </LanguageProvider>
      </body>
    </html>
  );
}
