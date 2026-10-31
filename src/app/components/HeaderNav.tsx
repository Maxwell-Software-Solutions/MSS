'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useCallback, useEffect, type ReactElement } from 'react';
import { usePathname } from 'next/navigation';
import MobileMenu from './navigation/MobileMenu';
import { useLanguage } from '@/lib/LanguageContext';
import { useHydratedTranslation } from '@/lib/useHydratedTranslation';
import ThemeToggle from './ThemeToggle';
import ThemeAwareLogo from './ThemeAwareLogo';
import ScheduleCallButton from './ScheduleCallButton';

// Concise header + mobile menu toggle (<=60 lines)
export default function HeaderNav(): ReactElement {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((o) => !o), []);
  const close = useCallback(() => setOpen(false), []);
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const ht = useHydratedTranslation();

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'lt' : 'en');
  }, [language, setLanguage]);
  useEffect(() => {
    function onResize(): void {
      if (window.innerWidth >= 1024) setOpen(false);
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
  // exact match marks the page; a parent section is marked as the current section
  const current = (href: string): 'page' | 'true' | undefined =>
    pathname === href ? 'page' : pathname?.startsWith(`${href}/`) ? 'true' : undefined;

  return (
    <nav className="max-w-6xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between relative" aria-label="Site header">
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
        <ThemeAwareLogo width={210} height={64} className="site-logo w-auto" priority />
        {/* Light logo for the dark home hero; globals.css hides it everywhere else */}
        <Image src="/logo-dark.svg" alt="" width={210} height={64} className="site-logo-on-hero w-auto" priority />
      </Link>
      <div className="nav-links" aria-label="Primary navigation">
        <Link href="/services" aria-current={current('/services')} suppressHydrationWarning>
          {ht('nav.services', 'Services')}
        </Link>
        <Link href="/case-studies" aria-current={current('/case-studies')} suppressHydrationWarning>
          {ht('nav.caseStudies', 'Case studies')}
        </Link>
        <Link href="/pricing" aria-current={current('/pricing')} suppressHydrationWarning>
          {ht('nav.pricing', 'Pricing')}
        </Link>
        <Link href="/about" aria-current={current('/about')} suppressHydrationWarning>
          {ht('nav.about', 'About')}
        </Link>
        <Link href="/blog" aria-current={current('/blog')} suppressHydrationWarning>
          {ht('nav.blog', 'Blog')}
        </Link>
        <span className="mx-2 h-5 w-px bg-border" aria-hidden="true" />
        <ThemeToggle />
        <button
          type="button"
          onClick={toggleLanguage}
          className="lang-toggle"
          aria-label={`Switch to ${language === 'en' ? 'Lithuanian' : 'English'}`}
          suppressHydrationWarning
        >
          {language === 'en' ? 'LT' : 'EN'}
        </button>
        <ScheduleCallButton className="nav-cta" />
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
          width="24"
          height="24"
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
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
