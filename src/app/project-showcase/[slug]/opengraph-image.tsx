import { ImageResponse } from 'next/og';
import { SITE_CONFIG, PROJECTS, isValidProjectSlug } from '@/lib/seo/data';

/**
 * Dynamic Project Showcase Open Graph Images
 *
 * Generates unique OG image for each case study/project using ImageResponse API.
 * Data source: PROJECTS registry from central data management.
 *
 * Features:
 * - Case study badge + industry
 * - Project title
 * - Key metrics display (up to 3)
 * - Consistent branding
 *
 * @param params - Route parameters containing project slug
 */

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  // Validate slug and get project data
  if (!isValidProjectSlug(params.slug)) {
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
          Project Not Found
        </div>
      ),
      { ...size }
    );
  }

  const project = PROJECTS[params.slug]!;

  // Get first 3 metrics for display
  const displayMetrics = project.metrics.slice(0, 3);

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
        {/* Header with case study badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
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
            Case Study
          </div>
          <div
            style={{
              fontSize: 18,
              color: '#999999',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {project.industry}
          </div>
        </div>

        {/* Project title */}
        <h1
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: '#ffffff',
            margin: 0,
            lineHeight: 1.2,
            marginBottom: 40,
            maxWidth: '1000px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {project.title}
        </h1>

        {/* Metrics */}
        <div
          style={{
            display: 'flex',
            gap: 24,
            marginBottom: 40,
          }}
        >
          {displayMetrics.map((metric, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 200,
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: '#B8860B',
                  textAlign: 'center',
                  lineHeight: 1.3,
                }}
              >
                {metric}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
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
        </div>

        {/* Decorative accent */}
        <div
          style={{
            position: 'absolute',
            bottom: '-20%',
            right: '-10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(184, 134, 11, 0.08) 0%, transparent 70%)',
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
 * Uses project title from central data
 */
export async function generateImageMetadata({ params }: { params: { slug: string } }) {
  if (!isValidProjectSlug(params.slug)) {
    return [{ alt: 'Project Showcase' }];
  }

  const project = PROJECTS[params.slug]!;
  return [
    {
      alt: `${project.title} Case Study — ${SITE_CONFIG.name}`,
    },
  ];
}
