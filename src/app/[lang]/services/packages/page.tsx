import type { Metadata } from 'next';
import { SITE_OG_IMAGE } from '@/lib/seo/utils';
import type { ReactElement } from 'react';
import ServicesPackagesPage from './ServicesPackagesPage';
import StructuredData from '@/app/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'Service Packages: Audit, Sprint, Retainer & More',
  description:
    'Compare all five Maxwell Software Solutions service packages: Code Health Audit, Sprint-in-a-Box, Engineering Partner Retainer, CI/CD Accelerator, and Fractional CTO.',
  openGraph: {
    images: [SITE_OG_IMAGE],
    title: 'Service Packages — Maxwell Software Solutions',
    description:
      'Five focused service packages from a one-off audit to ongoing fractional CTO leadership. Transparent pricing, clear scope.',
    type: 'website',
  },
  alternates: {
    canonical: '/services/packages',
  },
};

export default function Page(): ReactElement {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Packages', url: '/services/packages' },
  ]);
  return (
    <>
      <StructuredData schema={breadcrumb} />
      <ServicesPackagesPage />
    </>
  );
}
