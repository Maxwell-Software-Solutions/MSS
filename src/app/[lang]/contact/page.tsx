import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import ContactClient from './ContactClient';
import StructuredData from '@/app/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';
import { generateMetadata as genMeta } from '@/lib/seo/utils';

export const metadata: Metadata = genMeta('contact');

export default function ContactPage(): ReactElement {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ]);
  return (
    <>
      <StructuredData schema={breadcrumb} />
      <ContactClient />
    </>
  );
}
