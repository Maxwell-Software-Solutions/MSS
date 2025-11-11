import type { ReactElement } from 'react';
import { PageContainer, PageHeader } from '@/app/components/ui';
import PrivacyContent from './PrivacyContent';

const effectiveDate = '6 October 2025';
const privacyEmail = 'privacy@maxwellsoftwaresolutions.com';

export default function PrivacyPage(): ReactElement {
  return (
    <PageContainer className="text-slate-700 dark:text-slate-200">
      <PageHeader
        eyebrow="Privacy Policy (GDPR)"
        title="Maxwell Software Solutions Privacy Policy"
        meta={`Effective date: ${effectiveDate}`}
        subtitle='Maxwell Software Solutions ("we", "us", "our") provides software quality audits, testing strategy, refactoring, and observability services. This policy explains how we handle personal data in line with the General Data Protection Regulation (GDPR).'
      />
      <PrivacyContent privacyEmail={privacyEmail} />
    </PageContainer>
  );
}
