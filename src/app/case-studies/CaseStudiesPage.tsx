'use client';
import type { ReactElement } from 'react';
import { useHydratedTranslation } from '@/lib/useHydratedTranslation';
import CTA from '@/app/components/ui/CTA';

interface CaseStudy {
  key: 'miau' | 'neonova' | 'fueille';
  accentClass: string;
  results: string[];
}

const STUDIES: CaseStudy[] = [
  {
    key: 'miau',
    accentClass: 'from-amber-500/10 to-yellow-500/5',
    results: ['result1', 'result2', 'result3'],
  },
  {
    key: 'neonova',
    accentClass: 'from-blue-500/10 to-cyan-500/5',
    results: ['result1', 'result2', 'result3'],
  },
  {
    key: 'fueille',
    accentClass: 'from-emerald-500/10 to-teal-500/5',
    results: ['result1', 'result2', 'result3'],
  },
];

function CheckIcon(): ReactElement {
  return (
    <svg
      className="w-4 h-4 text-accent flex-shrink-0 mt-0.5"
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

export default function CaseStudiesPage(): ReactElement {
  const ht = useHydratedTranslation();

  return (
    <>
      {/* Hero */}
      <header className="max-w-6xl mx-auto px-6 sm:px-10 pt-20 sm:pt-24 pb-10">
        <p
          className="tracking-wide text-[13px] text-slate-500 dark:text-slate-400 mb-3 uppercase"
          suppressHydrationWarning
        >
          {ht('caseStudiesPage.eyebrow', 'Client results')}
        </p>
        <h1
          className="font-semibold leading-[1.1] max-w-3xl text-[clamp(36px,3.6vw,56px)]"
          suppressHydrationWarning
        >
          {ht('caseStudiesPage.title', 'Case Studies')}
        </h1>
        <p
          className="mt-6 max-w-3xl text-base md:text-lg leading-[1.6] text-[--muted]"
          suppressHydrationWarning
        >
          {ht(
            'caseStudiesPage.subtitle',
            'Real engagements with measurable outcomes. Industries include fintech, logistics, and cloud infrastructure.'
          )}
        </p>
      </header>

      {/* Case Studies */}
      <section aria-labelledby="case-studies-heading" className="py-16 sm:py-20">
        <h2 id="case-studies-heading" className="sr-only">
          {ht('caseStudiesPage.title', 'Case Studies')}
        </h2>
        <div className="max-w-6xl mx-auto px-6 sm:px-10 flex flex-col gap-10 md:gap-14">
          {STUDIES.map((study) => (
            <article
              key={study.key}
              className="neuro-card shadow-soft rounded-3xl border bg-card/95 backdrop-blur-xl overflow-hidden"
              aria-labelledby={`study-${study.key}-heading`}
            >
              {/* Top accent bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${study.accentClass} opacity-60`} aria-hidden="true" />

              <div className="p-8 sm:p-10 md:p-12">
                {/* Tag + Title */}
                <div className="mb-6">
                  <span
                    className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-3"
                    suppressHydrationWarning
                  >
                    {ht(`caseStudiesPage.${study.key}.tag`, '')}
                  </span>
                  <h2
                    id={`study-${study.key}-heading`}
                    className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug"
                    suppressHydrationWarning
                  >
                    {ht(`caseStudiesPage.${study.key}.title`, '')}
                  </h2>
                  <p className="mt-2 text-sm text-foreground/60" suppressHydrationWarning>
                    {ht(`caseStudiesPage.${study.key}.clientType`, '')}
                  </p>
                </div>

                {/* Content grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                  {/* Left: Challenge + Solution */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground/50 mb-2" suppressHydrationWarning>
                        {ht('caseStudiesPage.challenge', 'Challenge')}
                      </h3>
                      <p className="text-[15px] leading-relaxed text-foreground/80" suppressHydrationWarning>
                        {ht(`caseStudiesPage.${study.key}.challenge`, '')}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground/50 mb-2" suppressHydrationWarning>
                        {ht('caseStudiesPage.solution', 'Solution')}
                      </h3>
                      <p className="text-[15px] leading-relaxed text-foreground/80" suppressHydrationWarning>
                        {ht(`caseStudiesPage.${study.key}.solution`, '')}
                      </p>
                    </div>
                  </div>

                  {/* Right: Tech stack + Results */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground/50 mb-2" suppressHydrationWarning>
                        {ht('caseStudiesPage.techStack', 'Tech stack')}
                      </h3>
                      <p className="text-[13px] font-mono text-foreground/70 leading-relaxed" suppressHydrationWarning>
                        {ht(`caseStudiesPage.${study.key}.tech`, '')}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground/50 mb-3" suppressHydrationWarning>
                        {ht('caseStudiesPage.results', 'Results')}
                      </h3>
                      <ul className="space-y-2" suppressHydrationWarning>
                        {study.results.map((resultKey) => (
                          <li key={resultKey} className="flex items-start gap-2">
                            <CheckIcon />
                            <span className="text-[15px] font-medium text-foreground/85">
                              {ht(`caseStudiesPage.${study.key}.${resultKey}`, '')}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 pb-20 sm:pb-24" suppressHydrationWarning>
        <CTA
          title={ht('caseStudiesPage.cta.title', 'Want results like these?')}
          body={ht(
            'caseStudiesPage.cta.body',
            'Every engagement starts with a focused discovery call to understand your context and identify the highest-leverage improvements.'
          )}
          primary={{ href: '/contact', label: ht('caseStudiesPage.cta.primary', 'Book a discovery call') }}
          secondary={{ href: '/services', label: ht('caseStudiesPage.cta.secondary', 'View our services') }}
        />
      </div>
    </>
  );
}
