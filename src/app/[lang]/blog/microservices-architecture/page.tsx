import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import MicroservicesPost from './MicroservicesPost';
import StructuredData from '@/app/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'Microservices Architecture: When to Use & How to Succeed | Maxwell Software Solutions',
  description:
    'Learn when microservices make sense, common patterns, pitfalls to avoid, and proven strategies for building distributed systems that scale.',
  openGraph: {
    title: 'Microservices Architecture: When to Use & How to Succeed',
    description:
      'Learn when microservices make sense, common patterns, pitfalls to avoid, and proven strategies for building distributed systems that scale.',
    type: 'article',
    publishedTime: '2024-12-21T00:00:00.000Z',
  },
};

export default function Page(): ReactElement {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: 'Microservices Architecture', url: '/blog/microservices-architecture' },
  ]);
  return (
    <>
      <StructuredData schema={breadcrumb} />
      <MicroservicesPost />
    </>
  );
}
