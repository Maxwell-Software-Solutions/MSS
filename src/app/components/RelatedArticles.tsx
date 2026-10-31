import type { ReactElement } from 'react';
import Link from 'next/link';
import { getRelatedPosts } from '@/lib/seo/utils';

interface RelatedArticlesProps {
  currentSlug: string;
  limit?: number;
}

/**
 * Atomic component: auto-generates related article links
 *
 * Pulls related posts from central data registry based on:
 * - Category match (+10 points)
 * - Tag overlap (+5 points per tag)
 * - Keyword overlap (+2 points per keyword)
 *
 * @param currentSlug - The current blog post slug
 * @param limit - Maximum number of related posts to display (default: 3)
 *
 * @example
 * ```tsx
 * <RelatedArticles currentSlug="solid-principles" limit={3} />
 * ```
 */
export default function RelatedArticles({ currentSlug, limit = 3 }: RelatedArticlesProps): ReactElement | null {
  const relatedPosts = getRelatedPosts(currentSlug, limit);

  if (relatedPosts.length === 0) return null;

  return (
    <aside className="block-gap" aria-labelledby="related-articles-heading">
      <h3 id="related-articles-heading" className="mb-4 text-xl">
        Related Reading
      </h3>
      <ul>
        {relatedPosts.map((post) => (
          <li key={post.slug} className="qa-item">
            <Link href={post.canonical} className="group flex flex-col gap-1 no-underline">
              <span className="font-medium transition-colors group-hover:text-accent">{post.title}</span>
              <span className="text-sm text-secondary">
                {post.readTime} • {post.category}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
