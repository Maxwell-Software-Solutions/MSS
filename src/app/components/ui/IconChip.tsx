import type { ReactElement, ReactNode } from 'react';
// Simple classnames merge helper (avoids external dependency)
function cn(...classes: Array<string | undefined | false | null>): string {
  return classes.filter(Boolean).join(' ');
}

interface IconChipProps {
  icon: ReactNode;
  from?: string; // tailwind color e.g. 'from-amber-300'
  to?: string; // tailwind color e.g. 'to-amber-500'
  className?: string;
  label?: string; // accessible label if icon is decorative text
}

// Gradient square icon container with subtle inner highlight
export function IconChip({
  icon,
  from = 'from-amber-300',
  to = 'to-amber-500',
  className,
  label,
}: IconChipProps): ReactElement {
  return (
    <div
      className={cn(
        'relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br',
        'shadow-sm ring-1 ring-black/5 dark:ring-white/5',
        from,
        to,
        'before:absolute before:inset-px before:rounded-[1.05rem] before:bg-white/20 before:dark:bg-white/10 before:mix-blend-overlay before:pointer-events-none',
        'text-neutral-900 dark:text-neutral-50',
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
