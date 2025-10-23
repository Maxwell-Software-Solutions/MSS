'use client';
import Link from 'next/link';
import { useRef, useEffect, useCallback, type ReactElement } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps): ReactElement {
  const { t, language, setLanguage } = useLanguage();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const prevFocus = useRef<HTMLElement | null>(null);
  
  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'lt' : 'en');
  }, [language, setLanguage]);

  // Side effects when opening / closing
  useEffect(() => {
    if (!open) return;
    prevFocus.current = document.activeElement as HTMLElement | null;
    
    // Prevent scrolling using event listeners instead of CSS to avoid layout changes
    const preventScroll = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };
    
    const preventTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };
    
    const preventKeyScroll = (e: KeyboardEvent) => {
      const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
      if (scrollKeys.includes(e.key)) {
        e.preventDefault();
      }
    };
    
    // Add event listeners to prevent scrolling without changing CSS
    document.addEventListener('wheel', preventScroll, { passive: false });
    document.addEventListener('touchmove', preventTouchMove, { passive: false });
    document.addEventListener('keydown', preventKeyScroll);
    
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    main?.setAttribute('inert', '');
    footer?.setAttribute('inert', '');
    const t = setTimeout(() => firstLinkRef.current?.focus(), 30);
    
    return () => {
      clearTimeout(t);
      
      // Remove event listeners
      document.removeEventListener('wheel', preventScroll);
      document.removeEventListener('touchmove', preventTouchMove);
      document.removeEventListener('keydown', preventKeyScroll);
      
      main?.removeAttribute('inert');
      footer?.removeAttribute('inert');
      // Ensure focus restoration happens after a brief delay
      setTimeout(() => {
        prevFocus.current?.focus?.();
      }, 10);
    };
  }, [open]);

  // Focus trap only for anchors (ignore close button per test expectations)
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent): void {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const panel = panelRef.current;
      if (!panel) return;
      const links = Array.from(panel.querySelectorAll<HTMLAnchorElement>('a[href]'));
      if (links.length === 0) return;
      const first = links[0];
      const last = links[links.length - 1];
      if (!first || !last) return;
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const handleLink = useCallback(() => onClose(), [onClose]);

  return (
    <>
      <div
        className={open ? 'nav-overlay open' : 'nav-overlay'}
        aria-hidden="true"
        onClick={open ? onClose : undefined}
        data-test="nav-overlay"
        style={!open ? { display: 'none' } : undefined}
      />
      <div
        id="mobile-nav-panel"
        ref={panelRef}
        className={open ? 'mobile-nav open' : 'mobile-nav'}
        data-test="mobile-panel"
        role={open ? 'dialog' : undefined}
        aria-modal={open ? 'true' : undefined}
        aria-hidden={open ? 'false' : 'true'}
        tabIndex={-1}
      >
        <div className="flex justify-between items-center mb-6">
          <span className="text-xs uppercase tracking-wide opacity-70">Navigate</span>
          <button
            type="button"
            className="menu-close"
            aria-label="Close menu"
            onClick={onClose}
            data-test="menu-close"
            tabIndex={-1}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col gap-4 text-lg font-medium">
          <li>
            <Link ref={firstLinkRef} href="/services" onClick={handleLink} suppressHydrationWarning>
              {t('nav.services') || 'Services'}
            </Link>
          </li>
          <li>
            <Link href="/project-showcase" onClick={handleLink} suppressHydrationWarning>
              {t('nav.caseStudies') || 'Case studies'}
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={handleLink} suppressHydrationWarning>
              {t('nav.about') || 'About'}
            </Link>
          </li>
          <li>
            <Link href="/blog" onClick={handleLink} suppressHydrationWarning>
              {t('nav.blog') || 'Blog'}
            </Link>
          </li>
          <li className="pt-4 border-t border-current/10">
            <button
              type="button"
              onClick={toggleLanguage}
              className="px-4 py-2 rounded-md border border-current/20 hover:border-accent hover:bg-accent/10 transition-colors font-medium text-sm w-full text-left"
              aria-label={`Switch to ${language === 'en' ? 'Lithuanian' : 'English'}`}
              suppressHydrationWarning
            >
              {language === 'en' ? '🇱🇹 Switch to Lithuanian' : '🇬🇧 Switch to English'}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default MobileMenu;
