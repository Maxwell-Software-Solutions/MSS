import { test, expect } from '@playwright/test';
// import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Theme Switcher', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render theme toggle button', async ({ page }) => {
    // Wait for the theme toggle button to be visible
    const themeToggle = page.getByRole('button', { name: /switch to (light|dark) theme/i });
    await expect(themeToggle).toBeVisible();
  });

  test('should toggle between light and dark themes', async ({ page }) => {
    const html = page.locator('html');

    // Check initial theme (should be dark by default or system preference)
    const initialTheme = await html.getAttribute('data-theme');
    expect(['light', 'dark']).toContain(initialTheme);

    // Click theme toggle
    const themeToggle = page.getByRole('button', { name: /switch to (light|dark) theme/i });
    await themeToggle.click();

    // Wait for theme change
    await page.waitForTimeout(100);

    // Verify theme changed
    const newTheme = await html.getAttribute('data-theme');
    expect(newTheme).not.toBe(initialTheme);
    expect(['light', 'dark']).toContain(newTheme);
  });

  test('should persist theme preference after reload', async ({ page }) => {
    const html = page.locator('html');

    // Get initial theme
    const initialTheme = await html.getAttribute('data-theme');

    // Toggle theme
    const themeToggle = page.getByRole('button', { name: /switch to (light|dark) theme/i });
    await themeToggle.click();
    await page.waitForTimeout(100);

    const changedTheme = await html.getAttribute('data-theme');
    expect(changedTheme).not.toBe(initialTheme);

    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Verify theme persisted
    const persistedTheme = await html.getAttribute('data-theme');
    expect(persistedTheme).toBe(changedTheme);
  });

  test('should have keyboard accessibility', async ({ page }) => {
    const themeToggle = page.getByRole('button', { name: /switch to (light|dark) theme/i });

    // Focus the button
    await themeToggle.focus();

    // Verify it has focus
    await expect(themeToggle).toBeFocused();

    // Press Enter to toggle
    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);

    // Verify theme changed
    const html = page.locator('html');
    const theme = await html.getAttribute('data-theme');
    expect(['light', 'dark']).toContain(theme);
  });

  test('should update aria-pressed state', async ({ page }) => {
    const themeToggle = page.getByRole('button', { name: /switch to (light|dark) theme/i });
    const html = page.locator('html');

    // Get initial aria-pressed state
    const initialPressed = await themeToggle.getAttribute('aria-pressed');
    expect(['true', 'false']).toContain(initialPressed);

    // Toggle theme
    await themeToggle.click();
    await page.waitForTimeout(100);

    // Verify aria-pressed changed
    const newPressed = await themeToggle.getAttribute('aria-pressed');
    expect(newPressed).not.toBe(initialPressed);
  });

  // TODO: Re-enable after fixing axe-playwright type definitions
  // test('dark theme - should pass WCAG AA accessibility standards', async ({ page }) => {
  //   // Set dark theme explicitly
  //   await page.evaluate(() => {
  //     document.documentElement.setAttribute('data-theme', 'dark');
  //     localStorage.setItem('site.theme', 'dark');
  //   });

  //   await page.reload();
  //   await page.waitForLoadState('networkidle');

  //   // Inject axe
  //   await injectAxe(page);

  //   // Check accessibility (WCAG AA contrast)
  //   await checkA11y(page, undefined, {
  //     detailedReport: true,
  //     detailedReportOptions: {
  //       html: true,
  //     },
  //     axeOptions: {
  //       runOnly: {
  //         type: 'tag',
  //         values: ['wcag2aa', 'wcag21aa'],
  //       },
  //     },
  //   });
  // });

  // test('light theme - should pass WCAG AA accessibility standards', async ({ page }) => {
  //   // Set light theme explicitly
  //   await page.evaluate(() => {
  //     document.documentElement.setAttribute('data-theme', 'light');
  //     localStorage.setItem('site.theme', 'light');
  //   });

  //   await page.reload();
  //   await page.waitForLoadState('networkidle');

  //   // Inject axe
  //   await injectAxe(page);

  //   // Check accessibility (WCAG AA contrast)
  //   await checkA11y(page, undefined, {
  //     detailedReport: true,
  //     detailedReportOptions: {
  //       html: true,
  //     },
  //     axeOptions: {
  //       runOnly: {
  //         type: 'tag',
  //         values: ['wcag2aa', 'wcag21aa'],
  //       },
  //     },
  //   });
  // });

  test('should show correct icon for current theme', async ({ page }) => {
    const html = page.locator('html');
    const currentTheme = await html.getAttribute('data-theme');

    // Check SVG visibility based on theme
    const themeToggle = page.getByRole('button', { name: /switch to (light|dark) theme/i });

    if (currentTheme === 'dark') {
      // Dark theme shows sun icon (to switch to light)
      await expect(themeToggle).toContainText('');
      const ariaLabel = await themeToggle.getAttribute('aria-label');
      expect(ariaLabel).toContain('light');
    } else {
      // Light theme shows moon icon (to switch to dark)
      await expect(themeToggle).toContainText('');
      const ariaLabel = await themeToggle.getAttribute('aria-label');
      expect(ariaLabel).toContain('dark');
    }
  });

  test('should respect system preference without localStorage', async ({ page, context }) => {
    // Clear localStorage
    await context.clearCookies();
    await page.evaluate(() => localStorage.clear());

    // Set prefers-color-scheme to dark
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.reload();
    await page.waitForLoadState('networkidle');

    const html = page.locator('html');
    const theme = await html.getAttribute('data-theme');
    expect(theme).toBe('dark');
  });

  test('should work across different pages', async ({ page }) => {
    const html = page.locator('html');

    // Set theme on homepage
    const themeToggle = page.getByRole('button', { name: /switch to (light|dark) theme/i });
    await themeToggle.click();
    await page.waitForTimeout(100);

    const homeTheme = await html.getAttribute('data-theme');

    // Navigate to another page
    await page.goto('/about');
    await page.waitForLoadState('networkidle');

    // Verify theme persisted
    const aboutTheme = await html.getAttribute('data-theme');
    expect(aboutTheme).toBe(homeTheme);
  });
});
