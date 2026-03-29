import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import FreeAuditPage from './FreeAuditPage';
import StructuredData from '@/app/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'Free Code Health Audit — Worth €2,500 | Maxwell Software Solutions',
  description:
    'Get a free code health audit from Maxwell Software Solutions. We review your architecture, security, performance, and tech debt — and deliver a prioritised remediation report in 5 business days. Limited to 5 per month.',
  openGraph: {
    title: 'Free Code Health Audit — Worth €2,500',
    description:
      'Architecture review, security scan, performance bottlenecks, and tech debt assessment. Delivered free in 5 business days. Limited to 5 audits per month.',
    type: 'website',
  },
  alternates: {
    canonical: '/free-audit',
  },
};

export default function Page(): ReactElement {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Free Code Health Audit', url: '/free-audit' },
  ]);
  return (
    <>
      <StructuredData schema={breadcrumb} />
      <FreeAuditPage />
    </>
  );
}
