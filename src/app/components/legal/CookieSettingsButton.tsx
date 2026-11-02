'use client';

import { useState } from 'react';
import type { ReactElement } from 'react';
import { openCookieSettings } from '@/lib/consent';

interface CookieSettingsButtonProps {
  label: string;
  /** Said when the consent banner cannot be opened on this page. */
  unavailable: string;
  className?: string;
  statusClassName?: string;
}

/** Opens the Cookiebot banner so a visitor can change or withdraw consent; says so if the banner is not there. */
export default function CookieSettingsButton({
  label,
  unavailable,
  className = 'btn',
  statusClassName = 'legal-status',
}: CookieSettingsButtonProps): ReactElement {
  const [missing, setMissing] = useState(false);

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => setMissing(!openCookieSettings())}
      >
        {label}
      </button>
      {missing && (
        <span role="status" className={statusClassName}>
          {unavailable}
        </span>
      )}
    </>
  );
}
