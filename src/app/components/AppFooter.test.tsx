import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import SiteFooter from './AppFooter';

expect.extend(toHaveNoViolations);

describe('AppFooter component', () => {
  it('renders the footer element', () => {
    render(<SiteFooter />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders the logo with proper alt text', () => {
    render(<SiteFooter />);
    const logo = screen.getByAltText('Maxwell Software Solutions');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/logo-simple.svg');
  });

  it('renders the copyright year', () => {
    render(<SiteFooter />);
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(`© ${currentYear}`)).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(<SiteFooter />);
    const privacyLink = screen.getByRole('link', { name: /privacy/i });
    const termsLink = screen.getByRole('link', { name: /terms/i });
    const securityLink = screen.getByRole('link', { name: /security/i });

    expect(privacyLink).toBeInTheDocument();
    expect(termsLink).toBeInTheDocument();
    expect(securityLink).toBeInTheDocument();

    expect(privacyLink).toHaveAttribute('href', '/privacy');
    expect(termsLink).toHaveAttribute('href', '/terms');
    expect(securityLink).toHaveAttribute('href', '/security');
  });

  it('has proper semantic structure', () => {
    render(<SiteFooter />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<SiteFooter />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
