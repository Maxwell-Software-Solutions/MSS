import { render, screen } from '@testing-library/react';
import MicroservicesPost from './MicroservicesPost';
import { LanguageProvider } from '@/lib/LanguageContext';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage() {
    return <div data-testid="mock-image" />;
  },
}));

describe('MicroservicesPost', () => {
  it('renders the blog post title', () => {
    render(
      <LanguageProvider initialLanguage="en">
        <MicroservicesPost />
      </LanguageProvider>
    );
    expect(screen.getByText(/Microservices Architecture/i)).toBeInTheDocument();
  });

  it('renders table of contents', () => {
    render(
      <LanguageProvider initialLanguage="en">
        <MicroservicesPost />
      </LanguageProvider>
    );
    expect(screen.getByText(/Table of Contents/i)).toBeInTheDocument();
  });

  it('renders main sections', () => {
    render(
      <LanguageProvider initialLanguage="en">
        <MicroservicesPost />
      </LanguageProvider>
    );
    expect(screen.getByText(/What Are Microservices?/i)).toBeInTheDocument();
    expect(screen.getByText(/When to Use Microservices/i)).toBeInTheDocument();
    expect(screen.getByText(/Core Microservices Patterns/i)).toBeInTheDocument();
    expect(screen.getByText(/Common Challenges & Solutions/i)).toBeInTheDocument();
  });

  it('includes warning about starting with monolith', () => {
    render(
      <LanguageProvider initialLanguage="en">
        <MicroservicesPost />
      </LanguageProvider>
    );
    expect(screen.getByText(/Most systems should start as a monolith/i)).toBeInTheDocument();
  });
});
