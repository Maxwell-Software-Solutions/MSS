'use client';

import dynamic from 'next/dynamic';
import type { ReactElement } from 'react';

// Lazy load non-critical components to reduce TBT
const AppFooter = dynamic(() => import('@/app/components/AppFooter'), {
  ssr: false,
  loading: () => <div style={{ minHeight: '400px' }} aria-hidden="true" />,
});

export default function ClientOnlyComponents(): ReactElement {
  return <AppFooter />;
}
