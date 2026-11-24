import { screen } from '@testing-library/react';
import { renderWithProviders as render } from '@/test/test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';
import CaseStudiesPage from './CaseStudiesPage';

expect.extend(toHaveNoViolations);

describe('Case studies page', () => {
  it('is headed Real AI work, under the case studies label', () => {
    render(<CaseStudiesPage />);
    expect(screen.getByRole('heading', { level: 1, name: /^real ai work$/i })).toBeInTheDocument();
    expect(screen.getByText('Case studies')).toBeInTheDocument();
  });

  it('shows the four pieces of real work as h2 sections', () => {
    render(<CaseStudiesPage />);
    for (const name of [/^irwin mitchell$/i, /^miausairovi cattery$/i, /^our multi-model ai orchestrator$/i, /^neonova$/i]) {
      expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument();
    }
  });

  it('carries none of the old case study claims', () => {
    render(<CaseStudiesPage />);
    for (const text of [/10×/, /throughput/i, /faster deploys/i, /uptime/i, /less tech debt/i, /downtime cost/i, /fintech/i, /logistics/i, /challenge/i, /tech stack/i]) {
      expect(screen.queryByText(text)).not.toBeInTheDocument();
    }
  });

  it('keeps the founder experience note, labelled', () => {
    render(<CaseStudiesPage />);
    expect(screen.getByRole('group', { name: /^founder experience$/i })).toBeInTheDocument();
  });

  it('closes with the call to discuss an AI project', () => {
    render(<CaseStudiesPage />);
    expect(screen.getByRole('link', { name: /discuss your ai project/i })).toHaveAttribute('href', '/contact');
    expect(screen.getByRole('link', { name: /see ai services/i })).toHaveAttribute('href', '/services');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<CaseStudiesPage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
