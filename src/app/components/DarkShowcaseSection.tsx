import type { ReactElement } from 'react';

export default function DarkShowcaseSection(): ReactElement {
  return (
    <section className="section section-tone" aria-labelledby="showcase-heading">
      <div className="wrap">
        <div className="section-head section-head-split">
          <h2 id="showcase-heading">Engineering leverage, not headcount.</h2>
          <p className="lead">
            We focus on multiplier work—reducing defect surfaces, shrinking lead time to change, and embedding patterns
            that keep systems adaptable as complexity scales.
          </p>
        </div>
        <div className="columns columns-3">
          {[
            { title: 'Architecture clarity', body: 'Surface hidden dependencies & simplify coupling.' },
            { title: 'Confidence metrics', body: 'Meaningful coverage + mutation + failure trend insight.' },
            { title: 'Operational readiness', body: 'Proactive SLOs, trace probes & incident rehearsal.' },
          ].map((f) => (
            <div key={f.title} className="item">
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
