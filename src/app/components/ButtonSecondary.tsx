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
    'inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] min-w-[44px] rounded-lg font-semibold text-base transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent disabled:opacity-60 disabled:cursor-not-allowed';

  const variantClasses =
    'border-2 border-accent/60 text-foreground hover:bg-accent/10 hover:border-accent active:scale-[0.98]';

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
