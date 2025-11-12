import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import HeaderNav from './components/HeaderNav';
import { Geist, Geist_Mono, Montserrat } from 'next/font/google';
import './globals.css';
import './styles/tokens.css';
import GoogleAnalytics from '@/app/components/GoogleAnalytics';
import Cookiebot from '@/app/components/Cookiebot';
import ClientOnlyComponents from '@/app/components/ClientOnlyComponents';
import { LanguageProvider } from '@/lib/LanguageContext';
import StructuredData from '@/app/components/StructuredData';
import { organizationSchema } from '@/lib/structuredData';
import { headers } from 'next/headers';
import { loadServerTranslations, getCriticalTranslations } from '@/lib/server-translations';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://maxwell-software.com';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Removed '500' to reduce font payload
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: false, // Don't preload mono font (only used sparingly)
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: 'Maxwell — Modern Web Experiences',
  description: 'Iterate on your site live with AI-driven edits.',
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'Maxwell — Modern Web Experiences',
    description: 'Iterate on your site live with AI-driven edits.',
    type: 'website',
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maxwell — Modern Web Experiences',
    description: 'Iterate on your site live with AI-driven edits.',
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/logo-icon.svg', sizes: '64x64', type: 'image/svg+xml' },
    ],
    apple: '/logo-icon.svg',
    shortcut: '/favicon.svg',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#8B6B00',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<ReactElement> {
  // Read language cookie from request headers on the server so we can set
  // the HTML lang and pass an initial language to the client provider.
  const hdrs = await headers();
  const cookieHeader = hdrs.get('cookie') || '';
  const match = cookieHeader.match(/(?:^|; )language=(lt|en)(?:;|$)/);
  const initialLang = match?.[1] === 'lt' ? 'lt' : 'en';

  // Load critical translations for server-side injection to reduce flashes
  const fullTranslations = await loadServerTranslations(initialLang);
  const criticalTranslations = getCriticalTranslations(fullTranslations);

  return (
    <html lang={initialLang} className={`${montserrat.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Preconnect to critical origins for faster resource loading */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="//fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="//fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <LanguageProvider initialLanguage={initialLang} criticalTranslations={criticalTranslations}>
          {/* Structured Data for Organization */}
          <StructuredData data={organizationSchema} />
          {/* Cookiebot */}
          <Cookiebot cbid={process.env.NEXT_PUBLIC_COOKIEBOT_CBID || 'c99c6734-f40a-4c0f-842f-aea763f24ee7'} />
          {/* Google Analytics */}
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-Z934MSEFV5'} />
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>

          {/* Critical CSS for above-the-fold content */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
            /* Prevent horizontal scrolling globally and force vertical scrollbar to prevent layout shift */
            html, body { margin: 0; padding: 0; overflow-x: hidden; overflow-y: scroll; font-family: Arial, Helvetica, sans-serif; }
            *, *::before, *::after { box-sizing: border-box; }
            img, video, iframe { max-width: 100%; height: auto; }
            
            /* Stable layout for mobile menu - prevent any width changes */
            body {
              width: 100vw;
              position: relative;
            }
            
            /* Ensure header container maintains consistent width */
            header {
              width: 100%;
              box-sizing: border-box;
            }
            
            .header-glass { backdrop-filter: saturate(180%) blur(12px); }
            .container { max-width: 80rem; margin-inline: auto; padding-inline: 1rem; width: 100%; overflow: hidden; }
            @media (min-width: 640px) { .container { padding-inline: 2rem; } }
            @media (min-width: 768px) { .container { padding-inline: 2.5rem; } }
            .hero-gradient { background-image: radial-gradient(120% 80% at 50% 0%, rgba(139, 107, 0, 0.12) 0%, rgba(139, 107, 0, 0.06) 30%, transparent 60%); }
              
              /* Mobile (<1000px): hide nav links, show only logo and menu button */
              .nav-links { display: none; }
              .menu-toggle { 
                background: none; 
                border: 0; 
                color: var(--color-text); 
                display: inline-flex; 
                align-items: center; 
                justify-content: center; 
                position: relative; 
                z-index: 70; 
                width: 44px; 
                height: 44px; 
                transition: opacity 0.2s ease; 
                cursor: pointer;
                border-radius: 8px;
              }
              
              .menu-toggle:hover {
                opacity: 0.8;
              }
              
              /* Hide menu button when menu is open (replaced by close button) */
              .menu-toggle[aria-expanded="true"] { 
                opacity: 0; 
                pointer-events: none; 
              }
              
              /* Mobile Navigation - styles defined in globals.css for theme support */
              .mobile-nav { 
                position: fixed; 
                top: 0; 
                right: 0; 
                height: 100vh; 
                width: min(20rem, 85%); 
                padding: 4.5rem 2rem 2rem; 
                display: flex; 
                flex-direction: column; 
                gap: 1.5rem; 
                transform: translateX(100%); 
                transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease, visibility 0.35s ease; 
                z-index: 80; 
                overflow-y: auto;
                visibility: hidden;
                opacity: 0;
              }
              
              /* Mobile nav open state - visible overlay */
              .mobile-nav.open { 
                transform: translateX(0); 
                visibility: visible;
                opacity: 1;
              }
              
              .sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; border:0; }
              
              /* Navigation Overlay - styles defined in globals.css for theme support */
              .nav-overlay { 
                position: fixed; 
                inset: 0; 
                opacity: 0; 
                pointer-events: none; 
                transition: opacity 0.3s ease; 
                z-index: 60;
                visibility: hidden;
                cursor: pointer;
              }
              
              /* Overlay visible when menu is open */
              .nav-overlay.open { 
                opacity: 1; 
                pointer-events: auto;
                visibility: visible;
              }
              [inert] { pointer-events:none; user-select:none; opacity:0.6; }
              header { z-index:50; }
              .mobile-nav { z-index:80; }
              .site-logo { height:2.5rem; }
              .skip-link { position:absolute; top:-40px; left:0; background:#111; color:#fff; padding:.5rem 1rem; z-index:100; text-decoration:none; font-size:.875rem; border-radius:0 0 .25rem .25rem; transition:top .2s; }
              .skip-link:focus { top:0; }
              
              @media (min-width:1000px){
                .nav-links { display:flex; align-items:center; gap:1.25rem; font-size:0.875rem; }
                .menu-toggle, .mobile-nav { display:none; }
                .site-logo { height:3rem; }
              }
              
              @media (prefers-reduced-motion: reduce){
                .mobile-nav { transition:none !important; }
                .nav-overlay { transition:none !important; }
              }
          `,
            }}
          />

          <header className="fixed top-0 left-0 right-0 z-50 header-glass neuro-header-border" role="banner">
            <HeaderNav />
          </header>
          <div style={{ height: '56px' }} aria-hidden="true" />
          <main id="main-content" role="main" tabIndex={-1}>
            {children}
          </main>
          <ClientOnlyComponents />
        </LanguageProvider>
      </body>
    </html>
  );
}
