import type { Metadata } from 'next';
import { SITE_OG_IMAGE } from '@/lib/seo/utils';
import type { ReactElement } from 'react';
import CodeHealthScorePage from './CodeHealthScorePage';
import StructuredData from '@/app/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'Code Health Score — Free Self-Assessment Quiz | Maxwell Software Solutions',
  description:
    'Rate your codebase health in 2 minutes. Answer 15 questions about testing, deployment, security, and engineering practices. Get an instant score with actionable insights.',
  openGraph: {
    images: [SITE_OG_IMAGE],
    title: 'Code Health Score — How Healthy Is Your Codebase?',
    description:
      '15-question self-assessment covering testing, CI/CD, security, and engineering practices. Instant results with a prioritised breakdown.',
    type: 'website',
  },
  alternates: {
    canonical: '/code-health-score',
  },
};

export default function Page(): ReactElement {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Code Health Score', url: '/code-health-score' },
  ]);
  return (
    <>
      <StructuredData schema={breadcrumb} />
      <CodeHealthScorePage />
    </>
  );
}
