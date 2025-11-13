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
    expect(screen.getByRole('heading', { name: /Microservices Architecture/i })).toBeInTheDocument();
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
    expect(screen.getAllByText(/What Are Microservices?/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/When to Use Microservices/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Core Microservices Patterns/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Common Challenges & Solutions/i).length).toBeGreaterThanOrEqual(1);
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
