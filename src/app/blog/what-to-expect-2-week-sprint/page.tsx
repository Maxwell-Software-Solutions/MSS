import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import TwoWeekSprintPost from './TwoWeekSprintPost';
import StructuredData from '@/app/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'What to Expect From a 2-Week Software Sprint (And When It Makes Sense) | Maxwell Software Solutions',
  description:
    'A practical guide to rapid software development sprints. Learn what fits in 2 weeks, what does not, how a well-run sprint works, and when an MVP sprint makes sense for your team.',
  openGraph: {
    title: 'What to Expect From a 2-Week Software Sprint',
    description:
      'Rapid software development guide: what fits in a 2-week sprint, how the MSS Sprint-in-a-Box works, and when it makes sense for your team.',
    type: 'article',
    publishedTime: '2026-03-28T00:00:00.000Z',
  },
  alternates: {
    canonical: '/blog/what-to-expect-2-week-sprint',
  },
};

export default function Page(): ReactElement {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: 'What to Expect From a 2-Week Software Sprint', url: '/blog/what-to-expect-2-week-sprint' },
  ]);
  return (
    <>
      <StructuredData schema={breadcrumb} />
      <TwoWeekSprintPost />
    </>
  );
}
