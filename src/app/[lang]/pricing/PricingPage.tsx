'use client';
import type { ReactElement } from 'react';
import Link from 'next/link';
import { useHydratedTranslation } from '@/lib/useHydratedTranslation';
import CTA from '@/app/components/ui/CTA';
import { CheckIcon, FaqSection } from '@/app/components/ui';

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
    <div className={highlighted ? 'tier tier-featured' : 'tier'}>
      <div className="tier-name">
        {badge && <span className="tier-badge">{badge}</span>}
        <h2>{name}</h2>
      </div>
      <div className="price">{price}</div>
      <div className="price-period">{period}</div>
      <p className="tier-for">{forWho}</p>

      <ul className="checks">
        {features.map((feat, i) => (
          <li key={i}>
            <CheckIcon />
            <span>{feat}</span>
          </li>
        ))}
      </ul>

      <Link href={ctaHref} className={highlighted ? 'btn btn-accent' : 'btn'}>
        {ctaLabel}
      </Link>
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
      <header className="wrap page-head">
        <div className="eyebrow" suppressHydrationWarning>
          {ht('pricing.eyebrow', 'Transparent pricing')}
        </div>
        <h1 suppressHydrationWarning>Transparent Pricing</h1>
        <p className="lead" suppressHydrationWarning>
          {ht(
            'pricing.subtitle',
            'Competitive Eastern European rates with Western-grade engineering quality. All engagements are outcome-focused with clear success criteria.'
          )}
        </p>
      </header>

      <section aria-labelledby="pricing-tiers-heading" className="section">
        <div className="wrap">
          <h2 id="pricing-tiers-heading" className="sr-only" suppressHydrationWarning>
            {ht('pricing.title', 'Pricing')}
          </h2>
          <div className="tiers tiers-3" suppressHydrationWarning>
            {tiers.map((tier) => (
              <PricingTier key={tier.name} {...tier} />
            ))}
          </div>
        </div>
      </section>

      <FaqSection
        title={ht('pricing.faq.heading', 'Frequently asked questions')}
        items={faqs.map((item) => ({ question: item.q, answer: item.a }))}
      />

      <div className="section" suppressHydrationWarning>
        <div className="wrap">
          <div className="callout band-split">
            <h2 suppressHydrationWarning>{ht('pricing.notSure.title', 'Not sure which plan fits?')}</h2>
            <p suppressHydrationWarning>
              {ht(
                'pricing.notSure.body',
                'Tell us about your project and team size. We will recommend the right engagement model and scope — no hard sell, no obligation.'
              )}
            </p>
            <Link href="/contact" className="btn btn-accent" suppressHydrationWarning>
              {ht('pricing.notSure.cta', 'Talk to us')}
            </Link>
          </div>
        </div>
      </div>

      <CTA
        title={ht('services.cta.title', 'Book a discovery call')}
        body={ht(
          'services.cta.body',
          'Explore fit, clarify goals, and identify the fastest path to measurable impact. No obligation, high signal.'
        )}
        primary={{ href: '/contact', label: ht('services.cta.primary', 'Book a discovery call') }}
        secondary={{ href: '/case-studies', label: ht('services.cta.secondary', 'See case studies') }}
      />
    </>
  );
}
