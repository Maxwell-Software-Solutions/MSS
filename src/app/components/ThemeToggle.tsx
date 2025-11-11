'use client';

import type { ReactElement } from 'react';
import { useTheme } from '@/hooks/useTheme';

/**
 * Theme toggle button component
 * Accessible, keyboard-navigable, with proper ARIA attributes
 * Supports both light and dark themes with smooth transitions
 */
export default function ThemeToggle(): ReactElement {
  const { theme, toggleTheme, mounted } = useTheme();

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <button
        type="button"
        className="theme-toggle"
        aria-label="Toggle theme"
        disabled
        style={{ opacity: 0, pointerEvents: 'none' }}
      >
        <span className="sr-only">Loading theme...</span>
      </button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <span className="sr-only">{isDark ? 'Switch to light theme' : 'Switch to dark theme'}</span>

      {/* Sun icon for dark mode (clicking shows light) */}
      <svg
        className={`theme-icon ${isDark ? 'visible' : 'hidden'}`}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>

      {/* Moon icon for light mode (clicking shows dark) */}
      <svg
        className={`theme-icon ${!isDark ? 'visible' : 'hidden'}`}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>

      <style jsx>{`
        .theme-toggle {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          padding: 0.5rem;
          background: transparent;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-base);
          color: var(--color-text);
        }

        .theme-toggle:hover {
          background: var(--color-hover);
          border-color: var(--color-accent);
        }

        .theme-toggle:focus-visible {
          outline: var(--outline-focus);
          outline-offset: var(--outline-offset);
        }

        .theme-toggle:active {
          background: var(--color-active);
          transform: scale(0.95);
        }

        .theme-icon {
          position: absolute;
          transition: all var(--transition-base);
        }

        .theme-icon.visible {
          opacity: 1;
          transform: rotate(0deg) scale(1);
        }

        .theme-icon.hidden {
          opacity: 0;
          transform: rotate(90deg) scale(0.5);
          pointer-events: none;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </button>
  );
}
