import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import TermsPage from './TermsPage';

expect.extend(toHaveNoViolations);

describe('Terms page', () => {
  it('renders the main heading', () => {
    render(<TermsPage />);
    expect(screen.getByRole('heading', { name: /terms of service/i })).toBeInTheDocument();
  });

  it('renders the placeholder content', () => {
    render(<TermsPage />);
    expect(screen.getByText(/Placeholder terms/i)).toBeInTheDocument();
    expect(screen.getByText(/Define scope of work, liability, and payment terms/i)).toBeInTheDocument();
  });

  it('has proper heading hierarchy', () => {
    render(<TermsPage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Terms of Service');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<TermsPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
