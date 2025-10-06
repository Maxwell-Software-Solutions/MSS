import type { ReactElement } from 'react';

export default function ContactHero(): ReactElement {
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">
        We&apos;d love to hear from you
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
        Let&apos;s build something remarkable together
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
        Share a few details about your project and our consultants will reach back within one business day.
      </p>
    </>
  );
}
