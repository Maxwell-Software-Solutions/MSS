import type { ReactElement } from 'react';

interface StructuredDataProps {
  data: Record<string, unknown>;
}

/**
 * Renders JSON-LD structured data for SEO
 */
export default function StructuredData({ data }: StructuredDataProps): ReactElement {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
