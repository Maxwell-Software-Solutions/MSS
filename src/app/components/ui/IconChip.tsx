import type { ReactElement, ReactNode } from 'react';
// Simple classnames merge helper (avoids external dependency)
function cn(...classes: Array<string | undefined | false | null>): string {
  return classes.filter(Boolean).join(' ');
}

interface IconChipProps {
  icon: ReactNode;
  /** @deprecated colour hints are ignored; the chip is a neutral, bordered square */
  from?: string;
  /** @deprecated colour hints are ignored; the chip is a neutral, bordered square */
  to?: string;
  className?: string;
  label?: string; // accessible label if icon is decorative text
}

// Neutral square icon container with a hairline border
export function IconChip({ icon, className, label }: IconChipProps): ReactElement {
  return (
    <div
      className={cn(
        'flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-wash text-foreground',
        className
      )}
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      <span className="text-xl" aria-hidden={label ? 'true' : undefined}>
        {icon}
      </span>
    </div>
  );
}

export default IconChip;
