import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import CaseStudiesContent from './CaseStudiesContent';
import StructuredData from '@/app/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'Case Studies — Software Engineering Success Stories | Vilnius, Lithuania',
  description:
    'Explore our portfolio of successful software quality transformations, reliability improvements, and engineering excellence initiatives by Maxwell Software Solutions, based in Vilnius, Lithuania.',
  alternates: {
    canonical: '/project-showcase',
  },
};

export default function CaseStudiesIndex(): ReactElement {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Case Studies', url: '/project-showcase' },
  ]);
  return (
    <>
      <StructuredData schema={breadcrumb} />
      <CaseStudiesContent />
    </>
  );
}
