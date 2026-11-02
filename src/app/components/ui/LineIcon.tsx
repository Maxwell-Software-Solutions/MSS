import type { ReactElement } from 'react';

const PATHS = {
  flask: 'M9 3h6M10 3v6.5L4.9 18A2 2 0 0 0 6.6 21h10.8a2 2 0 0 0 1.7-3L14 9.5V3M7.6 15h8.8',
  layers: 'm12 3 9 5-9 5-9-5 9-5ZM3 12.5l9 5 9-5M3 17l9 5 9-5',
  signal: 'M3 12h4l3-8 4 16 3-8h4',
  shield: 'M12 3 5 6v5c0 4.4 2.9 8.2 7 10 4.1-1.8 7-5.6 7-10V6l-7-3ZM9 12l2 2 4-4',
  bolt: 'M13 3 5 14h6l-1 7 8-11h-6l1-7Z',
  lock: 'M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-4-4',
  person: 'M12 6.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM5 9l7 1.5L19 9M12 10.5V15M12 15l-3 6M12 15l3 6',
  video: 'M15 10l5-2.5v9L15 14M4 7h9a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z',
  phone: 'M5 4h3l1.6 4.2-2 1.4a11 11 0 0 0 6.8 6.8l1.4-2L20 16v3a2 2 0 0 1-2 2C10.3 21 3 13.7 3 6a2 2 0 0 1 2-2Z',
  chat: 'M21 12c0 4.4-4 8-9 8a10 10 0 0 1-4.2-.9L3 20l1.4-3.7A7.4 7.4 0 0 1 3 12c0-4.4 4-8 9-8s9 3.6 9 8Z',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  check: 'M4.5 12.5 10 18 19.5 7',
  external: 'M14 4h6v6M20 4 10 14M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4',
  document: 'M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM14 3v5h5M9.5 13h5M9.5 17h5',
  loop: 'M17 3l4 4-4 4M3 11V9a2 2 0 0 1 2-2h16M7 21l-4-4 4-4M21 13v2a2 2 0 0 1-2 2H3',
  route:
    'M12 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM12 7.5v9M12 11H5v5.5M12 11h7v5.5M5 16.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM12 16.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM19 16.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z',
} as const;

export type LineIconName = keyof typeof PATHS;

/** One family of icons: 24px grid, 1.5 stroke, inherits the text colour. Always decorative. */
export function LineIcon({ name, className }: { name: LineIconName; className?: string }): ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}

export function CheckIcon(): ReactElement {
  return <LineIcon name="check" className="check" />;
}

export function ExternalIcon(): ReactElement {
  return <LineIcon name="external" className="h-4 w-4" />;
}

export default LineIcon;
