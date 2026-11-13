import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import FractionalCTOPage from './FractionalCTOPage';
import StructuredData from '@/app/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'Fractional CTO Services — Part-Time Technical Leadership | Maxwell Software Solutions',
  description:
    'Fractional CTO services in Europe and Lithuania. Senior technical leadership: architecture decisions, team hiring, vendor selection, and investor due diligence, on a monthly retainer. No long-term contract.',
  openGraph: {
    title: 'Fractional CTO: Technical Leadership Without the Full-Time Salary',
    description:
      'Part-time CTO for startups and scale-ups. Architecture, hiring, strategy, and investor-ready technical communication. Monthly retainer, no long-term contract.',
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
