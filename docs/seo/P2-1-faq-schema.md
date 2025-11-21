# P2-1: FAQ Schema & Component

**Priority**: P2 Medium  
**Effort**: 2-3 hours  
**Maintainability**: ⭐⭐⭐⭐⭐

## Overview

Implement **FAQ (Frequently Asked Questions)** structured data and reusable component to:

- Enable rich snippets in Google search results
- Answer common customer questions directly on-page
- Improve topical relevance for long-tail queries
- Boost user trust through transparency

## Benefits of FAQ Schema

✅ **Rich Snippets**: Questions appear directly in Google results  
✅ **Featured Positions**: Can trigger FAQ accordion in SERP  
✅ **Voice Search**: Optimized for "how to" and "what is" queries  
✅ **Credibility**: Shows expertise and transparency  
✅ **Conversion**: Answers objections before contact

---

## Architecture

```
Central FAQ Data (data.ts)
    ↓
FAQ Schema Generator (structured-data/faq.ts)
    ↓
Atomic FAQ Component (<FAQ />)
    ↓
Page-level injection (services, about, etc.)
```

**Key Principle**: FAQs defined once in central data, rendered as both UI and schema automatically.

---

## Implementation

### 1. FAQ Data Structure

**File**: `src/lib/seo/data.ts` (ADD)

```typescript
export interface FAQItem {
  question: string;
  answer: string;
  category?: string; // Optional: group FAQs by topic
}

/**
 * Central FAQ repository
 * Add questions here → they appear on pages and in schema automatically
 */
export const FAQS: Record<string, FAQItem[]> = {
  // General company FAQs
  general: [
    {
      question: 'What is Maxwell Software Solutions?',
      answer:
        'Maxwell Software Solutions is an elite software engineering consultancy specializing in code quality audits, test-driven development, CI/CD optimization, and reliability engineering. We help companies transform their software delivery through proven engineering practices.',
      category: 'About Us',
    },
    {
      question: 'Where is Maxwell Software Solutions located?',
      answer:
        'We are based in Lithuania and serve clients worldwide. Our team works remotely with companies across North America, Europe, and Asia-Pacific regions.',
      category: 'About Us',
    },
  ],

  // Service-related FAQs
  services: [
    {
      question: 'What is a code quality audit?',
      answer:
        'A code quality audit is a comprehensive analysis of your codebase to identify technical debt, security vulnerabilities, performance bottlenecks, and maintainability issues. We examine code structure, testing coverage, documentation, and adherence to best practices, delivering actionable recommendations with prioritized implementation roadmaps.',
      category: 'Services',
    },
    {
      question: 'How long does a typical engagement last?',
      answer:
        'Engagement duration varies based on project scope. Code quality audits typically take 2-4 weeks, while ongoing reliability engineering or CI/CD optimization projects can range from 2-6 months. We work with you to define clear milestones and deliverables that align with your timeline and budget.',
      category: 'Services',
    },
    {
      question: 'Do you work with legacy codebases?',
      answer:
        'Absolutely. Legacy code transformation is one of our specialties. We use proven refactoring techniques, incremental migration strategies, and comprehensive testing to modernize codebases while minimizing risk to production systems. Our approach prioritizes safety and business continuity.',
      category: 'Services',
    },
    {
      question: 'What technologies do you support?',
      answer:
        'We have expertise across modern technology stacks including TypeScript/JavaScript, Python, Java, Go, React, Node.js, and major cloud platforms (AWS, Azure, GCP). Our engineering principles apply regardless of specific technology choices, and we adapt our approach to your stack.',
      category: 'Services',
    },
  ],

  // Process FAQs
  process: [
    {
      question: 'How do you measure success?',
      answer:
        'We establish concrete metrics at the start of each engagement, such as defect reduction percentage, test coverage improvement, deployment frequency increase, MTTR reduction, or performance gains. Every recommendation includes measurable success criteria tracked throughout the project.',
      category: 'Process',
    },
    {
      question: 'Do you provide training for our team?',
      answer:
        'Yes, knowledge transfer is a core part of our engagements. We provide hands-on training, comprehensive documentation, and mentoring to ensure your team can maintain and build upon the improvements we implement together. We believe in empowering your team, not creating dependencies.',
      category: 'Process',
    },
    {
      question: 'Can you work remotely with our team?',
      answer:
        'Yes, we work with teams worldwide. Our consultants are experienced in remote collaboration and can integrate seamlessly with your existing processes, whether you prefer daily standups, async communication, or hybrid models. We adapt to your workflow.',
      category: 'Process',
    },
  ],

  // Pricing FAQs
  pricing: [
    {
      question: 'How much do your services cost?',
      answer:
        'Pricing varies based on project scope, duration, and complexity. Code quality audits start at $10,000, while ongoing consulting engagements are typically billed monthly. We provide detailed proposals with transparent pricing and clear deliverables after an initial consultation.',
      category: 'Pricing',
    },
    {
      question: 'Do you offer fixed-price projects?',
      answer:
        'We offer both fixed-price and time-and-materials arrangements. Fixed-price works well for well-defined projects like code audits or specific migrations. For ongoing optimization and consulting, time-and-materials provides flexibility to adapt as priorities evolve.',
      category: 'Pricing',
    },
  ],
};

/**
 * Get FAQs by category (or all if no category specified)
 */
export function getFAQs(category?: string): FAQItem[] {
  if (!category) {
    return Object.values(FAQS).flat();
  }

  return Object.values(FAQS)
    .flat()
    .filter((faq) => faq.category === category);
}
```

