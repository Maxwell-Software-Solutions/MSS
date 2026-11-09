'use client';

import type { ReactElement } from 'react';
import Link from 'next/link';
import { useHydratedTranslation } from '@/lib/useHydratedTranslation';
import { BOOKING_URL } from '@/lib/booking';
import { CheckIcon, ExternalIcon, FaqSection } from '@/app/components/ui';

export default function FractionalCTOPage(): ReactElement {
  const ht = useHydratedTranslation();

  const responsibilities = [
    {
      title: ht('fractionalCTO.resp1.title', 'Architecture decisions'),
      body: ht('fractionalCTO.resp1.body', 'Evaluate trade-offs, choose the right stack, and design systems that scale with your business.'),
    },
    {
      title: ht('fractionalCTO.resp2.title', 'Team hiring and mentoring'),
      body: ht('fractionalCTO.resp2.body', 'Define engineering roles, run technical interviews, and build a culture of quality and ownership.'),
    },
    {
      title: ht('fractionalCTO.resp3.title', 'Vendor and tooling selection'),
      body: ht('fractionalCTO.resp3.body', 'Cut through vendor noise. Pick the right infrastructure, APIs, and services without over-engineering.'),
    },
    {
      title: ht('fractionalCTO.resp4.title', 'Technical strategy'),
      body: ht('fractionalCTO.resp4.body', 'Align technology decisions with business goals. Build roadmaps that balance speed with sustainability.'),
    },
    {
      title: ht('fractionalCTO.resp5.title', 'Investor tech due diligence'),
      body: ht('fractionalCTO.resp5.body', 'Prepare your tech stack and documentation for investor scrutiny. Present architecture and risk clearly.'),
    },
  ];

  const scenarios = [
    ht('fractionalCTO.scenario1', 'Between CTOs — you need strategic continuity while searching for a full-time hire'),
    ht('fractionalCTO.scenario2', 'Pre-CTO hire — you need someone to define the role, set technical direction, and help you hire well'),
    ht('fractionalCTO.scenario3', 'Scaling past MVP — your product works but the architecture will not survive 10x growth'),
    ht('fractionalCTO.scenario4', 'Preparing for a fundraise — investors will ask hard technical questions and you need clear answers'),
  ];

  const comparison = [
    {
      label: ht('fractionalCTO.compare.commitment', 'Commitment'),
      fullTime: ht('fractionalCTO.compare.commitment.full', 'Full-time, long-term'),
      fractional: ht('fractionalCTO.compare.commitment.frac', 'Month-to-month, flexible'),
    },
    {
      label: ht('fractionalCTO.compare.breadth', 'Expertise breadth'),
      fullTime: ht('fractionalCTO.compare.breadth.full', 'Deep in one domain'),
      fractional: ht('fractionalCTO.compare.breadth.frac', 'Cross-industry experience'),
    },
    {
      label: ht('fractionalCTO.compare.ramp', 'Ramp-up time'),
      fullTime: ht('fractionalCTO.compare.ramp.full', '2–3 months'),
      fractional: ht('fractionalCTO.compare.ramp.frac', '1–2 weeks'),
    },
  ];

  const faqs = [
    {
      question: ht('fractionalCTO.faq.q1', 'How many hours per week do I get?'),
      answer: ht('fractionalCTO.faq.a1', 'The base engagement includes 4 hours per week of dedicated availability — enough for a weekly strategy session, async Slack access, and ad-hoc architectural decisions. Higher-intensity engagements are available.'),
    },
    {
      question: ht('fractionalCTO.faq.q2', 'Can you work alongside our existing CTO?'),
      answer: ht('fractionalCTO.faq.a2', 'Yes. Some clients bring us in as a technical advisor or sounding board for their existing leadership. We adapt to the role that adds the most value.'),
    },
    {
      question: ht('fractionalCTO.faq.q3', 'What if we decide to hire a full-time CTO?'),
      answer: ht('fractionalCTO.faq.a3', 'We help you define the role, write the job spec, evaluate candidates, and ensure a smooth handover. A clean transition is part of the service.'),
    },
  ];

  return (
    <>
      <header className="wrap page-head">
        <div className="eyebrow" suppressHydrationWarning>
          {ht('fractionalCTO.eyebrow', 'Fractional CTO')}
        </div>
        <h1 suppressHydrationWarning>Technical Leadership Without the Full-Time Salary</h1>
        <p className="lead" suppressHydrationWarning>
          {ht(
            'fractionalCTO.subheadline',
            'Senior technical leadership on a flexible, part-time basis. Get architecture decisions, team guidance, and investor-ready strategy — without a full-time C-suite cost.'
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
            {ht('fractionalCTO.cta.primary', 'Book a discovery call')}
            <ExternalIcon />
          </Link>
          <Link href="/services/packages" className="btn btn-lg" suppressHydrationWarning>
            {ht('fractionalCTO.cta.compare', 'Compare all packages')}
          </Link>
        </div>

        <div className="assurances">
          {[
            ht('fractionalCTO.trust.price', 'Monthly retainer'),
            ht('fractionalCTO.trust.flex', 'Month-to-month — cancel any time'),
            ht('fractionalCTO.trust.exp', 'Cross-industry experience'),
          ].map((item, i) => (
            <span key={i} suppressHydrationWarning>
              <CheckIcon />
              {item}
            </span>
          ))}
        </div>
      </header>

      <section aria-labelledby="responsibilities-heading" className="section">
        <div className="wrap">
          <h2 id="responsibilities-heading" className="section-head" suppressHydrationWarning>
            {ht('fractionalCTO.resp.heading', 'What a Fractional CTO does')}
          </h2>
          <div className="steps steps-3" suppressHydrationWarning>
            {responsibilities.map((item, i) => (
              <div key={i} className="step">
                <div className="step-index">{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="scenarios-heading" className="section">
        <div className="wrap split">
          <h2 id="scenarios-heading" suppressHydrationWarning>
            {ht('fractionalCTO.scenarios.heading', 'When you need a Fractional CTO')}
          </h2>
          <ul className="checks rows">
            {scenarios.map((item, i) => (
              <li key={i}>
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="compare-heading" className="section section-tone">
        <div className="wrap">
          <h2 id="compare-heading" className="section-head" suppressHydrationWarning>
            {ht('fractionalCTO.compare.heading', 'Fractional CTO vs full-time CTO')}
          </h2>
          <div className="table-scroll" tabIndex={0}>
            <table className="table" role="table" aria-label="Fractional CTO vs full-time CTO comparison">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">{ht('fractionalCTO.compare.col.full', 'Full-time CTO')}</th>
                  <th scope="col" className="is-featured">{ht('fractionalCTO.compare.col.frac', 'Fractional CTO')}</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={i}>
                    <td>{row.label}</td>
                    <td>{row.fullTime}</td>
                    <td>{row.fractional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="section">
        <div className="wrap">
          <div className="callout band-split">
            <p className="eyebrow" suppressHydrationWarning>
              {ht('fractionalCTO.midcta.eyebrow', 'Monthly retainer')}
            </p>
            <h2 suppressHydrationWarning>{ht('fractionalCTO.midcta.title', 'Book a discovery call')}</h2>
            <p suppressHydrationWarning>
              {ht(
                'fractionalCTO.midcta.body',
                'We will discuss your current challenges, technical goals, and whether a fractional engagement is the right fit. No obligation.'
              )}
            </p>
            <Link
              href={BOOKING_URL}
              className="btn btn-accent"
              target="_blank"
              rel="noopener noreferrer"
              suppressHydrationWarning
            >
              {ht('fractionalCTO.midcta.cta', 'Book a discovery call')}
            </Link>
          </div>
        </div>
      </div>

      <FaqSection title={ht('fractionalCTO.faq.heading', 'Frequently asked questions')} items={faqs} />

      <section className="band">
        <div className="wrap band-split">
          <h2 suppressHydrationWarning>Technical leadership — on your terms.</h2>
          <p suppressHydrationWarning>
            {ht(
              'fractionalCTO.bottomcta.body',
              'Month-to-month. No long-term contract. Senior leadership from day one.'
            )}
          </p>
          <Link
            href={BOOKING_URL}
            className="btn btn-accent btn-lg"
            target="_blank"
            rel="noopener noreferrer"
            suppressHydrationWarning
          >
            {ht('fractionalCTO.bottomcta.cta', 'Book a discovery call')}
            <ExternalIcon />
          </Link>
        </div>
      </section>
    </>
  );
}
