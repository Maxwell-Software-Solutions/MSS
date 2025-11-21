import type { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import RelatedArticles from '@/app/components/RelatedArticles';
import { BLOG_POSTS } from '@/lib/seo/data';

interface BlogPostTemplateProps {
  slug: string;
  children: ReactElement;
}

/**
 * Reusable blog post template (P3-1: Content Strategy)
 *
 * Ensures consistent structure, SEO elements, and internal linking
 * across all blog posts. Automatically includes:
 * - Breadcrumbs with structured data
 * - Post metadata (date, read time, category)
 * - Hero image (from OG image)
 * - Tag navigation
 * - Auto-generated related articles
 * - Conversion CTA
 *
 * @param slug - Blog post slug from BLOG_POSTS registry
 * @param children - Post content (MDX or JSX)
 */
export default function BlogPostTemplate({ slug, children }: BlogPostTemplateProps) {
  const post = BLOG_POSTS[slug];

  if (!post) {
    throw new Error(`Blog post not found: ${slug}. Add to BLOG_POSTS in src/lib/seo/data.ts`);
  }

  return (
    <article className="max-w-4xl mx-auto px-6 sm:px-10 py-12">
      {/* Breadcrumbs with schema */}
      <Breadcrumbs pathname={`/blog/${slug}`} titleMap={{ [slug]: post.title }} />

      {/* Header */}
      <header className="mb-12">
        <nav className="mb-6">
          <Link
            href="/blog"
            className="transition-colors"
            style={{ color: 'var(--color-text-secondary)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--color-accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--color-text-secondary)';
            }}
          >
            ← Back to Insights
          </Link>
        </nav>

        <h1
          className="text-4xl sm:text-5xl font-bold mb-6"
          style={{ color: 'var(--color-text)' }}
        >
          {post.title}
        </h1>

        <div className="flex items-center gap-4" style={{ color: 'var(--color-text-secondary)' }}>
          <time dateTime={post.publishedTime}>
            {new Date(post.publishedTime).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span>•</span>
          <span>{post.readTime}</span>
          <span>•</span>
          <span>{post.category}</span>
        </div>
      </header>

      {/* Hero Image (OG image doubles as hero) */}
      <div className="mb-12 relative h-64 sm:h-80 rounded-2xl overflow-hidden">
        <Image
          src={`${post.canonical}/opengraph-image`}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none" style={{ color: 'var(--color-text)' }}>
        {children}
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-12 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-4 py-2 rounded-lg transition-colors text-sm"
              style={{
                backgroundColor: 'var(--color-accent-10)',
                color: 'var(--color-accent)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-accent-20)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-accent-10)';
              }}
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      {/* Related Articles (auto-generated) */}
      <RelatedArticles currentSlug={slug} />

      {/* CTA */}
      <aside
        className="mt-16 p-8 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, var(--color-accent-10), var(--color-accent-5))',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'var(--color-accent-20)',
        }}
      >
        <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
          Need Help Improving Your Code Quality?
        </h3>
        <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
          Our engineering team can help you implement these practices in your organization.
        </p>
        <Link
          href="/contact"
          className="inline-block px-8 py-3 rounded-lg transition-colors font-semibold"
          style={{
            backgroundColor: 'var(--color-accent)',
            color: '#ffffff',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.9';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          Schedule a Consultation
        </Link>
      </aside>
    </article>
  );
}
