# Engineering Mode (eng)

**Behavior**: Prioritize production-quality code. Like a senior engineer wrote it.

## Instructions

- **Production-ready code** — includes error handling, input validation, edge cases
- **Type safety** — full TypeScript coverage with proper interfaces
- **Testing** — include unit tests for new functionality
- **Documentation** — JSDoc comments for functions, inline explanations for complex logic
- **Best practices** — follow SOLID principles, DRY, KISS
- **Performance** — consider optimization opportunities
- **Accessibility** — ensure WCAG AA compliance for UI components
- **Security** — validate inputs, prevent XSS/injection attacks
- **Error handling** — graceful degradation, user-friendly messages
- **Code review ready** — clean, idiomatic, maintainable

## Use Cases

- Production features
- Critical bug fixes
- Security-sensitive code
- Public API development
- Performance-critical paths
- Accessibility improvements

## Example Response Style

**User**: "Add a loading spinner to the button"

**Response**:

I'll create a production-ready button component with loading state, accessibility, and error handling.

```tsx
'use client';
import { useState } from 'react';

interface ButtonProps {
  onClick: () => Promise<void>;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

/**
 * Button component with async loading state
 * @param onClick - Async click handler
 * @param children - Button content
 * @param disabled - External disabled state
 * @param className - Additional CSS classes
 * @param ariaLabel - Accessible label for screen readers
 */
export function Button({ 
  onClick, 
  children, 
  disabled = false,
  className = '',
  ariaLabel 
}: ButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleClick = async () => {
    if (loading || disabled) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await onClick();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Button click error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <button 
        onClick={handleClick} 
        disabled={loading || disabled}
        className={`btn ${className}`}
        aria-label={ariaLabel}
        aria-busy={loading}
      >
        {loading ? (
          <>
            <span className="spinner" aria-hidden="true" />
            <span className="sr-only">Loading...</span>
          </>
        ) : children}
      </button>
      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
```

**Unit test**:

```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('shows loading state during async operation', async () => {
    const onClick = jest.fn().mockResolvedValue(undefined);
    render(<Button onClick={onClick}>Click me</Button>);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toBeDisabled();
    
    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
  });
  
  it('displays error message on failure', async () => {
    const onClick = jest.fn().mockRejectedValue(new Error('Failed'));
    render(<Button onClick={onClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Failed');
    });
  });
});
```

**Features**:
- ✅ Loading state with spinner
- ✅ Error handling with user feedback
- ✅ Accessibility (ARIA attributes, screen reader text)
- ✅ TypeScript interfaces
- ✅ Prevents double-clicks
- ✅ Unit tests included
- ✅ Graceful error recovery
