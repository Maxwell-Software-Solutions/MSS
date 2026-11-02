'use client';

import { useEffect, useRef, type HTMLAttributes, type ReactElement, type ReactNode } from 'react';

interface RailProps extends HTMLAttributes<HTMLDivElement> {
  /** Names the row for assistive technology while it scrolls sideways. */
  label: string;
  children: ReactNode;
}

/**
 * A row of cards. On phones CSS turns it into a rail that scrolls sideways; only while it scrolls does it
 * take keyboard focus and announce itself as a region, and it moves the progress line that follows it.
 * Wider screens get the plain grid, with no extra attributes.
 */
export default function Rail({ label, className = '', children, ...rest }: RailProps): ReactElement {
  const railRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLSpanElement | null>(null);
  const ownRole = Boolean(rest.role);
  const ownLabel = Boolean(rest['aria-label'] || rest['aria-labelledby']);

  useEffect(() => {
    const rail = railRef.current;
    const thumb = thumbRef.current;
    if (!rail) return undefined;
    let frame = 0;

    const mark = (scrollable: boolean): void => {
      if (scrollable) rail.tabIndex = 0;
      else rail.removeAttribute('tabindex');
      if (!ownRole) {
        if (scrollable) rail.setAttribute('role', 'region');
        else rail.removeAttribute('role');
      }
      if (!ownLabel) {
        if (scrollable) rail.setAttribute('aria-label', label);
        else rail.removeAttribute('aria-label');
      }
    };

    const paint = (): void => {
      frame = 0;
      const max = rail.scrollWidth - rail.clientWidth;
      const scrollable = max > 1;
      mark(scrollable);
      thumb?.style.setProperty('--seen', String(scrollable ? rail.clientWidth / rail.scrollWidth : 1));
      thumb?.style.setProperty('--at', String(scrollable ? rail.scrollLeft / max : 0));
    };
    const schedule = (): void => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    paint();
    rail.addEventListener('scroll', schedule, { passive: true });
    const resizes = typeof ResizeObserver === 'function' ? new ResizeObserver(schedule) : null;
    resizes?.observe(rail);
    return () => {
      cancelAnimationFrame(frame);
      rail.removeEventListener('scroll', schedule);
      resizes?.disconnect();
      mark(false);
    };
  }, [label, ownRole, ownLabel]);

  return (
    <>
      <div ref={railRef} className={`${className} rail`.trim()} {...rest}>
        {children}
      </div>
      <div className="rail-progress" aria-hidden="true">
        <span ref={thumbRef} />
      </div>
    </>
  );
}
