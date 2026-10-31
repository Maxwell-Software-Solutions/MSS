'use client';

import type { ReactElement } from 'react';
import Link from 'next/link';
import { useHydratedTranslation } from '@/lib/useHydratedTranslation';
import { BOOKING_URL } from '@/lib/booking';
import { CheckIcon, ExternalIcon, FaqSection, LineIcon } from '@/app/components/ui';

export default function AdvisoryPage(): ReactElement {
  const ht = useHydratedTranslation();

  const includes = [
    {
      icon: <LineIcon name="video" className="item-icon" />,
      text: ht('advisory.include1', '4 async Loom video reviews per month (any technical question)'),
    },
    {
      icon: <LineIcon name="phone" className="item-icon" />,
      text: ht('advisory.include2', '1 monthly 30-minute live strategy call'),
    },
    {
      icon: <LineIcon name="chat" className="item-icon" />,
      text: ht('advisory.include3', 'Slack/email access for quick questions (24hr response SLA)'),
    },
    {
      icon: <LineIcon name="search" className="item-icon" />,
      text: ht('advisory.include4', 'Vendor and tool evaluation when needed'),
    },
  ];

  const perfectFor = [
    ht('advisory.perfectFor1', 'Pre-seed/seed founders making technical decisions without a CTO'),
    ht('advisory.perfectFor2', 'Non-technical founders who need a technical sanity check'),
    ht('advisory.perfectFor3', 'Small teams outgrowing their initial architecture'),
    ht('advisory.perfectFor4', 'Companies between CTOs or waiting for a senior hire'),
  ];

  const processSteps = [
    {
      step: '01',
      title: ht('advisory.process.step1.title', 'Book an intro call (free, 15 min)'),
      body: ht('advisory.process.step1.body', 'We learn about your product, stack, and the technical decisions keeping you up at night. No commitment.'),
    },
    {
      step: '02',
      title: ht('advisory.process.step2.title', 'Share your context'),
      body: ht('advisory.process.step2.body', 'Product overview, tech stack, team structure, and current challenges. We get up to speed fast.'),
    },
    {
      step: '03',
      title: ht('advisory.process.step3.title', 'Get ongoing guidance'),
      body: ht('advisory.process.step3.body', 'Record a Loom when a question comes up, get a detailed video response within 24 hours. Plus a monthly strategy call.'),
    },
  ];

  const faqs = [
    {
      question: ht('advisory.faq.q1', 'What kind of questions can I ask?'),
      answer: ht('advisory.faq.a1', 'Anything technical: architecture decisions, hiring advice, vendor selection, security concerns, scaling strategy, code reviews, build vs buy — whatever you are wrestling with.'),
    },
    {
      question: ht('advisory.faq.q2', 'How do the async reviews work?'),
      answer: ht('advisory.faq.a2', 'Record a Loom (or similar) explaining your question or showing the code/architecture in question. You get a detailed video response within 24 hours walking through our analysis and recommendation.'),
    },
    {
      question: ht('advisory.faq.q3', 'Can I upgrade to a full retainer later?'),
      answer: ht('advisory.faq.a3', 'Yes. CTO-in-a-Box clients get priority access to the Engineering Partner Retainer when they are ready to scale up.'),
    },
    {
      question: ht('advisory.faq.q4', 'What if I need more than 4 reviews in a month?'),
      answer: ht('advisory.faq.a4', 'Additional reviews are available at €100 each, or you can upgrade to the Engineering Partner Retainer for unlimited access.'),
    },
  ];

  return (
    <>
      <header className="wrap page-head">
        <div className="eyebrow" suppressHydrationWarning>
          {ht('advisory.eyebrow', 'CTO-in-a-Box')}
        </div>
        <h1 suppressHydrationWarning>Technical Leadership Without the €120K Salary</h1>
        <p className="lead" suppressHydrationWarning>
          {ht(
            'advisory.subheadline',
            'Async advisory for startup founders who need senior engineering guidance but aren’t ready for a full-time hire.'
          )}
        </p>

        <div className="assurances">
          <span className="price-inline" suppressHydrationWarning>
            {ht('advisory.price', '€500/month')}
          </span>
          <span suppressHydrationWarning>
            <CheckIcon />
            {ht('advisory.cancel', 'Cancel anytime')}
          </span>
        </div>

        <div className="page-actions">
          <Link
            href={BOOKING_URL}
            className="btn btn-accent btn-lg"
            target="_blank"
            rel="noopener noreferrer"
            suppressHydrationWarning
          >
            {ht('advisory.cta.primary', 'Start with a free intro call')}
            <ExternalIcon />
          </Link>
          <Link href="/services/packages" className="btn btn-lg" suppressHydrationWarning>
            {ht('advisory.cta.compare', 'Compare all packages')}
          </Link>
        </div>
      </header>

      <section aria-labelledby="includes-heading" className="section">
        <div className="wrap">
          <h2 id="includes-heading" className="section-head" suppressHydrationWarning>
            {ht('advisory.includes.heading', 'What you get')}
          </h2>
          <div className="columns columns-4">
            {includes.map((item, i) => (
              <div key={i} className="item">
                {item.icon}
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="perfect-for-heading" className="section">
        <div className="wrap split">
          <h2 id="perfect-for-heading" suppressHydrationWarning>
            {ht('advisory.perfectFor.heading', 'Perfect for')}
          </h2>
          <ul className="checks rows">
            {perfectFor.map((item, i) => (
              <li key={i}>
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="process-heading" className="section section-tone">
        <div className="wrap">
          <h2 id="process-heading" className="section-head" suppressHydrationWarning>
            {ht('advisory.process.heading', 'How it works')}
          </h2>
          <div className="steps steps-3" suppressHydrationWarning>
            {processSteps.map((step) => (
              <div key={step.step} className="step">
                <div className="step-index">{step.step}</div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="compare-heading" className="section">
        <div className="wrap">
          <h2 id="compare-heading" className="section-head" suppressHydrationWarning>
            {ht('advisory.compare.heading', 'How it compares')}
          </h2>
          <div className="table-scroll" tabIndex={0}>
            <table className="table table-wide" role="table" aria-label="CTO option comparison">
              <thead>
                <tr>
                  <th scope="col">&nbsp;</th>
                  <th scope="col">{ht('advisory.compare.col.fulltime', 'Full-time CTO')}</th>
                  <th scope="col">{ht('advisory.compare.col.fractional', 'Fractional CTO')}</th>
                  <th scope="col" className="is-featured">{ht('advisory.compare.col.box', 'CTO-in-a-Box')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{ht('advisory.compare.row.cost', 'Cost')}</td>
                  <td>{ht('advisory.compare.fulltime.cost', '€8–15K/mo')}</td>
                  <td>{ht('advisory.compare.fractional.cost', '€3,500/mo')}</td>
                  <td className="is-featured">{ht('advisory.compare.box.cost', '€500/mo')}</td>
                </tr>
                <tr>
                  <td>{ht('advisory.compare.row.commitment', 'Commitment')}</td>
                  <td>{ht('advisory.compare.fulltime.commitment', 'Full-time hire')}</td>
                  <td>{ht('advisory.compare.fractional.commitment', 'Monthly retainer')}</td>
                  <td className="is-featured">{ht('advisory.compare.box.commitment', 'Cancel anytime')}</td>
                </tr>
                <tr>
                  <td>{ht('advisory.compare.row.response', 'Response time')}</td>
                  <td>{ht('advisory.compare.fulltime.response', 'Immediate')}</td>
                  <td>{ht('advisory.compare.fractional.response', 'Same day')}</td>
                  <td className="is-featured">{ht('advisory.compare.box.response', '24 hours')}</td>
                </tr>
                <tr>
                  <td>{ht('advisory.compare.row.bestFor', 'Best for')}</td>
                  <td>{ht('advisory.compare.fulltime.bestFor', 'Scale-ups')}</td>
                  <td>{ht('advisory.compare.fractional.bestFor', 'Growth stage')}</td>
                  <td className="is-featured">{ht('advisory.compare.box.bestFor', 'Early stage')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <FaqSection title={ht('advisory.faq.heading', 'Frequently asked questions')} items={faqs} />

      <section className="band">
        <div className="wrap band-split">
          <h2 suppressHydrationWarning>{ht('advisory.bottomcta.title', 'Senior technical guidance for €500/month.')}</h2>
          <p suppressHydrationWarning>
            {ht(
              'advisory.bottomcta.body',
              'No hiring risk. No long-term contracts. Cancel anytime. Book a free 15-minute intro call and see if it is a fit.'
            )}
          </p>
          <Link
            href={BOOKING_URL}
            className="btn btn-accent btn-lg"
            target="_blank"
            rel="noopener noreferrer"
            suppressHydrationWarning
          >
            {ht('advisory.bottomcta.cta', 'Start with a free intro call')}
            <ExternalIcon />
          </Link>
        </div>
      </section>
    </>
  );
}
