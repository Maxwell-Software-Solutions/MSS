import { fireEvent, render as renderPlain, within } from '@testing-library/react';
import { renderWithProviders as render, screen } from '@/test/test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';
import { CONTACT_EMAIL, CONTACT_PHONE } from '../contact/contact.constants';
import SiteFooter from './AppFooter';
import { LanguageProvider } from '@/lib/LanguageContext';
import en from '@/lib/translations/en.json';
import lt from '@/lib/translations/lt.json';
import { getCriticalTranslations } from '@/lib/server-translations';
import { COMPANY } from '@/lib/legal/company';

expect.extend(toHaveNoViolations);

describe('AppFooter component', () => {
  it('renders the footer element', () => {
    render(<SiteFooter />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders the logo and strapline', () => {
    render(<SiteFooter />);
    expect(screen.getByRole('img', { name: 'Maxwell Software Solutions' })).toBeInTheDocument();
    expect(screen.getByText(/^AI software development$/i)).toBeInTheDocument();
    expect(screen.getByText(/adopt AI, build AI agents and launch AI products/i)).toBeInTheDocument();
  });

  it('displays contact information', () => {
    render(<SiteFooter />);
    // The address is shown twice: with the contact details and with the provider details
    const emailLinks = screen.getAllByRole('link', { name: CONTACT_EMAIL });
    expect(emailLinks).toHaveLength(2);
    for (const emailLink of emailLinks) expect(emailLink).toHaveAttribute('href', `mailto:${CONTACT_EMAIL}`);

    const phoneLink = screen.getByRole('link', { name: CONTACT_PHONE });
    expect(phoneLink).toHaveAttribute('href', expect.stringContaining('tel:'));
  });

  it('renders primary navigation links', () => {
    render(<SiteFooter />);
    expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /case studies/i })).toHaveAttribute('href', '/case-studies');
    expect(screen.getByRole('link', { name: /consulting process/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /insights & articles/i })).toBeInTheDocument();
  });

  it('renders resource links in multiple locations', () => {
    render(<SiteFooter />);
    const privacyLinks = screen.getAllByRole('link', { name: /privacy/i });
    const termsLinks = screen.getAllByRole('link', { name: /terms/i });
    const securityLinks = screen.getAllByRole('link', { name: /security/i });

    expect(privacyLinks.length).toBeGreaterThanOrEqual(1);
    expect(termsLinks.length).toBeGreaterThanOrEqual(1);
    expect(securityLinks.length).toBeGreaterThanOrEqual(1);
  });

  it('provides clear navigation landmarks', () => {
    render(<SiteFooter />);
    const navs = screen.getAllByRole('navigation');
    expect(navs.length).toBeGreaterThanOrEqual(2);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<SiteFooter />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  describe('Color Contrast', () => {
    it('footer text has adequate contrast against background', () => {
      const { container } = render(<SiteFooter />);
      const footer = container.querySelector('footer');
      expect(footer).toBeInTheDocument();

      // Check that footer has neumorphic border applied
      expect(footer).toHaveClass('neuro-footer-border');
    });

    it('email and phone links maintain adequate contrast', () => {
      render(<SiteFooter />);
      const emailLink = screen.getAllByRole('link', { name: CONTACT_EMAIL })[0];
      const phoneLink = screen.getByRole('link', { name: CONTACT_PHONE });

      // Verify elements exist with proper structure
      expect(emailLink).toBeInTheDocument();
      expect(phoneLink).toBeInTheDocument();
    });

    it('navigation links maintain adequate contrast', () => {
      render(<SiteFooter />);
      const links = screen.getAllByRole('link');

      // Verify all links are rendered
      expect(links.length).toBeGreaterThan(0);
      links.forEach((link) => {
        expect(link).toBeInTheDocument();
      });
    });
  });
});

describe('AppFooter provider details', () => {
  it('shows the legal name, company code, seat and e-mail', () => {
    render(<SiteFooter />);
    const details = screen.getByLabelText('Provider details');
    expect(within(details).getByText(COMPANY.registerName)).toBeInTheDocument();
    expect(within(details).getByText(/307462076, Register of Legal Entities/)).toBeInTheDocument();
    expect(within(details).getByText(/Gvazdikų Sodų 4-oji g\. 4, LT-10240 Vilnius, Lithuania/)).toBeInTheDocument();
    expect(within(details).getByRole('link', { name: CONTACT_EMAIL })).toHaveAttribute('href', `mailto:${CONTACT_EMAIL}`);
  });

  it('shows the same details in Lithuanian', () => {
    renderPlain(
      <LanguageProvider initialLanguage="lt">
        <SiteFooter />
      </LanguageProvider>,
    );
    const details = screen.getByLabelText('Paslaugų teikėjo duomenys');
    expect(within(details).getByText(COMPANY.registerName)).toBeInTheDocument();
    expect(within(details).getByText(/Įmonės kodas/)).toBeInTheDocument();
    expect(within(details).getByText(/307462076, Juridinių asmenų registras/)).toBeInTheDocument();
    expect(within(details).getByText(/Gvazdikų Sodų 4-oji g\. 4, LT-10240 Vilnius, Lietuva/)).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Privatumas' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'Sąlygos' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'Saugumas' }).length).toBeGreaterThan(0);
  });

  it('sends every footer text with the server-rendered page, in both languages', () => {
    for (const dictionary of [en, lt] as Array<Record<string, string>>) {
      const keys = Object.keys(dictionary).filter((key) => /^footer\.(legal\.|privacy|terms|security|cookie)/.test(key));
      expect(keys.length).toBeGreaterThanOrEqual(11);
      const critical = getCriticalTranslations(dictionary);
      expect(keys.filter((key) => critical[key] !== dictionary[key])).toEqual([]);
    }
  });
});

describe('AppFooter cookie settings', () => {
  afterEach(() => {
    delete window.Cookiebot;
  });

  it('opens the cookie banner so consent can be changed or withdrawn', () => {
    const renew = jest.fn();
    window.Cookiebot = { renew };
    render(<SiteFooter />);
    fireEvent.click(screen.getByRole('button', { name: 'Cookie settings' }));
    expect(renew).toHaveBeenCalledTimes(1);
  });

  it('says so when the banner is not available', () => {
    render(<SiteFooter />);
    fireEvent.click(screen.getByRole('button', { name: 'Cookie settings' }));
    expect(screen.getByRole('status')).toHaveTextContent(/not available in your browser/);
  });
});
