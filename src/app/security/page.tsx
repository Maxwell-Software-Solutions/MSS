import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import SecurityPageComponent from './SecurityPage';

export const metadata: Metadata = {
  title: 'Security Policy — Maxwell Software Solutions',
  description: 'Security practices, incident response approach, and contact details for Maxwell Software Solutions.',
  alternates: {
    canonical: '/security',
  },
};

export default function Page(): ReactElement {
  return <SecurityPageComponent />;
}
