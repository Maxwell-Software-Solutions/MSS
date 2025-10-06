import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ContactPage from './ContactPage';

expect.extend(toHaveNoViolations);

describe('Contact page', () => {
  it('renders the main heading', () => {
    render(<ContactPage />);
    expect(screen.getByRole('heading', { name: /contact/i })).toBeInTheDocument();
  });

  it('renders the contact description', () => {
    render(<ContactPage />);
    expect(screen.getByText(/Tell us about your project goals, stack, and timeline/i)).toBeInTheDocument();
    expect(screen.getByText(/We typically reply within one business day/i)).toBeInTheDocument();
  });

  it('renders the scheduling information', () => {
    render(<ContactPage />);
    expect(screen.getByText(/Prefer a call\? Add your scheduling link here/i)).toBeInTheDocument();
  });

  it('has proper heading hierarchy', () => {
    render(<ContactPage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Contact');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<ContactPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
