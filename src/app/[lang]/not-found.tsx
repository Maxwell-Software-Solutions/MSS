import Link from 'next/link';
import type { ReactElement } from 'react';
import { PageContainer, PageHeader } from '@/app/components/ui';

/** Shown inside the site's header and footer for any address that has no page. */
export default function NotFound(): ReactElement {
  return (
    <PageContainer>
      <PageHeader eyebrow="404" title="Page not found" subtitle="There is no page at this address." />
      <div className="page-actions">
        <Link href="/" className="btn btn-accent">
          Home page
        </Link>
      </div>
    </PageContainer>
  );
}
