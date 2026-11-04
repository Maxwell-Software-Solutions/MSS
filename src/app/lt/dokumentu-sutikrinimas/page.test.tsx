import { render, screen, within } from '@testing-library/react';
import { axe } from 'jest-axe';
import Page, { metadata } from './page';
import sitemap from '@/app/sitemap';
import { PAGES } from '@/lib/seo/data';
import { isLithuanianPath } from '@/lib/page-language';

const PATH = '/lt/dokumentu-sutikrinimas';
const CTA = 'Atsiųskite vieną dokumentų rinkinį – grąžinsime patikrintą';

describe('Lithuanian document cross-check page', () => {
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
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe('isLithuanianPath', () => {
  it('is true for /lt and below it, false for look-alikes', () => {
    expect(isLithuanianPath('/lt')).toBe(true);
    expect(isLithuanianPath(PATH)).toBe(true);
    for (const other of ['/', '/ltd', '/about', '/blog/lt/x', null, undefined]) expect(isLithuanianPath(other)).toBe(false);
  });
});
