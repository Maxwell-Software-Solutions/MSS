import type { ReactElement } from 'react';

export interface ProcessStep {
  title: string;
  desc: string;
}
interface ProcessTimelineProps {
  steps: ProcessStep[];
}

/** An ordered process: a rule, a number, a title, a sentence. Columns on desktop, compact rows on phones. */
export function ProcessTimeline({ steps }: ProcessTimelineProps): ReactElement {
  return (
    <ol className="steps steps-5">
      {steps.map((s, i) => (
        <li key={s.title} id={s.title.toLowerCase().replace(/\s+/g, '-')} className="step scroll-mt-24">
          <div className="step-index">{i + 1}</div>
          <div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default ProcessTimeline;
