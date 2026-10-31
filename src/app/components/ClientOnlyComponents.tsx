'use client';

import dynamic from 'next/dynamic';
import type { ReactElement } from 'react';

// Lazy load non-critical components to reduce TBT
const ParallaxScrollEffects = dynamic(() => import('@/app/components/ParallaxScrollEffects'), {
  ssr: false,
});

const AppFooter = dynamic(() => import('@/app/components/AppFooter'), {
  ssr: false,
  loading: () => <div style={{ minHeight: '400px' }} aria-hidden="true" />,
});

const AutoContrastButtons = dynamic(() => import('@/app/components/AutoContrastButtons'), {
  ssr: false,
});

const FirstLoadProgressBar = dynamic(() => import('@/app/components/FirstLoadProgressBar'), {
  ssr: false,
});

export default function ClientOnlyComponents(): ReactElement {
  return (
    <>
      <FirstLoadProgressBar />
      <ParallaxScrollEffects key="scroll-effects" />
      <AutoContrastButtons />
      <AppFooter />
    </>
  );
}
