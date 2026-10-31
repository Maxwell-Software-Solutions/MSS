import type { ReactElement } from 'react';
import { LOGO_DESCRIPTOR, LOGO_HEIGHT, LOGO_MARK, LOGO_VIEWBOX, LOGO_WIDTH, LOGO_WORD } from '@/lib/brand/logoPaths';

interface BrandLogoProps {
  className?: string;
  /** The accessible name. Leave it out when a surrounding link already names the logo. */
  label?: string;
}

/** The Maxwell logo inline, so it takes its colour from the theme with no image swap and no flash. */
export default function BrandLogo({ className, label }: BrandLogoProps): ReactElement {
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true };
  return (
    <svg className={className} width={LOGO_WIDTH} height={LOGO_HEIGHT} viewBox={LOGO_VIEWBOX} fill="currentColor" {...a11y}>
      <path d={LOGO_MARK} />
      <path d={LOGO_WORD} />
      <path d={LOGO_DESCRIPTOR} fillOpacity={0.74} />
    </svg>
  );
}
