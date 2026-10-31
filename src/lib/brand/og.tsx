import type { ReactElement, ReactNode } from 'react';
import { POSTER_VIEWBOX, ribbonPosterLines } from '@/app/components/hero/ribbon';
import { LOGO_DESCRIPTOR, LOGO_HEIGHT, LOGO_MARK, LOGO_VIEWBOX, LOGO_WIDTH, LOGO_WORD } from './logoPaths';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_COLORS = {
  navy: '#0a1730',
  text: '#f4f6fa',
  secondary: '#ccd5e3',
  muted: '#b4bfcf',
  accent: '#93bfff',
  hairline: 'rgba(255, 255, 255, 0.18)',
};

// IBM Plex Sans, renamed subsets. See fonts/OFL.txt.
const regular = fetch(new URL('./fonts/MaxwellOGSans-Regular.ttf', import.meta.url)).then((res) => res.arrayBuffer());
const medium = fetch(new URL('./fonts/MaxwellOGSans-Medium.ttf', import.meta.url)).then((res) => res.arrayBuffer());

export async function ogFonts(): Promise<Array<{ name: string; data: ArrayBuffer; weight: 400 | 500; style: 'normal' }>> {
  const [regularData, mediumData] = await Promise.all([regular, medium]);
  return [
    { name: 'Maxwell OG Sans', data: regularData, weight: 400, style: 'normal' },
    { name: 'Maxwell OG Sans', data: mediumData, weight: 500, style: 'normal' },
  ];
}

function OgLogo({ height }: { height: number }): ReactElement {
  return (
    <svg width={(height * LOGO_WIDTH) / LOGO_HEIGHT} height={height} viewBox={LOGO_VIEWBOX} fill={OG_COLORS.text}>
      <path d={LOGO_MARK} />
      <path d={LOGO_WORD} />
      <path d={LOGO_DESCRIPTOR} fillOpacity={0.74} />
    </svg>
  );
}

/** The hero's ribbon: jagged noise on the left, resolving into precise fine lines on the right. */
function OgRibbon({ strength }: { strength: number }): ReactElement {
  const lines = ribbonPosterLines(44);
  return (
    <svg
      viewBox={POSTER_VIEWBOX}
      width={1200}
      height={750}
      fill="none"
      style={{ position: 'absolute', left: 0, top: -48 }}
    >
      <defs>
        <linearGradient id="lift" gradientUnits="userSpaceOnUse" x1="1500" y1="0" x2="2700" y2="0">
          <stop offset="0" stopColor="#4d9eff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#4d9eff" stopOpacity="1" />
          <stop offset="1" stopColor="#4d9eff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {lines.map((line) => (
        <path key={line.d} d={line.d} stroke="#b8c6d8" strokeOpacity={line.opacity * strength} strokeWidth={2.4} />
      ))}
      {lines.slice(26, 34).map((line) => (
        <path key={line.d} d={line.d} stroke="url(#lift)" strokeOpacity={strength} strokeWidth={3.2} />
      ))}
    </svg>
  );
}

/** Navy, the ribbon, the logo at the top left, and whatever the image is about beneath it. */
export function OgFrame({ children, ribbon = 1 }: { children: ReactNode; ribbon?: number }): ReactElement {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        padding: '60px 72px',
        background: OG_COLORS.navy,
        color: OG_COLORS.text,
        fontFamily: 'Maxwell OG Sans',
      }}
    >
      <OgRibbon strength={ribbon} />
      <OgLogo height={64} />
      {children}
    </div>
  );
}
