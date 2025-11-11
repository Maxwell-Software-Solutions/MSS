import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import TermsPageComponent from './TermsPage';

export const metadata: Metadata = {
  title: 'Terms of Service — Maxwell Software Solutions',
  description: 'The conditions that govern use of the Maxwell Software Solutions website and related content.',
  alternates: {
    canonical: '/terms',
  },
};

export default function Page(): ReactElement {
  return <TermsPageComponent />;
}
