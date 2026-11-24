import type { Metadata } from 'next';
import { SITE_OG_IMAGE } from '@/lib/seo/utils';
import type { ReactElement } from 'react';
import CICDPost from './CICDPost';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import StructuredData from '@/app/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'Modern CI/CD Pipelines: Automating Your Software Delivery',
  description:
    'Learn how to build modern CI/CD pipelines with automated testing, deployment strategies, and DevOps best practices for faster, safer releases.',
  openGraph: {
    images: [SITE_OG_IMAGE],
    title: 'Modern CI/CD Pipelines: Automating Your Software Delivery',
    description:
      'Learn how to build modern CI/CD pipelines with automated testing, deployment strategies, and DevOps best practices for faster, safer releases.',
    type: 'article',
    publishedTime: '2024-12-22T00:00:00.000Z',
  },
  alternates: {
    canonical: '/blog/ci-cd-pipelines',
  },
};

export default function Page(): ReactElement {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: 'Modern CI/CD Pipelines', url: '/blog/ci-cd-pipelines' },
  ]);
  return (
    <>
      <StructuredData schema={breadcrumb} />
      <ArticleStructuredData
        title="Modern CI/CD Pipelines: Automating Your Software Delivery"
        description="Learn how to build modern CI/CD pipelines with automated testing, deployment strategies, and DevOps best practices for faster, safer releases."
        datePublished="2024-12-22"
      />
      <CICDPost />
    </>
  );
}
