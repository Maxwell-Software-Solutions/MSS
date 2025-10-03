'use client';
import React, { memo } from 'react';

export type SkinTone = 'porcelain' | 'peach' | 'olive' | 'tan' | 'brown' | 'ebony';
export type HairStyle = 'buzz' | 'short' | 'wavy' | 'curly' | 'long' | 'bun' | 'bald';
export type Mood = 'neutral' | 'smile' | 'grin';

export interface HairConfig {
  style: HairStyle;
  color?: string | undefined;
}
export interface BackgroundGradient {
  from: string;
  to: string;
}
export interface AvatarProps {
  name: string;
  skinTone?: SkinTone;
  hair?: HairConfig;
  mood?: Mood;
  background?: BackgroundGradient;
  size?: number; // px
  className?: string;
  shadow?: boolean;
  'aria-label'?: string;
}

interface DerivedFeatures {
  skinTone: SkinTone;
  hair: HairConfig;
  mood: Mood;
  background: BackgroundGradient;
  hairColor: string;
}

const SKIN_TONES: Record<SkinTone, string> = {
  porcelain: '#FFE9D6',
  peach: '#FFD2B8',
  olive: '#D9B08C',
  tan: '#C49062',
  brown: '#8D5524',
  ebony: '#4B2E24',
};

const SKIN_HIGHLIGHT = 'rgba(255,255,255,0.35)';

const HAIR_COLOR_POOL = ['#0E0E0E', '#222222', '#5A3825', '#7B3F1F', '#D9B15F', '#8E8E8E'];
const BG_GRADIENT_POOL: BackgroundGradient[] = [
  { from: '#5b7fff', to: '#2a38ff' },
  { from: '#ff7a18', to: '#ff3d54' },
  { from: '#6366f1', to: '#8b5cf6' },
  { from: '#0ea5e9', to: '#22d3ee' },
  { from: '#059669', to: '#10b981' },
  { from: '#ec4899', to: '#db2777' },
];
const SKIN_KEYS: SkinTone[] = Object.keys(SKIN_TONES) as SkinTone[];
const HAIR_STYLES: HairStyle[] = ['buzz', 'short', 'wavy', 'curly', 'long', 'bun', 'bald'];
const MOODS: Mood[] = ['neutral', 'smile', 'grin'];

// Simple deterministic hash (djb2 variant) returning positive 32-bit int
export function hashString(seed: string): number {
  let h = 5381;
  for (let i = 0; i < seed.length; i++) h = ((h << 5) + h) ^ seed.charCodeAt(i);
  return h >>> 0; // unsigned
}

export function deriveFeatures(name: string, overrides?: Partial<DerivedFeatures>): DerivedFeatures {
  const h = hashString(name.trim().toLowerCase());
  const pick = <T,>(arr: readonly T[], offset: number): T => arr[(h + offset) % arr.length]!;
  const skinTone = overrides?.skinTone ?? pick(SKIN_KEYS, 0);
  const hairStyle = overrides?.hair?.style ?? pick(HAIR_STYLES, 7);
  const mood = overrides?.mood ?? pick(MOODS, 17);
  const hairColor = overrides?.hair?.color ?? pick(HAIR_COLOR_POOL, 23);
  const background = overrides?.background ?? pick(BG_GRADIENT_POOL, 31);
  return {
    skinTone,
    hair: { style: hairStyle, color: hairColor },
    mood,
    background,
    hairColor,
  };
}

// Hair style vector paths relative to head center (64,60) radius ~34
function renderHair(style: HairStyle, color: string): React.ReactNode {
  const common = { fill: color, stroke: 'none' } as const;
  switch (style) {
    case 'bald':
      return null;
    case 'buzz':
      return (
        <path {...common} d="M30 54c5-16 24-28 46-22 15 4 24 15 28 27-10-9-25-14-40-14s-30 5-34 9z" opacity={0.9} />
      );
    case 'short':
      return <path {...common} d="M29 56c4-18 26-34 50-28 17 4 30 18 32 34-12-10-26-16-41-16s-29 4-41 10z" />;
    case 'wavy':
      return (
        <path {...common} d="M28 57c6-20 29-36 51-29 18 6 28 19 32 36-9-6-19-10-28-11-9-2-14 4-22 3-8-1-19 4-33 1z" />
      );
    case 'curly':
      return (
        <path
          {...common}
          d="M30 58c4-14 18-30 38-28 23 2 36 20 38 36-8-8-15-12-22-13-7-1-11 5-18 4s-17 6-23 6-10-2-13-5z"
        />
      );
    case 'long':
      return (
        <path
          {...common}
          d="M32 56c6-18 25-32 46-29 18 3 30 16 34 33 2 13-1 27-4 36l-8-4c3-11 2-21-2-30-3-6-7-11-12-12-7-2-15 3-23 2-8-1-20 4-26 4-1 9-1 19 3 29l-7 3c-5-11-5-25-1-32z"
        />
      );
    case 'bun':
      return (
        <g fill={color}>
          <circle cx={81} cy={42} r={10} />
          <path d="M30 56c5-16 24-30 46-27 17 2 32 15 35 29-12-10-25-14-40-14s-29 3-41 12z" />
        </g>
      );
    default:
      return null;
  }
}

