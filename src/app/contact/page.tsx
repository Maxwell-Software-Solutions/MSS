import type { Metadata } from 'next';
import type { ReactElement } from 'react';

export const metadata: Metadata = {
  title: 'Contact — Maxwell Software Solutions',
  description: 'Request a code audit or book a consultation.',
};

export default function ContactPage(): ReactElement {
  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-10 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold">Contact</h1>
      <p className="mt-3 text-foreground/80">
        Tell us about your project goals, stack, and timeline. We typically reply within one business day.
      </p>

      <div className="mt-8 space-y-3 text-sm">
        <a
          className="rounded-md inline-block px-5 py-3 bg-foreground text-background font-medium"
          href="mailto:hello@maxwell.software?subject=Code%20Audit%20Request"
        >
          Email: hello@maxwell.software
        </a>
        <div>Prefer a call? Add your scheduling link here and we’ll embed it.</div>
      </div>
    </div>
  );
}
