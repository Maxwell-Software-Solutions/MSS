'use client';

import type { ReactElement } from 'react';
import Link from 'next/link';
import { useHydratedTranslation } from '@/lib/useHydratedTranslation';

function CheckIcon(): ReactElement {
  return (
    <svg
      className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function HireDeveloperPage(): ReactElement {
  const ht = useHydratedTranslation();

  const reasons = [
    {
      title: ht('hireDev.reason1.title', 'Start in days, not months'),
      body: ht('hireDev.reason1.body', 'Skip the 3-month hiring pipeline. Our senior engineers are available to start within 1-2 weeks of signing.'),
    },
    {
      title: ht('hireDev.reason2.title', 'Senior-level from day one'),
      body: ht('hireDev.reason2.body', 'No juniors, no ramp-up. Every engineer has 5+ years of production experience and a track record of shipping.'),
    },
    {
      title: ht('hireDev.reason3.title', 'No recruitment fees'),
      body: ht('hireDev.reason3.body', 'Hiring agencies charge 20-30% of annual salary. With us, you pay for engineering output — not a finder\'s fee.'),
    },
    {
      title: ht('hireDev.reason4.title', 'Flexible commitment'),
      body: ht('hireDev.reason4.body', 'Scale up or down month-to-month. No long-term lock-in. Pause or stop when the project is done.'),
    },
  ];

  const techStack = [
    'React', 'Next.js', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'CI/CD', 'PostgreSQL',
  ];

  const engagements = [
    {
      name: ht('hireDev.engagement1.name', 'Sprint-in-a-Box'),
      price: ht('hireDev.engagement1.price', '€4,800'),
      period: ht('hireDev.engagement1.period', 'fixed price'),
      description: ht('hireDev.engagement1.desc', 'A focused 2-week delivery sprint. Ideal for MVPs, proof-of-concepts, or shipping a specific feature fast.'),
      href: '/start-a-sprint',
    },
    {
      name: ht('hireDev.engagement2.name', 'Engineering Partner Retainer'),
      price: ht('hireDev.engagement2.price', '€3,500–€6,500'),
      period: ht('hireDev.engagement2.period', '/month'),
      description: ht('hireDev.engagement2.desc', 'A dedicated senior engineer, 3-5 days per week. Ongoing delivery, code review, architecture guidance, and async access.'),
      href: '/contact',
    },
  ];

  return (
    <>
      {/* Hero */}
      <header className="max-w-5xl mx-auto px-6 sm:px-10 pt-16 sm:pt-20 pb-6">
        <p className="tracking-wide text-[13px] text-slate-500 dark:text-slate-400 mb-3 uppercase" suppressHydrationWarning>
          {ht('hireDev.eyebrow', 'Hire a Developer')}
        </p>
        <h1
          className="font-semibold leading-[1.1] max-w-3xl text-[clamp(34px,3.4vw,52px)]"
          suppressHydrationWarning
        >
          {ht('hireDev.headline', 'Hire a Senior Developer — Without the 3-Month Hiring Process')}
        </h1>
        <p className="mt-5 max-w-2xl text-base md:text-lg leading-[1.65] text-[--muted]" suppressHydrationWarning>
          {ht(
            'hireDev.subheadline',
            'Outsource development to senior engineers in Lithuania and Europe. Start shipping production-ready code in days — not months.'
          )}
        </p>

        <div className="mt-8 flex flex-wrap gap-4 items-center">
          <Link
            href="https://calendly.com/maxwellsoftwaresolutions/discovery"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl px-7 py-3.5 text-sm font-semibold hover:bg-accent/90 transition-all shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent/60"
            target="_blank"
            rel="noopener noreferrer"
            suppressHydrationWarning
          >
            {ht('hireDev.cta.primary', 'Book a discovery call')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
          <Link
            href="/services/packages"
            className="text-[14px] font-medium text-foreground/70 hover:text-foreground transition-colors underline underline-offset-2"
            suppressHydrationWarning
          >
            {ht('hireDev.cta.compare', 'Compare all packages')}
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          {[
            ht('hireDev.trust.start', 'Start in 1-2 weeks'),
            ht('hireDev.trust.senior', '5+ years experience'),
            ht('hireDev.trust.flex', 'No long-term contract'),
          ].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 text-[12px] text-foreground/65"
              suppressHydrationWarning
            >
              <CheckIcon />
              {item}
            </span>
          ))}
        </div>
      </header>

      {/* Why outsource to MSS */}
      <section aria-labelledby="reasons-heading" className="py-12 sm:py-16 bg-card/30">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <h2
            id="reasons-heading"
            className="text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.25] tracking-tight mb-8"
            suppressHydrationWarning
          >
            {ht('hireDev.reasons.heading', 'Why outsource to MSS')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" suppressHydrationWarning>
            {reasons.map((item, i) => (
              <div key={i} className="rounded-2xl border border-border bg-background/50 p-6">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-[14px] text-foreground/75 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section aria-labelledby="stack-heading" className="py-12 sm:py-16 max-w-5xl mx-auto px-6 sm:px-10">
        <h2
          id="stack-heading"
          className="text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.25] tracking-tight mb-6"
          suppressHydrationWarning
        >
          {ht('hireDev.stack.heading', 'Tech stack')}
        </h2>
        <p className="text-[15px] text-foreground/70 mb-6" suppressHydrationWarning>
          {ht('hireDev.stack.body', 'Our engineers specialise in the modern web stack. If your project uses these technologies, we can hit the ground running.')}
        </p>
        <div className="flex flex-wrap gap-3" suppressHydrationWarning>
          {techStack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-full bg-accent/10 text-accent text-[13px] font-semibold px-4 py-2"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Engagement models */}
      <section aria-labelledby="engagements-heading" className="py-12 sm:py-16 bg-card/30">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <h2
            id="engagements-heading"
            className="text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.25] tracking-tight mb-8"
            suppressHydrationWarning
          >
            {ht('hireDev.engagements.heading', 'Engagement models')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" suppressHydrationWarning>
            {engagements.map((eng) => (
              <div key={eng.name} className="flex flex-col rounded-3xl border border-border bg-background/50 p-7 sm:p-8 h-full">
                <h3 className="text-lg font-bold tracking-tight">{eng.name}</h3>
                <div className="mt-2.5 flex items-end gap-2">
                  <span className="text-2xl sm:text-3xl font-bold">{eng.price}</span>
                  {eng.period && <span className="text-sm text-foreground/60 mb-0.5">{eng.period}</span>}
                </div>
                <p className="mt-3 text-[14px] text-foreground/75 leading-relaxed flex-1">{eng.description}</p>
                <Link
                  href={eng.href}
                  className="mt-6 w-full text-center rounded-xl px-5 py-3 text-sm font-semibold border border-accent/40 text-accent hover:bg-accent/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent/60"
                  suppressHydrationWarning
                >
                  {ht('hireDev.engagements.cta', 'Learn more')}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-14 sm:py-20 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4" suppressHydrationWarning>
          {ht('hireDev.bottomcta.title', 'Ship faster with senior engineers.')}
        </h2>
        <p className="text-[15px] text-foreground/70 max-w-lg mx-auto mb-7" suppressHydrationWarning>
          {ht(
            'hireDev.bottomcta.body',
            'No recruitment fees. No ramp-up. Production-ready code from senior engineers who have shipped before.'
          )}
        </p>
        <Link
          href="https://calendly.com/maxwellsoftwaresolutions/discovery"
          className="inline-flex items-center gap-2 bg-accent text-white rounded-xl px-8 py-4 text-base font-semibold hover:bg-accent/90 transition-all shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent/60"
          target="_blank"
          rel="noopener noreferrer"
          suppressHydrationWarning
        >
          {ht('hireDev.bottomcta.cta', 'Book a discovery call')}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </Link>
      </div>
    </>
  );
}
