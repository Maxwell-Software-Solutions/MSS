import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import CICDPost from './CICDPost';

export const metadata: Metadata = {
  title: 'Modern CI/CD Pipelines: Automating Your Software Delivery | Maxwell Software Solutions',
  description:
    'Learn how to build modern CI/CD pipelines with automated testing, deployment strategies, and DevOps best practices for faster, safer releases.',
  openGraph: {
    title: 'Modern CI/CD Pipelines: Automating Your Software Delivery',
    description:
      'Learn how to build modern CI/CD pipelines with automated testing, deployment strategies, and DevOps best practices for faster, safer releases.',
    type: 'article',
    publishedTime: '2024-12-22T00:00:00.000Z',
  },
};

export default function Page(): ReactElement {
  return <CICDPost />;
}
