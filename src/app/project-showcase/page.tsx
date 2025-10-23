import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import CaseStudiesContent from './CaseStudiesContent';

export const metadata: Metadata = {
  title: 'Case Studies — Maxwell Software Solutions',
  description: 'Real results from code quality and reliability engagements.',
  alternates: {
    canonical: '/project-showcase',
  },
};

export default function CaseStudiesIndex(): ReactElement {
  return <CaseStudiesContent />;
}
