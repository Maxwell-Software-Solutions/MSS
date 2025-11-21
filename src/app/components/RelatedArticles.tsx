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
export default function RelatedArticles({ currentSlug, limit = 3 }: RelatedArticlesProps) {
  const relatedPosts = getRelatedPosts(currentSlug, limit);

  if (relatedPosts.length === 0) return null;

  return (
    <aside
      className="mt-12 p-6 rounded-lg border border-border"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
      }}
      aria-labelledby="related-articles-heading"
    >
      <h3
        id="related-articles-heading"
        className="font-semibold text-lg mb-4"
        style={{ color: 'var(--color-text)' }}
      >
        Related Reading
      </h3>
      <ul className="space-y-3">
        {relatedPosts.map((post) => (
          <li key={post.slug}>
            <Link
              href={post.canonical}
              className="group flex flex-col gap-1 transition-colors"
              style={{ color: 'var(--color-text)' }}
            >
              <span className="font-medium group-hover:underline group-hover:text-[var(--color-accent)]">
                {post.title}
              </span>
              <span
                className="text-sm"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {post.readTime} • {post.category}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
