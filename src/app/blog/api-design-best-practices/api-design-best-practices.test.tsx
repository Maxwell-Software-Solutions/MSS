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
    expect(screen.getByText(/RESTful Design Principles/i)).toBeInTheDocument();
    expect(screen.getByText(/Resource Naming Conventions/i)).toBeInTheDocument();
    expect(screen.getByText(/API Versioning Strategies/i)).toBeInTheDocument();
    expect(screen.getByText(/Security Best Practices/i)).toBeInTheDocument();
  });

  it('includes code examples', () => {
    render(
      <LanguageProvider initialLanguage="en">
        <APIDesignPost />
      </LanguageProvider>
    );
    expect(screen.getByText(/GET \/users/i)).toBeInTheDocument();
    expect(screen.getByText(/POST \/users/i)).toBeInTheDocument();
  });
});
