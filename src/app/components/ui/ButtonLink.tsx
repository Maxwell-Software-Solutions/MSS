import Link from 'next/link';
import type { ComponentProps, ReactElement, ReactNode } from 'react';

type ButtonLinkVariant = 'accent' | 'ghost' | 'secondary';
type ButtonLinkSize = 'md' | 'lg';

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, 'className' | 'href'> {
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
    md: '',
    lg: 'btn-lg',
  };

  const variantClasses = {
    accent: 'btn btn-accent',
    ghost: 'btn btn-ghost',
    secondary: 'btn btn-secondary',
  };

  const combinedClasses = `${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

  // next/link: a page change without reloading the whole site
  return (
    <Link href={href} className={combinedClasses} {...props}>
      {children}
    </Link>
  );
}

export default ButtonLink;
