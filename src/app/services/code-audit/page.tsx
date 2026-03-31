import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import CodeAuditPage from './CodeAuditPage';
import StructuredData from '@/app/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'Code Audit Services — Technical Debt Assessment | Maxwell Software Solutions',
  description:
    'Professional code audit services: architecture review, security scan, performance analysis, and technical debt assessment. Get a prioritised remediation roadmap in 5 business days. €2,500 one-time.',
  openGraph: {
    title: 'Code Audit — Find Out Why Your Dev Team Is Slow',
    description:
      'Independent code review covering architecture, testing, CI/CD, security, performance, and maintainability. Detailed report with prioritised recommendations.',
    type: 'website',
  },
  alternates: {
    canonical: '/services/code-audit',
  },
};

export default function Page(): ReactElement {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Code Audit', url: '/services/code-audit' },
  ]);
  return (
    <>
      <StructuredData schema={breadcrumb} />
      <CodeAuditPage />
    </>
  );
}
