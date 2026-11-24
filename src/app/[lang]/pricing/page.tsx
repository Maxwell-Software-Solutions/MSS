import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import PricingPage from './PricingPage';
import StructuredData from '@/app/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'Pricing — Software Engineering Consultancy | Maxwell Software Solutions',
  description:
    'Transparent pricing for software engineering consultancy services in Vilnius, Lithuania. Starter audits, Growth retainers, and Enterprise dedicated teams. Competitive Eastern European rates.',
  alternates: {
    canonical: '/pricing',
  },
};

export default function Page(): ReactElement {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Pricing', url: '/pricing' },
  ]);
  return (
    <>
      <StructuredData schema={breadcrumb} />
      <PricingPage />
    </>
  );
}
