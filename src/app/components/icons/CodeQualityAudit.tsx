import type { ReactElement } from 'react';

export function CodeQualityAuditIcon({
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
      {/* Brackets */}
      <path d="M6.5 5.5H4.5v13h2" />
      <path d="M17.5 5.5h2v13h-2" />
      {/* Code element */}
      <path d="M10.5 9.5l-2 2 2 2" />
      <path d="M13.5 9.5l2 2-2 2" />
      {/* Magnifier with subtle duotone fill */}
      <circle cx="15.5" cy="15.5" r="2.75" fill="currentColor" opacity=".12" />
      <circle cx="15.5" cy="15.5" r="2.75" />
      <path d="M17.4 17.4l1.6 1.6" />
    </svg>
  );
}
export default CodeQualityAuditIcon;
