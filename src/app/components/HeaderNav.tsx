'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useCallback, useEffect, type ReactElement } from 'react';
import { usePathname } from 'next/navigation';
import MobileMenu from './navigation/MobileMenu';
import { useLanguage } from '@/lib/LanguageContext';

// Concise header + mobile menu toggle (<=60 lines)
export default function HeaderNav(): ReactElement {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((o) => !o), []);
  const close = useCallback(() => setOpen(false), []);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'lt' : 'en');
  }, [language, setLanguage]);
  useEffect(() => {
    function onResize(): void {
      if (window.innerWidth >= 600) setOpen(false);
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Clear any lingering navigation-in-flight flag once the route has changed.
  useEffect(() => {
    try {
      document.body.removeAttribute('data-nav-in-flight');
    } catch {}
  }, [pathname]);
  return (
    <nav className="container h-14 flex items-center justify-between relative" aria-label="Site header">
      {/* Mark navigation as "in-flight" on pointer down/touch so heavy background work can pause */}
      <Link
        href="/"
        className="flex items-center"
        aria-label="Homepage"
        onMouseDown={() => {
          try {
            document.body.setAttribute('data-nav-in-flight', '1');
            // clear attribute shortly after navigation begins in case navigation fails
            window.setTimeout(() => document.body.removeAttribute('data-nav-in-flight'), 900);
          } catch {}
        }}
        onTouchStart={() => {
          try {
            document.body.setAttribute('data-nav-in-flight', '1');
            window.setTimeout(() => document.body.removeAttribute('data-nav-in-flight'), 900);
          } catch {}
        }}
      >
        <Image
          src="/logo.svg"
          alt="Maxwell Software Solutions"
          width={240}
          height={60}
          className="site-logo w-auto"
          priority
        />
      </Link>
      <div className="nav-links" aria-label="Primary navigation">
        <Link href="/services" suppressHydrationWarning>
          {t('nav.services') || 'Services'}
        </Link>
        <Link href="/project-showcase" suppressHydrationWarning>
          {t('nav.caseStudies') || 'Case studies'}
        </Link>
        <Link href="/about" suppressHydrationWarning>
          {t('nav.about') || 'About'}
        </Link>
        <Link href="/blog" suppressHydrationWarning>
          {t('nav.blog') || 'Blog'}
        </Link>
        <button
          type="button"
          onClick={toggleLanguage}
          className="px-3 py-1.5 rounded-md border border-foreground/20 hover:border-accent hover:bg-accent/5 transition-colors font-medium text-sm"
          aria-label={`Switch to ${language === 'en' ? 'Lithuanian' : 'English'}`}
          suppressHydrationWarning
        >
          {language === 'en' ? 'LT' : 'EN'}
        </button>
      </div>
      <button
        type="button"
        className="menu-toggle"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={toggle}
        data-test="menu-toggle"
      >
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {open ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <>
              <path d="M3 6h18" />
              <path d="M3 12h18" />
              <path d="M3 18h18" />
            </>
          )}
        </svg>
      </button>
      <MobileMenu open={open} onClose={close} />
    </nav>
  );
}
