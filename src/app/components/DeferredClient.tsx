'use client';
import { useState, useEffect, useRef, type ReactNode, type ReactElement } from 'react';

interface DeferredClientProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  minHeight?: string;
  once?: boolean;
}

// Lazily render children on intersection to reduce initial JS execution.
export default function DeferredClient({
  children,
  fallback = null,
  rootMargin = '200px',
  minHeight = '0px',
  once = true,
}: DeferredClientProps): ReactElement {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (visible) return; // already shown
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            if (once) obs.disconnect();
            break;
          }
        }
      },
      { rootMargin, threshold: 0.01 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [visible, rootMargin, once]);

  return (
    <div ref={ref} style={{ minHeight }}>
      {visible ? children : fallback}
    </div>
  );
}
