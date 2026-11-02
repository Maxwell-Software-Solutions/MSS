import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import AboutPageComponent from './AboutPage';
import StructuredData from '@/app/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';
import { generateMetadata as genMeta } from '@/lib/seo/utils';

export const metadata: Metadata = genMeta('about');

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
