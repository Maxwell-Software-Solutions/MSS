import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import PlaybookPage from './PlaybookPage';

expect.extend(toHaveNoViolations);

describe('Development Guide page', () => {
  it('renders the main heading', () => {
    render(<PlaybookPage />);
    expect(screen.getByRole('heading', { name: /reliability playbook/i })).toBeInTheDocument();
  });

  it('renders the page description', () => {
    render(<PlaybookPage />);
    expect(screen.getByText(/A practical collection of checklists and templates/i)).toBeInTheDocument();
    expect(screen.getByText(/code review, test pyramid, SLOs, and incident response/i)).toBeInTheDocument();
  });

  it('renders the call-to-action button', () => {
    render(<PlaybookPage />);
    const ctaButton = screen.getByRole('link', { name: /get the pdf/i });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute('href', '/contact');
  });

  it('has proper heading hierarchy', () => {
    render(<PlaybookPage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Reliability Playbook');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<PlaybookPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
