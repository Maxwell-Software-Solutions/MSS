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
   Shared animation variants
--------------------------------------------------------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HomeContent(): ReactElement {
  const { t } = useLanguage();

  return (
    <>
      {/* ============================================================
          HERO
      ============================================================ */}
      <section className="relative hero-gradient section overflow-hidden py-24 sm:py-32 lg:py-40">
        {/* Backdrop glows */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Primary violet bloom from top-center */}
          <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[110vw] max-w-[140rem] h-[80vw] max-h-[80rem] rounded-full blur-3xl bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.45)_0%,rgba(79,70,229,0.22)_40%,transparent_70%)]" />
          {/* Secondary indigo side glow */}
          <div className="absolute top-1/3 -left-1/4 w-[50vw] max-w-[50rem] h-[50vw] max-h-[50rem] rounded-full blur-2xl bg-indigo-600/10" />
          <div className="absolute top-1/3 -right-1/4 w-[40vw] max-w-[40rem] h-[40vw] max-h-[40rem] rounded-full blur-2xl bg-violet-700/10" />
        </div>

        <div className="max-w-6xl mx-auto px-6 sm:px-10 relative">
          <motion.div
            className="text-center max-w-4xl mx-auto px-4"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[1.05]">
              <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
                {t('hero.title')}
              </span>
            </h1>
            <p className="mt-6 text-xl sm:text-2xl text-white/70 leading-relaxed sm:leading-snug max-w-3xl mx-auto px-2">
              {t('hero.subtitle')}
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-500 hover:to-indigo-400 text-white font-bold px-8 py-4 rounded-xl shadow-[0_4px_24px_rgba(124,58,237,0.45)] transition-all min-h-[52px] text-base sm:text-lg"
                onClick={() => trackCTAClick('hero_primary')}
              >
                {t('hero.cta.primary')}
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center border border-white/15 hover:border-white/30 hover:bg-white/5 text-white px-8 py-4 rounded-xl transition-all min-h-[52px] text-base sm:text-lg font-semibold"
                onClick={() => trackCTAClick('hero_secondary')}
              >
                {t('hero.cta.secondary')}
              </Link>
            </div>
            <p className="mt-6 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/60 font-medium px-4">
              {t('hero.values')}
            </p>
            <CalendlyCTA />
          </motion.div>

          <HeroFieldWrapper />

          {/* Stats row */}
          <motion.div
            className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 px-4"
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
              <motion.div
                key={stat.label}
                variants={staggerItem}
                className="glass-card p-6 text-center border border-white/[0.07] backdrop-blur-xl"
              >
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="muted text-sm mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Value propositions */}
          <motion.div
            className="mt-12 sm:mt-16 mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
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
      <section
        className="px-6 sm:px-10 py-16 sm:py-20 bg-white/[0.02] neuro-section-border"
        aria-labelledby="capabilities-heading"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="eyebrow mb-3">{t('capabilities.heading')}</div>
            <h2 id="capabilities-heading" className="text-3xl sm:text-4xl font-bold tracking-tight">
              {t('capabilities.heading')}
            </h2>
            <p className="mt-4 text-foreground/80 leading-relaxed">{t('capabilities.description')}</p>
          </motion.div>

          <motion.div
            className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
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
      <section id="about" className="px-6 sm:px-10 py-16 sm:py-20 neuro-section-border bg-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold">{t('about.section.heading')}</h2>
            <p className="mt-4 text-foreground/80">{t('about.section.description')}</p>
            <div className="mt-6">
              <ButtonLink href="/about" variant="accent">
                {t('about.section.cta')}
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          PROCESS TIMELINE
      ============================================================ */}
      <section
        className="px-6 sm:px-10 py-16 sm:py-20 neuro-section-border bg-white/[0.02]"
        aria-labelledby="process-heading"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            id="process-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('process.heading')}
          </motion.h2>

          <motion.ol
            className="mt-8 relative pl-20 space-y-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Gradient connecting line */}
            <div
              className="absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-violet-500/30 via-indigo-500/30 to-violet-500/30"
              aria-hidden="true"
            />
            {[
              { step: '01', titleKey: 'process.step1.title', bodyKey: 'process.step1.body' },
              { step: '02', titleKey: 'process.step2.title', bodyKey: 'process.step2.body' },
              { step: '03', titleKey: 'process.step3.title', bodyKey: 'process.step3.body' },
              { step: '04', titleKey: 'process.step4.title', bodyKey: 'process.step4.body' },
            ].map((s) => (
              <motion.li key={s.step} className="group relative" variants={staggerItem}>
                {/* Gradient ring step number */}
                <div
                  className="rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white flex items-center justify-center shadow-[0_0_16px_rgba(124,58,237,0.4)] absolute -left-[67px] top-[7px] sm:top-[26px] w-12 h-12"
                  aria-hidden="true"
                >
                  <span className="text-sm font-bold">{s.step}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold tracking-tight text-xl">{t(s.titleKey)}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed max-w-2xl">{t(s.bodyKey)}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* ============================================================
          PROJECTS
      ============================================================ */}
      <section id="projects" className="hairline bg-transparent">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="eyebrow mb-2">{t('projects.eyebrow')}</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{t('projects.heading')}</h2>
            <p className="mt-4 text-foreground/70 max-w-2xl text-sm">{t('projects.description')}</p>
          </motion.div>

          <motion.div
            className="mt-8 grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3"
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
                  className="group card shadow-soft overflow-hidden flex flex-col h-full hover:border-violet-500/30 hover:shadow-[0_8px_32px_rgba(124,58,237,0.2)] transition-all"
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
                          className="text-[11px] font-medium px-2 py-1 rounded-md bg-violet-500/10 border border-violet-500/20 text-violet-300"
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
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-8">
            <ButtonLink href="/project-showcase" variant="ghost">
              {t('projects.browseAll')}
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ============================================================
          CONTACT CTA
      ============================================================ */}
      <section id="contact" className="px-6 sm:px-10 py-16 neuro-section-border bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="bg-gradient-to-br from-violet-900/30 via-indigo-900/20 to-transparent border border-violet-500/20 rounded-3xl p-10 sm:p-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{t('contact.heading')}</h2>
            <p className="mt-3 text-sm text-foreground/75 leading-relaxed max-w-2xl">{t('contact.description')}</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-500 hover:to-indigo-400 text-white font-bold px-8 py-4 rounded-xl shadow-[0_4px_24px_rgba(124,58,237,0.45)] transition-all min-h-[52px] text-base"
              >
                {t('contact.cta.primary')}
              </Link>
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
          </motion.div>
        </div>
      </section>

      <DeferredSections />
    </>
  );
}
