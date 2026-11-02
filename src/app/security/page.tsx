import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { LEGAL_DOCS } from '@/lib/legal';
import { parseLanguage, resolveLanguage } from '@/lib/legal/language';
import SecurityPage from './SecurityPage';

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const language = await resolveLanguage(parseLanguage((await searchParams).lang));
  const { title, description } = LEGAL_DOCS.security[language].meta;
  return { title, description, alternates: { canonical: '/security' } };
}

export default async function Page({ searchParams }: PageProps): Promise<ReactElement> {
  return <SecurityPage requestedLanguage={parseLanguage((await searchParams).lang)} />;
}
