import type { ReactElement } from 'react';

export function TestingStrategyIcon({
  size = 24,
  stroke = 1.75,
  className,
  title,
}: {
  size?: number;
  stroke?: number;
  className?: string;
  title?: string;
}): ReactElement {
  const aria = title ? { role: 'img', 'aria-label': title } : ({ 'aria-hidden': 'true' } as const);
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      strokeWidth={stroke}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...aria}
    >
      {/* decorative title removed to avoid duplicate accessible names */}
      {/* Beaker */}
      <path d="M8.5 4.5h7" />
      <path d="M10 4.5v6.2a4.5 4.5 0 0 0-.9 2.7c0 2.2 1.8 4.1 4.1 4.1s4.2-1.9 4.2-4.1c0-.9-.3-1.9-.9-2.7V4.5" />
      <path d="M9.2 12.5h7.6" />
      <path d="M9.8 9.5h6.4" />
      {/* Duotone liquid */}
      <path d="M9.5 14.2c.8.6 1.9 1 3.1 1 1.2 0 2.3-.4 3.1-1" fill="currentColor" opacity=".12" />
      {/* Checkmark */}
      <path d="M6.2 14.8l1.6 1.6 2.4-2.4" />
    </svg>
  );
}
export default TestingStrategyIcon;
