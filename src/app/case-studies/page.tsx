import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import CaseStudiesPage from './CaseStudiesPage';
import StructuredData from '@/app/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';
import { generateMetadata as genMeta } from '@/lib/seo/utils';

export const metadata: Metadata = genMeta('caseStudies');

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
