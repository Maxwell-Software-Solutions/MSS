import type { ReactElement } from 'react';
import LegalDocument from '@/app/components/legal/LegalDocument';
import type { LegalLanguage } from '@/lib/legal/types';

interface TermsPageProps {
  requestedLanguage?: LegalLanguage | undefined;
}

export default function TermsPage({ requestedLanguage }: TermsPageProps): ReactElement {
  return <LegalDocument kind="terms" requestedLanguage={requestedLanguage} />;
}
