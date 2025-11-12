'use client';

import type { ReactElement } from 'react';
import dynamic from 'next/dynamic';

// Lazy load below-the-fold sections for better TBT
const TestimonialsSection = dynamic(() => import('@/app/components/TestimonialsSection'), {
  loading: () => <div style={{ minHeight: '400px' }} aria-hidden="true" />,
});
const DarkShowcaseSection = dynamic(() => import('@/app/components/DarkShowcaseSection'), {
  loading: () => <div style={{ minHeight: '500px' }} aria-hidden="true" />,
});
const FinalCtaSection = dynamic(() => import('@/app/components/FinalCtaSection'), {
  loading: () => <div style={{ minHeight: '300px' }} aria-hidden="true" />,
});

// Deferred sections to reduce initial bundle size and TBT
export default function DeferredSections(): ReactElement {
  return (
    <>
      <TestimonialsSection />
      <DarkShowcaseSection />
      <FinalCtaSection />
    </>
  );
}
