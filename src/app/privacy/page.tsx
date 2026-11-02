import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { LEGAL_DOCS } from '@/lib/legal';
import { parseLanguage, resolveLanguage } from '@/lib/legal/language';
import PrivacyPage from './PrivacyPage';

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const language = await resolveLanguage(parseLanguage((await searchParams).lang));
  const { title, description } = LEGAL_DOCS.privacy[language].meta;
  return { title, description, alternates: { canonical: '/privacy' } };
}

export default async function Page({ searchParams }: PageProps): Promise<ReactElement> {
  return <PrivacyPage requestedLanguage={parseLanguage((await searchParams).lang)} />;
}
