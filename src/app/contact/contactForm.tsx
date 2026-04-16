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
      className="relative isolate min-h-[70vh] overflow-hidden py-16 sm:py-20"
    >
      {/* Dramatic radial purple glow backdrop */}
      <div aria-hidden={true} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[700px] w-[700px] max-w-[100vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(109,40,217,0.25)_0%,rgba(129,140,248,0.08)_40%,transparent_70%)] blur-3xl" />
        <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12)_0%,transparent_65%)] blur-2xl" />
      </div>

      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <ContactHero />

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]">
          <ContactFormCard status={status} error={error} onSubmit={handleSubmit} />
          <ContactDetailsCard />
        </div>
      </div>
    </div>
  );
}
