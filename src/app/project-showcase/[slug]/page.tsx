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
  'healthcare-platform': {
    title: 'Healthcare Platform — Security Audit Pass Rate 100%',
    subtitle: 'Legacy modernization with HIPAA compliance, improving code quality and deployment velocity.',
    hero: '/images/case-studies/healthcare-platform.svg',
    meta: 'Healthcare · Python/Django · 5 months',
    context: [
      'Decade-old patient management system with manual deployments and no automated testing.',
      'HIPAA audit failures due to inadequate security controls and undocumented data flows.',
    ],
    actions: [
      'Implemented comprehensive test suite covering critical patient data workflows.',
      'Added automated security scanning, secrets management, and audit logging.',
      'Refactored authentication layer with RBAC and session management hardening.',
    ],
    results: [
      'Passed HIPAA security audit with zero findings on second attempt.',
      'Test coverage increased from 12% to 76% for core modules.',
      'Deploy time reduced from 4 hours (manual) to 15 minutes (automated).',
    ],
    metrics: [
      { label: 'Test coverage', value: '+64%' },
      { label: 'Deploy time', value: '-94%' },
      { label: 'Security findings', value: '0' },
    ],
  },
  'edtech-startup': {
    title: 'EdTech Startup — Load Capacity Up 340%',
    subtitle: 'Testing pyramid and performance optimization enabled rapid user growth without infrastructure bloat.',
    hero: '/images/case-studies/edtech-startup.svg',
    meta: 'Education · React/Node · 3 months',
    context: [
      'Viral growth from 5K to 50K+ concurrent users crashed the platform during peak hours.',
      'No load testing or performance benchmarks; reactive firefighting became the norm.',
    ],
    actions: [
      'Established testing strategy: unit, integration, E2E, and load tests with clear ownership.',
      'Optimized database queries and added Redis caching for frequent read paths.',
      'Implemented auto-scaling policies and CDN for static assets.',
    ],
    results: [
      'Platform handled 340% user growth without additional servers.',
      'Page load time reduced 67% for the most-used student dashboard.',
      'Zero downtime during peak registration periods for 3 consecutive semesters.',
    ],
    metrics: [
      { label: 'Load capacity', value: '+340%' },
      { label: 'Page load time', value: '-67%' },
      { label: 'Peak downtime', value: '0' },
    ],
  },
  'iot-platform': {
    title: 'IoT Platform — Data Loss Down 89%',
    subtitle: 'Observability and pipeline resilience improvements for manufacturing telemetry system.',
    hero: '/images/case-studies/iot-platform.svg',
    meta: 'Manufacturing · Go/Kafka · 4 months',
    context: [
      'Sensor data pipeline losing messages during network hiccups and service restarts.',
      'No visibility into processing lag or data quality; manual reconciliation took days.',
    ],
    actions: [
      'Added distributed tracing and metrics for pipeline stages (ingestion, transform, storage).',
      'Implemented at-least-once delivery with idempotent consumers and dead-letter queues.',
      'Created automated data quality checks and alerting on anomalies.',
    ],
    results: [
      'Message loss reduced from 3.2% to 0.35% under normal conditions.',
      'Processing lag visibility enabled proactive scaling before SLA breaches.',
      'Data reconciliation time dropped from 8 hours to 20 minutes.',
    ],
    metrics: [
      { label: 'Data loss', value: '-89%' },
      { label: 'Reconciliation time', value: '-96%' },
      { label: 'Pipeline visibility', value: '100%' },
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
    alternates: {
      canonical: `/project-showcase/${slug}`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: Slug }> }): Promise<ReactElement> {
  const { slug } = await params;
  const c = CASES[slug];

  return (
    <article className="article">
      <nav>
        <Link href="/project-showcase" className="article-back">
          ← Back to case studies
        </Link>
      </nav>

      <header className="article-head">
        <p className="text-sm text-muted">Case study · {c.meta}</p>
        <h1 className="mt-3">{c.title}</h1>
        <p className="lead mt-4">{c.subtitle}</p>
      </header>

      <div className="art article-art-wide">
        <Image src={c.hero} alt={c.title} fill className="object-cover" priority unoptimized />
      </div>

      <div className="prose-flow">
        <section className="columns columns-2">
          <div>
            <h2>Context</h2>
            <ul>
              {c.context.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Actions</h2>
            <ul>
              {c.actions.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </section>

        {'process' in c ? (
          <section>
            <h2>Process</h2>
            <div>
              {c.process!.map((step) => (
                <div key={step.heading} className="qa-item">
                  <h3>{step.heading}</h3>
                  <ul>
                    {step.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section>
          <h2>Results</h2>
          <ul>
            {c.results.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>

        <section className="stats">
          {c.metrics.map((m) => (
            <div key={m.label} className="stat">
              <div className="stat-value">{m.value}</div>
              <div className="stat-label">{m.label}</div>
            </div>
          ))}
        </section>
      </div>
    </article>
  );
}
