'use client';
import type { ReactElement } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useHydratedTranslation } from '@/lib/useHydratedTranslation';
import CTA from '@/app/components/ui/CTA';

const fadeUp = {
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

function CheckIcon(): ReactElement {
  return (
    <svg
      className="w-4 h-4 flex-shrink-0 mt-0.5 text-accent"
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

interface TierProps {
  name: string;
  price: string;
  period: string;
  forWho: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  highlighted?: boolean;
  badge?: string;
}

function PricingTier({
  name,
  price,
  period,
  forWho,
  features,
  ctaLabel,
  ctaHref,
  highlighted = false,
  badge,
}: TierProps): ReactElement {
  return (
    <div
      className={`card relative flex flex-col rounded-3xl p-8 sm:p-10 transition-all ${
        highlighted
          ? 'border border-accent/40'
          : ''
      }`}
    >
      {badge && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-block bg-accent-fill text-accent-contrast text-xs font-semibold px-4 py-1.5 rounded-full">
          {badge}
        </span>
      )}

      {highlighted && (
        <div className="absolute inset-x-0 top-0 h-px rounded-t-3xl" />
      )}

      <div className="mb-6">
        <h2 className="text-xl tracking-tight">{name}</h2>
        <div className="mt-3 flex items-end gap-2">
          <span className="text-3xl sm:text-4xl font-semibold">
            {price}
          </span>
          <span className="text-sm text-foreground/60 mb-1">{period}</span>
        </div>
        <p className="mt-3 text-[13px] text-foreground/65 leading-relaxed">{forWho}</p>
      </div>

      <ul className="flex-1 space-y-3 mb-8">
        {features.map((feat, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <CheckIcon />
            <span className="text-[14px] text-foreground/80">{feat}</span>
          </li>
        ))}
      </ul>

      <Link
        href={ctaHref}
        className={`w-full text-center rounded-xl px-5 py-3 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent ${
          highlighted
            ? 'btn btn-accent'
            : 'btn'
        }`}
      >
        {ctaLabel}
      </Link>
    </div>
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

export default function PricingPage(): ReactElement {
  const ht = useHydratedTranslation();

  const tiers: TierProps[] = [
    {
      name: ht('pricing.starter.name', 'Starter'),
      price: ht('pricing.starter.price', 'From €3,500'),
      period: ht('pricing.starter.period', 'per project'),
      forWho: ht('pricing.starter.forWho', 'Best for: startups and small teams needing a focused audit or one-off improvement sprint.'),
      features: [
        ht('pricing.starter.feature1', 'Code quality audit (up to 50K LOC)'),
        ht('pricing.starter.feature2', 'Prioritized remediation roadmap'),
        ht('pricing.starter.feature3', 'One 90-min technical review session'),
        ht('pricing.starter.feature4', 'Written findings report'),
        ht('pricing.starter.feature5', '2-week delivery'),
      ],
      ctaLabel: ht('pricing.starter.cta', 'Get started'),
      ctaHref: '/contact',
      highlighted: false,
    },
    {
      name: ht('pricing.growth.name', 'Growth'),
      price: ht('pricing.growth.price', '€6,500–€10,000'),
      period: ht('pricing.growth.period', 'per month'),
      badge: ht('pricing.growth.badge', 'Most popular'),
      forWho: ht('pricing.growth.forWho', 'Best for: scale-ups and product teams wanting ongoing engineering support.'),
      features: [
        ht('pricing.growth.feature1', 'Everything in Starter'),
        ht('pricing.growth.feature2', 'Dedicated senior engineer (3 days/week)'),
        ht('pricing.growth.feature3', 'CI/CD pipeline improvements'),
        ht('pricing.growth.feature4', 'Testing strategy & implementation'),
        ht('pricing.growth.feature5', 'Monthly outcome reports'),
        ht('pricing.growth.feature6', 'Slack/Teams async support'),
      ],
      ctaLabel: ht('pricing.growth.cta', 'Start a conversation'),
      ctaHref: '/contact',
      highlighted: true,
    },
    {
      name: ht('pricing.enterprise.name', 'Enterprise'),
      price: ht('pricing.enterprise.price', 'From €15,000'),
      period: ht('pricing.enterprise.period', 'per month'),
      forWho: ht('pricing.enterprise.forWho', 'Best for: larger engineering orgs requiring a dedicated team and full-spectrum support.'),
      features: [
        ht('pricing.enterprise.feature1', 'Everything in Growth'),
        ht('pricing.enterprise.feature2', 'Dedicated team (2–4 engineers)'),
        ht('pricing.enterprise.feature3', 'Architecture consulting & reviews'),
        ht('pricing.enterprise.feature4', 'Reliability engineering & SLO design'),
        ht('pricing.enterprise.feature5', 'On-site visits (Vilnius or client location)'),
        ht('pricing.enterprise.feature6', 'SLA-backed response times'),
        ht('pricing.enterprise.feature7', 'Quarterly executive reporting'),
      ],
      ctaLabel: ht('pricing.enterprise.cta', 'Contact us'),
      ctaHref: '/contact',
      highlighted: false,
    },
  ];

  const faqs = [
    {
      q: ht('pricing.faq.q1', 'Do you offer fixed-price or time-and-materials contracts?'),
      a: ht('pricing.faq.a1', 'Both. Starter engagements are fixed-price. Growth and Enterprise retainers are time-and-materials with a monthly cap.'),
    },
    {
      q: ht('pricing.faq.q2', 'Are these prices negotiable?'),
      a: ht('pricing.faq.a2', 'We are open to discussing scope adjustments for longer commitments.'),
    },
    {
      q: ht('pricing.faq.q3', 'What currencies do you accept?'),
      a: ht('pricing.faq.a3', 'We invoice in EUR. For clients outside the Eurozone we can invoice in USD or GBP.'),
    },
    {
      q: ht('pricing.faq.q4', 'How quickly can you start?'),
      a: ht('pricing.faq.a4', 'Starter projects can usually begin within 1–2 weeks of contract signature.'),
    },
    {
      q: ht('pricing.faq.q5', 'What if we are not satisfied with the results?'),
      a: ht('pricing.faq.a5', 'Every engagement includes defined success criteria. If targets are not met, we extend at no additional cost.'),
    },
  ];

  return (
    <>
      {/* Hero */}
      <header className="max-w-6xl mx-auto px-6 sm:px-10 pt-20 sm:pt-24 pb-10">
        <motion.div {...fadeUp}>
          <div className="eyebrow mb-4" suppressHydrationWarning>
            {ht('pricing.eyebrow', 'Transparent pricing')}
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight max-w-3xl"
            suppressHydrationWarning
          >
            <span>
              Transparent
            </span>{' '}
            Pricing
          </h1>
          <p
            className="mt-6 text-lg leading-relaxed text-foreground/70 max-w-2xl"
            suppressHydrationWarning
          >
            {ht(
              'pricing.subtitle',
              'Competitive Eastern European rates with Western-grade engineering quality. All engagements are outcome-focused with clear success criteria.'
            )}
          </p>
        </motion.div>
      </header>

      {/* Pricing tiers */}
      <section aria-labelledby="pricing-tiers-heading" className="max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <h2 id="pricing-tiers-heading" className="sr-only" suppressHydrationWarning>
          {ht('pricing.title', 'Pricing')}
        </h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          suppressHydrationWarning
        >
          {tiers.map((tier) => (
            <PricingTier key={tier.name} {...tier} />
          ))}
        </motion.div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="border-t border-border py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-6 sm:px-10">
          <motion.div {...fadeUp}>
            <h2
              id="faq-heading"
              className="text-3xl sm:text-4xl tracking-tight mb-8"
              suppressHydrationWarning
            >
              {ht('pricing.faq.heading', 'Frequently asked questions')}
            </h2>
            <div className="space-y-6" suppressHydrationWarning>
              {faqs.map((item, i) => (
                <FAQItem key={i} question={item.q} answer={item.a} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Not sure CTA */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-20" suppressHydrationWarning>
        <motion.div {...fadeUp}>
          <div className="band p-10 sm:p-14 text-center">
            <h2 className="text-3xl sm:text-4xl tracking-tight" suppressHydrationWarning>
              {ht('pricing.notSure.title', 'Not sure which plan fits?')}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground/70 max-w-xl mx-auto" suppressHydrationWarning>
              {ht(
                'pricing.notSure.body',
                'Tell us about your project and team size. We will recommend the right engagement model and scope — no hard sell, no obligation.'
              )}
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 btn btn-accent px-6 py-3 rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
              suppressHydrationWarning
            >
              {ht('pricing.notSure.cta', 'Talk to us')}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* CTA band */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 pb-20 sm:pb-24" suppressHydrationWarning>
        <CTA
          title={ht('services.cta.title', 'Book a discovery call')}
          body={ht(
            'services.cta.body',
            'Explore fit, clarify goals, and identify the fastest path to measurable impact. No obligation, high signal.'
          )}
          primary={{ href: '/contact', label: ht('services.cta.primary', 'Book a discovery call') }}
          secondary={{ href: '/case-studies', label: ht('services.cta.secondary', 'See case studies') }}
        />
      </div>
    </>
  );
}
