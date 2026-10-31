import type { ReactElement } from 'react';

interface FaqSectionProps {
  title: string;
  items: Array<{ question: string; answer: string }>;
  tone?: boolean;
}

/** Heading stays on the left while the questions read as rows on the right. */
export function FaqSection({ title, items, tone = false }: FaqSectionProps): ReactElement {
  return (
    <section aria-labelledby="faq-heading" className={tone ? 'section section-tone' : 'section'}>
      <div className="wrap split split-sticky">
        <h2 id="faq-heading" suppressHydrationWarning>
          {title}
        </h2>
        <div suppressHydrationWarning>
          {items.map((item, i) => (
            <div key={i} className="qa-item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
