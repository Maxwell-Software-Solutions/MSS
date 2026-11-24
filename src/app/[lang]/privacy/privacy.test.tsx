import { render, screen, within } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import PrivacyPage from './PrivacyPage';
import { LanguageProvider } from '@/lib/LanguageContext';
import { COMPANY, VDAI } from '@/lib/legal/company';

jest.mock('@/lib/LanguageContext');

expect.extend(toHaveNoViolations);

function renderPage(requestedLanguage?: 'en' | 'lt'): ReturnType<typeof render> {
  return render(
    <LanguageProvider>
      <PrivacyPage requestedLanguage={requestedLanguage} />
    </LanguageProvider>,
  );
}

describe('Privacy page', () => {
  it('renders the main heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /privacy policy/i, level: 1 })).toBeInTheDocument();
  });

  it('has proper heading hierarchy', () => {
    renderPage();
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Privacy Policy');
    const h2 = screen.getAllByRole('heading', { level: 2 });
    expect(h2.length).toBeGreaterThanOrEqual(10);
  });

  it('names the controller with company code, seat and a working privacy address', () => {
    renderPage();
    const controller = document.getElementById('controller');
    expect(controller).not.toBeNull();
    const section = within(controller as HTMLElement);
    expect(section.getByText(new RegExp(COMPANY.code))).toBeInTheDocument();
    expect(section.getByText(new RegExp(COMPANY.street.replace('.', '\\.')))).toBeInTheDocument();
    expect(section.getAllByRole('link', { name: COMPANY.emails.privacy })[0]).toHaveAttribute(
      'href',
      `mailto:${COMPANY.emails.privacy}`,
    );
  });

  it('has a separate section on the right to object to marketing, and the B2B notice it points to', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Your right to object to marketing' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'If we contact your company' })).toBeInTheDocument();
    const b2b = within(document.getElementById('b2b') as HTMLElement);
    expect(b2b.getByText(/12 months after our last contact/i)).toBeInTheDocument();
    expect(b2b.getAllByText(/Register of Legal Entities/i).length).toBeGreaterThan(0);
  });

  it('names the processors found in the site code', () => {
    renderPage();
    const recipients = within(document.getElementById('recipients') as HTMLElement);
    for (const name of [/Vercel Inc\./, /Google Cloud EMEA/, /Google Ireland Limited/, /Usercentrics A\/S/, /Formspree, Inc\./]) {
      expect(recipients.getAllByText(name).length).toBeGreaterThan(0);
    }
  });

  it('links the supervisory authority and its address', () => {
    renderPage();
    const complaints = within(document.getElementById('complaints') as HTMLElement);
    expect(complaints.getByText(/Valstybinė duomenų apsaugos inspekcija/)).toBeInTheDocument();
    expect(complaints.getByRole('link', { name: VDAI.email })).toHaveAttribute('href', `mailto:${VDAI.email}`);
  });

  it('lists the cookies the site sets and offers cookie settings', () => {
    renderPage();
    const cookies = within(document.getElementById('cookies') as HTMLElement);
    expect(cookies.getAllByText('language').length).toBeGreaterThan(0);
    expect(cookies.getAllByText('CookieConsent').length).toBeGreaterThan(0);
    expect(cookies.getByRole('button', { name: 'Cookie settings' })).toBeInTheDocument();
  });

  it('shows the Lithuanian text when the link asks for it, and marks its language', () => {
    renderPage('lt');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Privatumo politika');
    expect(screen.getByRole('heading', { name: 'Jūsų teisė nesutikti su rinkodara' })).toBeInTheDocument();
    expect(document.querySelector('[lang="lt"]')).not.toBeNull();
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
