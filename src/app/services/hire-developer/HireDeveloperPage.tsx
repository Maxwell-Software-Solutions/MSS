'use client';

import type { ReactElement } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useHydratedTranslation } from '@/lib/useHydratedTranslation';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

function CheckIcon(): ReactElement {
  return (
    <svg
      className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5"
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function HireDeveloperPage(): ReactElement {
  const ht = useHydratedTranslation();

  const reasons = [
    {
      title: ht('hireDev.reason1.title', 'Start in days, not months'),
      body: ht('hireDev.reason1.body', 'Skip the 3-month hiring pipeline. Our senior engineers are available to start within 1-2 weeks of signing.'),
    },
    {
      title: ht('hireDev.reason2.title', 'Senior-level from day one'),
      body: ht('hireDev.reason2.body', 'No juniors, no ramp-up. Every engineer has 5+ years of production experience and a track record of shipping.'),
    },
    {
      title: ht('hireDev.reason3.title', 'No recruitment fees'),
      body: ht('hireDev.reason3.body', 'Hiring agencies charge 20-30% of annual salary. With us, you pay for engineering output — not a finder\'s fee.'),
    },
    {
      title: ht('hireDev.reason4.title', 'Flexible commitment'),
      body: ht('hireDev.reason4.body', 'Scale up or down month-to-month. No long-term lock-in. Pause or stop when the project is done.'),
    },
  ];

  const techStack = [
    'React', 'Next.js', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'CI/CD', 'PostgreSQL',
  ];

  const engagements = [
    {
      name: ht('hireDev.engagement1.name', 'Sprint-in-a-Box'),
      price: ht('hireDev.engagement1.price', '€4,800'),
      period: ht('hireDev.engagement1.period', 'fixed price'),
      description: ht('hireDev.engagement1.desc', 'A focused 2-week delivery sprint. Ideal for MVPs, proof-of-concepts, or shipping a specific feature fast.'),
      href: '/start-a-sprint',
    },
    {
      name: ht('hireDev.engagement2.name', 'Engineering Partner Retainer'),
      price: ht('hireDev.engagement2.price', '€3,500–€6,500'),
      period: ht('hireDev.engagement2.period', '/month'),
      description: ht('hireDev.engagement2.desc', 'A dedicated senior engineer, 3-5 days per week. Ongoing delivery, code review, architecture guidance, and async access.'),
      href: '/contact',
    },
  ];

  return (
    <>
      {/* Hero */}
      <header className="max-w-6xl mx-auto px-6 sm:px-10 pt-20 sm:pt-24 pb-10">
        <motion.div {...fadeUp}>
          <div className="eyebrow mb-4" suppressHydrationWarning>
            {ht('hireDev.eyebrow', 'Hire a Developer')}
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight max-w-3xl"
            suppressHydrationWarning
          >
            Hire a{' '}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Senior Developer
            </span>{' '}
            — Without the 3-Month Wait
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-foreground/70 max-w-2xl" suppressHydrationWarning>
            {ht(
              'hireDev.subheadline',
              'Outsource development to senior engineers in Lithuania and Europe. Start shipping production-ready code in days — not months.'
            )}
          </p>

          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <Link
              href="https://calendly.com/maxwellsoftwaresolutions/discovery"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-500 hover:to-indigo-400 text-white font-bold px-6 py-3 rounded-xl shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-500/60"
              target="_blank"
              rel="noopener noreferrer"
              suppressHydrationWarning
            >
              {ht('hireDev.cta.primary', 'Book a discovery call')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
            <Link
              href="/services/packages"
              className="border border-white/10 hover:border-white/20 hover:bg-white/5 px-6 py-3 rounded-xl transition-all text-[14px] font-medium"
              suppressHydrationWarning
            >
              {ht('hireDev.cta.compare', 'Compare all packages')}
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            {[
              ht('hireDev.trust.start', 'Start in 1-2 weeks'),
              ht('hireDev.trust.senior', '5+ years experience'),
              ht('hireDev.trust.flex', 'No long-term contract'),
            ].map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 text-[12px] text-foreground/65"
                suppressHydrationWarning
              >
                <CheckIcon />
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </header>

      {/* Why outsource to MSS */}
      <section aria-labelledby="reasons-heading" className="neuro-section-border max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <motion.div {...fadeUp} className="mb-8">
          <h2
            id="reasons-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            suppressHydrationWarning
          >
            {ht('hireDev.reasons.heading', 'Why outsource to MSS')}
          </h2>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          suppressHydrationWarning
        >
          {reasons.map((item, i) => (
            <div key={i} className="neuro-card rounded-2xl p-6 hover:-translate-y-1 transition-all">
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-[14px] text-foreground/75 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Tech stack */}
      <section aria-labelledby="stack-heading" className="max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <motion.div {...fadeUp}>
          <h2
            id="stack-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-6"
            suppressHydrationWarning
          >
            {ht('hireDev.stack.heading', 'Tech stack')}
          </h2>
          <p className="text-base text-foreground/70 mb-6" suppressHydrationWarning>
            {ht('hireDev.stack.body', 'Our engineers specialise in the modern web stack. If your project uses these technologies, we can hit the ground running.')}
          </p>
          <div className="flex flex-wrap gap-3" suppressHydrationWarning>
            {techStack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[13px] font-semibold px-4 py-2"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Engagement models */}
      <section aria-labelledby="engagements-heading" className="neuro-section-border max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <motion.div {...fadeUp} className="mb-8">
          <h2
            id="engagements-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            suppressHydrationWarning
          >
            {ht('hireDev.engagements.heading', 'Engagement models')}
          </h2>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          suppressHydrationWarning
        >
          {engagements.map((eng) => (
            <div key={eng.name} className="neuro-card flex flex-col rounded-3xl p-7 sm:p-8 h-full hover:-translate-y-1 transition-all">
              <h3 className="text-lg font-bold tracking-tight">{eng.name}</h3>
              <div className="mt-2.5 flex items-end gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                  {eng.price}
                </span>
                {eng.period && <span className="text-sm text-foreground/60 mb-0.5">{eng.period}</span>}
              </div>
              <p className="mt-3 text-[14px] text-foreground/75 leading-relaxed flex-1">{eng.description}</p>
              <Link
                href={eng.href}
                className="mt-6 w-full text-center rounded-xl px-5 py-3 text-sm font-semibold border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-500/60"
                suppressHydrationWarning
              >
                {ht('hireDev.engagements.cta', 'Learn more')}
              </Link>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Bottom CTA */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <motion.div {...fadeUp}>
          <div className="rounded-3xl bg-gradient-to-br from-violet-900/30 via-indigo-900/20 to-transparent border border-violet-500/20 p-10 sm:p-14 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" suppressHydrationWarning>
              Ship faster with{' '}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                senior engineers.
              </span>
            </h2>
            <p className="text-base text-foreground/70 max-w-lg mx-auto mb-8" suppressHydrationWarning>
              {ht(
                'hireDev.bottomcta.body',
                'No recruitment fees. No ramp-up. Production-ready code from senior engineers who have shipped before.'
              )}
            </p>
            <Link
              href="https://calendly.com/maxwellsoftwaresolutions/discovery"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-500 hover:to-indigo-400 text-white font-bold px-6 py-3 rounded-xl shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-500/60"
              target="_blank"
              rel="noopener noreferrer"
              suppressHydrationWarning
            >
              {ht('hireDev.bottomcta.cta', 'Book a discovery call')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
