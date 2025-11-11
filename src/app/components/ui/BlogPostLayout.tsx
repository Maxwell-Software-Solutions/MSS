import type { ReactElement, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPostLayoutProps {
  title: string;
  date: string;
  readTime: string;
  category: string;
  heroImage: string;
  heroAlt: string;
  children: ReactNode;
}

/**
 * Unified blog post layout component
 * Consolidates header, hero image, and article container patterns
 */
export function BlogPostLayout({
  title,
  date,
  readTime,
  category,
  heroImage,
  heroAlt,
  children,
}: BlogPostLayoutProps): ReactElement {
  return (
    <article className="max-w-4xl mx-auto px-6 sm:px-10 py-12">
      <header className="mb-12">
        <nav className="mb-6">
          <Link href="/blog" className="text-foreground/75 hover:text-foreground transition-colors">
            ← Back to Insights
          </Link>
        </nav>
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">{title}</h1>
        <div className="flex items-center gap-4 text-foreground/75">
          <time dateTime={date}>
            {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
          <span>•</span>
          <span>{readTime}</span>
          <span>•</span>
          <span>{category}</span>
        </div>
      </header>

      <div className="mb-12 relative h-64 sm:h-80 rounded-2xl overflow-hidden">
        <Image src={heroImage} alt={heroAlt} fill className="object-cover" priority />
      </div>

      {children}
    </article>
  );
}

export default BlogPostLayout;
