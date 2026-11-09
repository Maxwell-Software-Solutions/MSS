import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import StartASprintPage from './StartASprintPage';
import StructuredData from '@/app/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'Sprint-in-a-Box: Ship Your MVP in 2 Weeks at a Fixed Price | Maxwell Software Solutions',
  description:
    'A self-serve 2-week development sprint for founders and product teams. Fixed price, agreed before the sprint starts. Discovery call, scoped sprint, tested code, full handoff. Book your sprint today.',
  openGraph: {
    title: 'Sprint-in-a-Box: a 2-Week MVP Sprint at a Fixed Price',
    description:
      'Fixed price, fixed timeline, no retainer. A senior engineer builds your MVP or feature in 10 working days. Full code ownership at handoff.',
    type: 'website',
  },
  alternates: {
    canonical: '/start-a-sprint',
  },
};

export default function Page(): ReactElement {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Start a Sprint', url: '/start-a-sprint' },
  ]);
  return (
    <>
      <StructuredData schema={breadcrumb} />
      <StartASprintPage />
    </>
  );
}
