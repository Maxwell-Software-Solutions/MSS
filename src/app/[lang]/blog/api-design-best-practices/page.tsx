import type { Metadata } from 'next';
import { SITE_OG_IMAGE } from '@/lib/seo/utils';
import type { ReactElement } from 'react';
import APIDesignPost from './APIDesignPost';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import StructuredData from '@/app/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'API Design Best Practices for RESTful APIs',
  description:
    'Learn essential API design principles, RESTful best practices, versioning strategies, and documentation standards for building scalable, maintainable APIs.',
  openGraph: {
    images: [SITE_OG_IMAGE],
    title: 'API Design Best Practices: Building RESTful APIs That Scale',
    description:
      'Learn essential API design principles, RESTful best practices, versioning strategies, and documentation standards for building scalable, maintainable APIs.',
    type: 'article',
    publishedTime: '2024-12-20T00:00:00.000Z',
  },
  alternates: {
    canonical: '/blog/api-design-best-practices',
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
      <ArticleStructuredData
        title="API Design Best Practices: Building RESTful APIs That Scale"
        description="Learn essential API design principles, RESTful best practices, versioning strategies, and documentation standards for building scalable, maintainable APIs."
        datePublished="2024-12-20"
      />
      <APIDesignPost />
    </>
  );
}
