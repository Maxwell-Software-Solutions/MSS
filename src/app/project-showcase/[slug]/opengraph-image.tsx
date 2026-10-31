import { ImageResponse } from 'next/og';
import { OG_COLORS, OG_SIZE, OgFrame, ogFonts } from '@/lib/brand/og';
import { SITE_CONFIG, PROJECTS, isValidProjectSlug } from '@/lib/seo/data';

/**
 * Dynamic project showcase Open Graph images: the brand frame with the industry, title and up to three metrics.
 * Data source: PROJECTS registry from central data management.
 *
 * @param params - Route parameters containing project slug
 */

export const runtime = 'edge';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }): Promise<ImageResponse> {
  const fonts = await ogFonts();

  if (!isValidProjectSlug(params.slug)) {
    return new ImageResponse(
      (
        <OgFrame>
          <div style={{ marginTop: 52, fontSize: 48, fontWeight: 500 }}>Project Not Found</div>
        </OgFrame>
      ),
      { ...size, fonts }
    );
  }

  const project = PROJECTS[params.slug]!;
  const displayMetrics = project.metrics.slice(0, 3);

  return new ImageResponse(
    (
      <OgFrame ribbon={0.4}>
        <div style={{ marginTop: 44, display: 'flex', gap: 16, fontSize: 24 }}>
          <span style={{ color: OG_COLORS.accent }}>Case Study</span>
          <span style={{ color: OG_COLORS.muted }}>{project.industry}</span>
        </div>
        <div
          style={{
            marginTop: 14,
            maxWidth: 1000,
            fontSize: 52,
            fontWeight: 500,
            lineHeight: 1.14,
            letterSpacing: '-0.02em',
          }}
        >
          {project.title}
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', gap: 16 }}>
          {displayMetrics.map((metric) => (
            <div
              key={metric}
              style={{
                display: 'flex',
                flex: 1,
                padding: '18px 22px',
                fontSize: 24,
                lineHeight: 1.3,
                border: `1px solid ${OG_COLORS.hairline}`,
                borderRadius: 8,
                background: 'rgba(10, 10, 10, 0.72)',
              }}
            >
              {metric}
            </div>
          ))}
        </div>
      </OgFrame>
    ),
    { ...size, fonts }
  );
}

/**
 * Generate alt text for OG image
 * Uses project title from central data
 */
export async function generateImageMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Array<{ id: string; alt: string; size: typeof OG_SIZE; contentType: string }>> {
  const alt = isValidProjectSlug(params.slug)
    ? `${PROJECTS[params.slug]!.title} Case Study — ${SITE_CONFIG.name}`
    : 'Project Showcase';
  return [{ id: 'og', alt, size, contentType }];
}
