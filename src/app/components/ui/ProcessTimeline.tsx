'use client';
import { useEffect, useState, type ReactElement } from 'react';

export interface ProcessStep {
  title: string;
  desc: string;
}
interface ProcessTimelineProps {
  steps: ProcessStep[];
}

// Responsive process timeline: horizontal on lg+, vertical otherwise.
// Steps activate left to right once the timeline scrolls into view.
export function ProcessTimeline({ steps }: ProcessTimelineProps): ReactElement {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Only run animation once when component mounts
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            // Start progressive activation
            let currentIndex = 0;
            const interval = setInterval(() => {
              setActiveIndex(currentIndex);
              currentIndex++;
              if (currentIndex >= steps.length) {
                clearInterval(interval);
                // Keep at final position - set to last index
                setActiveIndex(steps.length - 1);
              }
            }, 600); // 600ms delay between each step activation
          }
        });
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('process-timeline-container');
    if (element) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated, steps.length]);

  // Calculate progress percentage for line animation
  const progressPercent = activeIndex >= 0 ? ((activeIndex + 1) / steps.length) * 100 : 0;

  return (
    <div className="relative mt-4" id="process-timeline-container">
      {/* Desktop horizontal connector line - base, then progress */}
      <div className="absolute left-0 right-0 top-4 hidden h-px bg-border lg:block" aria-hidden="true" />
      <div
        className="absolute left-0 top-4 hidden h-px bg-accent transition-all duration-500 ease-out lg:block"
        style={{ width: `${progressPercent}%` }}
        aria-hidden="true"
      />

      {/* Mobile vertical connector line - base, then progress */}
      <div className="absolute bottom-0 left-4 top-0 w-px bg-border lg:hidden" aria-hidden="true" />
      <div
        className="absolute left-4 top-0 w-px bg-accent transition-all duration-500 ease-out lg:hidden"
        style={{ height: `${progressPercent}%` }}
        aria-hidden="true"
      />

      <ol className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-8">
        {steps.map((s, i) => {
          const id = s.title.toLowerCase().replace(/\s+/g, '-');
          const reached = activeIndex >= i;

          return (
            <li key={s.title} id={id} className="relative scroll-mt-28 lg:flex-1">
              {/* Mobile: circle on the left, content on the right. Desktop: circle on top, content below. */}
              <div className="flex flex-row items-start gap-4 text-left lg:flex-col lg:gap-5">
                <div
                  className={[
                    'relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border text-sm font-medium transition-colors duration-300',
                    reached
                      ? 'border-accent-fill bg-accent-fill text-accent-contrast'
                      : 'border-border-strong bg-surface text-secondary',
                  ].join(' ')}
                >
                  <span>{i + 1}</span>
                </div>
                <div className="flex-1 lg:flex-none">
                  <h3 className="mb-2 text-base font-semibold leading-snug tracking-tight">{s.title}</h3>
                  <p className="max-w-xs text-sm leading-relaxed text-secondary lg:max-w-[16rem]">{s.desc}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
export default ProcessTimeline;
