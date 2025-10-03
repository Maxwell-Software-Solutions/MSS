import type { ReactElement } from 'react';

export function RefactoringModernizationIcon({
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
      <rect x="3.5" y="5.5" width="7" height="7" rx="1.5" fill="currentColor" opacity=".12" />
      <rect x="3.5" y="5.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="11.5" width="7" height="7" rx="1.5" fill="currentColor" opacity=".12" />
      <rect x="13.5" y="11.5" width="7" height="7" rx="1.5" />
      <path d="M10.5 9.5h3" />
      <path d="M13.5 13.5h-3" />
      <path d="M11.5 7.5l2 2-2 2" />
      <path d="M12.5 15.5l-2-2 2-2" />
    </svg>
  );
}
export default RefactoringModernizationIcon;
