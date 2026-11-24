import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import ServicesPage from './ServicesPage';
import StructuredData from '@/app/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';
import { generateMetadata as genMeta } from '@/lib/seo/utils';

export const metadata: Metadata = genMeta('services');

export default function ServicesPageWrapper(): ReactElement {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
  ]);
  return (
    <>
      <StructuredData schema={breadcrumb} />
      <ServicesPage />
    </>
  );
}
