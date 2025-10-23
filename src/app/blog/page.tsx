import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import BlogIndexContent from './BlogIndexContent';

export const metadata: Metadata = {
  title: 'Insights — Maxwell Software Solutions',
  description: 'Short, high-signal posts on testing, refactoring, and reliability.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogIndexPage(): ReactElement {
  return <BlogIndexContent />;
}
