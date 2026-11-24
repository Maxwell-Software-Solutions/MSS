import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import CodeHealthAuditPost from './CodeHealthAuditPost';
import StructuredData from '@/app/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'How to Know When Your Codebase Is Slowing Down Your Business | Maxwell Software Solutions',
  description:
    'Technical debt has a real business cost: missed estimates, slow onboarding, and compounding maintenance overhead. Learn the symptoms of an unhealthy codebase and what a code health audit actually surfaces.',
  openGraph: {
    title: 'How to Know When Your Codebase Is Slowing Down Your Business',
    description:
      'Technical debt and code health audit guide for CTOs and engineering leaders. Learn the real symptoms and business costs of an unhealthy codebase.',
    type: 'article',
    publishedTime: '2026-03-28T00:00:00.000Z',
  },
  alternates: {
    canonical: '/blog/code-health-audit-business-impact',
  },
};

export default function Page(): ReactElement {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: 'How to Know When Your Codebase Is Slowing Down Your Business', url: '/blog/code-health-audit-business-impact' },
  ]);
  return (
    <>
      <StructuredData schema={breadcrumb} />
      <CodeHealthAuditPost />
    </>
  );
}