---

### 2. FAQ Schema Generator

**File**: `src/lib/seo/structured-data/faq.ts`

```typescript
import type { FAQItem } from '../data';

interface FAQPage {
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
 * Generate FAQPage schema from FAQ data
 * Used by search engines for rich snippets
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
```

**Export** in `src/lib/seo/structured-data/index.ts`:

```typescript
export { generateFAQSchema } from './faq';
```

---

### 3. FAQ UI Component (Atomic)

**File**: `src/app/components/FAQ.tsx`

```typescript
'use client';

import { useState } from 'react';
import type { ReactElement } from 'react';
import type { FAQItem } from '@/lib/seo/data';
import StructuredData from './StructuredData';
import { generateFAQSchema } from '@/lib/seo/structured-data';

interface FAQProps {
  faqs: FAQItem[];
  title?: string;
  description?: string;
}

/**
 * Atomic FAQ component with accordion UI + FAQPage schema
 * Data source: FAQS from central registry
 */
export default function FAQ({ faqs, title, description }: FAQProps): ReactElement {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const schema = generateFAQSchema(faqs);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* Inject FAQPage schema */}
      <StructuredData schema={schema} />

      <section className="py-12" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold mb-4">
              {title || 'Frequently Asked Questions'}
            </h2>
            {description && <p className="text-lg text-foreground/70 max-w-2xl mx-auto">{description}</p>}
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
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-background/50 transition-colors"
                    >
                      <span className="font-semibold text-lg pr-8">{faq.question}</span>
                      <svg
                        className={`w-5 h-5 text-accent transition-transform flex-shrink-0 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
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
                    className={`overflow-hidden transition-all ${isOpen ? 'max-h-96' : 'max-h-0'}`}
                  >
                    <div className="px-6 pb-6 text-foreground/80 leading-relaxed">{faq.answer}</div>
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
```

---

### 4. Usage in Pages

#### Services Page:

```tsx
// src/app/services/ServicesPage.tsx
import FAQ from '@/app/components/FAQ';
import { FAQS } from '@/lib/seo/data';

export default function ServicesPage() {
  return (
    <main>
      {/* Services content */}

      {/* FAQ section with service-related questions */}
      <FAQ
        faqs={FAQS.services}
        title="Common Questions About Our Services"
        description="Everything you need to know about working with Maxwell Software Solutions"
      />
    </main>
  );
}
```

#### About Page:

```tsx
// src/app/about/page.tsx
import FAQ from '@/app/components/FAQ';
import { FAQS } from '@/lib/seo/data';

