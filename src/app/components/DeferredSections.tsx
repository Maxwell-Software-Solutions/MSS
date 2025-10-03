import type { ReactElement } from 'react';
import TestimonialsSection from '@/app/components/TestimonialsSection';
import DarkShowcaseSection from '@/app/components/DarkShowcaseSection';
import FinalCtaSection from '@/app/components/FinalCtaSection';

// Immediate render version (no intersection deferral) to avoid large blank space at page end.
export default function DeferredSections(): ReactElement {
  return (
    <>
      <TestimonialsSection />
      <DarkShowcaseSection />
      <FinalCtaSection />
    </>
  );
}
