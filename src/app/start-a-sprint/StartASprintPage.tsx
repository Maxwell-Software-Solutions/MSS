'use client';

import type { ReactElement } from 'react';
import Link from 'next/link';
import { useHydratedTranslation } from '@/lib/useHydratedTranslation';
import { BOOKING_URL } from '@/lib/booking';
import { CheckIcon, ExternalIcon, FaqSection } from '@/app/components/ui';

export default function StartASprintPage(): ReactElement {
  const ht = useHydratedTranslation();

  const deliverables = [
    ht('sprint.deliverable1', 'A scoped, working feature or MVP — tested, deployed to staging, ready for review'),
    ht('sprint.deliverable2', 'Clean, documented code with test coverage on critical paths'),
    ht('sprint.deliverable3', 'Daily async updates so you always know where things stand'),
    ht('sprint.deliverable4', 'End-of-sprint demo call and full code handoff'),
    ht('sprint.deliverable5', '30 days of post-sprint support for bugs or deployment questions'),
  ];

  const processSteps = [
    {
      step: '01',
      title: ht('sprint.process.step1.title', 'Discovery call'),
      body: ht('sprint.process.step1.body', '30 minutes. We learn what you need built, what success looks like, and whether a 2-week sprint is the right fit. No pitch, no obligation.'),
    },
    {
      step: '02',
      title: ht('sprint.process.step2.title', 'Scope alignment'),
      body: ht('sprint.process.step2.body', 'We send a concise written scope within 24 hours. You review, we adjust if needed, and then sign off. We only start once both sides are aligned on what done looks like.'),
    },
    {
      step: '03',
      title: ht('sprint.process.step3.title', 'The sprint'),
      body: ht('sprint.process.step3.body', '10 working days of focused delivery. You get a private Slack channel or Linear project, daily progress notes, and can ask questions any time. We are heads-down building.'),
    },
    {
      step: '04',
      title: ht('sprint.process.step4.title', 'Demo and handoff'),
      body: ht('sprint.process.step4.body', 'We demo the work on a live call, walk through the code, and hand over everything — repo access, environment config, runbook. You own it completely.'),
    },
  ];

  const requirements = [
    ht('sprint.req1', 'A clear problem statement — you know what you want to exist at the end of the 2 weeks'),
    ht('sprint.req2', 'A named decision-maker who can answer questions within the same business day'),
    ht('sprint.req3', 'Access to any existing code, design files, or infrastructure we will be building on'),
    ht('sprint.req4', 'Availability for the 30-minute discovery call and the end-of-sprint demo'),
  ];

  const faqs = [
    {
      question: ht('sprint.faq.q1', 'What happens if we do not finish everything in 2 weeks?'),
      answer: ht('sprint.faq.a1', 'We scope conservatively to make sure we deliver on time. If the sprint ends and something agreed in scope is not done, we complete it at no extra charge. If you want to add scope mid-sprint, we either defer it to a second sprint or discuss extending the timeline together.'),
    },
    {
      question: ht('sprint.faq.q2', 'Is the fixed price really the full price? What is not included?'),
      answer: ht('sprint.faq.a2', 'The fixed price covers two weeks of focused development and the demo handoff. It does not include third-party service costs (hosting, APIs, subscriptions) or work added outside the agreed scope. Everything else is included.'),
    },
    {
      question: ht('sprint.faq.q3', 'What kinds of things can you build in 2 weeks?'),
      answer: ht('sprint.faq.a3', 'Authentication and onboarding flows, CRUD dashboards, integrations with external APIs, data pipelines, internal tooling, landing pages with forms, refactoring a specific module, or adding a test suite to an existing service. If it is well-scoped, 2 weeks is plenty.'),
    },
    {
      question: ht('sprint.faq.q4', 'Can we run multiple sprints?'),
      answer: ht('sprint.faq.a4', 'Yes, and many clients do. Each sprint is scoped and priced independently. Repeat clients get priority scheduling.'),
    },
    {
      question: ht('sprint.faq.q5', 'Do you sign an NDA?'),
      answer: ht('sprint.faq.a5', 'Yes. We sign a mutual NDA before any project details or code are shared. Standard practice on every engagement.'),
    },
  ];

  return (
    <>
      <header className="wrap page-head">
        <div className="eyebrow" suppressHydrationWarning>
          {ht('sprint.eyebrow', 'Sprint-in-a-Box')}
        </div>
        <h1 suppressHydrationWarning>
          {ht('sprint.headline.pre', 'Ship Your MVP in')} {ht('sprint.headline.gradient', '2 Weeks.')}{' '}
          {ht('sprint.headline.post', 'Fixed Price.')}
        </h1>
        <p className="lead" suppressHydrationWarning>
          {ht(
            'sprint.subheadline',
            'A focused, self-contained development sprint. You bring the problem statement. We bring a senior engineer, a clear process, and tested code delivered in 10 working days.'
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
            {ht('sprint.cta.primary', 'Start your sprint')}
            <ExternalIcon />
          </Link>
          <Link href="/services/packages" className="btn btn-lg" suppressHydrationWarning>
            {ht('sprint.cta.compare', 'Compare all packages')}
          </Link>
        </div>

        <div className="assurances">
          {[
            ht('sprint.trust.fixed', 'Fixed price — no surprises'),
            ht('sprint.trust.nda', 'NDA on day one'),
            ht('sprint.trust.handoff', 'Full code ownership at handoff'),
          ].map((item, i) => (
            <span key={i} suppressHydrationWarning>
              <CheckIcon />
              {item}
            </span>
          ))}
        </div>
      </header>

      <section aria-labelledby="deliverables-heading" className="section">
        <div className="wrap split">
          <h2 id="deliverables-heading" suppressHydrationWarning>
            {ht('sprint.deliverables.heading', 'What you get in 2 weeks')}
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

      <section aria-labelledby="process-heading" className="section">
        <div className="wrap">
          <h2 id="process-heading" className="section-head" suppressHydrationWarning>
            {ht('sprint.process.heading', 'The process')}
          </h2>
          <div className="steps steps-4" suppressHydrationWarning>
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

      <section aria-labelledby="requirements-heading" className="section section-tone">
        <div className="wrap split">
          <div>
            <h2 id="requirements-heading" suppressHydrationWarning>
              {ht('sprint.requirements.heading', 'What we need from you')}
            </h2>
            <p className="lead" suppressHydrationWarning>
              {ht('sprint.requirements.body', 'A sprint works well when both sides are aligned from the start. This is the minimum we need:')}
            </p>
          </div>
          <ul className="checks rows">
            {requirements.map((req, i) => (
              <li key={i}>
                <CheckIcon />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="section">
        <div className="wrap">
          <div className="callout band-split">
            <p className="eyebrow" suppressHydrationWarning>
              {ht('sprint.midcta.eyebrow', 'Ready to move fast?')}
            </p>
            <h2 suppressHydrationWarning>{ht('sprint.midcta.title', 'Book a 30-minute discovery call')}</h2>
            <p suppressHydrationWarning>
              {ht(
                'sprint.midcta.body',
                'We will listen to what you need, tell you honestly whether a 2-week sprint is the right fit, and confirm pricing. No sales process.'
              )}
            </p>
            <Link
              href={BOOKING_URL}
              className="btn btn-accent"
              target="_blank"
              rel="noopener noreferrer"
              suppressHydrationWarning
            >
              {ht('sprint.midcta.cta', 'Start your sprint')}
            </Link>
          </div>
        </div>
      </div>

      <FaqSection title={ht('sprint.faq.heading', 'Frequently asked questions')} items={faqs} />

      <section className="band">
        <div className="wrap band-split">
          <h2 suppressHydrationWarning>{ht('sprint.bottomcta.title', 'Ship something real in 2 weeks.')}</h2>
          <p suppressHydrationWarning>
            {ht(
              'sprint.bottomcta.body',
              'Fixed price. Fixed timeline. No retainer required. Book the call, confirm scope, and we start the following Monday.'
            )}
          </p>
          <Link
            href={BOOKING_URL}
            className="btn btn-accent btn-lg"
            target="_blank"
            rel="noopener noreferrer"
            suppressHydrationWarning
          >
            {ht('sprint.bottomcta.cta', 'Start your sprint')}
            <ExternalIcon />
          </Link>
        </div>
      </section>
    </>
  );
}
