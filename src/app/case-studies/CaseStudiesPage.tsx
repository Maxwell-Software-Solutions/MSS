'use client';
import type { ReactElement } from 'react';
import { useHydratedTranslation } from '@/lib/useHydratedTranslation';
import CTA from '@/app/components/ui/CTA';

interface CaseStudy {
  key: 'miau' | 'neonova' | 'fueille';
  accentClass: string;
  results: string[];
  metrics: { value: string; label: string }[];
}

const STUDIES: CaseStudy[] = [
  {
    key: 'miau',
    accentClass: 'from-amber-500/20 to-yellow-500/10',
    results: ['result1', 'result2', 'result3'],
    metrics: [
      { value: '3×', label: 'Faster deploys' },
      { value: '60%', label: 'Less tech debt' },
      { value: '99.9%', label: 'Uptime achieved' },
    ],
  },
  {
    key: 'neonova',
    accentClass: 'from-blue-500/20 to-cyan-500/10',
    results: ['result1', 'result2', 'result3'],
    metrics: [
      { value: '10×', label: 'Throughput gain' },
      { value: '40%', label: 'Cost reduction' },
      { value: '2wk', label: 'Delivery time' },
    ],
  },
  {
    key: 'fueille',
    accentClass: 'from-emerald-500/20 to-teal-500/10',
    results: ['result1', 'result2', 'result3'],
    metrics: [
      { value: '5×', label: 'API performance' },
      { value: '80%', label: 'Fewer incidents' },
      { value: '€0', label: 'Downtime cost' },
    ],
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
        <div className="eyebrow mb-4" suppressHydrationWarning>
          {ht('caseStudiesPage.eyebrow', 'Client results')}
        </div>
        <h1
          className="max-w-3xl"
          suppressHydrationWarning
        >
          Real{' '}
          <span>
            {ht('caseStudiesPage.title', 'Case Studies')}
          </span>
        </h1>
        <p
          className="lead mt-6 max-w-2xl"
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
          {STUDIES.map((study, i) => (
            <article key={study.key} className="card overflow-hidden" aria-labelledby={`study-${study.key}-heading`}>
              {/* Top accent bar */}
              <div className={`h-1 w-full ${study.accentClass}`} aria-hidden="true" />

              <div className="p-8 sm:p-10 md:p-12">
                {/* Tag + Title */}
                <div className="mb-6">
                  <span
                    className="inline-block text-xs font-semibold text-accent mb-3"
                    suppressHydrationWarning
                  >
                    {ht(`caseStudiesPage.${study.key}.tag`, '')}
                  </span>
                  <h2
                    id={`study-${study.key}-heading`}
                    className="text-2xl sm:text-3xl tracking-tight leading-snug"
                    suppressHydrationWarning
                  >
                    {ht(`caseStudiesPage.${study.key}.title`, '')}
                  </h2>
                  <p className="mt-2 text-sm text-muted" suppressHydrationWarning>
                    {ht(`caseStudiesPage.${study.key}.clientType`, '')}
                  </p>
                </div>

                {/* Metric badges */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {study.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="inline-flex min-w-[88px] flex-col items-start rounded-lg border border-border bg-wash px-4 py-2.5"
                    >
                      <span className="text-xl font-semibold leading-none tabular-nums">{metric.value}</span>
                      <span className="mt-1 text-xs text-muted">{metric.label}</span>
                    </div>
                  ))}
                </div>

                {/* Content grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                  {/* Left: Challenge + Solution */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-2 text-sm font-medium text-muted" suppressHydrationWarning>
                        {ht('caseStudiesPage.challenge', 'Challenge')}
                      </h3>
                      <p className="text-[0.9375rem] leading-relaxed text-foreground" suppressHydrationWarning>
                        {ht(`caseStudiesPage.${study.key}.challenge`, '')}
                      </p>
                    </div>
                    <div>
                      <h3 className="mb-2 text-sm font-medium text-muted" suppressHydrationWarning>
                        {ht('caseStudiesPage.solution', 'Solution')}
                      </h3>
                      <p className="text-[0.9375rem] leading-relaxed text-foreground" suppressHydrationWarning>
                        {ht(`caseStudiesPage.${study.key}.solution`, '')}
                      </p>
                    </div>
                  </div>

                  {/* Right: Tech stack + Results */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-2 text-sm font-medium text-muted" suppressHydrationWarning>
                        {ht('caseStudiesPage.techStack', 'Tech stack')}
                      </h3>
                      <p className="text-[13px] font-mono text-secondary leading-relaxed" suppressHydrationWarning>
                        {ht(`caseStudiesPage.${study.key}.tech`, '')}
                      </p>
                    </div>
                    <div>
                      <h3 className="mb-3 text-sm font-medium text-muted" suppressHydrationWarning>
                        {ht('caseStudiesPage.results', 'Results')}
                      </h3>
                      <ul className="space-y-2" suppressHydrationWarning>
                        {study.results.map((resultKey) => (
                          <li key={resultKey} className="flex items-start gap-2">
                            <CheckIcon />
                            <span className="text-[0.9375rem] font-medium text-foreground">
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
