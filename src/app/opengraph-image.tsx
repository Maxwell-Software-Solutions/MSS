import { ImageResponse } from 'next/og';
import { OG_SIZE, OgFrame, ogFonts } from '@/lib/brand/og';
import { SITE_CONFIG } from '@/lib/seo/data';

/**
 * Root Open Graph image: the brand frame and the site title.
 * Data pulled from central SITE_CONFIG to ensure consistency with metadata.
 */

export const runtime = 'edge';
export const alt = `${SITE_CONFIG.name} — ${SITE_CONFIG.title}`;
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image(): Promise<ImageResponse> {
  return new ImageResponse(
    (
      <OgFrame>
        <div
          style={{
            marginTop: 52,
            maxWidth: 760,
            fontSize: 62,
            fontWeight: 500,
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
          }}
        >
          {/* A non-breaking space keeps the ampersand with the word it joins */}
          {SITE_CONFIG.title.replace('& ', '& ')}
        </div>
      </OgFrame>
    ),
    { ...size, fonts: await ogFonts() }
  );
}
