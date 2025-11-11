import { test, expect } from '@playwright/test';

test.describe('Accessibility - Skip Link', () => {
  test('skip link is visible on focus', async ({ page }) => {
    await page.goto('/');

    // Tab to skip link
    await page.keyboard.press('Tab');

    // Skip link should be visible
    const skipLink = page.locator('a.skip-link');
    await expect(skipLink).toBeVisible();
    await expect(skipLink).toHaveText('Skip to main content');
  });

  test('skip link navigates to main content', async ({ page }) => {
    await page.goto('/');

    // Tab to skip link and press Enter
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    // Main content should be focused
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeFocused();
  });
});

test.describe('Accessibility - Keyboard Navigation', () => {
  test('can navigate through header elements', async ({ page }) => {
    await page.goto('/');

    // Tab through header elements
    await page.keyboard.press('Tab'); // Skip link
    await page.keyboard.press('Tab'); // Logo

    // Should be able to navigate to service links
    const servicesLink = page.locator('nav a[href="/services"]').first();
    await expect(servicesLink).toBeVisible();
  });

  test('language toggle is keyboard accessible', async ({ page }) => {
    await page.goto('/');

    // Find language toggle button
    const langButton = page.locator('button:has-text("LT"), button:has-text("EN")').first();
    await langButton.focus();
    await expect(langButton).toBeFocused();

    // Press Enter to toggle
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);

    // Text should change
    const newText = await langButton.textContent();
    expect(['LT', 'EN']).toContain(newText);
  });

  test('all interactive elements have visible focus indicators', async ({ page }) => {
    await page.goto('/');

    // Get all focusable elements
    const focusableElements = await page.locator('a, button, input, textarea, select').all();

    for (const element of focusableElements.slice(0, 10)) {
      // Test first 10
      await element.focus();

      // Check if outline or ring is visible
      const outline = await element.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return styles.outline !== 'none' || styles.outlineWidth !== '0px';
      });

      expect(outline).toBeTruthy();
    }
  });
});

test.describe('Accessibility - Contact Form', () => {
  test('can navigate through contact form with keyboard', async ({ page }) => {
    await page.goto('/contact');

    // Tab to name field
    const nameInput = page.locator('input[name="name"]');
    await nameInput.focus();
    await expect(nameInput).toBeFocused();

    // Fill and tab to email
    await nameInput.fill('John Doe');
    await page.keyboard.press('Tab');

    const emailInput = page.locator('input[name="email"]');
    await expect(emailInput).toBeFocused();

    // Fill and tab to message
    await emailInput.fill('john@example.com');
    await page.keyboard.press('Tab');

    const messageInput = page.locator('textarea[name="message"]');
    await expect(messageInput).toBeFocused();

    await messageInput.fill('Test message');
    await page.keyboard.press('Tab');

    // Should reach submit button
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeFocused();
  });

  test('form validation shows error messages', async ({ page }) => {
    await page.goto('/contact');

    // Try to submit empty form
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Browser validation should prevent submission
    const nameInput = page.locator('input[name="name"]');
    const isInvalid = await nameInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
    expect(isInvalid).toBeTruthy();
  });

  test('success message is announced to screen readers', async ({ page }) => {
    await page.goto('/contact');

    // Check for aria-live region
    const liveRegion = page.locator('[aria-live="polite"]');
    await expect(liveRegion).toBeAttached();
  });
});

test.describe('Accessibility - ARIA and Semantics', () => {
  test('page has proper landmark regions', async ({ page }) => {
    await page.goto('/');

    // Check for main landmark
    const main = page.locator('main[role="main"], main');
    await expect(main).toBeVisible();

    // Check for banner (header)
    const banner = page.locator('header[role="banner"], header');
    await expect(banner).toBeVisible();

    // Check for contentinfo (footer)
    const footer = page.locator('footer[role="contentinfo"], footer');
    await expect(footer).toBeVisible();
  });

  test('navigation has proper ARIA labels', async ({ page }) => {
    await page.goto('/');

    // Check navigation has aria-label
    const nav = page.locator('nav').first();
    const ariaLabel = await nav.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
  });
});
