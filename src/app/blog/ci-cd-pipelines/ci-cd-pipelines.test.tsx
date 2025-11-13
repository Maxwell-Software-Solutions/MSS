import { render, screen } from '@testing-library/react';
import CICDPost from './CICDPost';
import { LanguageProvider } from '@/lib/LanguageContext';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage() {
    return <div data-testid="mock-image" />;
  },
}));

describe('CICDPost', () => {
  it('renders the blog post title', () => {
    render(
      <LanguageProvider initialLanguage="en">
        <CICDPost />
      </LanguageProvider>
    );
    expect(screen.getByRole('heading', { name: /Modern CI\/CD Pipelines/i })).toBeInTheDocument();
  });

  it('renders table of contents', () => {
    render(
      <LanguageProvider initialLanguage="en">
        <CICDPost />
      </LanguageProvider>
    );
    expect(screen.getByText(/Table of Contents/i)).toBeInTheDocument();
  });

  it('renders main sections', () => {
    render(
      <LanguageProvider initialLanguage="en">
        <CICDPost />
      </LanguageProvider>
    );
    expect(screen.getAllByText(/CI\/CD Fundamentals/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Automated Testing Strategy/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Deployment Strategies/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Security in CI\/CD/i).length).toBeGreaterThanOrEqual(1);
  });

  it('includes deployment strategy information', () => {
    render(
      <LanguageProvider initialLanguage="en">
        <CICDPost />
      </LanguageProvider>
    );
    expect(screen.getByText(/Blue-Green Deployment/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Canary Deployment/i).length).toBeGreaterThanOrEqual(1);
  });
});
