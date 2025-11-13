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
    expect(
      screen.getByText(/Selected results across industries|Pasirinkti rezultatai įvairiose pramonės šakose/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Each study includes context, actions, and measurable outcomes|Kiekviena studija apima kontekstą, veiksmus ir išmatuojamus rezultatus/i
      )
    ).toBeInTheDocument();
  });

  it('renders all case study links', () => {
    render(<CaseStudiesIndex />);
    expect(screen.getByRole('link', { name: /Retail platform|Mažmeninės prekybos platforma/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Fintech API/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /SaaS migration|SaaS migracija/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Healthcare platform|Sveikatos priežiūros platforma/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /EdTech startup|EdTech startuolis/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /IoT platform|IoT platforma/i })).toBeInTheDocument();
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
    expect(screen.getByText(/Healthcare.*Python\/Django.*5 m/i)).toBeInTheDocument();
    expect(screen.getByText(/Education.*React\/Node.*3 m/i)).toBeInTheDocument();
    expect(screen.getByText(/Manufacturing.*Go\/Kafka.*4 m/i)).toBeInTheDocument();
  });

  it('renders case study cards with proper aria labels', () => {
    render(<CaseStudiesIndex />);
    // Images now have empty alt with role="presentation", check aria-label on links instead
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThanOrEqual(6);

    // Check that links have descriptive aria-labels
    expect(screen.getByLabelText(/View case study:.*Retail platform/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/View case study:.*Fintech API/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/View case study:.*SaaS migration/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/View case study:.*Healthcare platform/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/View case study:.*EdTech startup/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/View case study:.*IoT platform/i)).toBeInTheDocument();
  });

  it('has proper heading hierarchy', () => {
    render(<CaseStudiesIndex />);
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveTextContent(/Case studies|Atvejų studijos/i);

    const caseStudyHeadings = screen.getAllByRole('heading', { level: 2 });
    expect(caseStudyHeadings).toHaveLength(6);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<CaseStudiesIndex />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
