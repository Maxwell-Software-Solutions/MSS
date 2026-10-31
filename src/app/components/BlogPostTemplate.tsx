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
export default function BlogPostTemplate({ slug, children }: BlogPostTemplateProps): ReactElement {
  const post = BLOG_POSTS[slug];

  if (!post) {
    throw new Error(`Blog post not found: ${slug}. Add to BLOG_POSTS in src/lib/seo/data.ts`);
  }

  return (
    <article className="article">
      {/* Breadcrumbs with schema */}
      <Breadcrumbs pathname={`/blog/${slug}`} titleMap={{ [slug]: post.title }} />

      {/* Header */}
      <header className="article-head">
        <nav>
          <Link href="/blog" className="article-back">
            ← Back to Insights
          </Link>
        </nav>

        <h1>{post.title}</h1>

        <div className="article-meta">
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
      <div className="art article-art">
        <Image src={`${post.canonical}/opengraph-image`} alt={post.title} fill className="object-cover" priority />
      </div>

      {/* Content */}
      <div className="prose-flow">{children}</div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="tag-list block-gap">
          {post.tags.map((tag) => (
            <Link key={tag} href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`} className="tag">
              #{tag}
            </Link>
          ))}
        </div>
      )}

      {/* Related Articles (auto-generated) */}
      <RelatedArticles currentSlug={slug} />

      {/* CTA */}
      <aside className="callout block-gap">
        <h3 className="text-2xl">Need Help Improving Your Code Quality?</h3>
        <p className="mb-6 mt-4 text-secondary">
          Our engineering team can help you implement these practices in your organization.
        </p>
        <Link href="/contact" className="btn btn-accent">
          Schedule a Consultation
        </Link>
      </aside>
    </article>
  );
}
