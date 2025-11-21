import { ImageResponse } from 'next/og';
import { SITE_CONFIG, BLOG_POSTS, isValidBlogSlug } from '@/lib/seo/data';

/**
 * Dynamic Blog Post Open Graph Images
 *
 * Generates unique OG image for each blog post using ImageResponse API.
 * Data source: BLOG_POSTS registry from central data management.
 *
 * Features:
 * - Category badge
 * - Article title and excerpt
 * - Read time indicator
 * - Consistent branding
 *
 * @param params - Route parameters containing blog slug
 */

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  // Validate slug and get post data
  if (!isValidBlogSlug(params.slug)) {
    // Return fallback image for invalid slugs
    return new ImageResponse(
      (
        <div
          style={{
            background: '#1a1a1a',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontSize: 48,
          }}
        >
          Blog Post Not Found
        </div>
      ),
      { ...size }
    );
  }

  const post = BLOG_POSTS[params.slug]!;

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '60px 80px',
          position: 'relative',
        }}
      >
        {/* Header with category badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              background: 'rgba(184, 134, 11, 0.2)',
              border: '2px solid #B8860B',
              borderRadius: '8px',
              padding: '8px 16px',
              color: '#B8860B',
              fontSize: 18,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            {post.category}
          </div>
        </div>

        {/* Article title */}
        <h1
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: '#ffffff',
            margin: 0,
            lineHeight: 1.2,
            marginBottom: 24,
            maxWidth: '1000px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {post.title}
        </h1>

        {/* Excerpt/description */}
        <p
          style={{
            fontSize: 24,
            fontWeight: 400,
            color: '#cccccc',
            margin: 0,
            lineHeight: 1.5,
            maxWidth: '900px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {post.excerpt}
        </p>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 'auto',
            paddingTop: 40,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Company name */}
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: '#B8860B',
            }}
          >
            {SITE_CONFIG.name}
          </div>

          {/* Read time */}
          <div
            style={{
              fontSize: 18,
              color: '#999999',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span>📖</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Decorative accent */}
        <div
          style={{
            position: 'absolute',
            bottom: '-20%',
            left: '-10%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(184, 134, 11, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
      </div>
    ),
    { ...size }
  );
}

/**
 * Generate alt text for OG image
 * Uses blog post title from central data
 */
export async function generateImageMetadata({ params }: { params: { slug: string } }) {
  if (!isValidBlogSlug(params.slug)) {
    return [{ alt: 'Blog Post' }];
  }

  const post = BLOG_POSTS[params.slug]!;
  return [
    {
      alt: `${post.title} — ${SITE_CONFIG.name}`,
    },
  ];
}
