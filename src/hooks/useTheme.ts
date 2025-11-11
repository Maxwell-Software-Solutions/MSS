'use client';

import { useEffect, useState, useCallback } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'site.theme';

/**
 * Get the initial theme based on:
 * 1. localStorage value (if set)
 * 2. System preference (prefers-color-scheme)
 * 3. Default to 'dark'
 */
function getInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'dark'; // SSR default
  }

  // Check localStorage first
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  // Check system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }

  return 'dark'; // Default fallback
}

/**
 * Apply theme to document root
 */
function applyTheme(theme: Theme): void {
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = theme;
  }
}

/**
 * Persist theme to localStorage
 */
function persistTheme(theme: Theme): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, theme);
  }
}

/**
 * Custom hook for managing theme state
 * Handles initialization, persistence, and system preference changes
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => getInitialTheme());
  const [mounted, setMounted] = useState(false);

  // Apply theme on mount and when it changes
  useEffect(() => {
    setMounted(true);
    const initialTheme = getInitialTheme();
    setThemeState(initialTheme);
    applyTheme(initialTheme);
  }, []);

  // Listen for system preference changes
  useEffect(() => {
    if (!mounted) return undefined;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't manually set a preference
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        const newTheme = e.matches ? 'dark' : 'light';
        setThemeState(newTheme);
        applyTheme(newTheme);
      }
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }

    return undefined;
  }, [mounted]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    persistTheme(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }, [theme, setTheme]);

  return {
    theme,
    setTheme,
    toggleTheme,
    mounted, // Useful for avoiding hydration mismatches
  };
}
