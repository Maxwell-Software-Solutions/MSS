import type { ReactElement, ReactNode, AnchorHTMLAttributes } from 'react';

type ButtonLinkVariant = 'accent' | 'ghost' | 'secondary';
type ButtonLinkSize = 'sm' | 'md' | 'lg';

interface ButtonLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> {
  href: string;
  children: ReactNode;
  variant?: ButtonLinkVariant;
  size?: ButtonLinkSize;
  className?: string;
}

/**
 * ButtonLink component - consolidates links styled as buttons
 * Replaces `<a href="..." className="btn btn-accent/ghost px-* py-*">` patterns
 */
export function ButtonLink({
  href,
  children,
  variant = 'accent',
  size = 'md',
  className = '',
  ...props
}: ButtonLinkProps): ReactElement {
  const sizeClasses = {
    sm: 'px-4 py-2',
    md: 'px-5 py-2.5',
    lg: 'px-7 py-3.5 text-base',
  };

  const variantClasses = {
    accent: 'btn btn-accent',
    ghost: 'btn btn-ghost',
    secondary: 'btn btn-secondary',
  };

  const combinedClasses = `${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

  return (
    <a href={href} className={combinedClasses} {...props}>
      {children}
    </a>
  );
}

export default ButtonLink;
