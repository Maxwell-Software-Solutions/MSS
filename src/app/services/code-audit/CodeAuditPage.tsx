'use client';

import type { ReactElement } from 'react';
import Link from 'next/link';
import { useHydratedTranslation } from '@/lib/useHydratedTranslation';

function CheckIcon(): ReactElement {
  return (
    <svg
      className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
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
    <div className="border-b border-border pb-6">
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
        <p className="tracking-wide text-[13px] text-slate-500 dark:text-slate-400 mb-3 uppercase" suppressHydrationWarning>
          {ht('codeAudit.eyebrow', 'Code Audit Service')}
        </p>
        <h1
          className="font-semibold leading-[1.1] max-w-3xl text-[clamp(34px,3.4vw,52px)]"
          suppressHydrationWarning
        >
          {ht('codeAudit.headline', 'Code Audit — Find Out Why Your Dev Team Is Slow')}
        </h1>
        <p className="mt-5 max-w-2xl text-base md:text-lg leading-[1.65] text-[--muted]" suppressHydrationWarning>
          {ht(
            'codeAudit.subheadline',
            'An independent, structured review of your codebase that surfaces the root causes of slow delivery, fragile deployments, and mounting technical debt.'
          )}
        </p>

        <div className="mt-8 flex flex-wrap gap-4 items-center">
          <Link
            href="https://calendly.com/maxwellsoftwaresolutions/discovery"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl px-7 py-3.5 text-sm font-semibold hover:bg-accent/90 transition-all shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent/60"
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
            className="text-[14px] font-medium text-foreground/70 hover:text-foreground transition-colors underline underline-offset-2"
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
      </header>

      {/* What we examine */}
      <section aria-labelledby="areas-heading" className="py-16 sm:py-20 bg-card/30">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <h2
            id="areas-heading"
            className="text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.25] tracking-tight mb-8"
            suppressHydrationWarning
          >
            {ht('codeAudit.areas.heading', 'Six areas we examine')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" suppressHydrationWarning>
            {auditAreas.map((area, i) => (
              <div key={i} className="rounded-2xl border border-border bg-background/50 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 text-accent font-bold text-xs flex items-center justify-center">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-semibold">{area.title}</h3>
                </div>
                <p className="text-[14px] text-foreground/75 leading-relaxed">{area.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section aria-labelledby="deliverables-heading" className="py-16 sm:py-20 max-w-6xl mx-auto px-6 sm:px-10">
        <h2
          id="deliverables-heading"
          className="text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.25] tracking-tight mb-6"
          suppressHydrationWarning
        >
          {ht('codeAudit.deliverables.heading', 'What you get')}
        </h2>
        <ul className="space-y-4">
          {deliverables.map((item, i) => (
            <li key={i} className="flex items-start gap-3 bg-card/50 rounded-2xl border border-border p-5">
              <CheckIcon />
              <span className="text-[14px] leading-relaxed text-foreground/85">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Pricing */}
      <section aria-labelledby="pricing-heading" className="py-16 sm:py-20 bg-card/30">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <div className="rounded-3xl border border-accent/20 bg-accent/5 p-8 sm:p-12">
            <h2
              id="pricing-heading"
              className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4"
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
            <p className="text-[14px] text-accent font-medium mb-6" suppressHydrationWarning>
              {ht('codeAudit.pricing.free', 'Not sure yet? Book a free 15-minute architecture review to see if an audit is the right fit.')}
            </p>
            <Link
              href="https://calendly.com/maxwellsoftwaresolutions/discovery"
              className="inline-flex items-center gap-2 bg-accent text-white rounded-xl px-8 py-3.5 text-sm font-semibold hover:bg-accent/90 transition-all shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent/60"
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
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-6 sm:px-10">
          <h2
            id="faq-heading"
            className="text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.25] tracking-tight mb-8"
            suppressHydrationWarning
          >
            {ht('codeAudit.faq.heading', 'Frequently asked questions')}
          </h2>
          <div className="space-y-6">
            {faqs.map((item, i) => (
              <FAQItem key={i} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-20 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4" suppressHydrationWarning>
          {ht('codeAudit.bottomcta.title', 'Stop guessing. Start with data.')}
        </h2>
        <p className="text-[15px] text-foreground/70 max-w-lg mx-auto mb-7" suppressHydrationWarning>
          {ht(
            'codeAudit.bottomcta.body',
            'A code audit gives you an objective, prioritised view of what is actually slowing your team down — and exactly what to fix first.'
          )}
        </p>
        <Link
          href="https://calendly.com/maxwellsoftwaresolutions/discovery"
          className="inline-flex items-center gap-2 bg-accent text-white rounded-xl px-8 py-4 text-base font-semibold hover:bg-accent/90 transition-all shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent/60"
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
    </>
  );
}