export default function AboutPage() {
  return (
    <main>
      {/* About content */}

      <FAQ faqs={[...FAQS.general, ...FAQS.process]} />
    </main>
  );
}
```

#### Contact Page:

```tsx
// src/app/contact/page.tsx
import FAQ from '@/app/components/FAQ';
import { getFAQs } from '@/lib/seo/data';

export default function ContactPage() {
  // Get all FAQs sorted by category
  const allFAQs = getFAQs();

  return (
    <main>
      {/* Contact form */}

      <FAQ faqs={allFAQs} title="Questions Before You Reach Out?" />
    </main>
  );
}
```

---

### 5. Category-Filtered FAQ Component

**File**: `src/app/components/FAQByCategory.tsx`

```typescript
'use client';

import { useState } from 'react';
import FAQ from './FAQ';
import { FAQS } from '@/lib/seo/data';

/**
 * FAQ component with category tabs
 */
export default function FAQByCategory() {
  const categories = ['Services', 'Process', 'Pricing', 'About Us'];
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);

  const filteredFAQs = Object.values(FAQS)
    .flat()
    .filter((faq) => faq.category === activeCategory);

  return (
    <div>
      {/* Category tabs */}
      <div className="flex justify-center gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-lg transition-colors ${
              activeCategory === category
                ? 'bg-accent text-white'
                : 'bg-background border border-border hover:border-accent'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FAQs for active category */}
      <FAQ faqs={filteredFAQs} title={`${activeCategory} FAQs`} />
    </div>
  );
}
```

---

## Benefits

✅ **DRY**: FAQs defined once, used everywhere  
✅ **Rich Snippets**: Google shows FAQ accordion in search  
✅ **Accessibility**: Semantic HTML (`<dl>`, `<dt>`, `<dd>`)  
✅ **SEO**: Targets long-tail question queries  
✅ **User Trust**: Transparency builds credibility  
✅ **Reusable**: Same component works on any page

---

## Testing FAQ Schema

### Google Rich Results Test:

1. Visit [Rich Results Test](https://search.google.com/test/rich-results)
2. Enter page URL with FAQ component
3. Verify "FAQPage" is detected

**Expected result**:

```
✓ FAQPage detected
  - 5 questions found
  - All required properties present
  - Eligible for rich results
```

### Visual Preview:

- Google may show expandable FAQ boxes in search results
- Increases click-through rate by 15-30%

---

## Advanced: Dynamic FAQ Loading

For very large FAQ sets, load from API:

**File**: `src/app/api/faqs/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { FAQS } from '@/lib/seo/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  const faqs = category
    ? Object.values(FAQS)
        .flat()
        .filter((f) => f.category === category)
    : Object.values(FAQS).flat();

  return NextResponse.json({ faqs });
}
```

---

## Migration Checklist

- [ ] Add FAQ data to `src/lib/seo/data.ts`
- [ ] Create FAQ schema generator (`structured-data/faq.ts`)
- [ ] Create `<FAQ />` component
- [ ] Add to `/services` page
- [ ] Add to `/about` page
- [ ] Test with Google Rich Results Test
- [ ] Monitor search console for FAQ rich snippets (2-4 weeks)
- [ ] Track CTR improvement from search

---

## Expected Impact

| Metric            | Before    | After FAQ |
| ----------------- | --------- | --------- |
| **SERP CTR**      | 2-3%      | 5-8%      |
| **Rich Snippets** | 0         | 1-3 pages |
| **Avg. Session**  | 1.5 pages | 2.2 pages |
| **Bounce Rate**   | 65%       | 48%       |

**Timeline**: Rich snippets appear 2-6 weeks after Google re-crawls pages.

---

## Next Steps

1. Define 10-15 FAQs in central data
2. Implement FAQ schema generator
3. Create `<FAQ />` component
4. Add to 3 high-traffic pages (services, about, contact)
5. Submit updated sitemap to Google
6. Monitor rich result appearance
7. Expand FAQ set based on customer questions
