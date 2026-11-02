/**
 * The decisions behind the home page film, kept free of the page so they can be tested on their own:
 * which files to play, and the geometry of the card that grows into a full-screen film as the page scrolls.
 */

export type Cut = 'wide' | 'tall';
export type Voice = 'en' | 'lt';

/** Portrait screens, and phones held upright, get the 4:5 cut; anything landscape gets the 16:9 one. */
export const TALL = '(orientation: portrait)';

const SIZE: Record<Cut, string> = { wide: '16x9', tall: '4x5' };
const STEM = '/video/maxwell-film-';

export function posterOf(cut: Cut): string {
  return `${STEM}${SIZE[cut]}.webp`;
}

export interface FilmSource {
  src: string;
  type: string;
}

/**
 * The files to try, best first. In Lithuanian the Lithuanian-voiced cut comes first (maxwell-film-16x9.lt.mp4 and
 * so on) and the English files follow it, so the site keeps working until those files exist: the browser moves
 * on to the next source by itself when one is missing.
 */
export function filmSources(cut: Cut, language: string, webm: boolean): FilmSource[] {
  const voices: Voice[] = language === 'lt' ? ['lt', 'en'] : ['en'];
  const sources: FilmSource[] = [];
  for (const voice of voices) {
    const stem = `${STEM}${SIZE[cut]}${voice === 'lt' ? '.lt' : ''}`;
    if (webm) sources.push({ src: `${stem}.webm`, type: 'video/webm; codecs="vp9, opus"' });
    sources.push({ src: `${stem}.mp4`, type: 'video/mp4' });
  }
  return sources;
}

/** Which voice a file carries, from its name. */
export function voiceOf(src: string): Voice {
  return /\.lt\.(webm|mp4)(\?|#|$)/.test(src) ? 'lt' : 'en';
}

export const clamp01 = (n: number): number => Math.min(1, Math.max(0, n));

/** How far through the pinned stretch of scroll the page is, 0 to 1. `top` is the runway's distance from the viewport top. */
export function pinProgress(top: number, pin: number, run: number): number {
  return run > 0 ? clamp01((pin - top) / run) : 0;
}

/** From progress to growth: still, then a smooth swell between `from` and `to`, then still while the film holds. */
export function growth(progress: number, from: number, to: number): number {
  const t = to > from ? clamp01((progress - from) / (to - from)) : progress >= to ? 1 : 0;
  return t * t * (3 - 2 * t);
}

export interface Layout {
  /** the screen the film may fill, and the card's box inside it (all in px, from the screen's top left) */
  viewW: number;
  viewH: number;
  cardX: number;
  cardY: number;
  cardW: number;
  cardH: number;
}

/**
 * How big the card gets by the end. It grows until it fills the screen, but never crops more than `maxCrop`
 * beyond the whole picture fitting: on a screen of the wrong shape a little black is better than cut-off words.
 */
export function endScale(layout: Layout, maxCrop: number): number {
  const across = layout.viewW / layout.cardW;
  const down = layout.viewH / layout.cardH;
  return Math.max(1, Math.min(Math.max(across, down), Math.min(across, down) * maxCrop));
}

/** Where the card's picture is at growth `e`: scaled about its own centre, then moved to the centre of the screen. */
export function frameAt(layout: Layout, scale: number, e: number): { k: number; tx: number; ty: number } {
  return {
    k: 1 + (scale - 1) * e,
    tx: (layout.viewW / 2 - (layout.cardX + layout.cardW / 2)) * e,
    ty: (layout.viewH / 2 - (layout.cardY + layout.cardH / 2)) * e,
  };
}

/**
 * The part of the picture that is on screen at growth `e`, as distances in from the card's own edges (negative
 * values reach out beyond the card). Captions and buttons sit inside it, so they are never cropped away and
 * keep their size while the picture grows.
 */
export function windowAt(layout: Layout, scale: number, e: number): { top: number; right: number; bottom: number; left: number } {
  const { k, tx, ty } = frameAt(layout, scale, e);
  const w = layout.cardW * k;
  const h = layout.cardH * k;
  const left = Math.max(layout.cardW / 2 + tx - w / 2, -layout.cardX);
  const right = Math.min(layout.cardW / 2 + tx + w / 2, layout.viewW - layout.cardX);
  const top = Math.max(layout.cardH / 2 + ty - h / 2, -layout.cardY);
  const bottom = Math.min(layout.cardH / 2 + ty + h / 2, layout.viewH - layout.cardY);
  return { top, right: layout.cardW - right, bottom: layout.cardH - bottom, left };
}
