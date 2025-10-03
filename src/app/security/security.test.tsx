import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import SecurityPage from './SecurityPage';

expect.extend(toHaveNoViolations);

describe('Security page', () => {
  it('renders the main heading', () => {
    render(<SecurityPage />);
    expect(screen.getByRole('heading', { name: /security/i })).toBeInTheDocument();
  });

  it('renders the security description', () => {
    render(<SecurityPage />);
    expect(screen.getByText(/Outline data handling practices/i)).toBeInTheDocument();
    expect(screen.getByText(/access controls, and responsible disclosure policy/i)).toBeInTheDocument();
  });

  it('has proper heading hierarchy', () => {
    render(<SecurityPage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Security');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<SecurityPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
