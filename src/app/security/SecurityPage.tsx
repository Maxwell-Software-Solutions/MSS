import type { ReactElement } from 'react';
import { PageContainer, PageHeader } from '@/app/components/ui';
import SecurityContent from './SecurityContent';

const effectiveDate = '6 October 2025';
const securityEmail = 'security@maxwellsoftwaresolutions.com';

export default function SecurityPage(): ReactElement {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Security Policy"
        title="Security at Maxwell Software Solutions"
        meta={`Effective date: ${effectiveDate}`}
        subtitle="We take a defence-in-depth approach appropriate for a consultancy that handles minimal personal data. This page summarises the safeguards we employ to protect client information and our own infrastructure."
      />
      <SecurityContent securityEmail={securityEmail} />
    </PageContainer>
  );
}
