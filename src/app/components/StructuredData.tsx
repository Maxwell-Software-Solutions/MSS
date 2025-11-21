import type { ReactElement } from 'react';

interface StructuredDataProps {
  schema: object | object[]; // Support single or multiple schemas
}

/**
 * Atomic component for injecting JSON-LD structured data
 *
 * Accepts single schema or array of schemas for flexible usage.
 * Each schema is rendered as a separate <script type="application/ld+json"> tag.
 *
 * @param schema - Single schema object or array of schema objects
 *
 * @example
 * ```tsx
 * // Single schema
 * <StructuredData schema={organizationSchema} />
 *
 * // Multiple schemas
 * <StructuredData schema={[organizationSchema, websiteSchema]} />
 * ```
 */
export default function StructuredData({ schema }: StructuredDataProps): ReactElement {
  const schemas = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {schemas.map((s, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
    </>
  );
}
