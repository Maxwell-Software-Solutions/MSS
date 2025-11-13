import { render, screen } from '@testing-library/react';
import APIDesignPost from './APIDesignPost';
import { LanguageProvider } from '@/lib/LanguageContext';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage() {
    return <div data-testid="mock-image" />;
  },
}));

describe('APIDesignPost', () => {
  it('renders the blog post title', () => {
    render(
      <LanguageProvider initialLanguage="en">
        <APIDesignPost />
      </LanguageProvider>
    );
    expect(screen.getByText(/API Design Best Practices/i)).toBeInTheDocument();
  });

  it('renders table of contents', () => {
    render(
      <LanguageProvider initialLanguage="en">
        <APIDesignPost />
      </LanguageProvider>
    );
    expect(screen.getByText(/Table of Contents/i)).toBeInTheDocument();
  });

  it('renders main sections', () => {
    render(
      <LanguageProvider initialLanguage="en">
        <APIDesignPost />
      </LanguageProvider>
    );
    expect(screen.getAllByText(/RESTful Design Principles/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Resource Naming Conventions/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/API Versioning Strategies/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Security Best Practices/i).length).toBeGreaterThanOrEqual(1);
  });

  it('includes code examples', () => {
    render(
      <LanguageProvider initialLanguage="en">
        <APIDesignPost />
      </LanguageProvider>
    );
    expect(screen.getAllByText(/GET \/users/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/POST \/users/i)).toBeInTheDocument();
  });
});
