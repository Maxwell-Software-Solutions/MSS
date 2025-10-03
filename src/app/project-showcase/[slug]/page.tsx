import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CASES = {
  'retail-platform': {
    title: 'Retail Platform — Escaped Defects Down 58%',
    subtitle: 'Stabilized CI, SLOs, and refactoring of brittle modules improved reliability and delivery speed.',
    hero: '/images/case-studies/retail-platform.svg',
    meta: 'E‑commerce · Node/Next · 6 months',
    context: [
      'Monolithic checkout with flaky tests and frequent regressions during high‑traffic events.',
      'Incomplete CI leading to manual hotfixes and unpredictable releases.',
    ],
    actions: [
      'Introduced SLOs for checkout success and error budget tracking.',
      'Refactored brittle payment integration with contract tests and feature toggles.',
      'Stabilized CI with test quarantine, flake tracking, and retry policies.',
    ],
    results: [
      'Escaped defects reduced by 58% quarter over quarter.',
      'Deploy frequency increased 28%, with rollback rate near zero.',
      'Customer support tickets related to checkout dropped 22%.',
    ],
    metrics: [
      { label: 'Escaped defects', value: '-58%' },
      { label: 'Deploy frequency', value: '+28%' },
      { label: 'Checkout CSAT', value: '+12' },
    ],
  },
  'fintech-api': {
    title: 'Fintech API — Coverage Up 32%',
    subtitle: 'Contract and golden tests reduced incidents and supported faster iteration.',
    hero: '/images/case-studies/fintech-api.svg',
    meta: 'Fintech · Go/TypeScript · 3 months',
    context: [
      'Multiple downstream consumers with undocumented API behavior and breaking changes.',
      'Long triage cycles with insufficient observability around error causes.',
    ],
    actions: [
      'Added provider/consumer contract tests and golden tests for critical flows.',
      'Implemented structured logging and tracing to shorten MTTD.',
      'CI gated on contract validation; published API examples for partners.',
    ],
    results: [
      'Statement generation incidents down 24%.',
      'P99 latency improved 18% after removing synchronous IO in hot paths.',
      'Developer onboarding time decreased with living API docs.',
    ],
    metrics: [
      { label: 'Test coverage', value: '+32%' },
      { label: 'Incidents', value: '-24%' },
      { label: 'P99 latency', value: '-18%' },
    ],
  },
  'saas-migration': {
    title: 'SaaS Migration — MTTR Down 45%',
    subtitle: 'SLOs, observability, and automated runbooks accelerated recovery and confidence.',
    hero: '/images/case-studies/saas-migration.svg',
    meta: 'B2B SaaS · Kubernetes · 4 months',
    context: [
      'Lift-and-shift migration exposed hidden coupling and alert fatigue.',
      'Missing SLOs made prioritization and stakeholder communication difficult.',
    ],
    actions: [
      'Defined user-centric SLOs and visualized error budgets per service.',
      'Added distributed tracing and log sampling; removed noisy alerts.',
      'Codified incident runbooks; introduced game days and postmortems.',
    ],
    process: [
      {
        heading: 'Week 1–2: Discovery & SLO Definition',
        bullets: [
          'Stakeholder interviews to map critical user journeys and reliability goals.',
          'Drafted SLIs for availability, latency, and correctness for the top 3 journeys.',
          'Aligned targets with product and support; published initial SLOs with error budgets.',
        ],
      },
      {
        heading: 'Week 3–4: Observability Baseline',
        bullets: [
          'Implemented tracing across gateway and top services; standardized log fields.',
          'Set exemplar dashboards for latency distributions and saturation signals.',
          'Introduced synthetic checks for critical workflows and regions.',
        ],
      },
      {
        heading: 'Week 5–7: Alert Hygiene & On‑call',
        bullets: [
          'Eliminated non-actionable alerts; tied alerts to SLO burn rates.',
          'Created escalation policies and ownership maps; rotated shadow on‑call.',
          'Documented runbooks for top 5 recurring incidents with verification steps.',
        ],
      },
      {
        heading: 'Week 8–10: Resilience & Cost',
        bullets: [
          'Introduced circuit breakers and bulkheads on noisy dependencies.',
          'Right-sized workloads; moved batch jobs off peak to cut spend 18%.',
          'Established change freeze windows and feature flags for risky deployments.',
        ],
      },
      {
        heading: 'Week 11–12: Game Day & Handover',
        bullets: [
          'Ran failure injection scenarios; measured detection, diagnosis, recovery.',
          'Closed gaps from postmortems; trained leads on SLO reviews and budget policies.',
          'Handover checklist and 90‑day reliability roadmap approved by stakeholders.',
        ],
      },
    ],
    results: [
      'MTTR reduced 45% with clearer on-call guidance.',
      'Alert noise down 60%; engineers report higher focus time.',
      'All four top-level SLOs consistently met for two quarters.',
    ],
    metrics: [
      { label: 'MTTR', value: '-45%' },
      { label: 'Alert noise', value: '-60%' },
      { label: 'SLOs met', value: '4/4' },
    ],
  },
} as const;

type Slug = keyof typeof CASES;

export async function generateMetadata({ params }: { params: Promise<{ slug: Slug }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = CASES[slug];
  return {
    title: `${c.title} | Maxwell Software Solutions`,
    description: c.subtitle,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: Slug }> }): Promise<ReactElement> {
  const { slug } = await params;
  const c = CASES[slug];

  return (
    <article className="max-w-4xl mx-auto px-6 sm:px-10 py-12">
      <nav className="mb-6">
        <Link href="/project-showcase" className="text-foreground/60 hover:text-foreground transition-colors">
          ← Back to case studies
        </Link>
      </nav>

      <header className="mb-8">
        <p className="text-sm text-foreground/60">Case study · {c.meta}</p>
        <h1 className="text-4xl sm:text-5xl font-bold mt-2">{c.title}</h1>
        <p className="text-lg text-foreground/75 mt-3 max-w-3xl">{c.subtitle}</p>
      </header>

      <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden mb-10">
        <Image src={c.hero} alt={c.title} fill className="object-cover" priority unoptimized />
      </div>

      <section className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Context</h2>
          <ul className="list-disc pl-5 space-y-2 text-foreground/80">
            {c.context.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-3">Actions</h2>
          <ul className="list-disc pl-5 space-y-2 text-foreground/80">
            {c.actions.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {'process' in c ? (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Process</h2>
          <div className="space-y-6">
            {c.process!.map((step) => (
              <div key={step.heading} className="card p-5">
                <h3 className="text-lg font-semibold mb-2">{step.heading}</h3>
                <ul className="list-disc pl-5 space-y-1 text-foreground/80">
                  {step.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">Results</h2>
        <ul className="list-disc pl-5 space-y-2 text-foreground/80">
          {c.results.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      <section className="grid sm:grid-cols-3 gap-4" data-reveal>
        {c.metrics.map((m) => (
          <div key={m.label} className="card p-5 text-center">
            <div className="text-3xl font-bold text-accent">{m.value}</div>
            <div className="text-sm text-foreground/70 mt-1">{m.label}</div>
          </div>
        ))}
      </section>
    </article>
  );
}
