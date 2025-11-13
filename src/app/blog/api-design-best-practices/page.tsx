import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import APIDesignPost from './APIDesignPost';

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
  return <APIDesignPost />;
}
