'use client';
import type { ReactElement, ReactNode, ButtonHTMLAttributes } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface ButtonSecondaryProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
}

/**
 * Secondary/Ghost button with AA contrast, 44px min height, and accessible states
 * Implements hover, focus (visible ring), active, disabled, and loading states
 */
export default function ButtonSecondary({
  children,
  loading = false,
  disabled,
  className = '',
  ...props
}: ButtonSecondaryProps): ReactElement {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] min-w-[44px] rounded-lg font-medium text-[0.9375rem] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-background focus-visible:ring-accent disabled:opacity-60 disabled:cursor-not-allowed';

  const variantClasses = 'border border-border-strong bg-transparent text-foreground hover:bg-foreground/5';

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {children}
    </button>
  );
}
