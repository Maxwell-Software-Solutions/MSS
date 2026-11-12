import { readFileSync } from 'fs';
import { join } from 'path';
import { act, fireEvent, renderWithProviders, screen, waitFor } from '@/test/test-utils';
import { axe } from 'jest-axe';
import * as analytics from '@/lib/analytics';
import * as LanguageContext from '@/lib/LanguageContext';
import PromoFilm from './PromoFilm';

interface Watcher {
  callback: IntersectionObserverCallback;
  options: IntersectionObserverInit | undefined;
}

describe('PromoFilm', () => {
  let watchers: Watcher[];
  let upright: boolean;
  let reduced: boolean;
  let turned: Array<() => void>;
  let load: jest.SpyInstance;
  let play: jest.SpyInstance;

  // the observer that starts and stops the film (thresholds), and the one that brings it in once its runway is in view
  const seen = (): Watcher => watchers.find((item) => Array.isArray(item.options?.threshold)) as Watcher;
  const near = (): Watcher => watchers.find((item) => item.options?.rootMargin && !item.options.threshold) as Watcher;
  const report = (watcher: Watcher, ratio: number): void => {
    const entry = { isIntersecting: ratio > 0, intersectionRatio: ratio } as IntersectionObserverEntry;
    act(() => watcher.callback([entry], {} as IntersectionObserver));
  };
  const sourcesOf = (container: HTMLElement): string[] => Array.from(container.querySelectorAll('video source'), (node) => node.getAttribute('src') ?? '');

  // a 58 second film (the real one is 59.13) whose clock the test moves, as a browser would, and whose timeupdate it fires
  const playTo = (container: HTMLElement, seconds: number, length = 58.1): HTMLVideoElement => {
    const video = container.querySelector('video') as HTMLVideoElement;
    Object.defineProperty(video, 'duration', { configurable: true, value: length });
    Object.defineProperty(video, 'currentTime', { configurable: true, writable: true, value: seconds });
    act(() => {
      video.dispatchEvent(new Event('timeupdate'));
    });
    return video;
  };

  // jsdom has no media playback: play and pause flip the paused flag and fire their events, as a browser does
  beforeEach(() => {
    watchers = [];
    upright = false;
    reduced = false;
    turned = [];
    window.sessionStorage.clear();
    global.IntersectionObserver = class {
      constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
        watchers.push({ callback, options });
      }
      observe(): void {}
      unobserve(): void {}
      disconnect(): void {}
      takeRecords(): IntersectionObserverEntry[] {
        return [];
      }
    } as unknown as typeof IntersectionObserver;
    window.matchMedia = ((query: string) => ({
      get matches() {
        if (query.includes('prefers-reduced-motion')) return reduced;
        return query.includes('orientation: portrait') ? upright : false;
      },
      media: query,
      addEventListener: (_type: string, listener: () => void) => turned.push(listener),
      removeEventListener: () => undefined,
    })) as unknown as typeof window.matchMedia;
    const set = (video: HTMLMediaElement, paused: boolean): void => {
      Object.defineProperty(video, 'paused', { configurable: true, value: paused });
      video.dispatchEvent(new Event(paused ? 'pause' : 'play'));
    };
    load = jest.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => undefined);
    play = jest.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(function (this: HTMLMediaElement) {
      set(this, false);
      return Promise.resolve();
    });
    jest.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(function (this: HTMLMediaElement) {
      set(this, true);
    });
  });

  afterEach(() => jest.restoreAllMocks());

  it('fetches nothing with the page, then brings in the poster, with captions in English and Lithuanian', async () => {
    const { container } = renderWithProviders(<PromoFilm />);
    const video = container.querySelector('video');
    expect(video).toHaveAttribute('preload', 'none');
    expect(video).not.toHaveAttribute('src');
    expect(container.querySelectorAll('video source')).toHaveLength(0);
    expect(video).toHaveAttribute('playsinline');
    expect(video).not.toHaveAttribute('loop'); // it plays once
    expect(Array.from(container.querySelectorAll('track'), (track) => track.getAttribute('srclang'))).toEqual(['en', 'lt']);
    const frame = container.querySelector('.promo-film-frame');
    expect(frame).not.toHaveAttribute('data-armed');
    await waitFor(() => expect(frame).toHaveAttribute('data-armed'));
    expect(load).not.toHaveBeenCalled();
  });

  it('is part of the dark page: a heading for screen readers only, and the film in the stage with no box round it', () => {
    const { container } = renderWithProviders(<PromoFilm />);
    const heading = screen.getByRole('heading', { level: 2, name: 'See AI at work' });
    expect(heading).toHaveClass('sr-only');
    expect(container.querySelector('.promo-film-track .promo-film-stage .promo-film-view .promo-film-slot .promo-film-card .promo-film-frame video')).toBeInTheDocument();
    expect(container.querySelector('.promo-film-fade')).toBeInTheDocument();
    // the layers that melt the picture into the page are decoration, not content
    expect(container.querySelector('.promo-film-frame > .promo-film-floor')).toHaveAttribute('aria-hidden', 'true');
    expect(container.querySelector('.promo-film-frame > .promo-film-veil')).toHaveAttribute('aria-hidden', 'true');
    expect(container.querySelector('.promo-film-head, .section-tone, .eyebrow')).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /schedule a call/i })).not.toBeInTheDocument();
  });

  it('brings the wide cut to a landscape screen and only its header, until it is on screen', () => {
    const { container } = renderWithProviders(<PromoFilm />);
    report(near(), 0.2);
    expect(sourcesOf(container)).toEqual(['/video/maxwell-film-16x9.mp4']);
    expect(container.querySelector('video')).toHaveAttribute('preload', 'metadata');
    expect(container.querySelector('video')).toHaveAttribute('poster', '/video/maxwell-film-16x9.webp');
    expect(play).not.toHaveBeenCalled();
  });

  it('brings the tall cut to a portrait screen, and never the wide one with it', () => {
    upright = true;
    const { container } = renderWithProviders(<PromoFilm />);
    report(near(), 0.2);
    expect(sourcesOf(container)).toEqual(['/video/maxwell-film-4x5.mp4']);
    expect(container.querySelector('video')).toHaveAttribute('poster', '/video/maxwell-film-4x5.webp');
  });

  it('swaps to the other cut when the screen turns, and carries on', () => {
    const { container } = renderWithProviders(<PromoFilm />);
    report(seen(), 0.6);
    expect(sourcesOf(container)).toEqual(['/video/maxwell-film-16x9.mp4']);
    expect(load).not.toHaveBeenCalled(); // the first files start loading by themselves
    Object.defineProperty(container.querySelector('video'), 'networkState', { configurable: true, value: 2 });
    upright = true;
    act(() => turned.forEach((listener) => listener()));
    expect(sourcesOf(container)).toEqual(['/video/maxwell-film-4x5.mp4']);
    expect(load).toHaveBeenCalledTimes(1);
    act(() => turned.forEach((listener) => listener()));
    expect(load).toHaveBeenCalledTimes(1); // same files: nothing to do
  });

  it('looks for the Lithuanian voice first in Lithuanian, with the English files behind it', () => {
    jest.spyOn(LanguageContext, 'useLanguage').mockReturnValue({ language: 'lt', setLanguage: jest.fn(), t: (key: string) => key });
    const { container } = renderWithProviders(<PromoFilm />);
    report(near(), 0.2);
    expect(sourcesOf(container)).toEqual(['/video/maxwell-film-16x9.lt.mp4', '/video/maxwell-film-16x9.mp4']);
  });

  it('starts when half of the stage is on screen, stops when it has gone, and does not start from the middle', () => {
    renderWithProviders(<PromoFilm />);
    report(seen(), 0.3);
    expect(play).not.toHaveBeenCalled();
    report(seen(), 0.6);
    expect(play).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'Pause film' })).toBeInTheDocument();
    report(seen(), 0.4); // still mostly there: it keeps playing
    expect(screen.getByRole('button', { name: 'Pause film' })).toBeInTheDocument();
    report(seen(), 0.1);
    expect(screen.getByRole('button', { name: 'Play film' })).toBeInTheDocument();
    report(seen(), 0.8);
    expect(play).toHaveBeenCalledTimes(2);
  });

  it('does not restart a film the visitor paused when it scrolls back into view', () => {
    renderWithProviders(<PromoFilm />);
    report(seen(), 0.8);
    fireEvent.click(screen.getByRole('button', { name: 'Pause film' }));
    play.mockClear();
    report(seen(), 0);
    report(seen(), 0.9);
    expect(play).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Play film' }));
    expect(play).toHaveBeenCalledTimes(1);
  });

  it('lets the visitor play, pause and turn the sound on, and keeps it on for the visit', () => {
    const { container, unmount } = renderWithProviders(<PromoFilm />);
    fireEvent.click(screen.getByRole('button', { name: 'Play film' }));
    fireEvent.click(screen.getByRole('button', { name: 'Pause film' }));
    expect(screen.getByRole('button', { name: 'Play film' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Play with sound' }));
    expect(screen.getByRole('button', { name: 'Turn sound off' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pause film' })).toBeInTheDocument();
    expect(container.querySelector('video')?.muted).toBe(false);
    unmount();

    // on the next screen of the same visit the film starts with its sound, without asking again
    watchers.length = 0;
    const next = renderWithProviders(<PromoFilm />);
    report(seen(), 0.8);
    expect(next.container.querySelector('video')?.muted).toBe(false);
    fireEvent.click(screen.getByRole('button', { name: 'Turn sound off' }));
    expect(screen.getByRole('button', { name: 'Turn sound on' })).toBeInTheDocument();
    expect(window.sessionStorage.getItem('mss.film.sound')).toBe('off');
  });

  it('falls back to the muted film when the browser will not play it with sound yet', async () => {
    window.sessionStorage.setItem('mss.film.sound', 'on');
    play.mockImplementation(function (this: HTMLMediaElement) {
      if (!this.muted) return Promise.reject(new DOMException('no gesture', 'NotAllowedError'));
      Object.defineProperty(this, 'paused', { configurable: true, value: false });
      this.dispatchEvent(new Event('play'));
      return Promise.resolve();
    });
    const { container } = renderWithProviders(<PromoFilm />);
    report(seen(), 0.8);
    await waitFor(() => expect(screen.getByRole('button', { name: 'Pause film' })).toBeInTheDocument());
    expect(container.querySelector('video')?.muted).toBe(true);
    expect(screen.queryByRole('button', { name: 'Play film' })).not.toBeInTheDocument();
  });

  it('shows the poster with a clear play button when autoplay is refused, and a tap starts the film', async () => {
    play.mockImplementationOnce(() => Promise.reject(new DOMException('blocked', 'NotAllowedError')));
    const { container } = renderWithProviders(<PromoFilm />);
    report(seen(), 0.8);
    await waitFor(() => expect(container.querySelector('.promo-film-start')).toBeInTheDocument());
    expect(container.querySelector('.promo-film-frame')).toHaveAttribute('data-blocked');
    fireEvent.click(container.querySelector('.promo-film-start') as HTMLElement);
    await waitFor(() => expect(container.querySelector('.promo-film-start')).not.toBeInTheDocument());
    expect(container.querySelector('video')?.muted).toBe(false);
    expect(container.querySelector('.promo-film-frame')).not.toHaveAttribute('data-blocked');
  });

  describe('the live Book a call, while the film is still playing', () => {
    const LENGTH = 59.1333; // the real film; its drawn button starts to show 55.6 s in, in both cuts
    const rule = (selector: string): string => {
      const css = readFileSync(join(__dirname, 'promo-film.css'), 'utf8');
      const found = new RegExp(`(?:^|\\})\\s*${selector.replace(/[.:]/g, '\\$&')}\\s*\\{([^}]*)\\}`, 'm').exec(css);
      return found?.[1] ?? '';
    };

    it('goes in at the first frame of the drawn button, not when the film reaches its last card', () => {
      const { container } = renderWithProviders(<PromoFilm />);
      report(seen(), 0.8);
      const video = playTo(container, 55.4, LENGTH); // the drawn button is not there yet
      expect(container.querySelector('.promo-film-cta')).not.toBeInTheDocument();
      playTo(container, 55.6, LENGTH); // its first frame
      expect(screen.getByRole('link', { name: 'Book a call (opens in new tab)' })).toBeInTheDocument();
      expect(video.paused).toBe(false); // the film is still playing: it has not reached its last card
      expect(screen.getByRole('button', { name: 'Pause film' })).toBeInTheDocument();
    });

    it('is a live link from its first frame: it takes the click at once, and stays the same link to the end card', () => {
      const track = jest.spyOn(analytics, 'trackCTAClick').mockImplementation(() => undefined);
      const { container } = renderWithProviders(<PromoFilm />);
      report(seen(), 0.8);
      playTo(container, 55.6, LENGTH);
      const link = screen.getByRole('link', { name: 'Book a call (opens in new tab)' });
      expect(link).toHaveAttribute('href', '/book');
      expect(link).not.toHaveAttribute('aria-disabled');
      expect(link).not.toHaveAttribute('tabindex');
      expect(link.closest('[inert], [aria-hidden="true"], [hidden]')).toBeNull();
      link.addEventListener('click', (event) => event.preventDefault()); // jsdom cannot open a tab
      fireEvent.click(link);
      expect(track).toHaveBeenCalledWith('promo_film');
      // the film plays on and stops on its card: the same link carries through, nothing is swapped under the pointer
      playTo(container, 57, LENGTH);
      expect(screen.getByRole('link', { name: /Book a call/ })).toBe(link);
      playTo(container, 58.3, LENGTH);
      expect(container.querySelector('video')?.paused).toBe(true);
      expect(screen.getByRole('link', { name: /Book a call/ })).toBe(link);
    });

    it('finds the moment between timeupdates, which a browser reports only a few times a second', () => {
      const frames: FrameRequestCallback[] = [];
      jest.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => frames.push(callback));
      const { container } = renderWithProviders(<PromoFilm />);
      report(seen(), 0.8);
      const video = playTo(container, 54.9, LENGTH); // a second before the button: the clock is watched frame by frame
      expect(frames.length).toBeGreaterThan(0);
      Object.defineProperty(video, 'currentTime', { configurable: true, writable: true, value: 55.55 }); // no timeupdate came
      act(() => frames.splice(0).forEach((callback) => callback(0)));
      expect(screen.getByRole('link', { name: /Book a call/ })).toBeInTheDocument();
    });

    it('is taken away when the film goes back to its start, and put in again at the same point', () => {
      const { container } = renderWithProviders(<PromoFilm />);
      report(seen(), 0.8);
      playTo(container, 56, LENGTH);
      expect(screen.getByRole('link', { name: /Book a call/ })).toBeInTheDocument();
      playTo(container, 0, LENGTH); // the first time the sound comes on the film starts again
      expect(screen.queryByRole('link', { name: /Book a call/ })).not.toBeInTheDocument();
      playTo(container, 55.6, LENGTH);
      expect(screen.getByRole('link', { name: /Book a call/ })).toBeInTheDocument();
    });

    it('does not depend on the visitor\'s motion setting: the same moment with reduced motion', () => {
      reduced = true;
      const { container } = renderWithProviders(<PromoFilm />);
      report(seen(), 0.8);
      playTo(container, 55.4, LENGTH);
      expect(container.querySelector('.promo-film-cta')).not.toBeInTheDocument();
      playTo(container, 55.6, LENGTH);
      expect(screen.getByRole('link', { name: /Book a call/ })).toBeInTheDocument();
    });

    it('is never switched off in the style sheet, and nothing laid over it takes the click', () => {
      const cta = rule('.promo-film-cta');
      expect(cta).toContain('position: absolute');
      expect(cta).not.toMatch(/pointer-events|visibility|display:\s*none/);
      // its fade starts from opacity 0 (which still takes clicks), and nothing else about it changes before then
      expect(cta).toMatch(/animation:\s*promo-film-cta-in[^;]*both/);
      for (const layer of ['.promo-film-floor', '.promo-film-veil', '.promo-film-frame::after', '.promo-film-ui']) {
        expect(rule(layer)).toMatch(/pointer-events:\s*none/);
      }
    });
  });

  describe('when the film has played through', () => {
    it('stops on its last card, just before the fade, and keeps the live Book a call over the drawn one', () => {
      const { container } = renderWithProviders(<PromoFilm />);
      report(seen(), 0.8);
      expect(container.querySelector('.promo-film-cta')).not.toBeInTheDocument();
      const video = playTo(container, 54); // the card is still on its way
      expect(container.querySelector('.promo-film-cta')).not.toBeInTheDocument();
      expect(video.paused).toBe(false);
      playTo(container, 57.3); // 58.1 minus the fade
      expect(video.paused).toBe(true);
      const button = screen.getByRole('link', { name: 'Book a call (opens in new tab)' });
      expect(button).toHaveAttribute('href', '/book');
      expect(button).toHaveAttribute('target', '_blank');
      expect(button).toHaveAttribute('rel', 'noopener noreferrer');
      expect(button).toHaveTextContent('Book a call');
      expect(container.querySelector('.promo-film-frame .promo-film-cta')).toBe(button); // inside the picture, so it keeps its place
      expect(screen.getByRole('button', { name: 'Watch again' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Pause film' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /sound/i })).not.toBeInTheDocument();
    });

    it('goes back to the last card if the browser got to the very end first', () => {
      const { container } = renderWithProviders(<PromoFilm />);
      report(seen(), 0.8);
      const video = playTo(container, 58.1);
      expect(screen.getByRole('link', { name: /Book a call/ })).toBeInTheDocument(); // the timeupdate caught it
      Object.defineProperty(video, 'currentTime', { configurable: true, writable: true, value: 58.1 });
      act(() => {
        video.dispatchEvent(new Event('ended'));
      });
      expect(video.currentTime).toBeCloseTo(57.2, 5);
    });

    it('never starts again by itself: not on scrolling back, not on coming back to the tab', () => {
      const { container } = renderWithProviders(<PromoFilm />);
      report(seen(), 0.8);
      playTo(container, 57.3);
      play.mockClear();
      report(seen(), 0.05); // scrolled away
      report(seen(), 0.9); // and back
      act(() => {
        document.dispatchEvent(new Event('visibilitychange'));
      });
      expect(play).not.toHaveBeenCalled();
      expect(screen.getByRole('link', { name: /Book a call/ })).toBeInTheDocument();
    });

    it('stays on its last card, with the button, when the phone is turned and the other cut takes over', () => {
      const { container } = renderWithProviders(<PromoFilm />);
      report(seen(), 0.8);
      const video = playTo(container, 57.3);
      Object.defineProperty(video, 'networkState', { configurable: true, value: 2 });
      play.mockClear();
      upright = true;
      act(() => turned.forEach((listener) => listener()));
      expect(video.querySelector('source')).toHaveAttribute('src', '/video/maxwell-film-4x5.mp4');
      act(() => {
        video.dispatchEvent(new Event('loadedmetadata'));
      });
      expect(video.currentTime).toBeCloseTo(57.3, 5); // put back where it was
      expect(screen.getByRole('link', { name: /Book a call/ })).toBeInTheDocument();
      expect(play).not.toHaveBeenCalled(); // and not started
    });

    it('goes back to its start, waiting for a tap, if the other cut cannot be put back on its last card', () => {
      const { container } = renderWithProviders(<PromoFilm />);
      report(seen(), 0.8);
      const video = playTo(container, 57.3);
      Object.defineProperty(video, 'networkState', { configurable: true, value: 2 });
      upright = true;
      act(() => turned.forEach((listener) => listener()));
      // a browser that drops every seek made while the new files come in
      Object.defineProperty(video, 'currentTime', { configurable: true, get: () => 0, set: () => undefined });
      act(() => {
        video.dispatchEvent(new Event('loadedmetadata'));
      });
      for (let i = 0; i < 5; i++) {
        act(() => {
          video.dispatchEvent(new Event('canplay'));
        });
      }
      expect(screen.queryByRole('link', { name: /Book a call/ })).not.toBeInTheDocument(); // no button over the wrong picture
      expect(screen.getByRole('button', { name: 'Play film' })).toBeInTheDocument(); // waiting for a tap
    });

    it('plays again from the start on a click on Watch again, and the button gives way to the film', () => {
      const { container } = renderWithProviders(<PromoFilm />);
      report(seen(), 0.8);
      const video = playTo(container, 57.3);
      play.mockClear();
      fireEvent.click(screen.getByRole('button', { name: 'Watch again' }));
      expect(video.currentTime).toBe(0);
      expect(play).toHaveBeenCalledTimes(1);
      expect(screen.queryByRole('link', { name: /Book a call/ })).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Pause film' })).toBeInTheDocument();
      // and it ends on its card again
      playTo(container, 57.3);
      expect(screen.getByRole('link', { name: /Book a call/ })).toBeInTheDocument();
    });

    it('is free of accessibility violations, with the button on', async () => {
      const { container } = renderWithProviders(<PromoFilm />);
      report(seen(), 0.8);
      playTo(container, 57.3);
      // with files loaded, axe would try to fetch the film itself to check its captions, and jsdom has no network
      expect(await axe(container, { preload: false })).toHaveNoViolations();
    });
  });

  it('is free of accessibility violations before it plays', async () => {
    const { container } = renderWithProviders(<PromoFilm />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
