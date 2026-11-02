import type { ReactElement } from 'react';
import LegalDocument from '@/app/components/legal/LegalDocument';
import type { LegalLanguage } from '@/lib/legal/types';

interface SecurityPageProps {
  requestedLanguage?: LegalLanguage | undefined;
}

export default function SecurityPage({ requestedLanguage }: SecurityPageProps): ReactElement {
  return <LegalDocument kind="security" requestedLanguage={requestedLanguage} />;
}
