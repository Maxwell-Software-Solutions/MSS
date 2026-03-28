import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import BlogIndexContent from './BlogIndexContent';
import StructuredData from '@/app/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'Insights — Maxwell Software Solutions',
  description: 'Short, high-signal posts on testing, refactoring, and reliability.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogIndexPage(): ReactElement {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
  ]);
  return (
    <>
      <StructuredData schema={breadcrumb} />
      <BlogIndexContent />
    </>
  );
}
