import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import ServicesPackagesPage from './ServicesPackagesPage';
import StructuredData from '@/app/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'Service Packages — Code Audit, Sprint, Retainer & More | Maxwell Software Solutions',
  description:
    'Compare all five Maxwell Software Solutions service packages: Code Health Audit (€2,500), Sprint-in-a-Box (€4,800), Engineering Partner Retainer (€3,500–6,500/mo), CI/CD Accelerator (€7,500), and Fractional CTO (€3,500/mo).',
  openGraph: {
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
