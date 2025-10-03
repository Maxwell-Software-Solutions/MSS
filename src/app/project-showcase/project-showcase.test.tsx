import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import CaseStudiesIndex from './CaseStudiesIndex';

expect.extend(toHaveNoViolations);

describe('Project Showcase page', () => {
  it('renders the main heading', () => {
    render(<CaseStudiesIndex />);
    expect(screen.getByRole('heading', { name: /case studies/i })).toBeInTheDocument();
  });

  it('renders the page description', () => {
    render(<CaseStudiesIndex />);
    expect(screen.getByText(/Selected results across industries/i)).toBeInTheDocument();
    expect(screen.getByText(/Each study includes context, actions, and measurable outcomes/i)).toBeInTheDocument();
  });

  it('renders all case study links', () => {
    render(<CaseStudiesIndex />);
    expect(screen.getByRole('link', { name: /Retail platform — escaped defects down 58%/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Fintech API — coverage up 32%/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /SaaS migration — MTTR down 45%/i })).toBeInTheDocument();
  });

  it('renders case study summaries', () => {
    render(<CaseStudiesIndex />);
    expect(screen.getByText(/Stabilized CI, added SLOs, refactored brittle modules/i)).toBeInTheDocument();
    expect(screen.getByText(/Contract \+ golden tests, faster incident resolution/i)).toBeInTheDocument();
    expect(screen.getByText(/Observability, SLOs, and automated runbooks/i)).toBeInTheDocument();
  });

  it('renders case study metadata', () => {
    render(<CaseStudiesIndex />);
    expect(screen.getByText('E‑commerce · Node/Next · 6 months')).toBeInTheDocument();
    expect(screen.getByText('Fintech · Go/TypeScript · 3 months')).toBeInTheDocument();
    expect(screen.getByText('B2B SaaS · Kubernetes · 4 months')).toBeInTheDocument();
  });

  it('renders case study images with proper alt text', () => {
    render(<CaseStudiesIndex />);
    expect(screen.getByAltText('Retail platform — escaped defects down 58%')).toBeInTheDocument();
    expect(screen.getByAltText('Fintech API — coverage up 32%')).toBeInTheDocument();
    expect(screen.getByAltText('SaaS migration — MTTR down 45%')).toBeInTheDocument();
  });

  it('has proper heading hierarchy', () => {
    render(<CaseStudiesIndex />);
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveTextContent('Case studies');

    const caseStudyHeadings = screen.getAllByRole('heading', { level: 2 });
    expect(caseStudyHeadings).toHaveLength(3);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<CaseStudiesIndex />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
