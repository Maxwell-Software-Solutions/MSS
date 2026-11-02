import { fireEvent, renderWithProviders, screen, waitFor } from '@/test/test-utils';
import { axe } from 'jest-axe';
import { BOOKING_URL } from '@/lib/booking';
import PromoFilm from './PromoFilm';

describe('PromoFilm', () => {
  // jsdom has no media playback: play and pause flip the paused flag and fire their events, as a browser does
  beforeEach(() => {
    const set = (video: HTMLMediaElement, paused: boolean): void => {
      Object.defineProperty(video, 'paused', { configurable: true, value: paused });
      video.dispatchEvent(new Event(paused ? 'pause' : 'play'));
    };
    jest.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(function (this: HTMLMediaElement) {
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
    expect(video).toHaveAttribute('playsinline');
    expect(video).toHaveAttribute('loop');
    expect(Array.from(container.querySelectorAll('track'), (track) => track.getAttribute('srclang'))).toEqual(['en', 'lt']);
    const frame = container.querySelector('.promo-film-frame');
    expect(frame).not.toHaveAttribute('data-armed');
    await waitFor(() => expect(frame).toHaveAttribute('data-armed'));
  });

  it('lets the visitor play, pause and turn the sound on', () => {
    renderWithProviders(<PromoFilm />);
    fireEvent.click(screen.getByRole('button', { name: 'Play film' }));
    fireEvent.click(screen.getByRole('button', { name: 'Pause film' }));
    expect(screen.getByRole('button', { name: 'Play film' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Turn sound on' }));
    expect(screen.getByRole('button', { name: 'Turn sound off' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pause film' })).toBeInTheDocument();
  });

  it('ends with the booking link', async () => {
    const { container } = renderWithProviders(<PromoFilm />);
    expect(screen.getByRole('heading', { level: 2, name: 'See AI at work' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Schedule a Call' })).toHaveAttribute('href', BOOKING_URL);
    expect(await axe(container)).toHaveNoViolations();
  });
});
