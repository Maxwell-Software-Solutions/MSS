import { notFound } from 'next/navigation';

// An address with no page shows the 404 inside the site's header and footer, rendered on request rather than cached
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default function MissingPage(): never {
  notFound();
}
