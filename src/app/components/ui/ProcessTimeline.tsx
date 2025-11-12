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
// Features progressive activation animation from left to right
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
                // Reset after showing all
                setTimeout(() => {
                  setActiveIndex(-1);
                }, 1000);
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

  return (
    <div className="relative mt-4" id="process-timeline-container">
      {/* Desktop horizontal connector line */}
      <div
        className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300/60 dark:via-slate-600/50 to-transparent"
        aria-hidden="true"
      />
      <ol className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-8">
        {steps.map((s, i) => {
          const id = s.title.toLowerCase().replace(/\s+/g, '-');
          const isActive = activeIndex === i;
          const hasBeenActive = activeIndex > i && activeIndex >= 0;

          return (
            <li
              key={s.title}
              id={id}
              className="relative group scroll-mt-28 transition-all duration-300 text-foreground/80"
              style={{
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
                opacity: activeIndex >= 0 && !isActive && !hasBeenActive ? 0.5 : 1,
              }}
            >
              <div className="flex flex-col items-start lg:items-center text-left lg:text-center">
                <div
                  className={[
                    'w-8 h-8 rounded-full border shadow flex items-center justify-center mb-4 transition-all duration-300',
                    'relative overflow-hidden',
                    isActive || hasBeenActive
                      ? 'bg-accent text-black border-accent scale-110 shadow-lg shadow-accent/50'
                      : 'bg-card border-accent/20 text-white group-hover:bg-accent group-hover:text-black',
                  ].join(' ')}
                >
                  {/* Pulse animation ring for active state */}
                  {isActive && <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75" />}
                  <span className="relative z-10">{i + 1}</span>
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
