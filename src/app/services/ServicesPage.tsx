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
      {/* Hero */}
      <header className="max-w-6xl mx-auto px-6 sm:px-10 pt-20 sm:pt-24 pb-10">
        <div className="eyebrow mb-4" suppressHydrationWarning>
          {ht('services.hero.eyebrow', 'Our Services')}
        </div>
        <h1
          className="max-w-3xl"
          suppressHydrationWarning
        >
          Engineering{' '}
          <span>
            Quality
          </span>{' '}
          at Scale
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-foreground/70 max-w-2xl" suppressHydrationWarning>
          {ht(
            'services.hero.subtitle',
            'Code quality audits, reliability engineering, testing strategy, and CI/CD hardening.'
          )}
        </p>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/60" suppressHydrationWarning>
          {ht(
            'services.hero.description',
            'We embed with your team to reduce defect rates, improve deployment confidence, and accelerate delivery through systematic engineering practices.'
          )}
        </p>
        <p className="mt-3 max-w-2xl text-sm text-muted" suppressHydrationWarning>
          {ht('services.hero.note', 'All engagements include measurable outcomes and knowledge transfer.')}
        </p>
      </header>

      {/* Services Section */}
      <section aria-labelledby="services-heading" className="max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <div className="mb-10">
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl tracking-tight max-w-3xl"
            suppressHydrationWarning
          >
            {ht('services.heading', 'Services')}
          </h2>
          <p className="mt-3 text-base leading-relaxed max-w-3xl text-foreground/60" suppressHydrationWarning>
            {ht(
              'services.description',
              'Deep focus on software quality, sustainable velocity, and operational excellence.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 auto-rows-fr gap-6 md:gap-8" suppressHydrationWarning>
          {mappedServices.map((svc) => (
            <div key={svc.key} className="h-full">
              <ServiceCard
                title={svc.title}
                summary={svc.summary}
                imageAlt={svc.imageAlt}
                meta={svc.meta}
                tone={svc.tone as 'default' | 'accent'}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Process Timeline */}
      <section
        aria-labelledby="process-heading"
        className="border-t border-border max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-20"
      >
        <div className="mb-10">
          <h2
            id="process-heading"
            className="text-3xl sm:text-4xl tracking-tight max-w-3xl"
            suppressHydrationWarning
          >
            {ht('services.process.heading', 'Our')}{' '}
            <span>
              Process
            </span>
          </h2>
          <p className="mt-3 text-base leading-relaxed max-w-3xl text-foreground/60" suppressHydrationWarning>
            {ht('services.process.description', 'A systematic approach to improving code quality and team velocity.')}
          </p>
        </div>
        <ProcessTimeline steps={steps} />
      </section>

      {/* CTA */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 pb-20 sm:pb-24" suppressHydrationWarning>
        <div className="band band-split p-8 sm:p-12">
          <h2 className="text-3xl sm:text-4xl tracking-tight mb-4" suppressHydrationWarning>
            {ht('services.cta.title', 'Ready to Improve Your')}
            {' '}
            <span>
              Code Quality?
            </span>
          </h2>
          <p className="mt-2 text-base leading-relaxed text-foreground/70 max-w-xl" suppressHydrationWarning>
            {ht(
              'services.cta.body',
              'Let us help you reduce defects, improve velocity, and build confidence in your deployments.'
            )}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="btn btn-accent"
            >
              {ht('services.cta.primary', 'Start a Conversation')}
            </Link>
            <Link
              href="/project-showcase"
              className="btn"
            >
              {ht('services.cta.secondary', 'View Case Studies')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
