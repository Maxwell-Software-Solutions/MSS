import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import HomeContent from './HomeContent';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Home(): ReactElement {
  return <HomeContent />;
}
