import type { ReactElement } from 'react';

export function ReliabilityEngineeringIcon({
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
      {/* Infinity loop */}
      <path
        d="M6.5 14.5c-1.66 0-3-1.34-3-3s1.34-3 3-3c2.75 0 5.25 6 8 6 1.66 0 3-1.34 3-3s-1.34-3-3-3c-2.75 0-5.25 6-8 6Z"
        fill="currentColor"
        opacity=".12"
      />
      <path d="M6.5 14.5c-1.66 0-3-1.34-3-3s1.34-3 3-3c2.75 0 5.25 6 8 6 1.66 0 3-1.34 3-3s-1.34-3-3-3c-2.75 0-5.25 6-8 6Z" />
      {/* Shield + check */}
      <path d="M16.5 9.2l4 1.3v3c0 2.3-1.6 4.4-4 5-2.4-.6-4-2.7-4-5v-3l4-1.3Z" fill="currentColor" opacity=".12" />
      <path d="M16.5 9.2l4 1.3v3c0 2.3-1.6 4.4-4 5-2.4-.6-4-2.7-4-5v-3l4-1.3Z" />
      <path d="M14.9 13.7l1.3 1.3 2.3-2.3" />
    </svg>
  );
}
export default ReliabilityEngineeringIcon;
