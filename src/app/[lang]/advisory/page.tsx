import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import AdvisoryPage from './AdvisoryPage';
import StructuredData from '@/app/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'CTO-in-a-Box — Async Advisory for Startup Founders | Maxwell Software Solutions',
  description:
    'Technical leadership without the full-time salary. Async Loom video reviews, monthly strategy call, and Slack access on a monthly subscription. Cancel anytime. Book a free intro call.',
  openGraph: {
    title: 'CTO-in-a-Box: Technical Leadership on a Monthly Subscription',
    description:
      'Async advisory for startup founders who need senior engineering guidance but aren\u2019t ready for a full-time hire. 4 video reviews, monthly call, Slack access.',
    type: 'website',
  },
  alternates: {
    canonical: '/advisory',
  },
};

export default function Page(): ReactElement {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'CTO-in-a-Box', url: '/advisory' },
  ]);
  return (
    <>
      <StructuredData schema={breadcrumb} />
      <AdvisoryPage />
    </>
  );
}
