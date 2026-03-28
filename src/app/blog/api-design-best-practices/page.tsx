import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import APIDesignPost from './APIDesignPost';
import StructuredData from '@/app/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'API Design Best Practices: Building RESTful APIs That Scale | Maxwell Software Solutions',
  description:
    'Learn essential API design principles, RESTful best practices, versioning strategies, and documentation standards for building scalable, maintainable APIs.',
  openGraph: {
    title: 'API Design Best Practices: Building RESTful APIs That Scale',
    description:
      'Learn essential API design principles, RESTful best practices, versioning strategies, and documentation standards for building scalable, maintainable APIs.',
    type: 'article',
    publishedTime: '2024-12-20T00:00:00.000Z',
  },
};

export default function Page(): ReactElement {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: 'API Design Best Practices', url: '/blog/api-design-best-practices' },
  ]);
  return (
    <>
      <StructuredData schema={breadcrumb} />
      <APIDesignPost />
    </>
  );
}
