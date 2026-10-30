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
 * Flat panel with a coloured edge; colour comes from the status tokens in styles/tokens.css
 */
export function Alert({ children, variant = 'info', icon, title, className = '' }: AlertProps): ReactElement {
  const variantClasses = {
    info: 'border-border border-l-foreground/40 bg-wash',
    success: 'border-border border-l-success bg-wash',
    warning: 'border-border border-l-warning bg-wash',
    error: 'border-border border-l-error bg-wash',
  };

  const iconClasses = {
    info: 'text-foreground',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
  };

  return (
    <div className={`rounded-lg border border-l-4 p-4 ${variantClasses[variant]} ${className}`.trim()}>
      {(title || icon) && (
        <div className={`mb-2 flex items-center gap-2 font-semibold ${iconClasses[variant]}`}>
          {icon && (
            <span role="img" aria-hidden="true">
              {icon}
            </span>
          )}
          {title}
        </div>
      )}
      <div className="text-sm text-foreground">{children}</div>
    </div>
  );
}

export default Alert;
