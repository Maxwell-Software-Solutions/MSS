'use client';
import type { ReactElement } from 'react';
import Link from 'next/link';
import { useHydratedTranslation } from '@/lib/useHydratedTranslation';
import CTA from '@/app/components/ui/CTA';

function CheckIcon(): ReactElement {
  return (
    <svg
      className="w-4 h-4 text-accent flex-shrink-0 mt-0.5"
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
      className={`relative flex flex-col rounded-3xl border p-8 sm:p-10 transition-all ${
        highlighted
          ? 'bg-accent/5 border-accent/40 shadow-lg shadow-accent/10'
          : 'bg-card/95 border-border shadow-soft'
      }`}
    >
      {badge && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-block bg-accent text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow">
          {badge}
        </span>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight">{name}</h2>
        <div className="mt-3 flex items-end gap-2">
          <span className="text-3xl sm:text-4xl font-bold">{price}</span>
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
        className={`w-full text-center rounded-xl px-5 py-3 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent/60 ${
          highlighted
            ? 'bg-accent text-white hover:bg-accent/90 shadow-soft'
            : 'border border-accent/40 text-accent hover:bg-accent/10'
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
      <h3 className="text-[15px] font-semibold mb-2">{question}</h3>
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
      <header className="max-w-7xl mx-auto px-6 sm:px-10 pt-16 sm:pt-20 pb-6">
        <p
          className="tracking-wide text-[13px] text-slate-500 dark:text-slate-400 mb-3 uppercase"
          suppressHydrationWarning
        >
          {ht('pricing.eyebrow', 'Transparent pricing')}
        </p>
        <h1
          className="font-semibold leading-[1.1] max-w-3xl text-[clamp(36px,3.6vw,56px)]"
          suppressHydrationWarning
        >
          {ht('pricing.title', 'Pricing')}
        </h1>
        <p
          className="mt-6 max-w-3xl text-base md:text-lg leading-[1.6] text-[--muted]"
          suppressHydrationWarning
        >
          {ht(
            'pricing.subtitle',
            'Competitive Eastern European rates with Western-grade engineering quality. All engagements are outcome-focused with clear success criteria.'
          )}
        </p>
      </header>

      {/* Pricing tiers */}
      <section aria-labelledby="pricing-tiers-heading" className="py-10 sm:py-14">
        <h2 id="pricing-tiers-heading" className="sr-only" suppressHydrationWarning>
          {ht('pricing.title', 'Pricing')}
        </h2>
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start" suppressHydrationWarning>
            {tiers.map((tier) => (
              <PricingTier key={tier.name} {...tier} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="py-10 sm:py-14 bg-card/30">
        <div className="max-w-3xl mx-auto px-6 sm:px-10">
          <h2
            id="faq-heading"
            className="text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.25] tracking-tight mb-8"
            suppressHydrationWarning
          >
            {ht('pricing.faq.heading', 'Frequently asked questions')}
          </h2>
          <div className="space-y-6" suppressHydrationWarning>
            {faqs.map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Not sure CTA */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10 sm:py-14" suppressHydrationWarning>
        <div className="rounded-3xl border border-border bg-card/80 p-8 sm:p-12 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight" suppressHydrationWarning>
            {ht('pricing.notSure.title', 'Not sure which plan fits?')}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-foreground/75 max-w-xl mx-auto" suppressHydrationWarning>
            {ht(
              'pricing.notSure.body',
              'Tell us about your project and team size. We will recommend the right engagement model and scope — no hard sell, no obligation.'
            )}
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 bg-accent text-white rounded-xl px-6 py-3 text-sm font-semibold hover:bg-accent/90 transition-all shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent/60"
            suppressHydrationWarning
          >
            {ht('pricing.notSure.cta', 'Talk to us')}
          </Link>
        </div>
      </div>

      {/* CTA band */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pb-16 sm:pb-20" suppressHydrationWarning>
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
