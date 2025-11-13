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
    expect(screen.getByText(/Modern CI\/CD Pipelines/i)).toBeInTheDocument();
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
    expect(screen.getByText(/CI\/CD Fundamentals/i)).toBeInTheDocument();
    expect(screen.getByText(/Automated Testing Strategy/i)).toBeInTheDocument();
    expect(screen.getByText(/Deployment Strategies/i)).toBeInTheDocument();
    expect(screen.getByText(/Security in CI\/CD/i)).toBeInTheDocument();
  });

  it('includes deployment strategy information', () => {
    render(
      <LanguageProvider initialLanguage="en">
        <CICDPost />
      </LanguageProvider>
    );
    expect(screen.getByText(/Blue-Green Deployment/i)).toBeInTheDocument();
    expect(screen.getByText(/Canary Deployment/i)).toBeInTheDocument();
  });
});
