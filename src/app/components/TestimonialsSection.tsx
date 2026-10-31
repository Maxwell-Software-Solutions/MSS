import type { ReactElement } from 'react';

export default function TestimonialsSection(): ReactElement {
  return (
    <section className="section" aria-labelledby="testimonials-heading">
      <div className="wrap">
        <h2 id="testimonials-heading" className="section-head">
          Client perspective
        </h2>
        <div className="columns columns-3">
          {[
            {
              quote:
                'They reduced build flakiness and restructured our test pyramid—deployment confidence went up immediately.',
              author: 'VP Engineering, SaaS Platform',
            },
            {
              quote: 'Our critical path refactor shipped 6 weeks earlier with their architectural guidance.',
              author: 'Director of Engineering, FinTech',
            },
            {
              quote: 'Actionable audit, crisp patterns, and measurable reliability improvements across services.',
              author: 'Principal Engineer, Retail',
            },
          ].map((t) => (
            <figure key={t.author} className="quote">
              <blockquote>“{t.quote}”</blockquote>
              <figcaption>{t.author}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
