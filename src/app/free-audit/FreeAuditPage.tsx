'use client';

import type { ReactElement } from 'react';
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

  const faqs: FAQItemProps[] = [
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
      <div className="bg-gradient-to-r from-violet-900/40 to-indigo-900/30 border-b border-violet-500/20 py-2.5 text-center">
        <p className="text-[13px] font-medium text-violet-300" suppressHydrationWarning>
          {ht('freeAudit.urgency', 'Limited to 5 audits per month — currently accepting applications')}
        </p>
      </div>

      {/* Hero */}
      <header className="max-w-6xl mx-auto px-6 sm:px-10 pt-20 sm:pt-24 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="eyebrow mb-4" suppressHydrationWarning>
            {ht('freeAudit.eyebrow', 'Free Code Health Audit')}
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight max-w-3xl"
            suppressHydrationWarning
          >
            {ht('freeAudit.headline.pre', 'Get a Free Code Health Audit')}{' '}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              {ht('freeAudit.headline.gradient', 'Worth €2,500')}
            </span>
          </h1>
          <p className="mt-6 text-lg text-foreground/70 max-w-2xl" suppressHydrationWarning>
            {ht(
              'freeAudit.subheadline',
              'We review your codebase, identify what is slowing your team down, and hand you a prioritised remediation plan — at no cost, no obligation.'
            )}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 items-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[12px] font-semibold px-3 py-1" suppressHydrationWarning>
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {ht('freeAudit.badge.free', 'Completely free')}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground/5 text-foreground/75 text-[12px] font-semibold px-3 py-1" suppressHydrationWarning>
              {ht('freeAudit.badge.time', '5 business days')}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground/5 text-foreground/75 text-[12px] font-semibold px-3 py-1" suppressHydrationWarning>
              {ht('freeAudit.badge.nda', 'NDA-protected')}
            </span>
          </div>
        </motion.div>
      </header>

      {/* Two-column: deliverables + form */}
      <section aria-labelledby="audit-details-heading" className="max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left: What you get */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              id="audit-details-heading"
              className="text-[clamp(20px,2vw,26px)] font-semibold leading-[1.25] tracking-tight mb-6"
              suppressHydrationWarning
            >
              {ht('freeAudit.whatYouGet.heading', 'What is included')}
            </h2>
            <ul className="space-y-4 mb-10">
              {deliverables.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-[14px] leading-relaxed text-foreground/85">{item}</span>
                </li>
              ))}
            </ul>

            <h2
              className="text-[clamp(20px,2vw,26px)] font-semibold leading-[1.25] tracking-tight mb-5"
              suppressHydrationWarning
            >
              {ht('freeAudit.forWho.heading', 'Who this is for')}
            </h2>
            <ul className="space-y-3">
              {forWho.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white text-[11px] font-bold flex items-center justify-center mt-0.5 shadow-[0_2px_8px_rgba(124,58,237,0.4)]">
                    {i + 1}
                  </span>
                  <span className="text-[14px] leading-relaxed text-foreground/85">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="neuro-card rounded-3xl border border-violet-500/20 bg-white/[0.03] backdrop-blur-xl p-8 sm:p-10 hover:-translate-y-1 transition-all duration-300">
              <h2 className="text-xl font-bold tracking-tight mb-1" suppressHydrationWarning>
                {ht('freeAudit.form.heading', 'Apply for your free audit')}
              </h2>
              <p className="text-[13px] text-foreground/60 mb-6" suppressHydrationWarning>
                {ht('freeAudit.form.subheading', 'We will confirm availability within 1 business day.')}
              </p>

              <form
                action="https://formspree.io/f/mwpeplnb"
                method="POST"
                className="space-y-4"
                aria-label="Free Code Health Audit application form"
              >
                <div>
                  <label htmlFor="audit-name" className="block text-[13px] font-medium mb-1.5">
                    {ht('freeAudit.form.name', 'Full name')} <span className="text-violet-400" aria-label="required">*</span>
                  </label>
                  <input
                    id="audit-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Jane Smith"
                    className="w-full rounded-xl border border-violet-500/20 bg-white/5 px-4 py-3 text-[14px] placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition"
                  />
                </div>

                <div>
                  <label htmlFor="audit-email" className="block text-[13px] font-medium mb-1.5">
                    {ht('freeAudit.form.email', 'Work email')} <span className="text-violet-400" aria-label="required">*</span>
                  </label>
                  <input
                    id="audit-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="jane@company.com"
                    className="w-full rounded-xl border border-violet-500/20 bg-white/5 px-4 py-3 text-[14px] placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition"
                  />
                </div>

                <div>
                  <label htmlFor="audit-company" className="block text-[13px] font-medium mb-1.5">
                    {ht('freeAudit.form.company', 'Company')} <span className="text-violet-400" aria-label="required">*</span>
                  </label>
                  <input
                    id="audit-company"
                    name="company"
                    type="text"
                    required
                    autoComplete="organization"
                    placeholder="Acme Inc."
                    className="w-full rounded-xl border border-violet-500/20 bg-white/5 px-4 py-3 text-[14px] placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition"
                  />
                </div>

                <div>
                  <label htmlFor="audit-stack" className="block text-[13px] font-medium mb-1.5">
                    {ht('freeAudit.form.stack', 'Primary tech stack')} <span className="text-violet-400" aria-label="required">*</span>
                  </label>
                  <input
                    id="audit-stack"
                    name="tech_stack"
                    type="text"
                    required
                    placeholder="e.g. Node.js, React, PostgreSQL"
                    className="w-full rounded-xl border border-violet-500/20 bg-white/5 px-4 py-3 text-[14px] placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition"
                  />
                </div>

                <div>
                  <label htmlFor="audit-context" className="block text-[13px] font-medium mb-1.5">
                    {ht('freeAudit.form.context', 'What is your main concern? (optional)')}
                  </label>
                  <textarea
                    id="audit-context"
                    name="context"
                    rows={3}
                    placeholder="e.g. we keep missing sprint deadlines, deployment takes 2 hours, etc."
                    className="w-full rounded-xl border border-violet-500/20 bg-white/5 px-4 py-3 text-[14px] placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-500 hover:to-indigo-400 text-white font-bold px-6 py-3 rounded-xl shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-500/60"
                  suppressHydrationWarning
                >
                  {ht('freeAudit.form.cta', 'Apply for free audit')}
                </button>

                <p className="text-center text-[12px] text-foreground/50" suppressHydrationWarning>
                  {ht('freeAudit.form.privacy', 'No spam. We only contact you about your audit request.')}
                </p>
              </form>
            </div>
          </motion.div>
        </div>
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
              {ht('freeAudit.faq.heading', 'Frequently asked questions')}
            </h2>
            <div className="space-y-6" suppressHydrationWarning>
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
          <p className="text-[12px] font-bold uppercase tracking-widest text-violet-400/70 mb-3" suppressHydrationWarning>
            {ht('freeAudit.cta.eyebrow', 'Limited availability')}
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4" suppressHydrationWarning>
            {ht('freeAudit.cta.title', 'Only 5 audit slots open per month')}
          </h2>
          <p className="text-[15px] text-foreground/70 max-w-xl mx-auto mb-6" suppressHydrationWarning>
            {ht(
              'freeAudit.cta.body',
              'Each audit gets our full attention. We cap intake to ensure quality. If you are curious about your codebase, now is the time to apply.'
            )}
          </p>
          <a
            href="#audit-name"
            className="inline-block bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-500 hover:to-indigo-400 text-white font-bold px-8 py-3.5 rounded-xl shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-500/60"
            suppressHydrationWarning
          >
            {ht('freeAudit.cta.button', 'Apply now — it is free')}
          </a>
        </motion.div>
      </div>
    </>
  );
}
