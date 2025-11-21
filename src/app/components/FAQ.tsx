'use client';

import { useState } from 'react';
import type { ReactElement } from 'react';
import type { FAQItem } from '@/lib/seo/data';
import StructuredData from './StructuredData';
import { generateFAQSchema } from '@/lib/seo/structured-data';

interface FAQProps {
  faqs: readonly FAQItem[];
  title?: string;
  description?: string;
}

/**
 * Atomic FAQ component with accordion UI + FAQPage schema
 *
 * Renders an accessible FAQ accordion with expandable answers.
 * Automatically injects FAQPage structured data for Google rich snippets.
 *
 * Features:
 * - Semantic HTML (dl/dt/dd for accessibility)
 * - ARIA attributes for screen readers
 * - Smooth accordion animations
 * - Theme-aware styling with CSS custom properties
 * - Auto-generated FAQPage schema
 *
 * @param faqs - Array of FAQ items from central data registry
 * @param title - Optional section heading (default: "Frequently Asked Questions")
 * @param description - Optional section description
 *
 * @example
 * ```tsx
 * import FAQ from '@/app/components/FAQ';
 * import { FAQS } from '@/lib/seo/data';
 *
 * <FAQ faqs={FAQS.services} title="Service FAQs" />
 * ```
 */
export default function FAQ({ faqs, title, description }: FAQProps): ReactElement {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const schema = generateFAQSchema([...faqs]);

  const toggleFAQ = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* Inject FAQPage schema for rich snippets */}
      <StructuredData schema={schema} />

      <section className="py-12" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
              {title || 'Frequently Asked Questions'}
            </h2>
            {description && (
              <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
                {description}
              </p>
            )}
          </div>

          {/* FAQ Accordion */}
          <dl className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={index} className="border border-border rounded-lg overflow-hidden transition-all">
                  {/* Question (button) */}
                  <dt>
                    <button
                      onClick={() => toggleFAQ(index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      className="w-full flex items-center justify-between p-6 text-left transition-colors"
                      style={{
                        backgroundColor: isOpen ? 'var(--color-bg-secondary)' : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        if (!isOpen) {
                          e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isOpen) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      <span className="font-semibold text-lg pr-8" style={{ color: 'var(--color-text)' }}>
                        {faq.question}
                      </span>
                      <svg
                        className={`w-5 h-5 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                        style={{ color: 'var(--color-accent)' }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </dt>

                  {/* Answer (expandable) */}
                  <dd
                    id={`faq-answer-${index}`}
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      {faq.answer}
                    </div>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>
    </>
  );
}
