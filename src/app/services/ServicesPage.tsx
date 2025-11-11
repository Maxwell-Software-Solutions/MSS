'use client';
import type { ReactElement } from 'react';
import { services } from './services-data';
import { processSteps } from './process-data';
import ServiceCard from '@/app/components/ui/ServiceCard';
import ProcessTimeline from '@/app/components/ui/ProcessTimeline';
import CTA from '@/app/components/ui/CTA';
import { useHydratedTranslation } from '@/lib/useHydratedTranslation';

// Premium Services & Process page implementation.
// Applies: unified spacing rhythm, typography clamps, consistent cards, guided timeline, CTA band.
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
    <main className="min-h-screen font-sans">
      {/* Hero */}
      <header className="max-w-7xl mx-auto px-6 sm:px-10 pt-16 sm:pt-20 pb-6">
        <p className="tracking-wide text-[13px] text-slate-500 dark:text-slate-400 mb-3" suppressHydrationWarning>
          {ht('services.hero.eyebrow', 'Our Services')}
        </p>
        <h1 className="font-semibold leading-[1.1] max-w-3xl text-[clamp(36px,3.6vw,56px)]" suppressHydrationWarning>
          {ht('services.hero.title', 'Engineering Quality at Scale')}
        </h1>
        <p className="mt-6 max-w-3xl text-base md:text-lg leading-[1.6] text-[--muted]" suppressHydrationWarning>
          {ht(
            'services.hero.subtitle',
            'Code quality audits, reliability engineering, testing strategy, and CI/CD hardening.'
          )}
        </p>
        <p className="mt-4 max-w-3xl text-base leading-[1.6] text-[--muted]" suppressHydrationWarning>
          {ht(
            'services.hero.description',
            'We embed with your team to reduce defect rates, improve deployment confidence, and accelerate delivery through systematic engineering practices.'
          )}
        </p>
        <p className="mt-3 max-w-2xl text-sm text-[--muted]" suppressHydrationWarning>
          {ht('services.hero.note', 'All engagements include measurable outcomes and knowledge transfer.')}
        </p>
      </header>

      {/* Services Section */}
      <section aria-labelledby="services-heading" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col gap-6 md:gap-8">
          <div>
            <h2
              id="services-heading"
              className="text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.25] tracking-tight max-w-3xl"
              suppressHydrationWarning
            >
              {ht('services.heading', 'Services')}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed max-w-3xl text-[--muted]" suppressHydrationWarning>
              {ht(
                'services.description',
                'Deep focus on software quality, sustainable velocity, and operational excellence.'
              )}
            </p>
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 auto-rows-fr gap-6 md:gap-8"
            suppressHydrationWarning
          >
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

      {/* Process Timeline */}
      <section aria-labelledby="process-heading" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col gap-6 md:gap-8">
          <div>
            <h2
              id="process-heading"
              className="text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.25] tracking-tight max-w-3xl"
              suppressHydrationWarning
            >
              {ht('services.process.heading', 'Our Process')}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed max-w-3xl text-[--muted]" suppressHydrationWarning>
              {ht('services.process.description', 'A systematic approach to improving code quality and team velocity.')}
            </p>
          </div>
          <div suppressHydrationWarning>
            <ProcessTimeline steps={steps} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pb-16 sm:pb-20" suppressHydrationWarning>
        <CTA
          title={ht('services.cta.title', 'Ready to Improve Your Code Quality?')}
          body={ht(
            'services.cta.body',
            'Let us help you reduce defects, improve velocity, and build confidence in your deployments.'
          )}
          primary={{ href: '/contact', label: ht('services.cta.primary', 'Start a Conversation') }}
          secondary={{ href: '/project-showcase', label: ht('services.cta.secondary', 'View Case Studies') }}
        />
      </div>
    </main>
  );
}
