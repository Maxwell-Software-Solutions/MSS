import { readFileSync } from 'fs';
import { join } from 'path';
import { render, screen, within } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import SecurityPage from './SecurityPage';
import { LanguageProvider } from '@/lib/LanguageContext';
import { COMPANY } from '@/lib/legal/company';
import { LEGAL_DOCS } from '@/lib/legal';

jest.mock('@/lib/LanguageContext');

expect.extend(toHaveNoViolations);

function renderPage(requestedLanguage?: 'en' | 'lt'): ReturnType<typeof render> {
  return render(
    <LanguageProvider>
      <SecurityPage requestedLanguage={requestedLanguage} />
    </LanguageProvider>,
  );
}

describe('Security page', () => {
  it('has proper heading hierarchy', () => {
    renderPage();
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Security');
    expect(screen.getAllByRole('heading', { level: 2 }).length).toBeGreaterThanOrEqual(7);
  });

  it('tells researchers how to report to the security address', () => {
    renderPage();
    const report = within(document.getElementById('report') as HTMLElement);
    expect(report.getByRole('link', { name: COMPANY.emails.security })).toHaveAttribute(
      'href',
      `mailto:${COMPANY.emails.security}`,
    );
    expect(report.getByRole('link', { name: 'security.txt' })).toHaveAttribute('href', '/.well-known/security.txt');
  });

  it('has scope, testing rules, what to expect and a safe harbour', () => {
    renderPage();
    for (const name of ['What is in scope', 'How to test safely', 'What to expect from us', 'Safe harbour for good-faith research']) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument();
    }
    const harbour = within(document.getElementById('safe-harbour') as HTMLElement);
    expect(harbour.getByText(/will not take legal action against you/)).toBeInTheDocument();
  });

  it('makes no certification, penetration-test or uptime claims, only says it has none', () => {
    const claims = /ISO ?27001|SOC ?2|penetration|pen-?test|uptime|99\.\d+ ?%/i;
    const denial = /do not|no penetration|neturime|neteigiame|neskelbiame/i;
    for (const doc of [LEGAL_DOCS.security.en, LEGAL_DOCS.security.lt]) {
      const paragraphs = doc.sections.flatMap((section) =>
        section.blocks.flatMap((block) => (block.kind === 'p' ? [block.text] : block.kind === 'ul' ? block.items : [])),
      );
      for (const text of paragraphs.filter((entry) => claims.test(entry))) {
        expect(text).toMatch(denial);
      }
    }
  });

  it('shows the Lithuanian text when the link asks for it', () => {
    renderPage('lt');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Saugumas');
    expect(screen.getByRole('heading', { name: 'Apsauga sąžiningiems tyrėjams' })).toBeInTheDocument();
  });

  it('has no accessibility violations in English', async () => {
    const { container } = renderPage();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no accessibility violations in Lithuanian', async () => {
    const { container } = renderPage('lt');
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe('/.well-known/security.txt (RFC 9116)', () => {
  const file = readFileSync(join(process.cwd(), 'public', '.well-known', 'security.txt'), 'utf8');
  const lines = file.split('\n').filter((line) => line.trim() !== '' && !line.startsWith('#'));
  const field = (name: string): string[] =>
    lines.filter((line) => line.toLowerCase().startsWith(`${name.toLowerCase()}:`)).map((line) => line.slice(name.length + 1).trim());

  it('is plain UTF-8 text that ends with a newline and uses only Field: value lines', () => {
    expect(file.endsWith('\n')).toBe(true);
    expect(file).not.toContain('\r\r');
    for (const line of lines) expect(line).toMatch(/^[A-Za-z-]+: \S/);
  });

  it('gives the security mailbox as the contact', () => {
    expect(field('Contact')).toContain(`mailto:${COMPANY.emails.security}`);
  });

  it('has an Expires date that is still ahead and less than a year away', () => {
    const [expires] = field('Expires');
    expect(expires).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/);
    const when = new Date(expires as string).getTime();
    const now = Date.now();
    // When this fails, renew the file: an expired security.txt is invalid.
    expect(when).toBeGreaterThan(now);
    expect(when - now).toBeLessThan(366 * 24 * 3600 * 1000);
  });

  it('lists English and Lithuanian, the canonical address and the policy', () => {
    expect(field('Preferred-Languages')).toEqual(['en, lt']);
    expect(field('Canonical')).toEqual([`${COMPANY.site}/.well-known/security.txt`]);
    expect(field('Policy')).toEqual([`${COMPANY.site}/security`]);
  });
});
