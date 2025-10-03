'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useCallback, useEffect, type ReactElement } from 'react';
import MobileMenu from './navigation/MobileMenu';

// Concise header + mobile menu toggle (<=60 lines)
export default function HeaderNav(): ReactElement {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((o) => !o), []);
  const close = useCallback(() => setOpen(false), []);
  useEffect(() => {
    function onResize(): void {
      if (window.innerWidth >= 600) setOpen(false);
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return (
    <nav className="container h-14 flex items-center justify-between relative" aria-label="Site header">
      <Link href="/" className="flex items-center" aria-label="Homepage">
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
        <Link href="/services">Services</Link>
        <Link href="/project-showcase">Case studies</Link>
        <Link href="/about">About</Link>
        <Link href="/blog">Blog</Link>
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
