import type { ReactElement } from 'react';

export default function DarkShowcaseSection(): ReactElement {
  return (
    <section
      className="relative border-t border-foreground/10 bg-neutral-950 text-neutral-50"
      aria-labelledby="showcase-heading"
    >
      <div
        className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.4),transparent_60%)]"
        aria-hidden="true"
      />
      <div className="container py-24 sm:py-32 relative">
        <div className="max-w-5xl mx-auto text-center" data-reveal>
          <h2 id="showcase-heading" className="text-3xl sm:text-5xl font-semibold tracking-tight">
            Engineering leverage, not headcount.
          </h2>
          <p className="mt-6 text-neutral-300 text-lg leading-relaxed max-w-3xl mx-auto">
            We focus on multiplier work—reducing defect surfaces, shrinking lead time to change, and embedding
            patterns that keep systems adaptable as complexity scales.
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3" data-reveal>
          {[
            { title: 'Architecture clarity', body: 'Surface hidden dependencies & simplify coupling.' },
            { title: 'Confidence metrics', body: 'Meaningful coverage + mutation + failure trend insight.' },
            { title: 'Operational readiness', body: 'Proactive SLOs, trace probes & incident rehearsal.' },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 flex flex-col"
            >
              <h3 className="font-medium tracking-tight text-lg">{f.title}</h3>
              <p className="mt-2 text-sm text-neutral-300 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
