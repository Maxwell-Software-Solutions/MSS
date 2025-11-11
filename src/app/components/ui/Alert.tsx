import type { ReactElement, ReactNode } from 'react';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  children: ReactNode;
  variant?: AlertVariant;
  icon?: string;
  title?: string;
  className?: string;
}

/**
 * Alert component - consolidates info/warning/success/error boxes used in blog posts
 * Replaces inline `bg-card/50 border border-*-/20 rounded-lg p-4` patterns
 */
export function Alert({ children, variant = 'info', icon, title, className = '' }: AlertProps): ReactElement {
  const variantClasses = {
    info: 'bg-card/50 border-foreground/20 text-foreground',
    success: 'bg-card/50 border-green-500/20 text-green-600 dark:text-green-400',
    warning: 'bg-card/50 border-accent/20 text-accent',
    error: 'bg-card/50 border-red-500/20 text-red-600 dark:text-red-400',
  };

  return (
    <div className={`border rounded-lg p-4 ${variantClasses[variant]} ${className}`.trim()}>
      {(title || icon) && (
        <div className="font-semibold mb-2 flex items-center gap-2">
          {icon && (
            <span role="img" aria-hidden="true">
              {icon}
            </span>
          )}
          {title}
        </div>
      )}
      <div className="text-foreground/90 text-sm">{children}</div>
    </div>
  );
}

export default Alert;
