import type { ReactElement } from 'react';
import { PageContainer, PageHeader } from '@/app/components/ui';
import TermsContent from './TermsContent';

const effectiveDate = '6 October 2025';
const legalEmail = 'legal@maxwellsoftwaresolutions.com';

export default function TermsPage(): ReactElement {
  return (
    <PageContainer className="text-slate-700 dark:text-slate-200">
      <PageHeader
        eyebrow="Terms of Service"
        title="Maxwell Software Solutions Terms of Service"
        meta={`Effective date: ${effectiveDate}`}
        subtitle='These Terms govern your use of maxwellsoftwaresolutions.com and related pages (collectively, the "Site") and describe the conditions under which you may submit information through the Site. If we work together under a separate proposal or statement of work (SOW), that contract governs the services. These Site Terms cover website use only.'
      />
      <TermsContent legalEmail={legalEmail} />
    </PageContainer>
  );
}
