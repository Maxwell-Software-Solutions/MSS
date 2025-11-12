'use client';

import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';

/**
 * Gold progress bar that shows only on first page load
 * Simulates loading progress for better perceived performance
 */
export default function FirstLoadProgressBar(): ReactElement | null {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if this is the first load
    const hasLoadedBefore = sessionStorage.getItem('has-loaded');

    if (hasLoadedBefore) {
      // Not first load, don't show
      return;
    }

    // Mark as loaded
    sessionStorage.setItem('has-loaded', 'true');
    setIsVisible(true);

    // Simulate loading progress
    const intervals: number[] = [];

    // Fast start (0-50% in 200ms)
    intervals.push(window.setTimeout(() => setProgress(50), 100));

    // Medium speed (50-80% in 400ms)
    intervals.push(window.setTimeout(() => setProgress(70), 300));
    intervals.push(window.setTimeout(() => setProgress(80), 500));

    // Slow down near end (80-95% in 600ms)
    intervals.push(window.setTimeout(() => setProgress(85), 700));
    intervals.push(window.setTimeout(() => setProgress(90), 900));
    intervals.push(window.setTimeout(() => setProgress(95), 1100));

    // Complete on page interactive
    const completeProgress = (): void => {
      setProgress(100);
      // Fade out after completion
      setTimeout(() => setIsVisible(false), 300);
    };

    // Complete when page is fully loaded
    if (document.readyState === 'complete') {
      completeProgress();
    } else {
      window.addEventListener('load', completeProgress);
    }

    return () => {
      intervals.forEach(clearTimeout);
      window.removeEventListener('load', completeProgress);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-1 bg-transparent pointer-events-none"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page loading progress"
    >
      <div
        className="h-full bg-gradient-to-r from-accent via-yellow-500 to-accent transition-all duration-300 ease-out shadow-lg shadow-accent/50"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
        }}
      />
    </div>
  );
}
