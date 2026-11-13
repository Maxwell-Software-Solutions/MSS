import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { axe } from 'jest-axe';
import Page, { metadata } from './page';
import sitemap from '@/app/sitemap';
import { PAGES } from '@/lib/seo/data';
import { isLithuanianPath } from '@/lib/page-language';

const PATH = '/lt/dokumentu-sutikrinimas';
const CTA = 'Atsiųskite vieną dokumentų rinkinį – gausite rašytinį sprendimo aprašą';

describe('Lithuanian document cross-check page', () => {
  // jsdom cannot play media; the hero clip calls play() when it mounts
  beforeEach(() => {
    window.HTMLMediaElement.prototype.play = jest.fn().mockResolvedValue(undefined);
    window.HTMLMediaElement.prototype.pause = jest.fn();
  });

  it('has its own /lt/ address, a self-referencing hreflang and the Lithuanian locale', () => {
    expect(PAGES.documentCrossCheckLt?.canonical).toBe(PATH);
    expect(metadata.alternates?.canonical).toBe(PATH);
    expect(metadata.alternates?.languages).toEqual({ lt: PATH, 'x-default': PATH });
    expect(metadata.openGraph).toMatchObject({ locale: 'lt_LT', url: `https://www.maxwellsoftwaresolutions.com${PATH}` });
    expect(metadata.title).toEqual({ absolute: PAGES.documentCrossCheckLt?.title });
  });

  it('keeps title and description within search-result lengths', () => {
    expect(PAGES.documentCrossCheckLt!.title.length).toBeLessThanOrEqual(60);
    expect(PAGES.documentCrossCheckLt!.description.length).toBeLessThanOrEqual(160);
  });

  it('is in the sitemap', () => {
    const entry = sitemap().find((item) => item.url.endsWith(PATH));
    expect(entry).toBeDefined();
    expect(entry?.lastModified).toEqual(new Date('2026-11-04T00:00:00Z'));
  });

  it('leads with mismatched documents, three examples and a person approving every line', () => {
    render(<Page />);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toMatch(/nesutapimus/);
    const examples = screen.getAllByRole('article');
    expect(examples).toHaveLength(3);
    expect(within(examples[0]!).getByRole('heading', { name: 'Siuntos rinkinys' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Brėžinys ir detalių sąrašas' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Sertifikatai' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Kiekvieną eilutę tvirtina žmogus' })).toBeInTheDocument();
    expect(document.body.textContent).toMatch(/nuotoliu/);
    expect(document.body.textContent).toMatch(/nemokamai/);
  });

  it('offers the send-a-set mailto and the /book link, twice each', () => {
    render(<Page />);
    const send = screen.getAllByRole('link', { name: CTA });
    expect(send).toHaveLength(2);
    for (const link of send) {
      const href = link.getAttribute('href') ?? '';
      expect(href.startsWith('mailto:mantas@maxwellsoftwaresolutions.com?subject=')).toBe(true);
    }
    const book = screen.getAllByRole('link', { name: /30 min\. pokalbį/ });
    expect(book).toHaveLength(2);
    for (const link of book) expect(link).toHaveAttribute('href', '/book');
  });

  it('carries no price, client name or figure', () => {
    const { container } = render(<Page />);
    const copy = container.cloneNode(true) as HTMLElement;
    copy.querySelectorAll('script, .step-index').forEach((node) => node.remove());
    // The only number left in the text is the length of the booked call
    const text = (copy.textContent ?? '').replaceAll('30 min.', '');
    expect(text).not.toMatch(/[€$£%]|\bEUR\b|\bEur\b|\d/);
    expect(text).not.toMatch(/Irwin|Sage|Ethisys/i);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Page />);
    // No preload: axe would wait for the clip and poster to download, which jsdom never does
    expect(await axe(container, { preload: false })).toHaveNoViolations();
  });
});

describe('demo clip in the hero', () => {
  const play = jest.fn().mockResolvedValue(undefined);
  const pause = jest.fn();
  const original = window.matchMedia;

  const prefersReducedMotion = (reduced: boolean): void => {
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: reduced,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })) as unknown as typeof window.matchMedia;
  };

  beforeEach(() => {
    play.mockClear();
    pause.mockClear();
    window.HTMLMediaElement.prototype.play = play;
    window.HTMLMediaElement.prototype.pause = pause;
  });
  afterEach(() => {
    window.matchMedia = original;
  });

  it('is a muted, looping, inline video with a poster and the Lithuanian caption', () => {
    prefersReducedMotion(false);
    const { container } = render(<Page />);
    const video = container.querySelector('video')!;
    expect(video.muted).toBe(true);
    expect(video.loop).toBe(true);
    expect(video.hasAttribute('playsinline')).toBe(true);
    expect(video.getAttribute('src')).toBe('/video/mss-shipment-check-1080x1080.mp4');
    expect(video.getAttribute('poster')).toBe('/video/mss-shipment-check-poster.webp');
    expect(screen.getByText('Tikras paleidimas: trys dokumentai, viena neatitiktis')).toBeInTheDocument();
  });

  it('starts by itself when motion is allowed, and the picture pauses it', async () => {
    prefersReducedMotion(false);
    render(<Page />);
    await waitFor(() => expect(play).toHaveBeenCalledTimes(1));
    const button = screen.getByRole('button', { name: 'Pristabdyti vaizdo įrašą' });
    Object.defineProperty(HTMLMediaElement.prototype, 'paused', { configurable: true, get: () => false });
    fireEvent.click(button);
    expect(pause).toHaveBeenCalledTimes(1);
  });

  it('shows the poster with a play button and does not autoplay under reduced motion', async () => {
    prefersReducedMotion(true);
    render(<Page />);
    const button = await screen.findByRole('button', { name: 'Paleisti vaizdo įrašą' });
    expect(play).not.toHaveBeenCalled();
    Object.defineProperty(HTMLMediaElement.prototype, 'paused', { configurable: true, get: () => true });
    fireEvent.click(button);
    expect(play).toHaveBeenCalledTimes(1);
  });
});

describe('isLithuanianPath', () => {
  it('is true for /lt and below it, false for look-alikes', () => {
    expect(isLithuanianPath('/lt')).toBe(true);
    expect(isLithuanianPath(PATH)).toBe(true);
    for (const other of ['/', '/ltd', '/about', '/blog/lt/x', null, undefined]) expect(isLithuanianPath(other)).toBe(false);
  });
});
