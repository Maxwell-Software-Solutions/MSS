import type { ReactElement } from 'react';

// SVG placeholder logos — replaced with real brand assets when provided
function LogoMiau(): ReactElement {
  return (
    <svg
      width="72"
      height="36"
      viewBox="0 0 72 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Miau"
      role="img"
    >
      <rect width="72" height="36" rx="6" fill="currentColor" fillOpacity="0.06" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
        fill="currentColor"
        fillOpacity="0.55"
        letterSpacing="0.08em"
      >
        MIAU
      </text>
    </svg>
  );
}

function LogoNeoNova(): ReactElement {
  return (
    <svg
      width="88"
      height="36"
      viewBox="0 0 88 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="NeoNova"
      role="img"
    >
      <rect width="88" height="36" rx="6" fill="currentColor" fillOpacity="0.06" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
        fill="currentColor"
        fillOpacity="0.55"
        letterSpacing="0.06em"
      >
        NEONOVA
      </text>
    </svg>
  );
}

function LogoFueille(): ReactElement {
  return (
    <svg
      width="80"
      height="36"
      viewBox="0 0 80 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Fueille"
      role="img"
    >
      <rect width="80" height="36" rx="6" fill="currentColor" fillOpacity="0.06" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
        fill="currentColor"
        fillOpacity="0.55"
        letterSpacing="0.06em"
      >
        FUEILLE
      </text>
    </svg>
  );
}

const testimonials = [
  {
    quote:
      'Maxwell Software Solutions cut our deployment pipeline from four hours to under ten minutes. The observability layer they built gave us incident visibility we never had before — MTTR dropped 71% in the first quarter.',
    author: 'CTO, Miau',
  },
  {
    quote:
      'They came in, understood our integration mess within days, and shipped a clean event-driven architecture that eliminated three hours of daily manual reconciliation. Exact professionals — zero hand-holding required.',
    author: 'Head of Engineering, NeoNova',
  },
  {
    quote:
      'Our distributed team across six countries needed a secure, consistent dev environment. The VDI rollout reduced onboarding from two days to 45 minutes. A genuinely transformative engagement.',
    author: 'Founder, Fueille',
  },
];

const stats = [
  { value: '3×', label: 'faster deployments' },
  { value: '€200k+', label: 'in projects delivered' },
  { value: '100%', label: 'on-time delivery' },
];

export default function SocialProofSection(): ReactElement {
  return (
    <section className="border-t border-border bg-wash" aria-labelledby="social-proof-heading">
      <div className="max-w-6xl mx-auto px-6 py-16 sm:px-10 sm:py-20" data-reveal>
        {/* Client logos */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">Trusted by forward-thinking teams</p>
          <div className="flex flex-wrap items-center gap-6 text-foreground sm:gap-8">
            <LogoMiau />
            <LogoNeoNova />
            <LogoFueille />
          </div>
        </div>

        {/* Stats row */}
        <div className="ruled mt-10 grid-cols-1 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.value} className="p-6 sm:p-7">
              <div className="text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">{s.value}</div>
              <div className="mt-2 text-sm text-muted">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-12 grid gap-8 md:grid-cols-3" id="social-proof-heading" aria-label="Client testimonials">
          <h2 className="sr-only">Client results and testimonials</h2>
          {testimonials.map((item) => (
            <figure key={item.author} className="flex flex-col justify-between border-t border-border-strong pt-6">
              {/* Quote mark */}
              <div aria-hidden="true" className="mb-3 select-none text-3xl leading-none text-accent">
                &ldquo;
              </div>
              <blockquote className="flex-1 text-[0.9375rem] leading-relaxed text-foreground">
                {item.quote}
              </blockquote>
              <figcaption className="mt-5 text-sm font-medium text-muted">{item.author}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}