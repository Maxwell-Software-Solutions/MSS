'use client';
import type { ReactElement } from 'react';
import { services } from './services-data';
import { processSteps } from './process-data';
import ServiceCard from '@/app/components/ui/ServiceCard';
import ProcessTimeline from '@/app/components/ui/ProcessTimeline';
import CTA from '@/app/components/ui/CTA';
import { useLanguage } from '@/lib/LanguageContext';

// Premium Services & Process page implementation.
// Applies: unified spacing rhythm, typography clamps, consistent cards, guided timeline, CTA band.
export default function ServicesPage(): ReactElement {
  const { t } = useLanguage();

  const mappedServices = services.map((s) => ({
    key: s.key,
    title: t(`services.${s.key}.title`) === `services.${s.key}.title` ? s.title : t(`services.${s.key}.title`),
    summary: t(`services.${s.key}.body`) === `services.${s.key}.body` ? s.body : t(`services.${s.key}.body`),
    imageAlt: s.alt,
    meta: t(`services.${s.key}.tagline`) === `services.${s.key}.tagline` ? s.tagline : t(`services.${s.key}.tagline`),
    tone: s.featured ? 'accent' : 'default',
  }));

  const steps = processSteps.map((p) => ({
    title:
      t(`services.process.${p.title.toLowerCase()}.title`) === `services.process.${p.title.toLowerCase()}.title`
        ? p.title
        : t(`services.process.${p.title.toLowerCase()}.title`),
    desc:
      t(`services.process.${p.title.toLowerCase()}.body`) === `services.process.${p.title.toLowerCase()}.body`
        ? p.text
        : t(`services.process.${p.title.toLowerCase()}.body`),
  }));

  return (
    <main className="min-h-screen font-sans">
      {/* Hero */}
      <header className="max-w-6xl mx-auto px-6 md:px-8 pt-16 pb-4">
        <p className="tracking-wide text-[13px] text-slate-500 dark:text-slate-400 mb-3" suppressHydrationWarning>
          {t('services.hero.eyebrow') === 'services.hero.eyebrow' ? 'Our Services' : t('services.hero.eyebrow')}
        </p>
        <h1 className="font-semibold leading-[1.1] max-w-3xl text-[clamp(36px,3.6vw,56px)]" suppressHydrationWarning>
          {t('services.hero.title') === 'services.hero.title'
            ? 'Engineering Quality at Scale'
            : t('services.hero.title')}
        </h1>
        <p className="mt-6 max-w-3xl text-base md:text-lg leading-[1.6] text-[--muted]" suppressHydrationWarning>
          {t('services.hero.subtitle') === 'services.hero.subtitle'
            ? 'Code quality audits, reliability engineering, testing strategy, and CI/CD hardening.'
            : t('services.hero.subtitle')}
        </p>
        <p className="mt-4 max-w-3xl text-base leading-[1.6] text-[--muted]" suppressHydrationWarning>
          {t('services.hero.description') === 'services.hero.description'
            ? 'We embed with your team to reduce defect rates, improve deployment confidence, and accelerate delivery through systematic engineering practices.'
            : t('services.hero.description')}
        </p>
        <p className="mt-3 max-w-2xl text-sm text-[--muted]" suppressHydrationWarning>
          {t('services.hero.note') === 'services.hero.note'
            ? 'All engagements include measurable outcomes and knowledge transfer.'
            : t('services.hero.note')}
        </p>
      </header>

      {/* Services Section */}
      <section aria-labelledby="services-heading" className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8 flex flex-col gap-6 md:gap-8">
          <div>
            <h2
              id="services-heading"
              className="text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.25] tracking-tight max-w-3xl"
              suppressHydrationWarning
            >
              {t('services.heading') === 'services.heading' ? 'Services' : t('services.heading')}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed max-w-3xl text-[--muted]" suppressHydrationWarning>
              {t('services.description') === 'services.description'
                ? 'Deep focus on software quality, sustainable velocity, and operational excellence.'
                : t('services.description')}
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
      <section aria-labelledby="process-heading" className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8 flex flex-col gap-6 md:gap-8">
          <div>
            <h2
              id="process-heading"
              className="text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.25] tracking-tight max-w-3xl"
              suppressHydrationWarning
            >
              {t('services.process.heading') === 'services.process.heading'
                ? 'Our Process'
                : t('services.process.heading')}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed max-w-3xl text-[--muted]" suppressHydrationWarning>
              {t('services.process.description') === 'services.process.description'
                ? 'A systematic approach to improving code quality and team velocity.'
                : t('services.process.description')}
            </p>
          </div>
          <div suppressHydrationWarning>
            <ProcessTimeline steps={steps} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="max-w-6xl mx-auto px-6 md:px-8 pb-20" suppressHydrationWarning>
        <CTA
          title={
            t('services.cta.title') === 'services.cta.title'
              ? 'Ready to Improve Your Code Quality?'
              : t('services.cta.title')
          }
          body={
            t('services.cta.body') === 'services.cta.body'
              ? 'Let us help you reduce defects, improve velocity, and build confidence in your deployments.'
              : t('services.cta.body')
          }
          primary={{
            href: '/contact',
            label:
              t('services.cta.primary') === 'services.cta.primary' ? 'Start a Conversation' : t('services.cta.primary'),
          }}
          secondary={{
            href: '/project-showcase',
            label:
              t('services.cta.secondary') === 'services.cta.secondary'
                ? 'View Case Studies'
                : t('services.cta.secondary'),
          }}
        />
      </div>
    </main>
  );
}
