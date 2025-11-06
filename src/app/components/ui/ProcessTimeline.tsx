'use client';
import type { ReactElement } from 'react';

export interface ProcessStep {
  title: string;
  desc: string;
}
interface ProcessTimelineProps {
  steps: ProcessStep[];
}

// Responsive process timeline: horizontal on lg+, vertical otherwise.
export function ProcessTimeline({ steps }: ProcessTimelineProps): ReactElement {
  return (
    <div className="relative mt-4">
      {/* Desktop horizontal connector line */}
      <div
        className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300/60 dark:via-slate-600/50 to-transparent"
        aria-hidden="true"
      />
      <ol className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-8">
        {steps.map((s, i) => {
          const id = s.title.toLowerCase().replace(/\s+/g, '-');
          return (
            <li key={s.title} id={id} className="relative group scroll-mt-28 transition-colors text-foreground/80">
              <div className="flex flex-col items-start lg:items-center text-left lg:text-center">
                <div
                  className={[
                    'w-8 h-8 rounded-full bg-card border border-accent/20 shadow flex items-center justify-center mb-4 transition-colors',
                    'text-white',
                    'group-hover:bg-accent group-hover:text-black',
                  ].join(' ')}
                >
                  {i + 1}
                </div>
                <h3 className="text-base font-semibold tracking-tight leading-snug mb-2">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted max-w-xs lg:max-w-[14rem]">{s.desc}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
export default ProcessTimeline;
