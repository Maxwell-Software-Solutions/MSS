'use client';
import type { ReactElement } from 'react';
import { useHydratedTranslation } from '@/lib/useHydratedTranslation';
import CTA from '@/app/components/ui/CTA';
import { CheckIcon } from '@/app/components/ui';

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

export default function CaseStudiesPage(): ReactElement {
  const ht = useHydratedTranslation();

  return (
    <>
      <header className="wrap page-head">
        <div className="eyebrow" suppressHydrationWarning>
          {ht('caseStudiesPage.eyebrow', 'Client results')}
        </div>
        <h1 suppressHydrationWarning>Real {ht('caseStudiesPage.title', 'Case Studies')}</h1>
        <p className="lead" suppressHydrationWarning>
          {ht(
            'caseStudiesPage.subtitle',
            'Real engagements with measurable outcomes. Industries include fintech, logistics, and cloud infrastructure.'
          )}
        </p>
      </header>

      <section aria-labelledby="case-studies-heading" className="section">
        <h2 id="case-studies-heading" className="sr-only">
          {ht('caseStudiesPage.title', 'Case Studies')}
        </h2>
        <div className="wrap study-list">
          {STUDIES.map((study) => (
            <article key={study.key} className="study split" aria-labelledby={`study-${study.key}-heading`}>
              <div>
                <span className="study-tag" suppressHydrationWarning>
                  {ht(`caseStudiesPage.${study.key}.tag`, '')}
                </span>
                <h2 id={`study-${study.key}-heading`} suppressHydrationWarning>
                  {ht(`caseStudiesPage.${study.key}.title`, '')}
                </h2>
                <p className="study-client" suppressHydrationWarning>
                  {ht(`caseStudiesPage.${study.key}.clientType`, '')}
                </p>

                <div className="study-metrics">
                  {study.metrics.map((metric) => (
                    <div key={metric.label}>
                      <div className="study-metric-value">{metric.value}</div>
                      <div className="stat-label">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="study-body">
                <div>
                  <h3 suppressHydrationWarning>{ht('caseStudiesPage.challenge', 'Challenge')}</h3>
                  <p suppressHydrationWarning>{ht(`caseStudiesPage.${study.key}.challenge`, '')}</p>
                </div>
                <div>
                  <h3 suppressHydrationWarning>{ht('caseStudiesPage.solution', 'Solution')}</h3>
                  <p suppressHydrationWarning>{ht(`caseStudiesPage.${study.key}.solution`, '')}</p>
                </div>
                <div>
                  <h3 suppressHydrationWarning>{ht('caseStudiesPage.techStack', 'Tech stack')}</h3>
                  <p suppressHydrationWarning>{ht(`caseStudiesPage.${study.key}.tech`, '')}</p>
                </div>
                <div>
                  <h3 suppressHydrationWarning>{ht('caseStudiesPage.results', 'Results')}</h3>
                  <ul className="checks" suppressHydrationWarning>
                    {study.results.map((resultKey) => (
                      <li key={resultKey}>
                        <CheckIcon />
                        <span className="text-foreground">{ht(`caseStudiesPage.${study.key}.${resultKey}`, '')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTA
        title={ht('caseStudiesPage.cta.title', 'Want results like these?')}
        body={ht(
          'caseStudiesPage.cta.body',
          'Every engagement starts with a focused discovery call to understand your context and identify the highest-leverage improvements.'
        )}
        primary={{ href: '/contact', label: ht('caseStudiesPage.cta.primary', 'Book a discovery call') }}
        secondary={{ href: '/services', label: ht('caseStudiesPage.cta.secondary', 'View our services') }}
      />
    </>
  );
}
