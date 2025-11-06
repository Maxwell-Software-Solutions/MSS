import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import HeaderNav from './components/HeaderNav';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ParallaxScrollEffects from '@/app/components/ParallaxScrollEffects';
import AppFooter from '@/app/components/AppFooter';
import AutoContrastButtons from '@/app/components/AutoContrastButtons';
import GoogleAnalytics from '@/app/components/GoogleAnalytics';
import Cookiebot from '@/app/components/Cookiebot';
import { LanguageProvider } from '@/lib/LanguageContext';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://maxwell-software.com';

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
        <LanguageProvider>
          {/* Cookiebot */}
          <Cookiebot cbid={process.env.NEXT_PUBLIC_COOKIEBOT_CBID || 'c99c6734-f40a-4c0f-842f-aea763f24ee7'} />
          {/* Google Analytics */}
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-Z934MSEFV5'} />
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          {/* Global scroll effects (no UI) */}
          <ParallaxScrollEffects key="scroll-effects" />

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
            
            .header-glass { background-color: rgba(255, 255, 255, 0.78); backdrop-filter: saturate(180%) blur(12px); }
            .container { max-width: 80rem; margin-inline: auto; padding-inline: 1rem; width: 100%; overflow-x: hidden; }
            @media (min-width: 640px) { .container { padding-inline: 2rem; } }
            @media (min-width: 768px) { .container { padding-inline: 2.5rem; } }
            .hero-gradient { background-image: radial-gradient(120% 80% at 50% 0%, rgba(139, 107, 0, 0.12) 0%, rgba(139, 107, 0, 0.06) 30%, transparent 60%); }
              
              /* Mobile (<600px): hide nav links, show only logo and menu button */
              .nav-links { display: none; }
              .menu-toggle { 
                background: none; 
                border: 0; 
                color: #000; 
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
                background-color: rgba(0,0,0,0.05);
              }
              
              @media (prefers-color-scheme: dark) {
                .menu-toggle:hover {
                  background-color: rgba(255,255,255,0.05);
                }
              }
              
              /* Hide menu button when menu is open (replaced by close button) */
              .menu-toggle[aria-expanded="true"] { 
                opacity: 0; 
                pointer-events: none; 
              }
              
              /* Mobile Navigation - Hidden by default, overlay when open */
              .mobile-nav { 
                position: fixed; 
                top: 0; 
                right: 0; 
                height: 100vh; 
                width: min(20rem, 85%); 
                background: linear-gradient(180deg, rgba(255,255,255,0.96), rgba(248,250,252,0.94)); 
                -webkit-backdrop-filter: blur(20px) saturate(150%); 
                backdrop-filter: blur(20px) saturate(150%); 
                color: #1e293b; 
                padding: 4.5rem 2rem 2rem; 
                display: flex; 
                flex-direction: column; 
                gap: 1.5rem; 
                transform: translateX(100%); 
                transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1); 
                box-shadow: -16px 0 48px -12px rgba(0,0,0,0.25); 
                border-left: 1px solid rgba(247, 250, 252, 0.1); 
                z-index: 80; 
                overflow-y: auto;
                visibility: hidden;
                opacity: 0;
              }
              
              /* Dark mode mobile nav */
              @media (prefers-color-scheme: dark) {
                .mobile-nav { 
                  background: linear-gradient(180deg, rgba(15,23,42,0.96), rgba(15,23,42,0.94)); 
                  color: #f1f5f9; 
                  box-shadow: -16px 0 48px -12px rgba(0,0,0,0.6); 
                  border-left: 1px solid rgba(247, 250, 252, 0.1); 
                }
              }
              
              /* Mobile nav open state - visible overlay */
              .mobile-nav.open { 
                transform: translateX(0); 
                visibility: visible;
                opacity: 1;
              }
              
              @supports (-webkit-touch-callout: none) {
                /* Simplify effects for WebKit to avoid rare crash on backdrop + transform combo */
                .mobile-nav { 
                  -webkit-backdrop-filter: none; 
                  backdrop-filter: none; 
                  background: rgba(255,255,255,0.98); 
                }
                @media (prefers-color-scheme: dark) {
                  .mobile-nav { background: rgba(15,23,42,0.98); }
                }
              }
              .mobile-nav a { color:inherit; text-decoration:none; font-size:1.125rem; font-weight:500; padding:0.75rem 0; border-bottom:1px solid rgba(247,250,252,0.05); transition:color .2s; }
              .mobile-nav a:hover { color:#d4af37; }
              .mobile-nav a:last-child { border-bottom:none; }
              
              @media (prefers-color-scheme: dark) {
                .mobile-nav a { border-bottom-color:rgba(247,250,252,0.05); }
                .mobile-nav a:hover { color:#e5c158; }
              }
              
              .menu-close { 
                background: none; 
                border: 0; 
                color: inherit; 
                display: inline-flex; 
                align-items: center;
                justify-content: center;
                padding: 0.5rem; 
                border-radius: 0.5rem; 
                transition: background-color 0.2s ease; 
                cursor: pointer;
                width: 2.5rem;
                height: 2.5rem;
              }
              .menu-close:hover { 
                background-color: rgba(0,0,0,0.05); 
              }
              
              @media (prefers-color-scheme: dark) {
                .menu-close:hover { background-color: rgba(255,255,255,0.05); }
              }
              
              .sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; border:0; }
              
              /* Navigation Overlay - Hidden by default */
              .nav-overlay { 
                position: fixed; 
                inset: 0; 
                background: rgba(0,0,0,0.3); 
                -webkit-backdrop-filter: blur(4px); 
                backdrop-filter: blur(4px); 
                opacity: 0; 
                pointer-events: none; 
                transition: opacity 0.3s ease; 
                z-index: 60;
                visibility: hidden;
              }
              
              @media (prefers-color-scheme: dark) {
                .nav-overlay { background: rgba(0,0,0,0.6); }
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

          <header className="fixed top-0 left-0 right-0 z-50 header-glass border-b border-foreground/10">
            <HeaderNav />
          </header>
          <div style={{ height: '56px' }} aria-hidden="true" />
          <main>{children}</main>
          <AutoContrastButtons />
          <AppFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
