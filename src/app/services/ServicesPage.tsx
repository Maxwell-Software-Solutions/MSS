"use client";
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
    title: t(`services.${s.key}.title`),
    summary: t(`services.${s.key}.body`),
    imageAlt: s.alt,
    meta: t(`services.${s.key}.tagline`),
    tone: s.featured ? 'accent' : 'default',
  }));
  
  const steps = processSteps.map((p) => ({ 
    title: t(`services.process.${p.title.toLowerCase()}.title`), 
    desc: t(`services.process.${p.title.toLowerCase()}.body`) 
  }));

  return (
    <main className="min-h-screen font-sans">
      {/* Hero */}
      <header className="max-w-7xl mx-auto px-6 md:px-8 pt-16 pb-4">
        <p className="tracking-wide text-[13px] text-slate-500 dark:text-slate-400 mb-3">{t('services.hero.eyebrow')}</p>
        <h1 className="font-semibold leading-[1.1] max-w-3xl text-[clamp(36px,3.6vw,56px)]">{t('services.hero.title')}</h1>
        <p className="mt-6 max-w-3xl text-base md:text-lg leading-[1.6] text-[--muted]">
          {t('services.hero.subtitle')}
        </p>
        <p className="mt-4 max-w-3xl text-base leading-[1.6] text-[--muted]">
          {t('services.hero.description')}
        </p>
        <p className="mt-3 max-w-2xl text-sm text-[--muted]">
          {t('services.hero.note')}
        </p>
      </header>

      {/* Services Section */}
      <section aria-labelledby="services-heading" className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col gap-6 md:gap-8">
          <div>
            <h2
              id="services-heading"
              className="text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.25] tracking-tight max-w-3xl"
            >
              {t('services.heading')}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed max-w-3xl text-[--muted]">
              {t('services.description')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 auto-rows-fr gap-6 md:gap-8">
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
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col gap-6 md:gap-8">
          <div>
            <h2
              id="process-heading"
              className="text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.25] tracking-tight max-w-3xl"
            >
              {t('services.process.heading')}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed max-w-3xl text-[--muted]">
              {t('services.process.description')}
            </p>
          </div>
          <ProcessTimeline steps={steps} />
        </div>
      </section>

  {/* CTA */}
  <div className="max-w-7xl mx-auto px-6 md:px-8 pb-20">
        <CTA
          title={t('services.cta.title')}
          body={t('services.cta.body')}
          primary={{ href: '/contact', label: t('services.cta.primary') }}
          secondary={{ href: '/project-showcase', label: t('services.cta.secondary') }}
        />
      </div>
  </main>
  );
}
