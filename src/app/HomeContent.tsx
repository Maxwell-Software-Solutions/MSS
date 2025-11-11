'use client';

import type { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeroFieldWrapper from './components/HeroFieldWrapper';
import DeferredSections from './components/DeferredSections';
import { useLanguage } from '@/lib/LanguageContext';
import { trackCTAClick } from '@/lib/analytics';
import { StatCard, FeatureCard, ButtonLink } from './components/ui';

export default function HomeContent(): ReactElement {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen font-sans" id="main-content">
      <section className="relative hero-gradient section overflow-hidden py-12 sm:py-16 lg:py-20">
        {/* Decorative background layers */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[100vw] max-w-[120rem] h-[100vw] max-h-[120rem] bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-1/4 w-[60vw] max-w-[60rem] h-[60vw] max-h-[60rem] bg-accent/10 rounded-full blur-2xl" />
        </div>
        <div className="container relative ">
          <div className="text-center max-w-4xl mx-auto px-4" data-reveal>
            <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] sm:leading-[1.05]">
              {t('hero.title')}
            </h1>
            <p className="mt-6 text-lg xs:text-xl sm:text-2xl text-foreground/80 leading-relaxed sm:leading-snug max-w-3xl mx-auto px-2">
              {t('hero.subtitle')}
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
              <ButtonLink
                href="/contact"
                variant="accent"
                className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-soft font-bold min-h-[48px]"
                onClick={() => trackCTAClick('hero_primary')}
              >
                {t('hero.cta.primary')}
              </ButtonLink>
              <ButtonLink
                href="/services"
                variant="ghost"
                className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg min-h-[48px]"
                onClick={() => trackCTAClick('hero_secondary')}
              >
                {t('hero.cta.secondary')}
              </ButtonLink>
            </div>
            <p className="mt-6 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] text-foreground/75 font-medium px-4">
              {t('hero.values')}
            </p>
          </div>
          <HeroFieldWrapper />
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 px-4" data-reveal>
            <StatCard value={t('stats.defects')} label={t('stats.defects.label')} />
            <StatCard value={t('stats.coverage')} label={t('stats.coverage.label')} />
            <StatCard value={t('stats.mttr')} label={t('stats.mttr.label')} />
          </div>
          {/* Value propositions */}
          <div
            className="mt-12 sm:mt-16 mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            data-reveal
            aria-label="Key value propositions"
          >
            <FeatureCard title={t('value.insight.title')} description={t('value.insight.body')} className="h-full" />
            <FeatureCard
              title={t('value.iteration.title')}
              description={t('value.iteration.body')}
              className="h-full"
            />
            <FeatureCard
              title={t('value.reliability.title')}
              description={t('value.reliability.body')}
              className="h-full"
            />
            <FeatureCard title={t('value.outcomes.title')} description={t('value.outcomes.body')} className="h-full" />
          </div>
        </div>
      </section>

      {/* Capabilities overview */}
      <section
        className="px-6 sm:px-10 py-12 sm:py-16 neuro-section-border bg-background/50"
        aria-labelledby="capabilities-heading"
      >
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <h2 id="capabilities-heading" className="text-3xl sm:text-4xl font-semibold tracking-tight">
              {t('capabilities.heading')}
            </h2>
            <p className="mt-4 text-foreground/80 leading-relaxed">{t('capabilities.description')}</p>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon="🧪"
              title={t('capabilities.testing.title')}
              description={t('capabilities.testing.body')}
            />
            <FeatureCard
              icon="📦"
              title={t('capabilities.refactoring.title')}
              description={t('capabilities.refactoring.body')}
            />
            <FeatureCard
              icon="🔍"
              title={t('capabilities.observability.title')}
              description={t('capabilities.observability.body')}
            />
            <FeatureCard
              icon="🛡️"
              title={t('capabilities.reliability.title')}
              description={t('capabilities.reliability.body')}
            />
          </div>
        </div>
      </section>

      <section id="about" className="px-6 sm:px-10 py-12 sm:py-16 neuro-section-border">
        <div className="max-w-6xl mx-auto">
          <div>
            <h2 className="text-2xl font-semibold">{t('about.section.heading')}</h2>
            <p className="mt-4 text-foreground/80">{t('about.section.description')}</p>
            <div className="mt-6">
              <ButtonLink href="/about" variant="accent">
                {t('about.section.cta')}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Process timeline */}
      <section
        className="px-6 sm:px-10 py-12 sm:py-16 neuro-section-border bg-background/30"
        aria-labelledby="process-heading"
      >
        <div className="max-w-6xl mx-auto" data-reveal>
          <h2 id="process-heading" className="text-3xl sm:text-4xl font-semibold tracking-tight">
            {t('process.heading')}
          </h2>
          <ol className="mt-8 relative pl-20 space-y-8">
            {/* Clean vertical line */}
            <div
              className="absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-accent/20 via-accent/10 to-accent/20"
              aria-hidden="true"
            />
            {[
              {
                step: '01',
                titleKey: 'process.step1.title',
                bodyKey: 'process.step1.body',
              },
              {
                step: '02',
                titleKey: 'process.step2.title',
                bodyKey: 'process.step2.body',
              },
              {
                step: '03',
                titleKey: 'process.step3.title',
                bodyKey: 'process.step3.body',
              },
              {
                step: '04',
                titleKey: 'process.step4.title',
                bodyKey: 'process.step4.body',
              },
            ].map((s) => (
              <li key={s.step} className="group relative">
                {/* Neumorphic circle with step number */}
                <div
                  className="rounded-full bg-gradient-to-br from-accent/10 to-accent/20 flex items-center justify-center shadow-soft border border-accent/20 group-hover:from-accent/20 group-hover:to-accent/30 group-hover:border-accent/30 transition-all absolute -left-[67px] top-[7px] sm:top-[26px] w-12 h-12"
                  aria-hidden="true"
                >
                  <span className="text-sm font-bold text-accent">{s.step}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold tracking-tight text-xl">{t(s.titleKey)}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed max-w-2xl">{t(s.bodyKey)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="projects" className="hairline">
        <div className="container section">
          <div className="eyebrow">{t('projects.eyebrow')}</div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">{t('projects.heading')}</h2>
          <p className="mt-4 text-foreground/70 max-w-2xl text-sm">{t('projects.description')}</p>
          <div className="mt-8 grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
            {[
              {
                slug: 'retail-platform',
                titleKey: 'projects.retail.title',
                metaKey: 'projects.retail.meta',
                outcomeKey: 'projects.retail.outcome',
                metrics: ['-58% defects', '+28% deploys', '+12 CSAT'],
                image: '/images/case-studies/retail-platform.svg',
              },
              {
                slug: 'fintech-api',
                titleKey: 'projects.fintech.title',
                metaKey: 'projects.fintech.meta',
                outcomeKey: 'projects.fintech.outcome',
                metrics: ['+32% coverage', '-24% incidents', '-18% p99'],
                image: '/images/case-studies/fintech-api.svg',
              },
              {
                slug: 'saas-migration',
                titleKey: 'projects.saas.title',
                metaKey: 'projects.saas.meta',
                outcomeKey: 'projects.saas.outcome',
                metrics: ['-45% MTTR', '-60% noise', '4/4 SLOs'],
                image: '/images/case-studies/saas-migration.svg',
              },
            ].map((c) => (
              <Link
                key={c.slug}
                href={`/project-showcase/${c.slug}`}
                className="group card shadow-soft overflow-hidden flex flex-col"
                aria-label={`${t(c.titleKey)} case study`}
              >
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={c.image}
                    alt={t(c.titleKey)}
                    fill
                    unoptimized
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform"
                  />
                </div>
                <div className="p-5 flex flex-col grow">
                  <div className="text-xs text-foreground/70 mb-1 flex items-center gap-2">
                    <span>{t(c.metaKey)}</span>
                    <span className="h-1 w-1 rounded-full bg-foreground/30" />
                    <span className="text-accent font-medium">{t(c.outcomeKey)}</span>
                  </div>
                  <h3 className="font-semibold tracking-tight group-hover:text-accent transition-colors">
                    {t(c.titleKey)}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {c.metrics.map((m) => (
                      <span
                        key={m}
                        className="text-[11px] font-medium px-2 py-1 rounded-md bg-foreground/5 border border-foreground/10 text-foreground/75"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                  <span className="mt-auto pt-4 text-xs text-accent/80 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    {t('projects.viewStudy')}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="opacity-70"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink href="/project-showcase" variant="ghost">
              {t('projects.browseAll')}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 sm:px-10 py-16 neuro-section-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold">{t('contact.heading')}</h2>
          <p className="mt-3 text-sm text-foreground/75 leading-relaxed">{t('contact.description')}</p>
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <ButtonLink href="/contact" variant="accent">
              {t('contact.cta.primary')}
            </ButtonLink>
            <ButtonLink href="/services" variant="ghost">
              {t('contact.cta.secondary')}
            </ButtonLink>
          </div>
          <div className="mt-6 pt-4 neuro-separator-inline">
            <p className="text-sm text-foreground/75 mb-3">{t('contact.linkedin.label')}</p>
            <a
              href="https://www.linkedin.com/company/maxwell-software-solutions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-[color:var(--accent)] transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              {t('contact.linkedin.company')}
            </a>
          </div>
        </div>
      </section>
      <DeferredSections />
    </main>
  );
}
