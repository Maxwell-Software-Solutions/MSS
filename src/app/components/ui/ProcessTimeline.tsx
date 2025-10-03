'use client';
import type { ReactElement } from 'react';
import { useEffect, useState, useRef } from 'react';

export interface ProcessStep {
  title: string;
  desc: string;
}
interface ProcessTimelineProps {
  steps: ProcessStep[];
}

// Responsive process timeline: horizontal on lg+, vertical otherwise.
export function ProcessTimeline({ steps }: ProcessTimelineProps): ReactElement {
  const [active, setActive] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const ids = steps.map((s) => s.title.toLowerCase().replace(/\s+/g, '-'));
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    observerRef.current?.disconnect();
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to top (lowest boundingClientRect.y >= 0)
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.y - b.boundingClientRect.y);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0.1, 0.6] }
    );
    elements.forEach((el) => observer.observe(el));
    observerRef.current = observer;
    return () => observer.disconnect();
  }, [steps]);

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
            <li
              key={s.title}
              id={id}
              className={[
                'relative group scroll-mt-28 transition-colors',
                active === id ? 'text-foreground' : 'text-foreground/80',
              ].join(' ')}
              aria-current={active === id ? 'step' : undefined}
            >
              <div className="flex flex-col items-start lg:items-center text-left lg:text-center">
                <div
                  className={[
                    'w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-black/10 dark:border-white/15 shadow flex items-center justify-center text-[13px] font-medium mb-4 transition-colors',
                    active === id
                      ? 'border-amber-500 text-amber-700 dark:text-amber-300'
                      : 'text-slate-700 dark:text-slate-200',
                  ].join(' ')}
                >
                  {i + 1}
                </div>
                <h3 className="text-base font-semibold tracking-tight leading-snug mb-2">{s.title}</h3>
                <p className="text-sm leading-relaxed text-[--muted] max-w-xs lg:max-w-[14rem]">{s.desc}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
export default ProcessTimeline;
