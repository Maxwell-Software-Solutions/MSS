'use client';

import type { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import HeroFieldWrapper from './components/HeroFieldWrapper';
import DeferredSections from './components/DeferredSections';
import CalendlyCTA from './components/CalendlyCTA';
import { useLanguage } from '@/lib/LanguageContext';
import { trackCTAClick } from '@/lib/analytics';
import { FeatureCard, ButtonLink } from './components/ui';

/* ---------------------------------------------------------------
   Shared animation variants — short, quiet fades
--------------------------------------------------------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const inView = {
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4 },
};

export default function HomeContent(): ReactElement {
  const { t } = useLanguage();

  return (
    <>
      {/* ============================================================
          HERO
      ============================================================ */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 pt-14 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem]">{t('hero.title')}</h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-secondary sm:text-xl">{t('hero.subtitle')}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="btn btn-accent px-6 py-3 text-base"
                  onClick={() => trackCTAClick('hero_primary')}
                >
                  {t('hero.cta.primary')}
                </Link>
                <Link
                  href="/services"
                  className="btn px-6 py-3 text-base"
                  onClick={() => trackCTAClick('hero_secondary')}
                >
                  {t('hero.cta.secondary')}
                </Link>
              </div>
              <p className="mt-8 text-sm text-muted">{t('hero.values')}</p>
              <CalendlyCTA />
            </motion.div>

            <HeroFieldWrapper />
          </div>

          {/* Stats row — metrics share hairlines */}
          <motion.div
            className="ruled mt-14 grid-cols-1 sm:mt-16 sm:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { value: t('stats.defects'), label: t('stats.defects.label') },
              { value: t('stats.coverage'), label: t('stats.coverage.label') },
              { value: t('stats.mttr'), label: t('stats.mttr.label') },
            ].map((stat) => (
              <motion.div key={stat.label} variants={staggerItem} className="p-6 sm:p-7">
                <div className="text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">{stat.value}</div>
                <div className="mt-2 text-sm text-muted">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Value propositions */}
          <motion.div
            className="ruled mt-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            aria-label="Key value propositions"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { title: t('value.insight.title'), description: t('value.insight.body') },
              { title: t('value.iteration.title'), description: t('value.iteration.body') },
              { title: t('value.reliability.title'), description: t('value.reliability.body') },
              { title: t('value.outcomes.title'), description: t('value.outcomes.body') },
            ].map((card) => (
              <motion.div key={card.title} variants={staggerItem}>
                <FeatureCard title={card.title} description={card.description} className="h-full" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          CAPABILITIES
      ============================================================ */}
      <section className="border-t border-border" aria-labelledby="capabilities-heading">
        <div className="max-w-6xl mx-auto px-6 py-16 sm:px-10 sm:py-24">
          <motion.div className="max-w-3xl" {...inView}>
            <div className="eyebrow mb-3">{t('capabilities.heading')}</div>
            <h2 id="capabilities-heading">{t('capabilities.heading')}</h2>
            <p className="mt-4 text-lg leading-relaxed text-secondary">{t('capabilities.description')}</p>
          </motion.div>

          <motion.div
            className="ruled mt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: '🧪', title: t('capabilities.testing.title'), description: t('capabilities.testing.body') },
              { icon: '📦', title: t('capabilities.refactoring.title'), description: t('capabilities.refactoring.body') },
              { icon: '🔍', title: t('capabilities.observability.title'), description: t('capabilities.observability.body') },
              { icon: '🛡️', title: t('capabilities.reliability.title'), description: t('capabilities.reliability.body') },
            ].map((card) => (
              <motion.div key={card.title} variants={staggerItem}>
                <FeatureCard icon={card.icon} title={card.title} description={card.description} className="h-full" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          ABOUT TEASER
      ============================================================ */}
      <section id="about" className="border-t border-border bg-wash">
        <div className="max-w-6xl mx-auto px-6 py-16 sm:px-10 sm:py-24">
          <motion.div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16" {...inView}>
            <h2>{t('about.section.heading')}</h2>
            <p className="text-lg leading-relaxed text-secondary">{t('about.section.description')}</p>
            <div className="lg:col-start-2">
              <ButtonLink href="/about" variant="accent">
                {t('about.section.cta')}
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          PROCESS
      ============================================================ */}
      <section className="border-t border-border" aria-labelledby="process-heading">
        <div className="max-w-6xl mx-auto px-6 py-16 sm:px-10 sm:py-24">
          <motion.h2 id="process-heading" {...inView}>
            {t('process.heading')}
          </motion.h2>

          <motion.ol
            className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { step: '01', titleKey: 'process.step1.title', bodyKey: 'process.step1.body' },
              { step: '02', titleKey: 'process.step2.title', bodyKey: 'process.step2.body' },
              { step: '03', titleKey: 'process.step3.title', bodyKey: 'process.step3.body' },
              { step: '04', titleKey: 'process.step4.title', bodyKey: 'process.step4.body' },
            ].map((s) => (
              <motion.li key={s.step} className="border-t border-border-strong pt-5" variants={staggerItem}>
                <div className="text-sm font-medium tabular-nums text-accent" aria-hidden="true">
                  <span>{s.step}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">{t(s.titleKey)}</h3>
                <p className="mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-secondary">{t(s.bodyKey)}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* ============================================================
          PROJECTS
      ============================================================ */}
      <section id="projects" className="border-t border-border bg-wash">
        <div className="max-w-6xl mx-auto px-6 py-16 sm:px-10 sm:py-24">
          <motion.div className="max-w-3xl" {...inView}>
            <div className="eyebrow mb-3">{t('projects.eyebrow')}</div>
            <h2>{t('projects.heading')}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-secondary">{t('projects.description')}</p>
          </motion.div>

          <motion.div
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
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
              <motion.div key={c.slug} variants={staggerItem}>
                <Link
                  href={`/project-showcase/${c.slug}`}
                  className="group card flex h-full flex-col overflow-hidden"
                  aria-label={`${t(c.titleKey)} case study`}
                >
                  <div className="relative aspect-[3/1] overflow-hidden border-b border-border bg-wash">
                    <Image
                      src={c.image}
                      alt={t(c.titleKey)}
                      fill
                      unoptimized
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex grow flex-col p-5 sm:p-6">
                    <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
                      <span>{t(c.metaKey)}</span>
                      <span className="h-1 w-1 rounded-full bg-border-strong" aria-hidden="true" />
                      <span className="font-medium text-accent">{t(c.outcomeKey)}</span>
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
                      {t(c.titleKey)}
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {c.metrics.map((m) => (
                        <span
                          key={m}
                          className="rounded-md border border-border bg-wash px-2 py-1 text-xs font-medium tabular-nums text-secondary"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-accent transition-all group-hover:gap-2.5">
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
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-10">
            <ButtonLink href="/project-showcase" variant="ghost">
              {t('projects.browseAll')}
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ============================================================
          CONTACT CTA
      ============================================================ */}
      <section id="contact" className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-16 sm:px-10 sm:py-24">
          <motion.div className="band grid gap-8 p-8 sm:p-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-x-12" {...inView}>
            <div className="max-w-2xl">
              <h2>{t('contact.heading')}</h2>
              <p className="mt-4 text-lg leading-relaxed text-secondary">{t('contact.description')}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn btn-accent px-6 py-3 text-base">
                {t('contact.cta.primary')}
              </Link>
              <ButtonLink href="/services" variant="ghost" size="md" className="text-base">
                {t('contact.cta.secondary')}
              </ButtonLink>
            </div>
            <div className="border-t border-border pt-5 lg:col-span-2">
              <p className="mb-3 text-sm text-secondary">{t('contact.linkedin.label')}</p>
              <a
                href="https://www.linkedin.com/company/maxwell-software-solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                {t('contact.linkedin.company')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <DeferredSections />
    </>
  );
}
