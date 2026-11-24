import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { LEGAL_DOCS } from '@/lib/legal';
import { pageLanguage } from '@/lib/legal/language';
import PrivacyPage from './PrivacyPage';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { title, description } = LEGAL_DOCS.privacy[pageLanguage((await params).lang)].meta;
  return { title, description, alternates: { canonical: '/privacy' } };
}

export default async function Page({ params }: PageProps): Promise<ReactElement> {
  return <PrivacyPage requestedLanguage={pageLanguage((await params).lang)} />;
}
