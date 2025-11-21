/**
 * FAQ (Frequently Asked Questions) Schema Generator
 *
 * Generates FAQPage structured data for Google rich snippets.
 * FAQPage schema can trigger accordion-style displays in search results,
 * improving click-through rates and providing direct answers to users.
 *
 * @see https://schema.org/FAQPage
 * @see https://developers.google.com/search/docs/appearance/structured-data/faqpage
 */

import type { FAQItem } from '../data';

/**
 * Schema.org FAQPage type
 */
export interface FAQPage {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

/**
 * Generate FAQPage structured data from FAQ items
 *
 * Creates FAQPage schema that can appear as rich snippets in Google search.
 * Each FAQ item becomes a Question with an accepted Answer.
 *
 * @param faqs - Array of FAQ items from central data registry
 * @returns FAQPage schema.org object
 *
 * @example
 * ```tsx
 * import { FAQS } from '@/lib/seo/data';
 * import { generateFAQSchema } from '@/lib/seo/structured-data';
 *
 * const schema = generateFAQSchema(FAQS.services);
 * // Returns FAQPage schema with service-related questions
 * ```
 */
export function generateFAQSchema(faqs: FAQItem[]): FAQPage {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
