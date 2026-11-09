'use client';

import type { ReactElement } from 'react';
import Link from 'next/link';
import { useHydratedTranslation } from '@/lib/useHydratedTranslation';
import { BOOKING_URL } from '@/lib/booking';
import { CheckIcon, ExternalIcon, FaqSection } from '@/app/components/ui';

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

  const faqs = [
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
      answer: ht('codeAudit.faq.a3', 'You own the report and roadmap completely. It is written to prioritise your next quarter of engineering work. If you want help implementing the recommendations, we can discuss a Sprint-in-a-Box or Retainer engagement.'),
    },
    {
      question: ht('codeAudit.faq.q4', 'What tech stacks do you cover?'),
      answer: ht('codeAudit.faq.a4', 'Node.js, TypeScript, Python, Go, Java, .NET, React, Vue, Next.js, and most SQL/NoSQL databases. If your stack is not listed, mention it in the call and we will confirm coverage.'),
    },
  ];

  return (
    <>
      <header className="wrap page-head">
        <div className="eyebrow" suppressHydrationWarning>
          {ht('codeAudit.eyebrow', 'Code Audit Service')}
        </div>
        <h1 suppressHydrationWarning>Find Out Why Your Dev Team Is Slow</h1>
        <p className="lead" suppressHydrationWarning>
          {ht(
            'codeAudit.subheadline',
            'An independent, structured review of your codebase that surfaces the root causes of slow delivery, fragile deployments, and mounting technical debt.'
          )}
        </p>

        <div className="page-actions">
          <Link
            href={BOOKING_URL}
            className="btn btn-accent btn-lg"
            target="_blank"
            rel="noopener noreferrer"
            suppressHydrationWarning
          >
            {ht('codeAudit.cta.primary', 'Book free 15-min architecture review')}
            <ExternalIcon />
          </Link>
          <Link href="/services/packages" className="btn btn-lg" suppressHydrationWarning>
            {ht('codeAudit.cta.compare', 'Compare all packages')}
          </Link>
        </div>

        <div className="assurances">
          {[
            ht('codeAudit.trust.price', 'One-time fee'),
            ht('codeAudit.trust.time', 'Report in 5 business days'),
            ht('codeAudit.trust.free', 'Free 15-min preview available'),
          ].map((item, i) => (
            <span key={i} suppressHydrationWarning>
              <CheckIcon />
              {item}
            </span>
          ))}
        </div>
      </header>

      <section aria-labelledby="areas-heading" className="section">
        <div className="wrap">
          <h2 id="areas-heading" className="section-head" suppressHydrationWarning>
            {ht('codeAudit.areas.heading', 'Six areas we examine')}
          </h2>
          <div className="steps steps-3" suppressHydrationWarning>
            {auditAreas.map((area, i) => (
              <div key={i} className="step">
                <div className="step-index">{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <h3>{area.title}</h3>
                  <p>{area.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="deliverables-heading" className="section">
        <div className="wrap split">
          <h2 id="deliverables-heading" suppressHydrationWarning>
            What you get
          </h2>
          <ul className="checks rows">
            {deliverables.map((item, i) => (
              <li key={i}>
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="pricing-heading" className="section section-tone">
        <div className="wrap split">
          <h2 id="pricing-heading" suppressHydrationWarning>
            {ht('codeAudit.pricing.title', 'A one-time investment')}
          </h2>
          <div>
            <p className="lead" suppressHydrationWarning>
              {ht(
                'codeAudit.pricing.body',
                'Includes the full six-area review, written report with prioritised remediation roadmap, and a 1-hour walkthrough call. No recurring costs, no hidden fees.'
              )}
            </p>
            <p className="measure mt-4 font-medium text-accent" suppressHydrationWarning>
              {ht('codeAudit.pricing.free', 'Not sure yet? Book a free 15-minute architecture review to see if an audit is the right fit.')}
            </p>
            <div className="page-actions">
              <Link
                href={BOOKING_URL}
                className="btn btn-accent"
                target="_blank"
                rel="noopener noreferrer"
                suppressHydrationWarning
              >
                {ht('codeAudit.pricing.cta', 'Book free 15-min architecture review')}
                <ExternalIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FaqSection title={ht('codeAudit.faq.heading', 'Frequently asked questions')} items={faqs} />

      <section className="band">
        <div className="wrap band-split">
          <h2 suppressHydrationWarning>{ht('codeAudit.bottomcta.title', 'Stop guessing. Start with')} data.</h2>
          <p suppressHydrationWarning>
            {ht(
              'codeAudit.bottomcta.body',
              'A code audit gives you an objective, prioritised view of what is actually slowing your team down — and exactly what to fix first.'
            )}
          </p>
          <Link
            href={BOOKING_URL}
            className="btn btn-accent btn-lg"
            target="_blank"
            rel="noopener noreferrer"
            suppressHydrationWarning
          >
            {ht('codeAudit.bottomcta.cta', 'Book free architecture review')}
            <ExternalIcon />
          </Link>
        </div>
      </section>
    </>
  );
}
