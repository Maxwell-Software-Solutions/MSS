'use client';

import type { ReactElement } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useHydratedTranslation } from '@/lib/useHydratedTranslation';

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

function VideoIcon(): ReactElement {
  return (
    <svg className="w-6 h-6 text-violet-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

function PhoneIcon(): ReactElement {
  return (
    <svg className="w-6 h-6 text-violet-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function ChatIcon(): ReactElement {
  return (
    <svg className="w-6 h-6 text-violet-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}

function SearchIcon(): ReactElement {
  return (
    <svg className="w-6 h-6 text-violet-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps): ReactElement {
  return (
    <div className="border-b border-violet-500/10 pb-6">
      <h3 className="text-[15px] font-semibold mb-2">{question}</h3>
      <p className="text-[14px] text-foreground/75 leading-relaxed">{answer}</p>
    </div>
  );
}

export default function AdvisoryPage(): ReactElement {
  const ht = useHydratedTranslation();

  const includes = [
    {
      icon: <VideoIcon />,
      text: ht('advisory.include1', '4 async Loom video reviews per month (any technical question)'),
    },
    {
      icon: <PhoneIcon />,
      text: ht('advisory.include2', '1 monthly 30-minute live strategy call'),
    },
    {
      icon: <ChatIcon />,
      text: ht('advisory.include3', 'Slack/email access for quick questions (24hr response SLA)'),
    },
    {
      icon: <SearchIcon />,
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

  const faqs: FAQItemProps[] = [
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
      {/* Hero */}
      <header className="max-w-6xl mx-auto px-6 sm:px-10 pt-20 sm:pt-24 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="eyebrow mb-4" suppressHydrationWarning>
            {ht('advisory.eyebrow', 'CTO-in-a-Box')}
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight max-w-3xl"
            suppressHydrationWarning
          >
            Technical Leadership{' '}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Without the €120K Salary
            </span>
          </h1>
          <p className="mt-6 text-lg text-foreground/70 max-w-2xl" suppressHydrationWarning>
            {ht(
              'advisory.subheadline',
              'Async advisory for startup founders who need senior engineering guidance but aren\u2019t ready for a full-time hire.'
            )}
          </p>

          {/* Price badge */}
          <div className="mt-6 flex flex-wrap gap-3 items-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[13px] font-bold px-4 py-1.5" suppressHydrationWarning>
              {ht('advisory.price', '€500/month')}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground/5 text-foreground/70 text-[12px] font-semibold px-3 py-1" suppressHydrationWarning>
              {ht('advisory.cancel', 'Cancel anytime')}
            </span>
          </div>

          {/* Primary CTA */}
          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <Link
              href="https://calendly.com/maxwellsoftwaresolutions/discovery"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-500 hover:to-indigo-400 text-white font-bold px-6 py-3 rounded-xl shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-500/60"
              target="_blank"
              rel="noopener noreferrer"
              suppressHydrationWarning
            >
              {ht('advisory.cta.primary', 'Start with a free intro call')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
            <Link
              href="/services/packages"
              className="text-[14px] font-medium text-foreground/70 hover:text-foreground transition-colors underline underline-offset-2"
              suppressHydrationWarning
            >
              {ht('advisory.cta.compare', 'Compare all packages')}
            </Link>
          </div>
        </motion.div>
      </header>

      {/* What you get */}
      <section aria-labelledby="includes-heading" className="py-16 sm:py-20 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <motion.h2
            id="includes-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.25] tracking-tight mb-8"
            suppressHydrationWarning
          >
            {ht('advisory.includes.heading', 'What you get')}
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {includes.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="neuro-card flex items-start gap-4 bg-white/[0.03] backdrop-blur rounded-2xl border border-violet-500/15 p-6 hover:-translate-y-1 transition-all duration-300"
              >
                {item.icon}
                <span className="text-[14px] leading-relaxed text-foreground/85">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Perfect for */}
      <section aria-labelledby="perfect-for-heading" className="py-16 sm:py-20 max-w-6xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2
            id="perfect-for-heading"
            className="text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.25] tracking-tight mb-6"
            suppressHydrationWarning
          >
            {ht('advisory.perfectFor.heading', 'Perfect for')}
          </h2>
          <ul className="space-y-3">
            {perfectFor.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckIcon />
                <span className="text-[14px] leading-relaxed text-foreground/85">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* How it works */}
      <section aria-labelledby="process-heading" className="py-16 sm:py-20 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <motion.h2
            id="process-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.25] tracking-tight mb-10"
            suppressHydrationWarning
          >
            {ht('advisory.process.heading', 'How it works')}
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6" suppressHydrationWarning>
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="neuro-card flex gap-5 bg-white/[0.03] backdrop-blur rounded-2xl border border-violet-500/15 p-6 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-[0_4px_12px_rgba(124,58,237,0.4)]">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-semibold mb-1.5">{step.title}</h3>
                  <p className="text-[14px] text-foreground/75 leading-relaxed">{step.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section aria-labelledby="compare-heading" className="py-16 sm:py-20 max-w-6xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2
            id="compare-heading"
            className="text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.25] tracking-tight mb-8"
            suppressHydrationWarning
          >
            {ht('advisory.compare.heading', 'How it compares')}
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-violet-500/15 bg-white/[0.02] backdrop-blur">
            <table className="w-full text-[13px]" role="table" aria-label="CTO option comparison">
              <thead>
                <tr className="border-b border-violet-500/10 bg-white/[0.03]">
                  <th className="text-left p-4 font-semibold" scope="col">&nbsp;</th>
                  <th className="text-left p-4 font-semibold" scope="col">{ht('advisory.compare.col.fulltime', 'Full-time CTO')}</th>
                  <th className="text-left p-4 font-semibold" scope="col">{ht('advisory.compare.col.fractional', 'Fractional CTO')}</th>
                  <th className="text-left p-4 font-semibold text-violet-400" scope="col">{ht('advisory.compare.col.box', 'CTO-in-a-Box')}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-violet-500/10 hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-medium">{ht('advisory.compare.row.cost', 'Cost')}</td>
                  <td className="p-4 text-foreground/70">{ht('advisory.compare.fulltime.cost', '€8–15K/mo')}</td>
                  <td className="p-4 text-foreground/70">{ht('advisory.compare.fractional.cost', '€3,500/mo')}</td>
                  <td className="p-4 text-violet-400 font-semibold">{ht('advisory.compare.box.cost', '€500/mo')}</td>
                </tr>
                <tr className="border-b border-violet-500/10 hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-medium">{ht('advisory.compare.row.commitment', 'Commitment')}</td>
                  <td className="p-4 text-foreground/70">{ht('advisory.compare.fulltime.commitment', 'Full-time hire')}</td>
                  <td className="p-4 text-foreground/70">{ht('advisory.compare.fractional.commitment', 'Monthly retainer')}</td>
                  <td className="p-4 text-violet-400 font-semibold">{ht('advisory.compare.box.commitment', 'Cancel anytime')}</td>
                </tr>
                <tr className="border-b border-violet-500/10 hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-medium">{ht('advisory.compare.row.response', 'Response time')}</td>
                  <td className="p-4 text-foreground/70">{ht('advisory.compare.fulltime.response', 'Immediate')}</td>
                  <td className="p-4 text-foreground/70">{ht('advisory.compare.fractional.response', 'Same day')}</td>
                  <td className="p-4 text-foreground/70">{ht('advisory.compare.box.response', '24 hours')}</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-medium">{ht('advisory.compare.row.bestFor', 'Best for')}</td>
                  <td className="p-4 text-foreground/70">{ht('advisory.compare.fulltime.bestFor', 'Scale-ups')}</td>
                  <td className="p-4 text-foreground/70">{ht('advisory.compare.fractional.bestFor', 'Growth stage')}</td>
                  <td className="p-4 text-violet-400 font-semibold">{ht('advisory.compare.box.bestFor', 'Early stage')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="py-16 sm:py-20 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto px-6 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              id="faq-heading"
              className="text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.25] tracking-tight mb-8"
              suppressHydrationWarning
            >
              {ht('advisory.faq.heading', 'Frequently asked questions')}
            </h2>
            <div className="space-y-6">
              {faqs.map((item, i) => (
                <FAQItem key={i} question={item.question} answer={item.answer} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-gradient-to-br from-violet-900/30 via-indigo-900/20 to-transparent border border-violet-500/20 p-10 sm:p-14 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4" suppressHydrationWarning>
            {ht('advisory.bottomcta.title', 'Senior technical guidance for €500/month.')}
          </h2>
          <p className="text-[15px] text-foreground/70 max-w-lg mx-auto mb-7" suppressHydrationWarning>
            {ht(
              'advisory.bottomcta.body',
              'No hiring risk. No long-term contracts. Cancel anytime. Book a free 15-minute intro call and see if it is a fit.'
            )}
          </p>
          <Link
            href="https://calendly.com/maxwellsoftwaresolutions/discovery"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-500 hover:to-indigo-400 text-white font-bold px-8 py-4 rounded-xl shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-500/60"
            target="_blank"
            rel="noopener noreferrer"
            suppressHydrationWarning
          >
            {ht('advisory.bottomcta.cta', 'Start with a free intro call')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </>
  );
}
