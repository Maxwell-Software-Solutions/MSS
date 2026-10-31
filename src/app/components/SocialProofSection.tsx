import type { ReactElement } from 'react';
import { StatCard } from './ui';

// SVG placeholder logos — replaced with real brand assets when provided
function Wordmark({ name, width }: { name: string; width: number }): ReactElement {
  return (
    <svg width={width} height="24" viewBox={`0 0 ${width} 24`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label={name[0] + name.slice(1).toLowerCase()} role="img">
      <text
        x="0"
        y="50%"
        dominantBaseline="central"
        fontSize="14"
        fontWeight="600"
        fill="currentColor"
        fillOpacity="0.7"
        letterSpacing="0.08em"
      >
        {name}
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
    <section className="section" aria-labelledby="social-proof-heading">
      <div className="wrap">
        <div className="logos">
          <p className="text-sm text-muted">Trusted by forward-thinking teams</p>
          <div className="logos-row text-foreground">
            <Wordmark name="MIAU" width={48} />
            <Wordmark name="NEONOVA" width={84} />
            <Wordmark name="FUEILLE" width={72} />
          </div>
        </div>

        <div className="stats">
          {stats.map((s) => (
            <StatCard key={s.value} value={s.value} label={s.label} />
          ))}
        </div>

        <div className="columns columns-3 block-gap" id="social-proof-heading" aria-label="Client testimonials">
          <h2 className="sr-only">Client results and testimonials</h2>
          {testimonials.map((item) => (
            <figure key={item.author} className="quote">
              <blockquote>{item.quote}</blockquote>
              <figcaption>{item.author}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
