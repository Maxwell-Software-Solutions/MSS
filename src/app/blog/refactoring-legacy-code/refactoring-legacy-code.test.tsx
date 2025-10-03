import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import RefactoringLegacyCodePost from './RefactoringLegacyCodePost';

expect.extend(toHaveNoViolations);

describe('Refactoring Legacy Code blog post', () => {
  it('renders the main heading', () => {
    render(<RefactoringLegacyCodePost />);
    expect(
      screen.getByRole('heading', {
        name: /Refactoring Legacy Code: Complete Guide to Modernizing Your Software Architecture/i,
      })
    ).toBeInTheDocument();
  });

  it('renders the navigation back link', () => {
    render(<RefactoringLegacyCodePost />);
    const backLink = screen.getByRole('link', { name: /← Back to Insights/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/blog');
  });

  it('renders the post metadata', () => {
    render(<RefactoringLegacyCodePost />);
    expect(screen.getByText('December 19, 2024')).toBeInTheDocument();
    expect(screen.getByText('12 min read')).toBeInTheDocument();
    expect(screen.getByText('Software Modernization')).toBeInTheDocument();
  });

  it('renders the hero image with proper alt text', () => {
    render(<RefactoringLegacyCodePost />);
    const heroImage = screen.getByAltText(
      'Legacy code refactoring showing transformation from old to new architecture'
    );
    expect(heroImage).toBeInTheDocument();
  });

  it('renders the table of contents section', () => {
    render(<RefactoringLegacyCodePost />);
    expect(screen.getByRole('heading', { name: /Table of Contents/i })).toBeInTheDocument();
  });

  it('renders table of contents links', () => {
    render(<RefactoringLegacyCodePost />);
    expect(screen.getByRole('link', { name: /• What is Legacy Code\?/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /• Understanding Technical Debt/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /• Refactoring Strategies/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /• Step-by-Step Process/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /• Tools and Techniques/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /• Common Pitfalls/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /• Measuring Success/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /• Real-World Case Studies/i })).toBeInTheDocument();
  });

  it('renders the introduction section', () => {
    render(<RefactoringLegacyCodePost />);
    expect(screen.getByRole('heading', { name: /What is Legacy Code and Why Should You Care\?/i })).toBeInTheDocument();
  });

  it('has proper heading hierarchy', () => {
    render(<RefactoringLegacyCodePost />);
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveTextContent(
      'Refactoring Legacy Code: Complete Guide to Modernizing Your Software Architecture'
    );

    const sectionHeadings = screen.getAllByRole('heading', { level: 2 });
    expect(sectionHeadings.length).toBeGreaterThan(0);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<RefactoringLegacyCodePost />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
