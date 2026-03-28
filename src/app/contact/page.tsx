import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import ContactClient from './ContactClient';
import StructuredData from '@/app/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'Contact Maxwell Software Solutions | Vilnius, Lithuania',
  description:
    "Get in touch with our engineering team in Vilnius, Lithuania to discuss your code quality, testing, or DevOps challenges. We're here to help.",
  alternates: {
    canonical: '/contact',
  },
};

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
