#!/usr/bin/env node
// Generates deterministic SVG avatar files for founders (aligns with Avatar.tsx logic)
const fs = require('fs');
const path = require('path');

const founders = [
  { name: 'Maxwell Archer', preset: { background: { from: '#2a71ff', to: '#00b0ff' }, hair: { style: 'short' } } },
  { name: 'Petras Rolinskij', preset: { background: { from: '#7d3cff', to: '#ff3cc7' }, hair: { style: 'wavy' } } },
  { name: 'Marek Wolosewicz', preset: { background: { from: '#ff8a00', to: '#ff3d00' }, hair: { style: 'buzz' } } },
];

const SKIN_TONES = {
  porcelain: '#FFE9D6',
  peach: '#FFD2B8',
  olive: '#D9B08C',
  tan: '#C49062',
  brown: '#8D5524',
  ebony: '#4B2E24',
};
const SKIN_KEYS = Object.keys(SKIN_TONES);
const HAIR_COLOR_POOL = ['#0E0E0E', '#222222', '#5A3825', '#7B3F1F', '#D9B15F', '#8E8E8E'];
const HAIR_STYLES = ['buzz', 'short', 'wavy', 'curly', 'long', 'bun', 'bald'];
const MOODS = ['neutral', 'smile', 'grin'];
const SKIN_HIGHLIGHT = 'rgba(255,255,255,0.35)';

function hashString(seed) {
  let h = 5381;
  for (let i = 0; i < seed.length; i++) h = ((h << 5) + h) ^ seed.charCodeAt(i);
  return h >>> 0;
}
function derive(name) {
  const h = hashString(name.trim().toLowerCase());
  const pick = (arr, offset) => arr[(h + offset) % arr.length];
  return {
    skinTone: pick(SKIN_KEYS, 0),
    hairStyle: pick(HAIR_STYLES, 7),
    mood: pick(MOODS, 17),
    hairColor: pick(HAIR_COLOR_POOL, 23),
  };
}
function hairPath(style, color) {
  switch (style) {
    case 'bald':
      return '';
    case 'buzz':
      return `<path fill="${color}" d="M30 54c5-16 24-28 46-22 15 4 24 15 28 27-10-9-25-14-40-14s-30 5-34 9z" opacity="0.9"/>`;
    case 'short':
      return `<path fill="${color}" d="M29 56c4-18 26-34 50-28 17 4 30 18 32 34-12-10-26-16-41-16s-29 4-41 10z"/>`;
    case 'wavy':
      return `<path fill="${color}" d="M28 57c6-20 29-36 51-29 18 6 28 19 32 36-9-6-19-10-28-11-9-2-14 4-22 3-8-1-19 4-33 1z"/>`;
    case 'curly':
      return `<path fill="${color}" d="M30 58c4-14 18-30 38-28 23 2 36 20 38 36-8-8-15-12-22-13-7-1-11 5-18 4s-17 6-23 6-10-2-13-5z"/>`;
    case 'long':
      return `<path fill="${color}" d="M32 56c6-18 25-32 46-29 18 3 30 16 34 33 2 13-1 27-4 36l-8-4c3-11 2-21-2-30-3-6-7-11-12-12-7-2-15 3-23 2-8-1-20 4-26 4-1 9-1 19 3 29l-7 3c-5-11-5-25-1-32z"/>`;
    case 'bun':
      return `<g fill="${color}"><circle cx="81" cy="42" r="10"/><path d="M30 56c5-16 24-30 46-27 17 2 32 15 35 29-12-10-25-14-40-14s-29 3-41 12z"/></g>`;
    default:
      return '';
  }
}
function mouth(mood) {
  switch (mood) {
    case 'neutral':
      return `<path d="M54 92c6 3 14 3 20 0" stroke="#663300" stroke-width="3" stroke-linecap="round" fill="none"/>`;
    case 'smile':
      return `<path d="M52 90c8 8 20 8 28 0" stroke="#663300" stroke-width="3" stroke-linecap="round" fill="none"/>`;
    case 'grin':
      return `<g stroke-linecap="round" stroke-width="3" fill="none" stroke="#663300"><path d="M50 88c10 12 22 12 32 0"/><path d="M56 90c2 3 4 4 8 4 4 0 6-1 8-4" stroke-width="2"/></g>`;
    default:
      return '';
  }
}

const outDir = path.join(process.cwd(), 'public', 'images', 'founders');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

for (const f of founders) {
  const feat = derive(f.name);
  const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="Cartoon illustration of ${
    f.name
  }">\n<title>${
    f.name
  }</title>\n<defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(220)">\n<stop offset="0%" stop-color="${
    f.preset.background.from
  }"/>\n<stop offset="100%" stop-color="${
    f.preset.background.to
  }"/>\n</linearGradient><radialGradient id="cheek" cx="50%" cy="60%" r="55%">\n<stop offset="0%" stop-color="${SKIN_HIGHLIGHT}"/>\n<stop offset="60%" stop-color="rgba(255,255,255,0)"/>\n</radialGradient></defs>\n<rect x="0" y="0" width="128" height="128" rx="16" fill="url(#bg)"/>\n<path d="M28 118c4-24 20-38 36-38s32 14 36 38H28z" fill="#ffffff" fill-opacity="0.85"/>\n<path d="M28 118c4-24 20-38 36-38s32 14 36 38" fill="none" stroke="rgba(0,0,0,0.06)" stroke-width="2"/>\n<g><circle cx="64" cy="64" r="34" fill="${
    SKIN_TONES[feat.skinTone]
  }"/>\n<circle cx="54" cy="70" r="12" fill="url(#cheek)" opacity="0.5"/>\n<circle cx="74" cy="70" r="12" fill="url(#cheek)" opacity="0.5"/></g>\n${hairPath(
    f.preset.hair.style,
    feat.hairColor
  )}\n<g fill="#222"><circle cx="52" cy="64" r="3"/><circle cx="76" cy="64" r="3"/></g>\n${mouth(feat.mood)}\n</svg>`;
  const fileName = f.name.split(' ')[0].toLowerCase() + '.svg';
  fs.writeFileSync(path.join(outDir, fileName), svg, 'utf8');
  console.log('Generated', fileName);
}

console.log('Founder avatar SVGs generated to', outDir);
