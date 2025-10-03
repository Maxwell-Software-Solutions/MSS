import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import PrivacyPage from './PrivacyPage';

expect.extend(toHaveNoViolations);

describe('Privacy page', () => {
  it('renders the main heading', () => {
    render(<PrivacyPage />);
    expect(screen.getByRole('heading', { name: /privacy policy/i })).toBeInTheDocument();
  });

  it('renders the placeholder content', () => {
    render(<PrivacyPage />);
    expect(screen.getByText(/Placeholder privacy policy/i)).toBeInTheDocument();
    expect(screen.getByText(/Add your data handling details here/i)).toBeInTheDocument();
  });

  it('has proper heading hierarchy', () => {
    render(<PrivacyPage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Privacy Policy');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<PrivacyPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
