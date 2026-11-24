import type { Metadata, Viewport } from 'next';
import type { ReactElement } from 'react';
import HomeContent from './HomeContent';
import { generateMetadata as genMeta } from '@/lib/seo/utils';

// Phone browsers tint their toolbars to match the dark hero
export const viewport: Viewport = { themeColor: '#0a0a0a' };

/**
 * Homepage metadata from central registry
 * Uses utility function to generate from PAGES.home
 */
export const metadata: Metadata = genMeta('home');

export default function Home(): ReactElement {
  return <HomeContent />;
}
