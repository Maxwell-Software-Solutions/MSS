import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import ServicesPage from './ServicesPage';
import StructuredData from '@/app/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'Code Quality Audits & Engineering Consulting — Maxwell Software Solutions | Vilnius, Lithuania',
  description:
    'Professional software engineering services in Vilnius, Lithuania: code quality audits, reliability engineering, testing strategy, CI/CD hardening, and technical debt reduction.',
  alternates: {
    canonical: '/services',
  },
};

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
