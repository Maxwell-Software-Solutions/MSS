import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import HeaderNav from './components/HeaderNav';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ParallaxScrollEffects from '@/app/components/ParallaxScrollEffects';
import AppFooter from '@/app/components/AppFooter';
import AutoContrastButtons from '@/app/components/AutoContrastButtons';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'Maxwell — Modern Web Experiences',
  description: 'Iterate on your site live with AI-driven edits.',
  metadataBase: new URL('https://maxwell-software.com'),
  openGraph: {
    title: 'Maxwell — Modern Web Experiences',
    description: 'Iterate on your site live with AI-driven edits.',
    type: 'website',
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
  alternates: {
    canonical: '/',
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
  maximumScale: 1,
  themeColor: '#8B6B00',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement {
  return (
    <html lang="en">
      <head>
        {/* Preload & preconnect resources (moved from body for WebKit stability) */}
        <link rel="preload" href="/_next/static/css/app/layout.css" as="style" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="//fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="//fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="modulepreload" href="/_next/static/chunks/webpack.js" />
        <link rel="modulepreload" href="/_next/static/chunks/main-app.js" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {/* Global scroll effects (no UI) */}
        <ParallaxScrollEffects key="scroll-effects" />

        {/* Critical CSS for above-the-fold content */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            body { margin: 0; font-family: Arial, Helvetica, sans-serif; }
            .header-glass { background-color: rgba(255, 255, 255, 0.78); backdrop-filter: saturate(180%) blur(12px); }
            .container { max-width: 80rem; margin-inline: auto; padding-inline: 1.5rem; }
            .hero-gradient { background-image: radial-gradient(120% 80% at 50% 0%, rgba(139, 107, 0, 0.12) 0%, rgba(139, 107, 0, 0.06) 30%, transparent 60%); }
              /* Mobile (<600px): hide nav links, leave only logo */
              .nav-links { display:none; }
              .menu-toggle { background:none; border:0; color:#111; display:inline-flex; align-items:center; justify-content:center; position:relative; z-index:70; width:2.5rem; height:2.5rem; transition:opacity .2s; }
              .menu-toggle[aria-expanded="true"] { opacity:0; pointer-events:none; }
              .mobile-nav { position:fixed; top:0; right:0; height:340px; width:min(19rem,82%); background:linear-gradient(180deg, rgba(15,23,42,0.94), rgba(15,23,42,0.90)); -webkit-backdrop-filter:blur(18px) saturate(150%); backdrop-filter:blur(18px) saturate(150%); color:#f1f5f9; padding:4.25rem 2rem 2rem; display:flex; flex-direction:column; gap:1.25rem; transform:translateX(100%); transition:transform .35s cubic-bezier(.4,0,.2,1); box-shadow:-12px 0 36px -8px rgba(0,0,0,.55); border-left:1px solid rgba(255,255,255,0.06); z-index:80; overflow-y:auto; }
              @supports (-webkit-touch-callout: none) {
                /* Simplify effects for WebKit to avoid rare crash on backdrop + transform combo */
                .mobile-nav { -webkit-backdrop-filter:none; backdrop-filter:none; background:rgba(15,23,42,0.96); }
              }
              .mobile-nav.open { transform:translateX(0); }
              .mobile-nav a { color:#f1f5f9; text-decoration:none; }
              .mobile-nav a:hover { color:#fff; }
              .menu-close { background:none; border:0; color:inherit; display:inline-flex; }
              .sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; border:0; }
              .nav-overlay { position:fixed; inset:0; background:rgba(15,23,42,0.55); -webkit-backdrop-filter:blur(3px); backdrop-filter:blur(3px); opacity:0; pointer-events:none; transition:opacity .3s; z-index:60; }
              .nav-overlay.open { opacity:1; pointer-events:auto; }
              [inert] { pointer-events:none; user-select:none; opacity:0.6; }
              header { z-index:50; }
              .mobile-nav { z-index:80; }
              .site-logo { height:2.5rem; }
              .skip-link { position:absolute; top:-40px; left:0; background:#111; color:#fff; padding:.5rem 1rem; z-index:100; text-decoration:none; font-size:.875rem; border-radius:0 0 .25rem .25rem; transition:top .2s; }
              .skip-link:focus { top:0; }
              @media (min-width:600px){
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

        <header className="sticky top-0 z-50 header-glass border-b border-foreground/10">
          <HeaderNav />
        </header>
        <main>{children}</main>
        <AutoContrastButtons />
        <AppFooter />
      </body>
    </html>
  );
}
