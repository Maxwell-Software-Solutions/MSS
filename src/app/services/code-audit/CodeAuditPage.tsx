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

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps): ReactElement {
  return (
    <div className="border-b border-white/5 pb-6">
      <h3 className="text-[15px] font-semibold mb-2">{question}</h3>
      <p className="text-[14px] text-foreground/75 leading-relaxed">{answer}</p>
    </div>
  );
}

export default function CodeAuditPage(): ReactElement {
  const ht = useHydratedTranslation();

  const auditAreas = [
    {
      title: ht('codeAudit.area1.title', 'Architecture'),
      body: ht('codeAudit.area1.body', 'Coupling analysis, dependency mapping, modularity assessment, and scalability readiness.'),
    },
    {
      title: ht('codeAudit.area2.title', 'Testing'),
      body: ht('codeAudit.area2.body', 'Coverage gaps, flaky tests, missing integration tests, and mutation testing opportunities.'),
    },
    {
      title: ht('codeAudit.area3.title', 'CI/CD'),
      body: ht('codeAudit.area3.body', 'Pipeline efficiency, build times, deployment safety, rollback readiness, and environment parity.'),
    },
    {
      title: ht('codeAudit.area4.title', 'Security'),
      body: ht('codeAudit.area4.body', 'Dependency vulnerabilities, authentication patterns, data exposure risks, and OWASP compliance.'),
    },
    {
      title: ht('codeAudit.area5.title', 'Performance'),
      body: ht('codeAudit.area5.body', 'Slow queries, N+1 patterns, memory leaks, bundle size issues, and frontend rendering bottlenecks.'),
    },
    {
      title: ht('codeAudit.area6.title', 'Maintainability'),
      body: ht('codeAudit.area6.body', 'Code complexity hotspots, duplication, documentation gaps, and onboarding friction points.'),
    },
  ];

  const deliverables = [
    ht('codeAudit.deliverable1', 'Detailed written report with findings organised by severity and impact'),
    ht('codeAudit.deliverable2', 'Prioritised remediation roadmap with effort estimates'),
    ht('codeAudit.deliverable3', 'Architecture diagrams and dependency visualisations'),
    ht('codeAudit.deliverable4', '1-hour walkthrough call to discuss findings with your team'),
  ];

  const faqs: FAQItemProps[] = [
    {
      question: ht('codeAudit.faq.q1', 'How long does the audit take?'),
      answer: ht('codeAudit.faq.a1', 'We deliver the full report within 5 business days of receiving repository access. The 1-hour walkthrough call is scheduled within the following week.'),
    },
    {
      question: ht('codeAudit.faq.q2', 'What access do you need?'),
      answer: ht('codeAudit.faq.a2', 'Read-only access to your repository (GitHub, GitLab, or Bitbucket). We sign an NDA before any code is shared. All data is encrypted and deleted after delivery.'),
    },
    {
      question: ht('codeAudit.faq.q3', 'What happens after the audit?'),
      answer: ht('codeAudit.faq.a3', 'You own the report and roadmap completely. Many clients use it to prioritise their next quarter of engineering work. If you want help implementing the recommendations, we can discuss a Sprint-in-a-Box or Retainer engagement.'),
    },
    {
      question: ht('codeAudit.faq.q4', 'What tech stacks do you cover?'),
      answer: ht('codeAudit.faq.a4', 'Node.js, TypeScript, Python, Go, Java, .NET, React, Vue, Next.js, and most SQL/NoSQL databases. If your stack is not listed, mention it in the call and we will confirm coverage.'),
    },
  ];

  return (
    <>
      {/* Hero */}
      <header className="max-w-6xl mx-auto px-6 sm:px-10 pt-20 sm:pt-24 pb-10">
        <motion.div {...fadeUp}>
          <div className="eyebrow mb-4" suppressHydrationWarning>
            {ht('codeAudit.eyebrow', 'Code Audit Service')}
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight max-w-3xl"
            suppressHydrationWarning
          >
            Find Out Why Your{' '}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Dev Team Is Slow
            </span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-foreground/70 max-w-2xl" suppressHydrationWarning>
            {ht(
              'codeAudit.subheadline',
              'An independent, structured review of your codebase that surfaces the root causes of slow delivery, fragile deployments, and mounting technical debt.'
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
              {ht('codeAudit.cta.primary', 'Book free 15-min architecture review')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
            <Link
              href="/services/packages"
              className="border border-white/10 hover:border-white/20 hover:bg-white/5 px-6 py-3 rounded-xl transition-all text-[14px] font-medium"
              suppressHydrationWarning
            >
              {ht('codeAudit.cta.compare', 'Compare all packages')}
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            {[
              ht('codeAudit.trust.price', '€2,500 one-time'),
              ht('codeAudit.trust.time', 'Report in 5 business days'),
              ht('codeAudit.trust.free', 'Free 15-min preview available'),
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

      {/* What we examine */}
      <section aria-labelledby="areas-heading" className="neuro-section-border max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <motion.div {...fadeUp} className="mb-8">
          <h2
            id="areas-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            suppressHydrationWarning
          >
            {ht('codeAudit.areas.heading', 'Six areas we examine')}
          </h2>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          suppressHydrationWarning
        >
          {auditAreas.map((area, i) => (
            <div key={i} className="neuro-card rounded-2xl p-6 hover:-translate-y-1 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-500/10 text-violet-400 font-bold text-xs flex items-center justify-center">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-semibold">{area.title}</h3>
              </div>
              <p className="text-[14px] text-foreground/75 leading-relaxed">{area.body}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* What you get */}
      <section aria-labelledby="deliverables-heading" className="max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <motion.div {...fadeUp}>
          <h2
            id="deliverables-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-6"
            suppressHydrationWarning
          >
            What you{' '}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              get
            </span>
          </h2>
          <ul className="space-y-4">
            {deliverables.map((item, i) => (
              <li key={i} className="neuro-card flex items-start gap-3 rounded-2xl p-5 hover:-translate-y-1 transition-all">
                <CheckIcon />
                <span className="text-[14px] leading-relaxed text-foreground/85">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* Pricing */}
      <section aria-labelledby="pricing-heading" className="neuro-section-border max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <motion.div {...fadeUp}>
          <div className="rounded-3xl bg-gradient-to-br from-violet-900/30 via-indigo-900/20 to-transparent border border-violet-500/20 p-8 sm:p-12">
            <h2
              id="pricing-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight mb-4"
              suppressHydrationWarning
            >
              {ht('codeAudit.pricing.title', '€2,500 — one-time investment')}
            </h2>
            <p className="text-[15px] text-foreground/70 max-w-2xl mb-6" suppressHydrationWarning>
              {ht(
                'codeAudit.pricing.body',
                'Includes the full six-area review, written report with prioritised remediation roadmap, and a 1-hour walkthrough call. No recurring costs, no hidden fees.'
              )}
            </p>
            <p className="text-[14px] text-violet-400 font-medium mb-6" suppressHydrationWarning>
              {ht('codeAudit.pricing.free', 'Not sure yet? Book a free 15-minute architecture review to see if an audit is the right fit.')}
            </p>
            <Link
              href="https://calendly.com/maxwellsoftwaresolutions/discovery"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-500 hover:to-indigo-400 text-white font-bold px-6 py-3 rounded-xl shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-500/60"
              target="_blank"
              rel="noopener noreferrer"
              suppressHydrationWarning
            >
              {ht('codeAudit.pricing.cta', 'Book free 15-min architecture review')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="max-w-3xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <motion.div {...fadeUp}>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-8"
            suppressHydrationWarning
          >
            {ht('codeAudit.faq.heading', 'Frequently asked questions')}
          </h2>
          <div className="space-y-6">
            {faqs.map((item, i) => (
              <FAQItem key={i} question={item.question} answer={item.answer} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Bottom CTA */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <motion.div {...fadeUp}>
          <div className="rounded-3xl bg-gradient-to-br from-violet-900/30 via-indigo-900/20 to-transparent border border-violet-500/20 p-10 sm:p-14 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" suppressHydrationWarning>
              {ht('codeAudit.bottomcta.title', 'Stop guessing. Start with')}{' '}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                data.
              </span>
            </h2>
            <p className="text-base text-foreground/70 max-w-lg mx-auto mb-8" suppressHydrationWarning>
              {ht(
                'codeAudit.bottomcta.body',
                'A code audit gives you an objective, prioritised view of what is actually slowing your team down — and exactly what to fix first.'
              )}
            </p>
            <Link
              href="https://calendly.com/maxwellsoftwaresolutions/discovery"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-500 hover:to-indigo-400 text-white font-bold px-6 py-3 rounded-xl shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-500/60"
              target="_blank"
              rel="noopener noreferrer"
              suppressHydrationWarning
            >
              {ht('codeAudit.bottomcta.cta', 'Book free architecture review')}
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
