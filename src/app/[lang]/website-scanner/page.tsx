import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import WebsiteScannerPage from './WebsiteScannerPage';
import StructuredData from '@/app/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'Free Website Health Scanner — Performance, Security & SEO | Maxwell Software Solutions',
  description:
    'Scan any website for free. Get instant scores for performance (Core Web Vitals), security headers, SEO, and accessibility. Powered by Google PageSpeed Insights.',
  openGraph: {
    title: 'Free Website Health Scanner',
    description:
      'Analyze any website for performance, security, SEO, and accessibility issues. Get actionable insights in seconds — completely free.',
    type: 'website',
  },
  alternates: {
    canonical: '/website-scanner',
  },
};

export default function Page(): ReactElement {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Website Health Scanner', url: '/website-scanner' },
  ]);
  return (
    <>
      <StructuredData schema={breadcrumb} />
      <WebsiteScannerPage />
    </>
  );
}
