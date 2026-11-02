'use client';
import type { ReactElement } from 'react';
import Link from 'next/link';
import { services } from './services-data';
import { processSteps } from './process-data';
import ServiceCard from '@/app/components/ui/ServiceCard';
import ProcessTimeline from '@/app/components/ui/ProcessTimeline';
import { useHydratedTranslation } from '@/lib/useHydratedTranslation';

export default function ServicesPage(): ReactElement {
  const ht = useHydratedTranslation();

  const mappedServices = services.map((s) => ({
    key: s.key,
    title: ht(`services.${s.key}.title`, s.title),
    summary: ht(`services.${s.key}.body`, s.body),
    imageAlt: s.alt,
    meta: ht(`services.${s.key}.tagline`, s.tagline),
    tone: s.featured ? 'accent' : 'default',
  }));

  const steps = processSteps.map((p) => ({
    title: ht(`services.process.${p.title.toLowerCase()}.title`, p.title),
    desc: ht(`services.process.${p.title.toLowerCase()}.body`, p.text),
  }));

  return (
    <>
      <header className="wrap page-head">
        <div className="eyebrow" suppressHydrationWarning>
          {ht('services.hero.eyebrow', 'Our Services')}
        </div>
        <h1 suppressHydrationWarning>Engineering Quality at Scale</h1>
        <p className="lead" suppressHydrationWarning>
          {ht(
            'services.hero.subtitle',
            'Code quality audits, reliability engineering, testing strategy, and CI/CD hardening.'
          )}
        </p>
        <p suppressHydrationWarning>
          {ht(
            'services.hero.description',
            'We embed with your team to reduce defect rates, improve deployment confidence, and accelerate delivery through systematic engineering practices.'
          )}
        </p>
        <p suppressHydrationWarning>
          {ht('services.hero.note', 'All engagements include measurable outcomes and knowledge transfer.')}
        </p>
      </header>

      <section aria-labelledby="services-heading" className="section">
        <div className="wrap">
          <div className="section-head section-head-split">
            <h2 id="services-heading" suppressHydrationWarning>
              {ht('services.heading', 'Services')}
            </h2>
            <p className="lead" suppressHydrationWarning>
              {ht(
                'services.description',
                'Deep focus on software quality, sustainable velocity, and operational excellence.'
              )}
            </p>
          </div>

          <div className="columns columns-3" suppressHydrationWarning>
            {mappedServices.map((svc) => (
              <ServiceCard
                key={svc.key}
                title={svc.title}
                summary={svc.summary}
                imageAlt={svc.imageAlt}
                meta={svc.meta}
                tone={svc.tone as 'default' | 'accent'}
              />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="process-heading" className="section section-tone">
        <div className="wrap">
          <div className="section-head section-head-split">
            <h2 id="process-heading" suppressHydrationWarning>
              {ht('services.process.heading', 'Our process')}
            </h2>
            <p className="lead" suppressHydrationWarning>
              {ht('services.process.description', 'A systematic approach to improving code quality and team velocity.')}
            </p>
          </div>
          <ProcessTimeline steps={steps} />
        </div>
      </section>

      <section className="band" suppressHydrationWarning>
        <div className="wrap band-split">
          <h2 suppressHydrationWarning>
            {ht('services.cta.title', 'Book a discovery call')}
          </h2>
          <p suppressHydrationWarning>
            {ht(
              'services.cta.body',
              'Let us help you reduce defects, improve velocity, and build confidence in your deployments.'
            )}
          </p>
          <div className="band-actions">
            <Link href="/contact" className="btn btn-accent btn-lg">
              {ht('services.cta.primary', 'Start a Conversation')}
            </Link>
            <Link href="/project-showcase" className="btn btn-lg">
              {ht('services.cta.secondary', 'View Case Studies')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
