'use client';
import type { ReactElement, ReactNode, ButtonHTMLAttributes } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface ButtonPrimaryProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
  variant?: 'accent' | 'secondary';
}

/**
 * Primary CTA button with AA contrast, 44px min height, and accessible states
 * Implements hover, focus (visible ring), active, disabled, and loading states
 */
export default function ButtonPrimary({
  children,
  loading = false,
  variant = 'accent',
  disabled,
  className = '',
  ...props
}: ButtonPrimaryProps): ReactElement {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] min-w-[44px] rounded-lg font-medium text-[0.9375rem] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-background disabled:opacity-60 disabled:cursor-not-allowed';

  const variantClasses = {
    accent:
      'bg-accent-fill text-accent-contrast hover:bg-accent-fill-hover focus-visible:ring-accent',
    secondary: 'neuro-btn border border-border-strong text-foreground hover:bg-foreground/5 focus-visible:ring-accent',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {children}
    </button>
  );
}
