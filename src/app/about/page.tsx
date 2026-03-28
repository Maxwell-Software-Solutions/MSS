import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import AboutPageComponent from './AboutPage';
import StructuredData from '@/app/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'About Maxwell Software Solutions — Elite Software Consultancy, Vilnius Lithuania',
  description:
    'Maxwell Software Solutions is a software engineering consultancy based in Vilnius, Lithuania, specialising in code quality audits, TDD, and reliability engineering. Meet the team.',
  alternates: {
    canonical: '/about',
  },
};

export default function Page(): ReactElement {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
  ]);
  return (
    <>
      <StructuredData schema={breadcrumb} />
      <AboutPageComponent />
    </>
  );
}
