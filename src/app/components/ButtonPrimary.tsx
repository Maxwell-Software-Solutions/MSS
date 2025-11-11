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
    'inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] min-w-[44px] rounded-xl font-semibold text-base transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

  const variantClasses = {
    accent: 'neuro-btn-accent focus-visible:ring-accent',
    secondary: 'neuro-btn bg-secondary text-white focus-visible:ring-secondary',
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
