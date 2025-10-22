// Mock MUST be first, before ANY other imports
jest.mock('@/lib/LanguageContext');

import { screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import CaseStudiesIndex from './page';
import { renderWithProviders as render } from '@/test/test-utils';

expect.extend(toHaveNoViolations);

describe('Project Showcase page', () => {
  it('renders the main heading', () => {
    render(<CaseStudiesIndex />);
    expect(screen.getByRole('heading', { name: /case studies|atvejų studijos/i })).toBeInTheDocument();
  });

  it('renders the page description', () => {
    render(<CaseStudiesIndex />);
    expect(screen.getByText(/Selected results across industries|Pasirinkti rezultatai įvairiose pramonės šakose/i)).toBeInTheDocument();
    expect(screen.getByText(/Each study includes context, actions, and measurable outcomes|Kiekviena studija apima kontekstą, veiksmus ir išmatuojamus rezultatus/i)).toBeInTheDocument();
  });

  it('renders all case study links', () => {
    render(<CaseStudiesIndex />);
    expect(screen.getByRole('link', { name: /Retail platform|Mažmeninės prekybos platforma/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Fintech API/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /SaaS migration|SaaS migracija/i })).toBeInTheDocument();
  });

  it('renders case study summaries', () => {
    render(<CaseStudiesIndex />);
    expect(screen.getByText(/Stabilized CI|Stabilizuotas CI/i)).toBeInTheDocument();
    expect(screen.getByText(/Contract.*golden tests|Sutarčių.*auksiniai testai/i)).toBeInTheDocument();
    expect(screen.getByText(/Observability.*SLOs|Stebėsena.*SLO/i)).toBeInTheDocument();
  });

  it('renders case study metadata', () => {
    render(<CaseStudiesIndex />);
    expect(screen.getByText(/E‑commerce.*Node\/Next.*6 m/i)).toBeInTheDocument();
    expect(screen.getByText(/Fintech.*Go\/TypeScript.*3 m/i)).toBeInTheDocument();
    expect(screen.getByText(/B2B SaaS.*Kubernetes.*4 m/i)).toBeInTheDocument();
  });

  it('renders case study images with proper alt text', () => {
    render(<CaseStudiesIndex />);
    expect(screen.getByAltText(/Retail platform|Mažmeninės prekybos platforma/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Fintech API/i)).toBeInTheDocument();
    expect(screen.getByAltText(/SaaS migration|SaaS migracija/i)).toBeInTheDocument();
  });

  it('has proper heading hierarchy', () => {
    render(<CaseStudiesIndex />);
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveTextContent(/Case studies|Atvejų studijos/i);

    const caseStudyHeadings = screen.getAllByRole('heading', { level: 2 });
    expect(caseStudyHeadings).toHaveLength(3);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<CaseStudiesIndex />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
