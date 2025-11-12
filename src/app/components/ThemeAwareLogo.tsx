'use client';
import { useEffect, useState, type ReactElement } from 'react';
import Image from 'next/image';

interface ThemeAwareLogoProps {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export default function ThemeAwareLogo({
  width = 240,
  height = 60,
  className = 'site-logo w-auto',
  priority = false,
}: ThemeAwareLogoProps): ReactElement {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const checkTheme = (): void => {
      const theme = document.documentElement.getAttribute('data-theme');
      setIsDark(theme === 'dark');
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Image
      src={isDark ? '/logo-dark.svg' : '/logo.svg'}
      alt="Maxwell Software Solutions"
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
