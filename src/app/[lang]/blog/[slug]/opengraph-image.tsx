import { ImageResponse } from 'next/og';
import { OG_COLORS, OG_SIZE, OgFrame, ogFonts } from '@/lib/brand/og';
import { SITE_CONFIG, BLOG_POSTS, isValidBlogSlug } from '@/lib/seo/data';

/**
 * Dynamic blog post Open Graph images: the brand frame with the category, title, excerpt and read time.
 * Data source: BLOG_POSTS registry from central data management.
 *
 * @param params - Route parameters containing blog slug
 */

export const runtime = 'edge';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }): Promise<ImageResponse> {
  const fonts = await ogFonts();

  if (!isValidBlogSlug(params.slug)) {
    return new ImageResponse(
      (
        <OgFrame>
          <div style={{ marginTop: 52, fontSize: 48, fontWeight: 500 }}>Blog Post Not Found</div>
        </OgFrame>
      ),
      { ...size, fonts }
    );
  }

  const post = BLOG_POSTS[params.slug]!;

  return new ImageResponse(
    (
      <OgFrame ribbon={0.4}>
        <div style={{ marginTop: 44, fontSize: 24, color: OG_COLORS.accent }}>{post.category}</div>
        <div
          style={{
            marginTop: 14,
            maxWidth: 980,
            fontSize: 54,
            fontWeight: 500,
            lineHeight: 1.14,
            letterSpacing: '-0.02em',
          }}
        >
          {post.title}
        </div>
        <div style={{ marginTop: 20, maxWidth: 880, fontSize: 24, lineHeight: 1.45, color: OG_COLORS.secondary }}>
          {post.excerpt}
        </div>
        <div style={{ marginTop: 'auto', fontSize: 22, color: OG_COLORS.muted }}>{post.readTime}</div>
      </OgFrame>
    ),
    { ...size, fonts }
  );
}

/**
 * Generate alt text for OG image
 * Uses blog post title from central data
 */
export async function generateImageMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Array<{ id: string; alt: string; size: typeof OG_SIZE; contentType: string }>> {
  const alt = isValidBlogSlug(params.slug) ? `${BLOG_POSTS[params.slug]!.title} — ${SITE_CONFIG.name}` : 'Blog Post';
  return [{ id: 'og', alt, size, contentType }];
}
