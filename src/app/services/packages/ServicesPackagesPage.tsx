'use client';

import type { ReactElement } from 'react';
import Link from 'next/link';
import { useHydratedTranslation } from '@/lib/useHydratedTranslation';
import { CheckIcon } from '@/app/components/ui';

interface PackageCardProps {
  name: string;
  price: string;
  period: string;
  idealFor: string;
  includes: string[];
  ctaLabel: string;
  ctaHref: string;
  badge?: string;
  highlighted?: boolean;
}

function PackageCard({
  name,
  price,
  period,
  idealFor,
  includes,
  ctaLabel,
  ctaHref,
  badge,
  highlighted = false,
}: PackageCardProps): ReactElement {
  return (
    <div className={highlighted ? 'tier tier-featured' : 'tier'}>
      <div className="tier-name">
        {badge && <span className="tier-badge">{badge}</span>}
        <h2>{name}</h2>
      </div>
      <div className="price">{price}</div>
      {period && <div className="price-period">{period}</div>}
      <p className="tier-for">{idealFor}</p>

      <ul className="checks">
        {includes.map((item, i) => (
          <li key={i}>
            <CheckIcon />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <Link href={ctaHref} className={highlighted ? 'btn btn-accent' : 'btn'}>
        {ctaLabel}
      </Link>
    </div>
  );
}

export default function ServicesPackagesPage(): ReactElement {
  const ht = useHydratedTranslation();

  const packages: PackageCardProps[] = [
    {
      name: ht('packages.audit.name', 'Code Health Audit'),
      price: ht('packages.audit.price', 'Price on request'),
      period: ht('packages.audit.period', 'one-time'),
      idealFor: ht('packages.audit.idealFor', 'Ideal for: teams that need an objective assessment before committing to a larger engagement or ahead of a fundraise.'),
      includes: [
        ht('packages.audit.include1', 'Full architecture and dependency review'),
        ht('packages.audit.include2', 'Security vulnerability scan'),
        ht('packages.audit.include3', 'Performance and scalability bottleneck report'),
        ht('packages.audit.include4', 'Tech debt hotspot mapping'),
        ht('packages.audit.include5', 'Prioritised remediation roadmap'),
        ht('packages.audit.include6', '60-minute findings walkthrough call'),
      ],
      ctaLabel: ht('packages.audit.cta', 'Book an audit'),
      ctaHref: '/contact',
    },
    {
      name: ht('packages.sprint.name', 'Sprint-in-a-Box'),
      price: ht('packages.sprint.price', 'Price on request'),
      period: ht('packages.sprint.period', 'fixed price'),
      idealFor: ht('packages.sprint.idealFor', 'Ideal for: founders and product teams who need a working MVP or feature shipped in 2 weeks without hiring a full team.'),
      includes: [
        ht('packages.sprint.include1', '2-week focused delivery sprint'),
        ht('packages.sprint.include2', 'Discovery and scope alignment call'),
        ht('packages.sprint.include3', 'Daily async updates'),
        ht('packages.sprint.include4', 'Tested, production-ready code'),
        ht('packages.sprint.include5', 'Sprint demo and handoff session'),
        ht('packages.sprint.include6', 'Post-sprint 30-day support window'),
      ],
      ctaLabel: ht('packages.sprint.cta', 'Start a sprint'),
      ctaHref: '/start-a-sprint',
    },
    {
      name: ht('packages.retainer.name', 'Engineering Partner Retainer'),
      price: ht('packages.retainer.price', 'Price on request'),
      period: ht('packages.retainer.period', 'per month'),
      idealFor: ht('packages.retainer.idealFor', 'Ideal for: growing companies that need ongoing senior engineering capacity without the overhead of a full-time hire.'),
      includes: [
        ht('packages.retainer.include1', 'Dedicated senior engineer, 3–5 days/week'),
        ht('packages.retainer.include2', 'Code review and architecture guidance'),
        ht('packages.retainer.include3', 'CI/CD pipeline improvements'),
        ht('packages.retainer.include4', 'Testing strategy and implementation'),
        ht('packages.retainer.include5', 'Monthly outcome and velocity report'),
        ht('packages.retainer.include6', 'Slack/Teams async access'),
      ],
      ctaLabel: ht('packages.retainer.cta', 'Discuss a retainer'),
      ctaHref: '/contact',
      badge: ht('packages.retainer.badge', 'Most Popular'),
      highlighted: true,
    },
    {
      name: ht('packages.cicd.name', 'CI/CD Accelerator'),
      price: ht('packages.cicd.price', 'Price on request'),
      period: ht('packages.cicd.period', 'one-time'),
      idealFor: ht('packages.cicd.idealFor', 'Ideal for: teams spending hours on manual deployments, flaky pipelines, or struggling with slow feedback loops.'),
      includes: [
        ht('packages.cicd.include1', 'Full pipeline audit and redesign'),
        ht('packages.cicd.include2', 'Automated build, test, and deployment setup'),
        ht('packages.cicd.include3', 'Environment parity (dev / staging / prod)'),
        ht('packages.cicd.include4', 'Rollback and feature flag implementation'),
        ht('packages.cicd.include5', 'Observability and alerting integration'),
        ht('packages.cicd.include6', 'Team training and runbook documentation'),
      ],
      ctaLabel: ht('packages.cicd.cta', 'Accelerate deployment'),
      ctaHref: '/contact',
    },
    {
      name: ht('packages.cto.name', 'Fractional CTO'),
      price: ht('packages.cto.price', 'Price on request'),
      period: ht('packages.cto.period', 'per month'),
      idealFor: ht('packages.cto.idealFor', 'Ideal for: early-stage startups and scale-ups needing strategic technical leadership without a full-time C-suite cost.'),
      includes: [
        ht('packages.cto.include1', 'Technical strategy and roadmap ownership'),
        ht('packages.cto.include2', 'Vendor and tooling evaluation'),
        ht('packages.cto.include3', 'Hiring and team structure guidance'),
        ht('packages.cto.include4', 'Board and investor-level technical communication'),
        ht('packages.cto.include5', '4 hours/week of dedicated availability'),
        ht('packages.cto.include6', 'Monthly strategic review session'),
      ],
      ctaLabel: ht('packages.cto.cta', 'Enquire about Fractional CTO'),
      ctaHref: '/contact',
    },
  ];

  return (
    <>
      <header className="wrap page-head">
        <div className="eyebrow" suppressHydrationWarning>
          {ht('packages.eyebrow', 'Service Packages')}
        </div>
        <h1 suppressHydrationWarning>Choose the Right Engagement</h1>
        <p className="lead" suppressHydrationWarning>
          {ht(
            'packages.subtitle',
            'Five focused service packages — from a one-off audit to ongoing strategic leadership. All are fixed in scope and priced transparently.'
          )}
        </p>
      </header>

      <section aria-labelledby="packages-heading" className="section">
        <div className="wrap">
          <h2 id="packages-heading" className="sr-only" suppressHydrationWarning>
            {ht('packages.title', 'Service Packages')}
          </h2>
          <div className="tiers tiers-3" suppressHydrationWarning>
            {packages.map((pkg) => (
              <PackageCard key={pkg.name} {...pkg} />
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Engagement guidance" className="section">
        <div className="wrap">
          <div className="callout band-split">
            <h2 suppressHydrationWarning>{ht('packages.unsure.heading', 'Not sure which package fits?')}</h2>
            <p suppressHydrationWarning>
              {ht(
                'packages.unsure.body',
                'Most clients start with a Code Health Audit. It surfaces the real priorities and often makes the next step obvious. If you already know what you need, book a 30-minute discovery call and we will confirm fit.'
              )}
            </p>
            <Link href="/contact" className="btn btn-accent" suppressHydrationWarning>
              {ht('packages.unsure.cta', 'Book a discovery call')}
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="compare-heading" className="section">
        <div className="wrap">
          <h2 id="compare-heading" className="section-head" suppressHydrationWarning>
            {ht('packages.compare.heading', 'Quick comparison')}
          </h2>
          <div className="table-scroll" tabIndex={0}>
            <table className="table table-wide" role="table" aria-label="Service package comparison">
              <thead>
                <tr>
                  <th scope="col">{ht('packages.compare.col.package', 'Package')}</th>
                  <th scope="col">{ht('packages.compare.col.price', 'Price')}</th>
                  <th scope="col">{ht('packages.compare.col.duration', 'Duration')}</th>
                  <th scope="col">{ht('packages.compare.col.for', 'Best for')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{ht('packages.audit.name', 'Code Health Audit')}</td>
                  <td>{ht('packages.audit.price', 'Price on request')}</td>
                  <td>{ht('packages.compare.audit.duration', '5 business days')}</td>
                  <td>{ht('packages.compare.audit.for', 'Pre-investment, new CTOs, legacy systems')}</td>
                </tr>
                <tr>
                  <td>{ht('packages.sprint.name', 'Sprint-in-a-Box')}</td>
                  <td>{ht('packages.sprint.price', 'Price on request')}</td>
                  <td>{ht('packages.compare.sprint.duration', '2 weeks')}</td>
                  <td>{ht('packages.compare.sprint.for', 'MVPs, feature spikes, proof-of-concept')}</td>
                </tr>
                <tr>
                  <td className="is-featured">{ht('packages.retainer.name', 'Engineering Partner Retainer')}</td>
                  <td>{ht('packages.retainer.price', 'Price on request')}</td>
                  <td>{ht('packages.compare.retainer.duration', 'Ongoing')}</td>
                  <td>{ht('packages.compare.retainer.for', 'Scale-ups, embedded engineering support')}</td>
                </tr>
                <tr>
                  <td>{ht('packages.cicd.name', 'CI/CD Accelerator')}</td>
                  <td>{ht('packages.cicd.price', 'Price on request')}</td>
                  <td>{ht('packages.compare.cicd.duration', '3–4 weeks')}</td>
                  <td>{ht('packages.compare.cicd.for', 'Slow deploys, broken pipelines, manual releases')}</td>
                </tr>
                <tr>
                  <td>{ht('packages.cto.name', 'Fractional CTO')}</td>
                  <td>{ht('packages.cto.price', 'Price on request')}</td>
                  <td>{ht('packages.compare.cto.duration', 'Ongoing')}</td>
                  <td>{ht('packages.compare.cto.for', 'Early-stage startups, post-seed to Series A')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section aria-label="AI implementation capabilities" className="band">
        <div className="wrap band-split">
          <div className="eyebrow" suppressHydrationWarning>
            {ht('packages.ai.eyebrow', 'AI & ML')}
          </div>
          <h2 suppressHydrationWarning>{ht('packages.ai.heading', 'We also ship AI into production')}</h2>
          <p suppressHydrationWarning>
            {ht(
              'packages.ai.body',
              'We help AI startups and product teams ship models into production — from RAG pipelines and LLM-powered features to embedding search and AI-assisted workflows. If you are building with AI and need engineering support, talk to us.'
            )}
          </p>
          <Link href="/contact" className="btn btn-lg" suppressHydrationWarning>
            {ht('packages.ai.cta', 'Discuss an AI project')}
          </Link>
        </div>
      </section>
    </>
  );
}
