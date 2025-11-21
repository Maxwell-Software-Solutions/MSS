import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import HomeContent from './HomeContent';
import { generateMetadata as genMeta } from '@/lib/seo/utils';

/**
 * Homepage metadata from central registry
 * Uses utility function to generate from PAGES.home
 */
export const metadata: Metadata = genMeta('home');

export default function Home(): ReactElement {
  return <HomeContent />;
}
