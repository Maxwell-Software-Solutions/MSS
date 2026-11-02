'use client';

import type { ReactElement } from 'react';
import { useHydratedTranslation } from '@/lib/useHydratedTranslation';
import { CheckIcon, FaqSection } from '@/app/components/ui';

export default function FreeAuditPage(): ReactElement {
  const ht = useHydratedTranslation();

  const deliverables = [
    ht('freeAudit.deliverable1', 'Architecture review — structural weaknesses, coupling issues, and scalability concerns documented with remediation priorities'),
    ht('freeAudit.deliverable2', 'Security scan — dependency vulnerabilities, exposed attack surfaces, and misconfigured access patterns'),
    ht('freeAudit.deliverable3', 'Performance bottlenecks — slow query patterns, blocking I/O, memory pressure points, and frontend bundle issues'),
    ht('freeAudit.deliverable4', 'Tech debt assessment — quantified complexity, duplication hotspots, and areas where velocity is eroding'),
    ht('freeAudit.deliverable5', 'Actionable report — prioritised fix list with effort estimates, delivered within 5 business days'),
  ];

  const forWho = [
    ht('freeAudit.forWho1', 'CTOs and VPs of Engineering who suspect their codebase is slowing down their team'),
    ht('freeAudit.forWho2', 'Founders preparing for a fundraise or acquisition who need a clean bill of technical health'),
    ht('freeAudit.forWho3', 'Engineering managers inheriting legacy systems with no documentation'),
    ht('freeAudit.forWho4', 'Product leaders who keep missing sprint commitments and want to understand why'),
  ];

  const faqs = [
    {
      question: ht('freeAudit.faq.q1', 'What does "free" actually mean? Is there a catch?'),
      answer: ht('freeAudit.faq.a1', 'No catch. We conduct a genuine 5-day audit of your codebase at no charge. Our goal is to demonstrate value upfront. Some companies go on to hire us for a full engagement; many do not — and that is fine. We publish our findings regardless.'),
    },
    {
      question: ht('freeAudit.faq.q2', 'How do you access our code? Is it secure?'),
      answer: ht('freeAudit.faq.a2', 'We work with read-only access to a private repository or a sanitised export. We sign an NDA before any code is shared. All findings are stored encrypted and deleted after delivery.'),
    },
    {
      question: ht('freeAudit.faq.q3', 'What tech stacks do you cover?'),
      answer: ht('freeAudit.faq.a3', 'Our team covers Node.js, TypeScript, Python, Go, Java, .NET, React, Vue, and most SQL/NoSQL databases. If your stack is not listed, mention it in the form and we will confirm before you commit to anything.'),
    },
    {
      question: ht('freeAudit.faq.q4', 'How long does it take to get results?'),
      answer: ht('freeAudit.faq.a4', 'We deliver the written report within 5 business days of receiving repository access. We then schedule a 60-minute walkthrough call to go through the findings with your team.'),
    },
  ];

  return (
    <>
      {/* Urgency Banner */}
      <div className="notice-bar">
        <p suppressHydrationWarning>
          {ht('freeAudit.urgency', 'Limited to 5 audits per month — currently accepting applications')}
        </p>
      </div>

      <header className="wrap page-head">
        <div className="eyebrow" suppressHydrationWarning>
          {ht('freeAudit.eyebrow', 'Free Code Health Audit')}
        </div>
        <h1 suppressHydrationWarning>
          {ht('freeAudit.headline.pre', 'Get a Free Code Health Audit')}{' '}
          {ht('freeAudit.headline.gradient', 'Worth €2,500')}
        </h1>
        <p className="lead" suppressHydrationWarning>
          {ht(
            'freeAudit.subheadline',
            'We review your codebase, identify what is slowing your team down, and hand you a prioritised remediation plan — at no cost, no obligation.'
          )}
        </p>
        <div className="assurances">
          <span suppressHydrationWarning>
            <CheckIcon />
            {ht('freeAudit.badge.free', 'Completely free')}
          </span>
          <span suppressHydrationWarning>
            <CheckIcon />
            {ht('freeAudit.badge.time', '5 business days')}
          </span>
          <span suppressHydrationWarning>
            <CheckIcon />
            {ht('freeAudit.badge.nda', 'NDA-protected')}
          </span>
        </div>
      </header>

      <section aria-labelledby="audit-details-heading" className="section">
        <div className="wrap split">
          <div className="stack">
            <div>
              <h2 id="audit-details-heading" className="section-subhead" suppressHydrationWarning>
                {ht('freeAudit.whatYouGet.heading', 'What is included')}
              </h2>
              <ul className="checks">
                {deliverables.map((item, i) => (
                  <li key={i}>
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="section-subhead" suppressHydrationWarning>
                {ht('freeAudit.forWho.heading', 'Who this is for')}
              </h2>
              <ol className="numbered">
                {forWho.map((item, i) => (
                  <li key={i}>
                    <span className="step-index">{i + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="form-panel">
            <h2 className="form-title" suppressHydrationWarning>
              {ht('freeAudit.form.heading', 'Apply for your free audit')}
            </h2>
            <p className="form-note mt-2 mb-6" suppressHydrationWarning>
              {ht('freeAudit.form.subheading', 'We will confirm availability within 1 business day.')}
            </p>

            <form
              action="https://formspree.io/f/mwpeplnb"
              method="POST"
              className="form-stack"
              aria-label="Free Code Health Audit application form"
            >
              <div>
                <label htmlFor="audit-name" className="form-label">
                  {ht('freeAudit.form.name', 'Full name')} <span className="text-accent" aria-label="required">*</span>
                </label>
                <input
                  id="audit-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Jane Smith"
                  className="field"
                />
              </div>

              <div>
                <label htmlFor="audit-email" className="form-label">
                  {ht('freeAudit.form.email', 'Work email')} <span className="text-accent" aria-label="required">*</span>
                </label>
                <input
                  id="audit-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="jane@company.com"
                  className="field"
                />
              </div>

              <div>
                <label htmlFor="audit-company" className="form-label">
                  {ht('freeAudit.form.company', 'Company')} <span className="text-accent" aria-label="required">*</span>
                </label>
                <input
                  id="audit-company"
                  name="company"
                  type="text"
                  required
                  autoComplete="organization"
                  placeholder="Acme Inc."
                  className="field"
                />
              </div>

              <div>
                <label htmlFor="audit-stack" className="form-label">
                  {ht('freeAudit.form.stack', 'Primary tech stack')} <span className="text-accent" aria-label="required">*</span>
                </label>
                <input
                  id="audit-stack"
                  name="tech_stack"
                  type="text"
                  required
                  placeholder="e.g. Node.js, React, PostgreSQL"
                  className="field"
                />
              </div>

              <div>
                <label htmlFor="audit-context" className="form-label">
                  {ht('freeAudit.form.context', 'What is your main concern? (optional)')}
                </label>
                <textarea
                  id="audit-context"
                  name="context"
                  rows={3}
                  placeholder="e.g. we keep missing sprint deadlines, deployment takes 2 hours, etc."
                  className="field resize-none"
                />
              </div>

              <button type="submit" className="w-full btn btn-accent" suppressHydrationWarning>
                {ht('freeAudit.form.cta', 'Apply for free audit')}
              </button>

              <p className="form-note text-center" suppressHydrationWarning>
                {ht('freeAudit.form.privacy', 'No spam. We only contact you about your audit request.')}{' '}
                <a className="link" href="/privacy">
                  {ht('freeAudit.form.privacy.link', 'Privacy Policy')}
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>

      <FaqSection title={ht('freeAudit.faq.heading', 'Frequently asked questions')} items={faqs} tone />

      <section className="band">
        <div className="wrap band-split">
          <p className="eyebrow" suppressHydrationWarning>
            {ht('freeAudit.cta.eyebrow', 'Limited availability')}
          </p>
          <h2 suppressHydrationWarning>{ht('freeAudit.cta.title', 'Only 5 audit slots open per month')}</h2>
          <p suppressHydrationWarning>
            {ht(
              'freeAudit.cta.body',
              'Each audit gets our full attention. We cap intake to ensure quality. If you are curious about your codebase, now is the time to apply.'
            )}
          </p>
          <a href="#audit-name" className="btn btn-accent btn-lg" suppressHydrationWarning>
            {ht('freeAudit.cta.button', 'Apply now — it is free')}
          </a>
        </div>
      </section>
    </>
  );
}
