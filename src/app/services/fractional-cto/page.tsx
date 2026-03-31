import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import FractionalCTOPage from './FractionalCTOPage';
import StructuredData from '@/app/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'Fractional CTO Services — Part-Time Technical Leadership | Maxwell Software Solutions',
  description:
    'Fractional CTO services in Europe and Lithuania. Senior technical leadership — architecture decisions, team hiring, vendor selection, and investor due diligence — from €3,500/month. No long-term contract.',
  openGraph: {
    title: 'Fractional CTO — Technical Leadership Without the €120K Salary',
    description:
      'Part-time CTO for startups and scale-ups. Architecture, hiring, strategy, and investor-ready technical communication. From €3,500/month.',
    type: 'website',
  },
  alternates: {
    canonical: '/services/fractional-cto',
  },
};

export default function Page(): ReactElement {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Fractional CTO', url: '/services/fractional-cto' },
  ]);
  return (
    <>
      <StructuredData schema={breadcrumb} />
      <FractionalCTOPage />
    </>
  );
}
