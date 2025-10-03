import { redirect } from 'next/navigation';
import type { ReactElement } from 'react';

// Deprecated: merged into /services. Keep redirect to preserve old backlinks and bookmarks.
export const dynamic = 'force-static';

export default function DeprecatedConsultingProcess(): ReactElement {
  redirect('/services');
  return <></>;
}
