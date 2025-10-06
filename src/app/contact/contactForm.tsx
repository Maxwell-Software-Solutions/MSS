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
    <div
      ref={rootRef}
      role="region"
      aria-label="Contact form"
      className="relative isolate min-h-[70vh] overflow-hidden bg-slate-950/5 py-16 sm:py-20"
    >
      <div aria-hidden={true} className="pointer-events-none absolute inset-0 -z-10">
        <div className="mx-auto h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_70%)] opacity-20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <ContactHero />

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]">
          <ContactFormCard status={status} error={error} onSubmit={handleSubmit} />
          <ContactDetailsCard />
        </div>
      </div>
    </div>
  );
}
