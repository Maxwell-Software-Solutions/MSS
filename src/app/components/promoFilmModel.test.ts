import { clamp01, endScale, filmSources, frameAt, growth, pinProgress, posterOf, settleAt, voiceOf } from './promoFilmModel';
import type { Layout } from './promoFilmModel';

const srcs = (list: Array<{ src: string }>): string[] => list.map((item) => item.src);

describe('film files', () => {
  it('plays the English files in English, the WebM first only where it is allowed', () => {
    expect(srcs(filmSources('wide', 'en', true))).toEqual(['/video/maxwell-film-16x9.webm', '/video/maxwell-film-16x9.mp4']);
    expect(srcs(filmSources('tall', 'en', false))).toEqual(['/video/maxwell-film-4x5.mp4']);
  });

  it('looks for the Lithuanian-voiced cut first in Lithuanian and keeps the English files as the fallback', () => {
    expect(srcs(filmSources('wide', 'lt', true))).toEqual([
      '/video/maxwell-film-16x9.lt.webm',
      '/video/maxwell-film-16x9.lt.mp4',
      '/video/maxwell-film-16x9.webm',
      '/video/maxwell-film-16x9.mp4',
    ]);
    expect(srcs(filmSources('tall', 'lt', false))).toEqual(['/video/maxwell-film-4x5.lt.mp4', '/video/maxwell-film-4x5.mp4']);
  });

  it('tells which voice a file carries, and names the poster of each cut', () => {
    expect(voiceOf('/video/maxwell-film-16x9.lt.mp4')).toBe('lt');
    expect(voiceOf('http://localhost/video/maxwell-film-4x5.lt.webm?v=2')).toBe('lt');
    expect(voiceOf('/video/maxwell-film-16x9.mp4')).toBe('en');
    expect(posterOf('wide')).toBe('/video/maxwell-film-16x9.webp');
    expect(posterOf('tall')).toBe('/video/maxwell-film-4x5.webp');
  });
});

describe('the pin', () => {
  it('measures progress from where the runway meets the pin line', () => {
    expect(pinProgress(300, 64, 1000)).toBe(0); // still below the pin line
    expect(pinProgress(64, 64, 1000)).toBe(0); // just pinned
    expect(pinProgress(-436, 64, 1000)).toBe(0.5);
    expect(pinProgress(-2000, 64, 1000)).toBe(1); // let go
    expect(pinProgress(0, 64, 0)).toBe(0);
  });

  it('holds still, swells smoothly, then holds the full-screen film', () => {
    expect(growth(0, 0.05, 0.72)).toBe(0);
    expect(growth(0.05, 0.05, 0.72)).toBe(0);
    expect(growth(0.385, 0.05, 0.72)).toBeCloseTo(0.5, 5);
    expect(growth(0.72, 0.05, 0.72)).toBe(1);
    expect(growth(1, 0.05, 0.72)).toBe(1);
    expect(growth(0.2, 0.05, 0.72)).toBeLessThan(growth(0.4, 0.05, 0.72));
    expect(clamp01(-3)).toBe(0);
    expect(clamp01(7)).toBe(1);
  });
});

describe('the growing card', () => {
  // a desktop: 1440 x 836 of screen, a 1120 x 630 card under its heading
  const desktop: Layout = { viewW: 1440, viewH: 836, cardX: 160, cardY: 103, cardW: 1120, cardH: 630 };
  // an upright phone with the 4:5 cut: the screen is much taller than the picture
  const phone: Layout = { viewW: 393, viewH: 595, cardX: 30.5, cardY: 100, cardW: 332, cardH: 415 };

  it('fills a screen of nearly the right shape and crops a little', () => {
    expect(endScale(desktop, 1.1)).toBeCloseTo(836 / 630, 5);
  });

  it('stops short of cropping words off a screen of the wrong shape', () => {
    const fit = Math.min(393 / 332, 595 / 415);
    expect(endScale(phone, 1.1)).toBeCloseTo(fit * 1.1, 5);
    expect(endScale(phone, 1)).toBeCloseTo(fit, 5);
    expect(endScale({ ...phone, cardW: 500, cardH: 700 }, 1.1)).toBe(1); // a card that is already too big never shrinks
  });

  it('starts where the card is and ends centred on the screen', () => {
    const start = frameAt(desktop, endScale(desktop, 1.1), 0);
    expect(start).toEqual({ k: 1, tx: 0, ty: 0 });
    const lowCard: Layout = { ...desktop, cardY: 160, cardH: 580 };
    const end = frameAt(lowCard, 1.4, 1);
    expect(end.k).toBeCloseTo(1.4, 5);
    expect(end.ty).toBeCloseTo(836 / 2 - (160 + 290), 5);
  });
});

describe('settling once scrolling has stopped', () => {
  it('moves a page that rests close to the card or to the full film, and nothing else', () => {
    expect(settleAt(-0.05, 0.72, 0.08)).toBe(0); // on its way to the pin line
    expect(settleAt(0.03, 0.72, 0.08)).toBe(0); // just pinned
    expect(settleAt(0.68, 0.72, 0.08)).toBe(0.72); // all but grown
    expect(settleAt(0.3, 0.72, 0.08)).toBeNull(); // mid-growth stays where the hand left it
    expect(settleAt(-0.5, 0.72, 0.08)).toBeNull(); // still far above
    expect(settleAt(0.9, 0.72, 0.08)).toBeNull(); // holding the full film, or let go of it
  });
});
