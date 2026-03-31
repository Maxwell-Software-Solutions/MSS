'use client';

import type { ReactElement } from 'react';
import Link from 'next/link';
import { useHydratedTranslation } from '@/lib/useHydratedTranslation';

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
    <div
      className={`relative flex flex-col rounded-3xl border p-7 sm:p-8 transition-all h-full ${
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

      <div className="mb-5">
        <h2 className="text-lg font-bold tracking-tight">{name}</h2>
        <div className="mt-2.5 flex items-end gap-2">
          <span className="text-2xl sm:text-3xl font-bold">{price}</span>
          {period && <span className="text-sm text-foreground/60 mb-0.5">{period}</span>}
        </div>
        <p className="mt-2.5 text-[12px] text-foreground/60 leading-relaxed">{idealFor}</p>
      </div>

      <ul className="flex-1 space-y-2.5 mb-6">
        {includes.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <CheckIcon />
            <span className="text-[13px] text-foreground/80 leading-snug">{item}</span>
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

export default function ServicesPackagesPage(): ReactElement {
  const ht = useHydratedTranslation();

  const packages: PackageCardProps[] = [
    {
      name: ht('packages.audit.name', 'Code Health Audit'),
      price: ht('packages.audit.price', '€2,500'),
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
      ctaHref: '/free-audit',
    },
    {
      name: ht('packages.sprint.name', 'Sprint-in-a-Box'),
      price: ht('packages.sprint.price', '€4,800'),
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
      price: ht('packages.retainer.price', '€3,500–€6,500'),
      period: ht('packages.retainer.period', '/month'),
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
      price: ht('packages.cicd.price', '€7,500'),
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
      price: ht('packages.cto.price', '€3,500'),
      period: ht('packages.cto.period', '/month'),
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
      {/* Hero */}
      <header className="max-w-7xl mx-auto px-6 sm:px-10 pt-16 sm:pt-20 pb-6">
        <p className="tracking-wide text-[13px] text-slate-500 dark:text-slate-400 mb-3 uppercase" suppressHydrationWarning>
          {ht('packages.eyebrow', 'Service Packages')}
        </p>
        <h1
          className="font-semibold leading-[1.1] max-w-3xl text-[clamp(36px,3.6vw,56px)]"
          suppressHydrationWarning
        >
          {ht('packages.title', 'Choose the Right Engagement')}
        </h1>
        <p className="mt-5 max-w-2xl text-base md:text-lg leading-[1.6] text-[--muted]" suppressHydrationWarning>
          {ht(
            'packages.subtitle',
            'Five focused service packages — from a one-off audit to ongoing strategic leadership. All are fixed in scope and priced transparently.'
          )}
        </p>
      </header>

      {/* Packages grid */}
      <section aria-labelledby="packages-heading" className="py-10 sm:py-14">
        <h2 id="packages-heading" className="sr-only" suppressHydrationWarning>
          {ht('packages.title', 'Service Packages')}
        </h2>
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" suppressHydrationWarning>
            {packages.map((pkg) => (
              <PackageCard key={pkg.name} {...pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison note */}
      <section aria-label="Engagement guidance" className="py-10 sm:py-12 bg-card/30">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 text-center">
          <h2 className="text-xl font-semibold tracking-tight mb-4" suppressHydrationWarning>
            {ht('packages.unsure.heading', 'Not sure which package fits?')}
          </h2>
          <p className="text-[15px] text-foreground/70 leading-relaxed mb-6" suppressHydrationWarning>
            {ht(
              'packages.unsure.body',
              'Most clients start with a Code Health Audit. It surfaces the real priorities and often makes the next step obvious. If you already know what you need, book a 30-minute discovery call and we will confirm fit.'
            )}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-accent text-white rounded-xl px-7 py-3 text-sm font-semibold hover:bg-accent/90 transition-all shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent/60"
            suppressHydrationWarning
          >
            {ht('packages.unsure.cta', 'Book a discovery call')}
          </Link>
        </div>
      </section>

      {/* FAQ-style comparison table */}
      <section aria-labelledby="compare-heading" className="py-12 sm:py-16 max-w-5xl mx-auto px-6 sm:px-10">
        <h2
          id="compare-heading"
          className="text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.25] tracking-tight mb-8"
          suppressHydrationWarning
        >
          {ht('packages.compare.heading', 'Quick comparison')}
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-[13px]" role="table" aria-label="Service package comparison">
            <thead>
              <tr className="border-b border-border bg-card/60">
                <th className="text-left p-4 font-semibold" scope="col">{ht('packages.compare.col.package', 'Package')}</th>
                <th className="text-left p-4 font-semibold" scope="col">{ht('packages.compare.col.price', 'Price')}</th>
                <th className="text-left p-4 font-semibold" scope="col">{ht('packages.compare.col.duration', 'Duration')}</th>
                <th className="text-left p-4 font-semibold" scope="col">{ht('packages.compare.col.for', 'Best for')}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border hover:bg-card/40 transition-colors">
                <td className="p-4 font-medium">{ht('packages.audit.name', 'Code Health Audit')}</td>
                <td className="p-4 text-foreground/80">{ht('packages.audit.price', '€2,500')}</td>
                <td className="p-4 text-foreground/80">{ht('packages.compare.audit.duration', '5 business days')}</td>
                <td className="p-4 text-foreground/75">{ht('packages.compare.audit.for', 'Pre-investment, new CTOs, legacy systems')}</td>
              </tr>
              <tr className="border-b border-border hover:bg-card/40 transition-colors">
                <td className="p-4 font-medium">{ht('packages.sprint.name', 'Sprint-in-a-Box')}</td>
                <td className="p-4 text-foreground/80">{ht('packages.sprint.price', '€4,800')}</td>
                <td className="p-4 text-foreground/80">{ht('packages.compare.sprint.duration', '2 weeks')}</td>
                <td className="p-4 text-foreground/75">{ht('packages.compare.sprint.for', 'MVPs, feature spikes, proof-of-concept')}</td>
              </tr>
              <tr className="border-b border-border bg-accent/5 hover:bg-accent/10 transition-colors">
                <td className="p-4 font-medium text-accent">{ht('packages.retainer.name', 'Engineering Partner Retainer')}</td>
                <td className="p-4 text-foreground/80">{ht('packages.retainer.price', '€3,500–€6,500')}/mo</td>
                <td className="p-4 text-foreground/80">{ht('packages.compare.retainer.duration', 'Ongoing')}</td>
                <td className="p-4 text-foreground/75">{ht('packages.compare.retainer.for', 'Scale-ups, embedded engineering support')}</td>
              </tr>
              <tr className="border-b border-border hover:bg-card/40 transition-colors">
                <td className="p-4 font-medium">{ht('packages.cicd.name', 'CI/CD Accelerator')}</td>
                <td className="p-4 text-foreground/80">{ht('packages.cicd.price', '€7,500')}</td>
                <td className="p-4 text-foreground/80">{ht('packages.compare.cicd.duration', '3–4 weeks')}</td>
                <td className="p-4 text-foreground/75">{ht('packages.compare.cicd.for', 'Slow deploys, broken pipelines, manual releases')}</td>
              </tr>
              <tr className="hover:bg-card/40 transition-colors">
                <td className="p-4 font-medium">{ht('packages.cto.name', 'Fractional CTO')}</td>
                <td className="p-4 text-foreground/80">{ht('packages.cto.price', '€3,500')}/mo</td>
                <td className="p-4 text-foreground/80">{ht('packages.compare.cto.duration', 'Ongoing')}</td>
                <td className="p-4 text-foreground/75">{ht('packages.compare.cto.for', 'Early-stage startups, post-seed to Series A')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* AI Implementation */}
      <section aria-label="AI implementation capabilities" className="py-10 sm:py-12">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 text-center">
          <p className="text-[12px] font-bold uppercase tracking-widest text-accent/70 mb-3" suppressHydrationWarning>
            {ht('packages.ai.eyebrow', 'AI & ML')}
          </p>
          <h2 className="text-xl font-semibold tracking-tight mb-4" suppressHydrationWarning>
            {ht('packages.ai.heading', 'We also ship AI into production')}
          </h2>
          <p className="text-[15px] text-foreground/70 leading-relaxed mb-6" suppressHydrationWarning>
            {ht(
              'packages.ai.body',
              'We help AI startups and product teams ship models into production — from RAG pipelines and LLM-powered features to embedding search and AI-assisted workflows. If you are building with AI and need engineering support, talk to us.'
            )}
          </p>
          <Link
            href="/contact"
            className="inline-block border border-accent/40 text-accent rounded-xl px-7 py-3 text-sm font-semibold hover:bg-accent/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent/60"
            suppressHydrationWarning
          >
            {ht('packages.ai.cta', 'Discuss an AI project')}
          </Link>
        </div>
      </section>
    </>
  );
}