function renderMouth(mood: Mood): React.ReactNode {
  switch (mood) {
    case 'neutral':
      return <path d="M54 92c6 3 14 3 20 0" stroke="#663300" strokeWidth={3} strokeLinecap="round" fill="none" />;
    case 'smile':
      return <path d="M52 90c8 8 20 8 28 0" stroke="#663300" strokeWidth={3} strokeLinecap="round" fill="none" />;
    case 'grin':
      return (
        <g strokeLinecap="round" strokeWidth={3} fill="none" stroke="#663300">
          <path d="M50 88c10 12 22 12 32 0" />
          <path d="M56 90c2 3 4 4 8 4 4 0 6-1 8-4" strokeWidth={2} />
        </g>
      );
    default:
      return null;
  }
}

const Avatar: React.FC<AvatarProps> = memo(function Avatar({
  name,
  skinTone,
  hair,
  mood,
  background,
  size = 96,
  className = '',
  shadow = true,
  ...rest
}) {
  const hairOverride: HairConfig | undefined = hair
    ? { style: hair.style as HairStyle, ...(hair.color ? { color: hair.color } : {}) }
    : undefined;
  const overrideObj: Partial<DerivedFeatures> = {
    ...(skinTone ? { skinTone } : {}),
    ...(hairOverride ? { hair: hairOverride } : {}),
    ...(mood ? { mood } : {}),
    ...(background ? { background } : {}),
  };
  const derived = deriveFeatures(name, overrideObj);
  const skinColor = SKIN_TONES[derived.skinTone];
  const hairNode = renderHair(derived.hair.style, derived.hair.color!);
  const mouthNode = renderMouth(derived.mood);
  const titleId = `avatar-${name.replace(/\s+/g, '-').toLowerCase()}-title`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      role="img"
      aria-label={rest['aria-label'] || name}
      className={className}
      style={{ display: 'inline-block' }}
    >
      <title id={titleId}>{name}</title>
      <defs>
        <linearGradient id={titleId + '-bg'} x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(220)">
          <stop offset="0%" stopColor={derived.background.from} />
          <stop offset="100%" stopColor={derived.background.to} />
        </linearGradient>
        <radialGradient id={titleId + '-cheek'} cx="50%" cy="60%" r="55%">
          <stop offset="0%" stopColor={SKIN_HIGHLIGHT} />
          <stop offset="60%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <filter id={titleId + '-shadow'} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="rgba(0,0,0,0.18)" />
        </filter>
      </defs>
      <rect
        x={0}
        y={0}
        width={128}
        height={128}
        rx={16}
        fill={`url(#${titleId + '-bg'})`}
        filter={shadow ? `url(#${titleId + '-shadow'})` : undefined}
      />
      {/* Shoulders / shirt */}
      <path d="M28 118c4-24 20-38 36-38s32 14 36 38H28z" fill="#ffffff" fillOpacity={0.85} />
      <path d="M28 118c4-24 20-38 36-38s32 14 36 38" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={2} />
      {/* Head */}
      <g>
        <circle cx={64} cy={64} r={34} fill={skinColor} />
        <circle cx={54} cy={70} r={12} fill={`url(#${titleId + '-cheek'})`} opacity={0.5} />
        <circle cx={74} cy={70} r={12} fill={`url(#${titleId + '-cheek'})`} opacity={0.5} />
      </g>
      {/* Hair */}
      {hairNode}
      {/* Eyes */}
      <g fill="#222">
        <circle cx={52} cy={64} r={3} />
        <circle cx={76} cy={64} r={3} />
      </g>
      {/* Mouth */}
      {mouthNode}
    </svg>
  );
});

export default Avatar;
