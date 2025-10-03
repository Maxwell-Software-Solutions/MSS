import type { ReactElement } from 'react';

export function CICDHardeningIcon({
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
      {/* Infinity / pipeline */}
      <path
        d="M6 15c-1.66 0-3-1.34-3-3s1.34-3 3-3c2.4 0 4.1 6 7 6 1.66 0 3-1.34 3-3s-1.34-3-3-3c-2.4 0-4.1 6-7 6Z"
        fill="currentColor"
        opacity=".12"
      />
      <path d="M6 15c-1.66 0-3-1.34-3-3s1.34-3 3-3c2.4 0 4.1 6 7 6 1.66 0 3-1.34 3-3s-1.34-3-3-3c-2.4 0-4.1 6-7 6Z" />
      {/* Small gear (6 teeth) */}
      <circle cx="18.5" cy="12" r="2.1" fill="currentColor" opacity=".12" />
      <circle cx="18.5" cy="12" r="2.1" />
      <path d="M18.5 9.4v1" />
      <path d="M18.5 14.6v1" />
      <path d="M16 12h1" />
      <path d="M20 12h1" />
      <path d="M16.8 10.2l.7.4" />
      <path d="M19.5 13.4l.7.4" />
      <path d="M16.8 13.8l.7-.4" />
      <path d="M19.5 10.6l.7-.4" />
    </svg>
  );
}
export default CICDHardeningIcon;
