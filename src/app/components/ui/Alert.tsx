import type { ReactElement, ReactNode } from 'react';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  children: ReactNode;
  variant?: AlertVariant;
  icon?: string;
  title?: string;
  className?: string;
}

/** A note inside an article: a coloured edge on a quiet tone, no box around it. */
export function Alert({ children, variant = 'info', icon, title, className = '' }: AlertProps): ReactElement {
  return (
    <div className={`alert alert-${variant} ${className}`.trim()}>
      {(title || icon) && (
        <div className="alert-title">
          {icon && (
            <span role="img" aria-hidden="true">
              {icon}
            </span>
          )}
          {title}
        </div>
      )}
      <div className="alert-body">{children}</div>
    </div>
  );
}

export default Alert;
