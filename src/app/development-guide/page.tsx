import type { Metadata } from 'next';
import type { ReactElement } from 'react';

export const metadata: Metadata = {
  title: 'Reliability Playbook — Maxwell Software Solutions',
  description: 'Checklists and templates for quality and reliability.',
};

export default function PlaybookPage(): ReactElement {
  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-10 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold">Reliability Playbook</h1>
      <p className="mt-3 text-foreground/80">
        A practical collection of checklists and templates: code review, test pyramid, SLOs, and incident response.
      </p>
      <div className="mt-8">
        <a className="rounded-md px-5 py-3 bg-foreground text-background text-sm font-medium" href="/contact">
          Get the PDF
        </a>
      </div>
    </div>
  );
}
