import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { CONTACT_EMAIL, CONTACT_PHONE } from '../contact/contact.constants';
import SiteFooter from './AppFooter';

expect.extend(toHaveNoViolations);

describe('AppFooter component', () => {
  it('renders the footer element', () => {
    render(<SiteFooter />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders the logo and strapline', () => {
    render(<SiteFooter />);
    const logo = screen.getByAltText('Maxwell Software Solutions');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/logo-simple.svg');
    expect(screen.getByText(/crafting reliable software/i)).toBeInTheDocument();
  });

  it('displays contact information', () => {
    render(<SiteFooter />);
    const emailLink = screen.getByRole('link', { name: CONTACT_EMAIL });
    expect(emailLink).toHaveAttribute('href', `mailto:${CONTACT_EMAIL}`);

    const phoneLink = screen.getByRole('link', { name: CONTACT_PHONE });
    expect(phoneLink).toHaveAttribute('href', expect.stringContaining('tel:'));
  });

  it('renders primary navigation links', () => {
    render(<SiteFooter />);
    expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /project showcase/i })).toBeInTheDocument();
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
});
