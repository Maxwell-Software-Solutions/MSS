import Link from 'next/link';
import { getPostsByCategory, getPostsByTag } from '@/lib/seo/utils';

interface TopicClusterProps {
  type: 'category' | 'tag';
  value: string;
  title?: string;
}

/**
 * Creates topic cluster navigation (hub page linking to spokes)
 *
 * Displays all posts in a category or tag in a grid layout.
 * Creates SEO-friendly topic clusters with hub-and-spoke architecture.
 *
 * @param type - Filter by 'category' or 'tag'
 * @param value - Category or tag value
 * @param title - Optional custom heading (defaults to "{value} Articles")
 *
 * @example
 * ```tsx
 * // Hub page for Software Architecture category
 * <TopicCluster
 *   type="category"
 *   value="Software Architecture"
 *   title="Software Architecture Best Practices"
 * />
 * ```
 */
export default function TopicCluster({ type, value, title }: TopicClusterProps) {
  const posts = type === 'category' ? getPostsByCategory(value) : getPostsByTag(value);

  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="topic-cluster-heading">
      <h2
        id="topic-cluster-heading"
        className="text-3xl font-bold mb-8"
        style={{ color: 'var(--color-text)' }}
      >
        {title || `${value} Articles`}
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="p-6 rounded-lg border border-border transition-colors hover:border-[var(--color-accent)]"
          >
            <Link href={post.canonical} className="group">
              <div className="mb-2 text-sm" style={{ color: 'var(--color-accent)' }}>
                {post.category}
              </div>
              <h3
                className="text-xl font-semibold mb-3 group-hover:text-[var(--color-accent)]"
                style={{ color: 'var(--color-text)' }}
              >
                {post.title}
              </h3>
              <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                {post.excerpt}
              </p>
              <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                {post.readTime} • {new Date(post.publishedTime).toLocaleDateString()}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
