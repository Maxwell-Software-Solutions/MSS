'use client';

import type { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import DeferredClient from './components/DeferredClient';
import HeroFieldWrapper from './components/HeroFieldWrapper';
import DeferredSections from './components/DeferredSections';
import { useLanguage } from '@/lib/LanguageContext';

// Dynamically import non-critical components
const ClientLogos = dynamic(() => import('@/app/components/ClientLogos'), {
  loading: () => <div className="h-20 bg-card/50 animate-pulse rounded" />,
  ssr: true,
});

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
        <div className="container relative h-[100vh]">
          <div className="text-center max-w-4xl mx-auto px-4" data-reveal>
            <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] sm:leading-[1.05]">
              {t('hero.title')}
            </h1>
            <p className="mt-6 text-lg xs:text-xl sm:text-2xl text-foreground/80 leading-relaxed sm:leading-snug max-w-3xl mx-auto px-2">
              {t('hero.subtitle')}
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
              <a
                href="/contact"
                className="btn btn-accent px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-soft font-bold min-h-[48px]"
              >
                {t('hero.cta.primary')}
              </a>
              <a href="/services" className="btn btn-ghost px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg min-h-[48px]">
                {t('hero.cta.secondary')}
              </a>
            </div>
            <p className="mt-6 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] text-foreground/60 font-medium px-4">
              {t('hero.values')}
            </p>
          </div>
          <HeroFieldWrapper />
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 px-4" data-reveal>
            <div className="card shadow-soft p-4 sm:p-5 text-center">
              <div className="text-xl sm:text-2xl font-semibold">{t('stats.defects')}</div>
              <div className="muted text-sm">{t('stats.defects.label')}</div>
            </div>
            <div className="card shadow-soft p-4 sm:p-5 text-center">
              <div className="text-xl sm:text-2xl font-semibold">{t('stats.coverage')}</div>
              <div className="muted text-sm">{t('stats.coverage.label')}</div>
            </div>
            <div className="card shadow-soft p-4 sm:p-5 text-center">
              <div className="text-xl sm:text-2xl font-semibold">{t('stats.mttr')}</div>
              <div className="muted text-sm">{t('stats.mttr.label')}</div>
            </div>
          </div>
          {/* Value propositions */}
          <div
            className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            data-reveal
            aria-label="Key value propositions"
          >
            {[
              {
                titleKey: 'value.insight.title',
                bodyKey: 'value.insight.body',
              },
              {
                titleKey: 'value.iteration.title',
                bodyKey: 'value.iteration.body',
              },
              {
                titleKey: 'value.reliability.title',
                bodyKey: 'value.reliability.body',
              },
              {
                titleKey: 'value.outcomes.title',
                bodyKey: 'value.outcomes.body',
              },
            ].map((v) => (
              <div key={v.titleKey} className="card p-5 shadow-soft h-full flex flex-col">
                {/* Promote to h2 to establish correct hierarchy before any h3 usage */}
                <h2 className="font-semibold text-lg tracking-tight">{t(v.titleKey)}</h2>
                <p className="mt-2 text-sm text-foreground/80 leading-relaxed">{t(v.bodyKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities overview */}
      <section
        className="px-6 sm:px-10 py-20 border-t border-foreground/10 bg-background/50"
        aria-labelledby="capabilities-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h2 id="capabilities-heading" className="text-3xl sm:text-4xl font-semibold tracking-tight">
              {t('capabilities.heading')}
            </h2>
            <p className="mt-4 text-foreground/80 leading-relaxed">{t('capabilities.description')}</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: '🧪',
                titleKey: 'capabilities.testing.title',
                bodyKey: 'capabilities.testing.body',
              },
              {
                icon: '📦',
                titleKey: 'capabilities.refactoring.title',
                bodyKey: 'capabilities.refactoring.body',
              },
              {
                icon: '🔍',
                titleKey: 'capabilities.observability.title',
                bodyKey: 'capabilities.observability.body',
              },
              {
                icon: '🛡️',
                titleKey: 'capabilities.reliability.title',
                bodyKey: 'capabilities.reliability.body',
              },
            ].map((c) => (
              <div key={c.titleKey} className="card p-6 shadow-soft flex flex-col" aria-label={t(c.titleKey)}>
                <div className="text-2xl" aria-hidden="true">
                  {c.icon}
                </div>
                <h3 className="mt-3 font-medium tracking-tight">{t(c.titleKey)}</h3>
                <p className="mt-2 text-sm text-foreground/75 leading-relaxed">{t(c.bodyKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="px-6 sm:px-10 py-16 border-t border-foreground/10">
        <div className="max-w-6xl mx-auto">
          <div>
            <h2 className="text-2xl font-semibold">{t('about.section.heading')}</h2>
            <p className="mt-3 text-foreground/80">{t('about.section.description')}</p>
            <div className="mt-5">
              <a href="/about" className="btn btn-accent px-10 py-3 font-semibold">
                {t('about.section.cta')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Process timeline */}
      <section
        className="px-6 sm:px-10 py-20 border-t border-foreground/10 bg-background/30"
        aria-labelledby="process-heading"
      >
        <div className="max-w-6xl mx-auto" data-reveal>
          <h2 id="process-heading" className="text-3xl sm:text-4xl font-semibold tracking-tight">
            {t('process.heading')}
          </h2>
          <ol className="mt-10 relative border-s border-foreground/15 pl-8 space-y-10">
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
            ].map((s, idx) => (
              <li key={s.step} className="group">
                <div
                  className="absolute -left-[13px] mt-1 w-6 h-6 rounded-full border bg-background group-hover:bg-accent/10 transition"
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-1">
                  <span className="text-xs tracking-wide font-mono text-foreground/60">{s.step}</span>
                  <h3 className="font-medium tracking-tight text-lg">{t(s.titleKey)}</h3>
                  <p className="text-sm text-foreground/75 leading-relaxed max-w-prose">{t(s.bodyKey)}</p>
                </div>
                {idx < 3 && (
                  <div
                    className="absolute left-[-1px] top-8 bottom-0 border-s border-dashed border-foreground/15"
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="projects" className="hairline">
        <div className="container section">
          <div className="eyebrow">{t('projects.eyebrow')}</div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">{t('projects.heading')}</h2>
          <p className="mt-3 text-foreground/70 max-w-2xl text-sm">{t('projects.description')}</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
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
                  <div className="text-xs text-foreground/50 mb-1 flex items-center gap-2">
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
                        className="text-[11px] font-medium px-2 py-1 rounded-md bg-foreground/5 border border-foreground/10 text-foreground/60"
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
            <Link href="/project-showcase" className="btn btn-ghost">
              {t('projects.browseAll')}
            </Link>
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 sm:px-10 py-16 border-t border-foreground/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold">{t('contact.heading')}</h2>
          <p className="mt-3 text-sm text-foreground/75 leading-relaxed">{t('contact.description')}</p>
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <a href="/contact" className="btn btn-accent px-10 py-3 font-semibold">
              {t('contact.cta.primary')}
            </a>
            <a href="/services" className="btn btn-ghost px-10 py-3">
              {t('contact.cta.secondary')}
            </a>
          </div>
          <div className="mt-6 pt-4 border-t border-foreground/10">
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
