import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { LEGAL_DOCS } from '@/lib/legal';
import { pageLanguage } from '@/lib/legal/language';
import SecurityPage from './SecurityPage';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { title, description } = LEGAL_DOCS.security[pageLanguage((await params).lang)].meta;
  return { title, description, alternates: { canonical: '/security' } };
}

export default async function Page({ params }: PageProps): Promise<ReactElement> {
  return <SecurityPage requestedLanguage={pageLanguage((await params).lang)} />;
}
