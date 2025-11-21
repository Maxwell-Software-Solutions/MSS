import { ImageResponse } from 'next/og';
import { SITE_CONFIG } from '@/lib/seo/data';

/**
 * Root Open Graph Image
 *
 * Generates dynamic OG image for homepage using Next.js ImageResponse API.
 * Data pulled from central SITE_CONFIG to ensure consistency with metadata.
 *
 * Specifications:
 * - Size: 1200x630 (Facebook/Twitter optimal)
 * - Format: PNG
 * - Runtime: Edge for fast generation
 * - Caching: Automatic via Next.js
 */

export const runtime = 'edge';
export const alt = `${SITE_CONFIG.name} — ${SITE_CONFIG.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Decorative accent circle */}
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(184, 134, 11, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          {/* Company name */}
          <h1
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: '#B8860B',
              margin: 0,
              marginBottom: 24,
              letterSpacing: '-0.02em',
            }}
          >
            {SITE_CONFIG.name}
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontSize: 36,
              fontWeight: 400,
              color: '#ffffff',
              margin: 0,
              maxWidth: '900px',
              lineHeight: 1.4,
            }}
          >
            {SITE_CONFIG.title}
          </p>

          {/* Subtle separator */}
          <div
            style={{
              width: '120px',
              height: '2px',
              background: '#B8860B',
              marginTop: 32,
              marginBottom: 32,
            }}
          />

          {/* Core values */}
          <p
            style={{
              fontSize: 20,
              fontWeight: 400,
              color: '#999999',
              margin: 0,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Quality • Reliability • Excellence
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}
