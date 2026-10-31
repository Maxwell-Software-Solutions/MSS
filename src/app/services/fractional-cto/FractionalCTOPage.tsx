'use client';

import type { ReactElement } from 'react';
import Link from 'next/link';
import { useHydratedTranslation } from '@/lib/useHydratedTranslation';
import { BOOKING_URL } from '@/lib/booking';

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
      <h3 className="text-[15px] mb-2">{question}</h3>
      <p className="text-[14px] text-foreground/75 leading-relaxed">{answer}</p>
    </div>
  );
}

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
      label: ht('fractionalCTO.compare.cost', 'Annual cost'),
      fullTime: ht('fractionalCTO.compare.cost.full', '€120,000–€180,000+'),
      fractional: ht('fractionalCTO.compare.cost.frac', 'From €3,500/month'),
    },
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

  const faqs: FAQItemProps[] = [
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
      {/* Hero */}
      <header className="max-w-6xl mx-auto px-6 sm:px-10 pt-20 sm:pt-24 pb-10">
        <div className="eyebrow mb-4" suppressHydrationWarning>
          {ht('fractionalCTO.eyebrow', 'Fractional CTO')}
        </div>
        <h1
          className="max-w-3xl"
          suppressHydrationWarning
        >
          Technical Leadership Without the{' '}
          <span>
            €120K Salary
          </span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-foreground/70 max-w-2xl" suppressHydrationWarning>
          {ht(
            'fractionalCTO.subheadline',
            'Senior technical leadership on a flexible, part-time basis. Get architecture decisions, team guidance, and investor-ready strategy — without a full-time C-suite cost.'
          )}
        </p>

        <div className="mt-8 flex flex-wrap gap-4 items-center">
          <Link
            href={BOOKING_URL}
            className="inline-flex items-center gap-2 btn btn-accent px-6 py-3 rounded-xl transition-all"
            target="_blank"
            rel="noopener noreferrer"
            suppressHydrationWarning
          >
            {ht('fractionalCTO.cta.primary', 'Book a discovery call')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
          <Link
            href="/services/packages"
            className="btn px-6 py-3 rounded-xl transition-all text-[14px] font-medium"
            suppressHydrationWarning
          >
            {ht('fractionalCTO.cta.compare', 'Compare all packages')}
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          {[
            ht('fractionalCTO.trust.price', 'From €3,500/month'),
            ht('fractionalCTO.trust.flex', 'Month-to-month — cancel any time'),
            ht('fractionalCTO.trust.exp', 'Cross-industry experience'),
          ].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 text-[13px] text-foreground/65"
              suppressHydrationWarning
            >
              <CheckIcon />
              {item}
            </span>
          ))}
        </div>
      </header>

      {/* What a Fractional CTO does */}
      <section aria-labelledby="responsibilities-heading" className="border-t border-border max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <div className="mb-8">
          <h2
            id="responsibilities-heading"
            className="text-3xl sm:text-4xl tracking-tight"
            suppressHydrationWarning
          >
            {ht('fractionalCTO.resp.heading', 'What a Fractional CTO does')}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" suppressHydrationWarning>
          {responsibilities.map((item, i) => (
            <div key={i} className="card rounded-2xl p-6 flex gap-5 transition-all">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 text-accent font-semibold text-sm flex items-center justify-center">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div>
                <h3 className="mb-1.5">{item.title}</h3>
                <p className="text-[14px] text-foreground/75 leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* When you need one */}
      <section aria-labelledby="scenarios-heading" className="max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <h2
          id="scenarios-heading"
          className="text-3xl sm:text-4xl tracking-tight mb-6"
          suppressHydrationWarning
        >
          {ht('fractionalCTO.scenarios.heading', 'When you need a Fractional CTO')}
        </h2>
        <ul className="space-y-3">
          {scenarios.map((item, i) => (
            <li key={i} className="card flex items-start gap-3 rounded-2xl p-5 transition-all">
              <CheckIcon />
              <span className="text-[14px] leading-relaxed text-foreground/85">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Comparison table */}
      <section aria-labelledby="compare-heading" className="border-t border-border max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <h2
          id="compare-heading"
          className="text-3xl sm:text-4xl tracking-tight mb-8"
          suppressHydrationWarning
        >
          {ht('fractionalCTO.compare.heading', 'Fractional CTO vs full-time CTO')}
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-border card">
          <table className="w-full text-[13px]" role="table" aria-label="Fractional CTO vs full-time CTO comparison">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-semibold" scope="col"></th>
                <th className="text-left p-4 font-semibold" scope="col">{ht('fractionalCTO.compare.col.full', 'Full-time CTO')}</th>
                <th className="text-left p-4 font-semibold text-accent" scope="col">{ht('fractionalCTO.compare.col.frac', 'Fractional CTO')}</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <tr key={i} className="border-b border-border hover:bg-foreground/5 transition-colors last:border-b-0">
                  <td className="p-4 font-medium">{row.label}</td>
                  <td className="p-4 text-foreground/80">{row.fullTime}</td>
                  <td className="p-4 text-foreground/80">{row.fractional}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Mid-page CTA */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <div className="band band-split p-8 sm:p-12">
          <p className="eyebrow" suppressHydrationWarning>
            {ht('fractionalCTO.midcta.eyebrow', 'From €3,500/month')}
          </p>
          <h2 className="text-3xl sm:text-4xl tracking-tight mb-4" suppressHydrationWarning>
            {ht('fractionalCTO.midcta.title', 'Book a discovery call')}
          </h2>
          <p className="text-base text-foreground/70 max-w-xl" suppressHydrationWarning>
            {ht(
              'fractionalCTO.midcta.body',
              'We will discuss your current challenges, technical goals, and whether a fractional engagement is the right fit. No obligation.'
            )}
          </p>
          <Link
            href={BOOKING_URL}
            className="inline-flex items-center gap-2 btn btn-accent px-6 py-3 rounded-xl transition-all"
            target="_blank"
            rel="noopener noreferrer"
            suppressHydrationWarning
          >
            {ht('fractionalCTO.midcta.cta', 'Book a discovery call')}
          </Link>
        </div>
      </div>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="border-t border-border max-w-6xl mx-auto px-6 sm:px-10 [&>*]:max-w-3xl py-16 sm:py-20">
        <h2
          id="faq-heading"
          className="text-3xl sm:text-4xl tracking-tight mb-8"
          suppressHydrationWarning
        >
          {ht('fractionalCTO.faq.heading', 'Frequently asked questions')}
        </h2>
        <div className="space-y-6">
          {faqs.map((item, i) => (
            <FAQItem key={i} question={item.question} answer={item.answer} />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <div className="band band-split p-8 sm:p-12">
          <h2 className="text-3xl sm:text-4xl tracking-tight mb-4" suppressHydrationWarning>
            Technical leadership —{' '}
            <span>
              on your terms.
            </span>
          </h2>
          <p className="text-base text-foreground/70 max-w-lg" suppressHydrationWarning>
            {ht(
              'fractionalCTO.bottomcta.body',
              'Month-to-month. No long-term contract. Senior leadership from day one.'
            )}
          </p>
          <Link
            href={BOOKING_URL}
            className="inline-flex items-center gap-2 btn btn-accent px-6 py-3 rounded-xl transition-all"
            target="_blank"
            rel="noopener noreferrer"
            suppressHydrationWarning
          >
            {ht('fractionalCTO.bottomcta.cta', 'Book a discovery call')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
