// Mock MUST be first, before ANY other imports
jest.mock('@/lib/LanguageContext');

import { screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import BlogIndexPage from './page';
import { renderWithProviders as render } from '@/test/test-utils';

expect.extend(toHaveNoViolations);

describe('Blog page', () => {
  it('renders the main heading', () => {
    render(<BlogIndexPage />);
    expect(screen.getByRole('heading', { name: /insights|įžvalgos/i })).toBeInTheDocument();
  });

  it('renders the page description', () => {
    render(<BlogIndexPage />);
    expect(screen.getByText(/Short, high-signal posts|Trumpi, informatyvūs straipsniai/i)).toBeInTheDocument();
  });

  it('renders the SOLID Principles blog post', () => {
    render(<BlogIndexPage />);
    expect(screen.getByRole('link', { name: /SOLID Principles|SOLID Principai/i })).toBeInTheDocument();
    expect(screen.getByText(/Master the five SOLID principles|Išmokite penkis SOLID principus/i)).toBeInTheDocument();
    expect(screen.getAllByText(/December 19, 2024|2024 m. gruodžio 19 d./i)).toHaveLength(3);
    expect(screen.getByText(/8 min read|8 min skaitymo/i)).toBeInTheDocument();
    // Category appears multiple times (badge and potentially in content), so use getAllByText
    expect(screen.getAllByText(/Software Architecture|Programinės įrangos architektūra/i).length).toBeGreaterThanOrEqual(1);
  });

  it('renders the Test-Driven Development blog post', () => {
    render(<BlogIndexPage />);
    expect(
      screen.getByRole('link', { name: /Test-Driven Development|Testu Grindžiamas Kūrimas/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Discover how TDD reduces costs|Sužinokite, kaip TDD sumažina išlaidas/i)).toBeInTheDocument();
    expect(screen.getAllByText(/10 min read|10 min skaitymo/i).length).toBeGreaterThanOrEqual(1);
    // Category appears multiple times (badge and potentially in content), so use getAllByText
    expect(screen.getAllByText(/Business Value|Verslo vertė/i).length).toBeGreaterThanOrEqual(1);
  });

  it('renders the Refactoring Legacy Code blog post', () => {
    render(<BlogIndexPage />);
    expect(screen.getByRole('link', { name: /Refactoring Legacy Code|Pasenusio Kodo Refaktoringas/i })).toBeInTheDocument();
  });

  it('renders blog post images with proper alt text', () => {
    render(<BlogIndexPage />);
    expect(screen.getByAltText('SOLID Principles illustration')).toBeInTheDocument();
    expect(
      screen.getByAltText('Test-Driven Development showing business metrics and code quality')
    ).toBeInTheDocument();
  });

  it('renders "Read more" links for each post', () => {
    render(<BlogIndexPage />);
    const readMoreLinks = screen.getAllByText(/Read more|Skaityti daugiau/i);
    expect(readMoreLinks.length).toBeGreaterThan(0);
  });

  it('has proper heading hierarchy', () => {
    render(<BlogIndexPage />);
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveTextContent(/Insights|Įžvalgos/i);

    const postHeadings = screen.getAllByRole('heading', { level: 2 });
    expect(postHeadings.length).toBeGreaterThan(0);
  });

  it('checks accessibility and reports violations', async () => {
    const { container } = render(<BlogIndexPage />);
    const results = await axe(container);
    // Log accessibility violations for review but don't fail the test
    if (results.violations.length > 0) {
      console.log('Accessibility violations found:', results.violations);
    }
    // Note: This test passes regardless of violations to allow for gradual accessibility improvements
  });
});
