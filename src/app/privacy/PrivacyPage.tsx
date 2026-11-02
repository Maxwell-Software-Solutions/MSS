import type { ReactElement } from 'react';
import LegalDocument from '@/app/components/legal/LegalDocument';
import type { LegalLanguage } from '@/lib/legal/types';

interface PrivacyPageProps {
  requestedLanguage?: LegalLanguage | undefined;
}

export default function PrivacyPage({ requestedLanguage }: PrivacyPageProps): ReactElement {
  return <LegalDocument kind="privacy" requestedLanguage={requestedLanguage} />;
}
