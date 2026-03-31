import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import HireDeveloperPage from './HireDeveloperPage';
import StructuredData from '@/app/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'Hire a Senior Developer — React, Next.js, Node.js | Maxwell Software Solutions',
  description:
    'Hire senior React, Next.js, and Node.js developers in Lithuania and Europe. No recruitment fees, no 3-month hiring process. Start shipping production-ready code in 1-2 weeks.',
  openGraph: {
    title: 'Hire a Senior Developer — Without the 3-Month Hiring Process',
    description:
      'Outsource development to senior engineers in Europe. Sprint-in-a-Box from €4,800 or Engineering Partner Retainer from €3,500/month.',
    type: 'website',
  },
  alternates: {
    canonical: '/services/hire-developer',
  },
};

export default function Page(): ReactElement {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Hire a Developer', url: '/services/hire-developer' },
  ]);
  return (
    <>
      <StructuredData schema={breadcrumb} />
      <HireDeveloperPage />
    </>
  );
}
