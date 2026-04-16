'use client';
import type { ReactElement } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { services } from './services-data';
import { processSteps } from './process-data';
import ServiceCard from '@/app/components/ui/ServiceCard';
import ProcessTimeline from '@/app/components/ui/ProcessTimeline';
import { useHydratedTranslation } from '@/lib/useHydratedTranslation';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

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
        <motion.div {...fadeUp}>
          <div className="eyebrow mb-4" suppressHydrationWarning>
            {ht('services.hero.eyebrow', 'Our Services')}
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight max-w-3xl"
            suppressHydrationWarning
          >
            Engineering{' '}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
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
          <p className="mt-3 max-w-2xl text-sm text-foreground/50" suppressHydrationWarning>
            {ht('services.hero.note', 'All engagements include measurable outcomes and knowledge transfer.')}
          </p>
        </motion.div>
      </header>

      {/* Services Section */}
      <section aria-labelledby="services-heading" className="max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <motion.div {...fadeUp} className="mb-10">
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight max-w-3xl"
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
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 auto-rows-fr gap-6 md:gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          suppressHydrationWarning
        >
          {mappedServices.map((svc) => (
            <div key={svc.key} className="neuro-card rounded-2xl hover:-translate-y-1 transition-all p-1">
              <ServiceCard
                title={svc.title}
                summary={svc.summary}
                imageAlt={svc.imageAlt}
                meta={svc.meta}
                tone={svc.tone as 'default' | 'accent'}
              />
            </div>
          ))}
        </motion.div>
      </section>

      {/* Process Timeline */}
      <section
        aria-labelledby="process-heading"
        className="neuro-section-border max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-20"
      >
        <motion.div {...fadeUp} className="mb-10">
          <h2
            id="process-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight max-w-3xl"
            suppressHydrationWarning
          >
            {ht('services.process.heading', 'Our')}{' '}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Process
            </span>
          </h2>
          <p className="mt-3 text-base leading-relaxed max-w-3xl text-foreground/60" suppressHydrationWarning>
            {ht('services.process.description', 'A systematic approach to improving code quality and team velocity.')}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          suppressHydrationWarning
        >
          <ProcessTimeline steps={steps} />
        </motion.div>
      </section>

      {/* CTA */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 pb-20 sm:pb-24" suppressHydrationWarning>
        <motion.div {...fadeUp}>
          <div className="rounded-3xl bg-gradient-to-br from-violet-900/30 via-indigo-900/20 to-transparent border border-violet-500/20 p-10 sm:p-14 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" suppressHydrationWarning>
              {ht('services.cta.title', 'Ready to Improve Your')}
              {' '}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Code Quality?
              </span>
            </h2>
            <p className="mt-2 mb-8 text-base leading-relaxed text-foreground/70 max-w-xl mx-auto" suppressHydrationWarning>
              {ht(
                'services.cta.body',
                'Let us help you reduce defects, improve velocity, and build confidence in your deployments.'
              )}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-500 hover:to-indigo-400 text-white font-bold px-6 py-3 rounded-xl shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all"
              >
                {ht('services.cta.primary', 'Start a Conversation')}
              </Link>
              <Link
                href="/project-showcase"
                className="border border-white/10 hover:border-white/20 hover:bg-white/5 px-6 py-3 rounded-xl transition-all"
              >
                {ht('services.cta.secondary', 'View Case Studies')}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
