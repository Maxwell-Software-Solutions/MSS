import { render, screen, within } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import TermsPage from './TermsPage';
import { LanguageProvider } from '@/lib/LanguageContext';
import { COMPANY } from '@/lib/legal/company';

jest.mock('@/lib/LanguageContext');

expect.extend(toHaveNoViolations);

function renderPage(requestedLanguage?: 'en' | 'lt'): ReturnType<typeof render> {
  return render(
    <LanguageProvider>
      <TermsPage requestedLanguage={requestedLanguage} />
    </LanguageProvider>,
  );
}

describe('Terms page', () => {
  it('renders the main heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /terms of use/i, level: 1 })).toBeInTheDocument();
  });

  it('has proper heading hierarchy', () => {
    renderPage();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Terms of Use');
    expect(screen.getAllByRole('heading', { level: 2 }).length).toBeGreaterThanOrEqual(10);
  });

  it('shows who the provider is: name, code, register, seat, e-mail and VAT status', () => {
    renderPage();
    const provider = within(document.getElementById('provider') as HTMLElement);
    expect(provider.getByText(new RegExp(COMPANY.registerName))).toBeInTheDocument();
    expect(provider.getByText(COMPANY.code)).toBeInTheDocument();
    expect(provider.getByText(/Register of Legal Entities/)).toBeInTheDocument();
    expect(provider.getByText(new RegExp(COMPANY.street.replace('.', '\\.')))).toBeInTheDocument();
    expect(provider.getByRole('link', { name: COMPANY.emails.general })).toHaveAttribute(
      'href',
      `mailto:${COMPANY.emails.general}`,
    );
    expect(provider.getAllByText(/not a VAT payer/i).length).toBeGreaterThan(0);
  });

  it('says project work runs under separate written agreements', () => {
    renderPage();
    expect(screen.getAllByText(/separate written agreements/i).length).toBeGreaterThan(0);
  });

  it('keeps liability limits inside what Lithuanian law allows', () => {
    renderPage();
    const liability = within(document.getElementById('liability') as HTMLElement);
    expect(liability.getByText(/Article 6\.252/)).toBeInTheDocument();
    expect(liability.getByText(/limited to EUR 100/)).toBeInTheDocument();
  });

  it('chooses Lithuanian law and the courts of the Republic of Lithuania', () => {
    renderPage();
    const law = within(document.getElementById('law') as HTMLElement);
    expect(law.getByText(/governed by the law of the Republic of Lithuania/)).toBeInTheDocument();
    expect(law.getByText(/courts of the Republic of Lithuania have jurisdiction/)).toBeInTheDocument();
  });

  it('links to the privacy policy and the security page', () => {
    renderPage();
    const privacy = within(document.getElementById('privacy') as HTMLElement);
    expect(privacy.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/privacy');
    expect(privacy.getByRole('link', { name: 'Security page' })).toHaveAttribute('href', '/security');
  });

  it('shows the Lithuanian text when the link asks for it', () => {
    renderPage('lt');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Svetainės naudojimo sąlygos');
    expect(screen.getByRole('heading', { name: 'Taikytina teisė ir ginčai' })).toBeInTheDocument();
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
