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

  const faqs: FAQItemProps[] = [
    {
      question: ht('sprint.faq.q1', 'What happens if we do not finish everything in 2 weeks?'),
      answer: ht('sprint.faq.a1', 'We scope conservatively to make sure we deliver on time. If the sprint ends and something agreed in scope is not done, we complete it at no extra charge. If you want to add scope mid-sprint, we either defer it to a second sprint or discuss extending the timeline together.'),
    },
    {
      question: ht('sprint.faq.q2', 'Is €4,800 really the full price? What is not included?'),
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
      {/* Hero */}
      <header className="max-w-5xl mx-auto px-6 sm:px-10 pt-16 sm:pt-20 pb-6">
        <p className="tracking-wide text-[13px] text-slate-500 dark:text-slate-400 mb-3 uppercase" suppressHydrationWarning>
          {ht('sprint.eyebrow', 'Sprint-in-a-Box')}
        </p>
        <h1
          className="font-semibold leading-[1.1] max-w-3xl text-[clamp(34px,3.4vw,52px)]"
          suppressHydrationWarning
        >
          {ht('sprint.headline', 'Ship Your MVP in 2 Weeks. €4,800 Fixed Price.')}
        </h1>
        <p className="mt-5 max-w-2xl text-base md:text-lg leading-[1.65] text-[--muted]" suppressHydrationWarning>
          {ht(
            'sprint.subheadline',
            'A focused, self-contained development sprint. You bring the problem statement. We bring a senior engineer, a clear process, and tested code delivered in 10 working days.'
          )}
        </p>

        {/* Primary CTA */}
        <div className="mt-8 flex flex-wrap gap-4 items-center">
          <Link
            href="https://calendly.com/maxwellsoftwaresolutions/discovery"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl px-7 py-3.5 text-sm font-semibold hover:bg-accent/90 transition-all shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent/60"
            target="_blank"
            rel="noopener noreferrer"
            suppressHydrationWarning
          >
            {ht('sprint.cta.primary', 'Start your sprint — €4,800')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
          <Link
            href="/services/packages"
            className="text-[14px] font-medium text-foreground/70 hover:text-foreground transition-colors underline underline-offset-2"
            suppressHydrationWarning
          >
            {ht('sprint.cta.compare', 'Compare all packages')}
          </Link>
        </div>

        {/* Trust signals */}
        <div className="mt-6 flex flex-wrap gap-4">
          {[
            ht('sprint.trust.fixed', 'Fixed price — no surprises'),
            ht('sprint.trust.nda', 'NDA on day one'),
            ht('sprint.trust.handoff', 'Full code ownership at handoff'),
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

      {/* What you get */}
      <section aria-labelledby="deliverables-heading" className="py-12 sm:py-16 bg-card/30">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <h2
            id="deliverables-heading"
            className="text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.25] tracking-tight mb-6"
            suppressHydrationWarning
          >
            {ht('sprint.deliverables.heading', 'What you get in 2 weeks')}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {deliverables.map((item, i) => (
              <li key={i} className="flex items-start gap-3 bg-background/50 rounded-2xl border border-border p-5">
                <CheckIcon />
                <span className="text-[14px] leading-relaxed text-foreground/85">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process-heading" className="py-12 sm:py-16 max-w-5xl mx-auto px-6 sm:px-10">
        <h2
          id="process-heading"
          className="text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.25] tracking-tight mb-10"
          suppressHydrationWarning
        >
          {ht('sprint.process.heading', 'The process')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" suppressHydrationWarning>
          {processSteps.map((step) => (
            <div key={step.step} className="flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 text-accent font-bold text-sm flex items-center justify-center">
                {step.step}
              </div>
              <div>
                <h3 className="font-semibold mb-1.5">{step.title}</h3>
                <p className="text-[14px] text-foreground/75 leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Requirements */}
      <section aria-labelledby="requirements-heading" className="py-12 sm:py-14 bg-card/30">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <h2
            id="requirements-heading"
            className="text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.25] tracking-tight mb-3"
            suppressHydrationWarning
          >
            {ht('sprint.requirements.heading', 'What we need from you')}
          </h2>
          <p className="text-[15px] text-foreground/70 mb-6" suppressHydrationWarning>
            {ht('sprint.requirements.body', 'A sprint works well when both sides are aligned from the start. This is the minimum we need:')}
          </p>
          <ul className="space-y-3">
            {requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckIcon />
                <span className="text-[14px] leading-relaxed text-foreground/85">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Mid-page CTA */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-12 sm:py-14 text-center">
        <p className="text-[13px] uppercase tracking-widest font-semibold text-foreground/50 mb-3" suppressHydrationWarning>
          {ht('sprint.midcta.eyebrow', 'Ready to move fast?')}
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4" suppressHydrationWarning>
          {ht('sprint.midcta.title', 'Book a 30-minute discovery call')}
        </h2>
        <p className="text-[15px] text-foreground/70 max-w-xl mx-auto mb-6" suppressHydrationWarning>
          {ht(
            'sprint.midcta.body',
            'We will listen to what you need, tell you honestly whether a 2-week sprint is the right fit, and confirm pricing. No sales process.'
          )}
        </p>
        <Link
          href="https://calendly.com/maxwellsoftwaresolutions/discovery"
          className="inline-flex items-center gap-2 bg-accent text-white rounded-xl px-8 py-3.5 text-sm font-semibold hover:bg-accent/90 transition-all shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent/60"
          target="_blank"
          rel="noopener noreferrer"
          suppressHydrationWarning
        >
          {ht('sprint.midcta.cta', 'Start your sprint — €4,800')}
        </Link>
      </div>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="py-12 sm:py-16 bg-card/30">
        <div className="max-w-3xl mx-auto px-6 sm:px-10">
          <h2
            id="faq-heading"
            className="text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.25] tracking-tight mb-8"
            suppressHydrationWarning
          >
            {ht('sprint.faq.heading', 'Frequently asked questions')}
          </h2>
          <div className="space-y-6">
            {faqs.map((item, i) => (
              <FAQItem key={i} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-14 sm:py-20 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4" suppressHydrationWarning>
          {ht('sprint.bottomcta.title', 'Ship something real in 2 weeks.')}
        </h2>
        <p className="text-[15px] text-foreground/70 max-w-lg mx-auto mb-7" suppressHydrationWarning>
          {ht(
            'sprint.bottomcta.body',
            'Fixed price. Fixed timeline. No retainer required. Book the call, confirm scope, and we start the following Monday.'
          )}
        </p>
        <Link
          href="https://calendly.com/maxwellsoftwaresolutions/discovery"
          className="inline-flex items-center gap-2 bg-accent text-white rounded-xl px-8 py-4 text-base font-semibold hover:bg-accent/90 transition-all shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent/60"
          target="_blank"
          rel="noopener noreferrer"
          suppressHydrationWarning
        >
          {ht('sprint.bottomcta.cta', 'Start your sprint — €4,800')}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </Link>
      </div>
    </>
  );
}
