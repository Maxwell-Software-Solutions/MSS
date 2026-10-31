'use client';
import type { ReactElement } from 'react';
import { BOOKING_URL } from '@/lib/booking';
import { useHydratedTranslation } from '@/lib/useHydratedTranslation';

interface ScheduleCallButtonProps {
  className?: string;
  onClick?: () => void;
}

/** Accent button that opens the Google Calendar booking page in a new tab. */
export default function ScheduleCallButton({ className = '', onClick }: ScheduleCallButtonProps): ReactElement {
  const ht = useHydratedTranslation();

  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-accent ${className}`.trim()}
      onClick={onClick}
      suppressHydrationWarning
    >
      {ht('cta.scheduleCall', 'Schedule a Call')}
    </a>
  );
}
