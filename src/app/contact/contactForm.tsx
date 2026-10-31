// app/contact/page.tsx
'use client';

import { useEffect, useRef, type ReactNode } from 'react';

import ContactDetailsCard from './ContactDetailsCard';
import ContactFormCard from './ContactFormCard';
import ContactHero from './ContactHero';
import { useContactForm } from './useContactForm';

export default function ContactForm(): ReactNode {
  const { status, error, handleSubmit } = useContactForm();
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const root = rootRef.current;
      if (!root) return;

      console.log('[ContactForm] client DOM snapshot (first 2 children):', {
        firstChildTag: root.firstElementChild?.tagName,
        secondChildTag: root.firstElementChild?.nextElementSibling?.tagName,
        innerStart: root.innerHTML?.slice?.(0, 300),
      });
    } catch (e) {
      console.error('[ContactForm] debug snapshot failed', e);
    }
  }, []);

  return (
    <div ref={rootRef} role="region" aria-label="Contact form" className="relative isolate">
      <div className="wrap page-head">
        <ContactHero />
      </div>

      <div className="section">
        <div className="wrap split">
          <ContactFormCard status={status} error={error} onSubmit={handleSubmit} />
          <ContactDetailsCard />
        </div>
      </div>
    </div>
  );
}
