import { fireEvent, render, screen, within } from '@testing-library/react';
import { axe } from 'jest-axe';
import Page, { metadata } from './page';
import sitemap from '@/app/sitemap';
import { PAGES } from '@/lib/seo/data';
import { isLithuanianPath } from '@/lib/page-language';

const PATH = '/lt/sarasu-palyginimas';
const FIRST = 'Pirmas dokumentas (pvz., sąskaita)';
const SECOND = 'Antras dokumentas (pvz., važtaraštis)';

const paste = (label: string, text: string): void => {
  fireEvent.change(screen.getByLabelText(label), { target: { value: text } });
};

describe('Lithuanian list-compare page', () => {
  it('has its own /lt/ address, a self-referencing hreflang and the Lithuanian locale', () => {
    expect(isLithuanianPath(PATH)).toBe(true);
    expect(PAGES.listCompareLt?.canonical).toBe(PATH);
    expect(metadata.alternates?.canonical).toBe(PATH);
    expect(metadata.alternates?.languages).toEqual({ lt: PATH, 'x-default': PATH });
    expect(metadata.openGraph).toMatchObject({ locale: 'lt_LT', url: `https://www.maxwellsoftwaresolutions.com${PATH}` });
    expect(metadata.title).toEqual({ absolute: PAGES.listCompareLt?.title });
  });

  it('keeps title and description within search-result lengths', () => {
    expect(PAGES.listCompareLt!.title.length).toBeLessThanOrEqual(60);
    expect(PAGES.listCompareLt!.description.length).toBeLessThanOrEqual(160);
  });

  it('is in the sitemap', () => {
    const entry = sitemap().find((item) => item.url.endsWith(PATH));
    expect(entry).toBeDefined();
    expect(entry?.lastModified).toEqual(new Date('2026-11-06T00:00:00Z'));
  });

  it('shows two labelled boxes, the sample button and the privacy note, and no result before both lists are in', () => {
    render(<Page />);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toMatch(/nesutampa/);
    expect(screen.getByLabelText(FIRST)).toHaveValue('');
    expect(screen.getByLabelText(SECOND)).toHaveValue('');
    expect(screen.getByRole('button', { name: 'Įkelti pavyzdį' })).toBeInTheDocument();
    expect(screen.getByText('Duomenys apdorojami tik jūsų naršyklėje ir niekur nesiunčiami.')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
    paste(FIRST, 'PD-250;40');
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('fills both boxes with the sample and lists the mismatches first', () => {
    render(<Page />);
    fireEvent.click(screen.getByRole('button', { name: 'Įkelti pavyzdį' }));
    expect((screen.getByLabelText(FIRST) as HTMLTextAreaElement).value).toContain('ST-30-1000;80');
    expect((screen.getByLabelText(SECOND) as HTMLTextAreaElement).value).toContain('GU-6205;280');

    expect(screen.getByRole('status')).toHaveTextContent('2 iš 5 eilučių nesutampa');
    const rows = within(screen.getByRole('table')).getAllByRole('row').slice(1);
    expect(rows).toHaveLength(5);
    expect(rows[0]).toHaveTextContent('GU-6205');
    expect(rows[0]).toHaveTextContent('300');
    expect(rows[0]).toHaveTextContent('280');
    expect(rows[0]).toHaveTextContent('Skiriasi kiekis (skirtumas 20)');
    expect(rows[1]).toHaveTextContent('ST-30-1000');
    expect(rows[1]).toHaveTextContent('Tik pirmame dokumente');
    for (const row of rows.slice(2)) expect(row).toHaveTextContent('Sutampa');
  });

  it('compares what the visitor pastes, in any separator and number format', () => {
    render(<Page />);
    paste(FIRST, 'AB-1\t1 240,50\nAB-2\t5');
    paste(SECOND, 'AB-1;  1240.5\nAB-3  7');
    expect(screen.getByRole('status')).toHaveTextContent('2 iš 3 eilučių nesutampa');
    expect(screen.getByText('Tik antrame dokumente')).toBeInTheDocument();
    expect(screen.getByText('Tik pirmame dokumente')).toBeInTheDocument();
    expect(screen.getByText('Sutampa')).toBeInTheDocument();
  });

  it('offers a column picker only when detection is a guess, and the choice changes the result', () => {
    render(<Page />);
    paste(FIRST, 'AB-1;40;12,5;500\nAB-2;300;2;600');
    paste(SECOND, 'AB-1;40\nAB-2;300');
    expect(screen.getByRole('status')).toHaveTextContent('2 iš 2 eilučių nesutampa');

    const group = screen.getByRole('group', { name: 'Pirmo dokumento stulpeliai' });
    expect(screen.queryByRole('group', { name: 'Antro dokumento stulpeliai' })).not.toBeInTheDocument();
    fireEvent.change(within(group).getByLabelText('Kiekio stulpelis'), { target: { value: '1' } });
    expect(screen.getByRole('status')).toHaveTextContent('0 iš 2 eilučių nesutampa');
  });

  it('says so when no code and quantity can be found', () => {
    render(<Page />);
    paste(FIRST, 'nieko tinkamo');
    paste(SECOND, 'taip pat nieko');
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
    expect(screen.getByText(/Nepavyko rasti kodų ir kiekių/)).toBeInTheDocument();
  });

  it('points to the document-check page, with the offer text', () => {
    render(<Page />);
    expect(document.body.textContent).toContain(
      'Sudėtingesniems dokumentams (PDF, skenuoti, užsienio kalbomis) – DI agentas su žmogaus patvirtinimu. Pirmą rinkinį patikriname nemokamai.',
    );
    expect(screen.getByRole('link', { name: /Dokumentų sutikrinimas su DI agentu/ })).toHaveAttribute('href', '/lt/dokumentu-sutikrinimas');
  });

  it('carries no price, client name or em dash, and sends nothing anywhere', () => {
    const fetchSpy = jest.fn();
    const original = global.fetch;
    global.fetch = fetchSpy;
    const { container } = render(<Page />);
    fireEvent.click(screen.getByRole('button', { name: 'Įkelti pavyzdį' }));
    global.fetch = original;
    const copy = container.cloneNode(true) as HTMLElement;
    copy.querySelectorAll('script').forEach((node) => node.remove());
    const text = copy.textContent ?? '';
    expect(text).not.toMatch(/[€$£%—]|\bEUR\b|\bEur\b/);
    expect(text).not.toMatch(/Irwin|Sage|Ethisys/i);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('has no accessibility violations, empty, with the sample and with the column picker', async () => {
    const { container } = render(<Page />);
    expect(await axe(container)).toHaveNoViolations();
    fireEvent.click(screen.getByRole('button', { name: 'Įkelti pavyzdį' }));
    expect(await axe(container)).toHaveNoViolations();
    paste(FIRST, 'AB-1;40;12,5;500\nAB-2;300;2;600');
    expect(screen.getByRole('group', { name: 'Pirmo dokumento stulpeliai' })).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });
});
