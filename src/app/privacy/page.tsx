import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import PrivacyPageComponent from './PrivacyPage';

export const metadata: Metadata = {
  title: 'Privacy Policy — Maxwell Software Solutions',
  description: 'How Maxwell Software Solutions collects, uses, and protects personal data in line with the GDPR.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function Page(): ReactElement {
  return <PrivacyPageComponent />;
}
