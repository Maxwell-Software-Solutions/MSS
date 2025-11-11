'use client';
import type { ReactElement, ReactNode, ButtonHTMLAttributes } from 'react';

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
      {loading && (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
