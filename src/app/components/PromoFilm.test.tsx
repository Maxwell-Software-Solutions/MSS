import { act, fireEvent, renderWithProviders, screen, waitFor } from '@/test/test-utils';
import { axe } from 'jest-axe';
import { BOOKING_URL } from '@/lib/booking';
import * as LanguageContext from '@/lib/LanguageContext';
import PromoFilm from './PromoFilm';

interface Watcher {
  callback: IntersectionObserverCallback;
  options: IntersectionObserverInit | undefined;
}

describe('PromoFilm', () => {
  let watchers: Watcher[];
  let upright: boolean;
  let turned: Array<() => void>;
  let load: jest.SpyInstance;
  let play: jest.SpyInstance;

  // the observer that starts and stops the film (thresholds), and the one that brings it in once its runway is in view
  const seen = (): Watcher => watchers.find((item) => Array.isArray(item.options?.threshold)) as Watcher;
  const near = (): Watcher => watchers.find((item) => !item.options) as Watcher;
  const report = (watcher: Watcher, ratio: number): void => {
    const entry = { isIntersecting: ratio > 0, intersectionRatio: ratio } as IntersectionObserverEntry;
    act(() => watcher.callback([entry], {} as IntersectionObserver));
  };
  const sourcesOf = (container: HTMLElement): string[] => Array.from(container.querySelectorAll('video source'), (node) => node.getAttribute('src') ?? '');

  // jsdom has no media playback: play and pause flip the paused flag and fire their events, as a browser does
  beforeEach(() => {
    watchers = [];
    upright = false;
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
    expect(video).toHaveAttribute('loop');
    expect(Array.from(container.querySelectorAll('track'), (track) => track.getAttribute('srclang'))).toEqual(['en', 'lt']);
    const frame = container.querySelector('.promo-film-frame');
    expect(frame).not.toHaveAttribute('data-armed');
    await waitFor(() => expect(frame).toHaveAttribute('data-armed'));
    expect(load).not.toHaveBeenCalled();
  });

  it('pins a stage under the heading and the card, with the film inside the card', () => {
    const { container } = renderWithProviders(<PromoFilm />);
    const track = container.querySelector('.promo-film-track');
    expect(track?.querySelector('.promo-film-stage .promo-film-view .promo-film-card .promo-film-frame video')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'See AI at work' })).toBeInTheDocument();
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

  it('ends with the booking link', async () => {
    const { container } = renderWithProviders(<PromoFilm />);
    expect(screen.getByRole('link', { name: 'Schedule a Call' })).toHaveAttribute('href', BOOKING_URL);
    expect(await axe(container)).toHaveNoViolations();
  });
});
