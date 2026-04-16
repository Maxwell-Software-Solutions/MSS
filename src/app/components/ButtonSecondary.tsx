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
    'inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] min-w-[44px] rounded-xl font-semibold text-base transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-500 disabled:opacity-60 disabled:cursor-not-allowed';

  // Dark: translucent white glass; light: translucent black glass (handled via Tailwind + CSS vars)
  const variantClasses =
    'border border-white/10 bg-white/5 backdrop-blur-sm text-foreground hover:bg-white/10 hover:border-white/20 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:hover:border-white/20 [html[data-theme=light]_&]:border-black/10 [html[data-theme=light]_&]:bg-black/5 [html[data-theme=light]_&]:hover:bg-black/10 [html[data-theme=light]_&]:hover:border-black/15 active:scale-[0.98]';

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
