import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import CaseStudiesPage from './CaseStudiesPage';
import StructuredData from '@/app/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'Case Studies — Software Engineering Results | Maxwell Software Solutions',
  description:
    'Real client engagements with measurable outcomes: cloud migrations, ERP integrations, and VDI rollouts by Maxwell Software Solutions, Vilnius, Lithuania.',
  alternates: {
    canonical: '/case-studies',
  },
};

export default function Page(): ReactElement {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Case Studies', url: '/case-studies' },
  ]);
  return (
    <>
      <StructuredData schema={breadcrumb} />
      <CaseStudiesPage />
    </>
  );
}
