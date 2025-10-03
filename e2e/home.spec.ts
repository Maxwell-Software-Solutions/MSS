import { test, expect } from '@playwright/test';

// Basic smoke test for the home page
// Verifies hero heading, primary CTA, and key sections render.

test.describe('Home Page', () => {
  test('loads hero and primary elements', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /Build with confidence/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Request a code audit/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Case studies/i })).toBeVisible();
  });

  test('navigation links work', async ({ page }) => {
    await page.goto('/');
    // Scope to top navigation (first navigation landmark) to avoid matching CTA duplicates.
    const topNav = page.getByRole('navigation').first();
    const servicesLink = topNav.getByRole('link', { name: /^Services$/ });
    await servicesLink.scrollIntoViewIfNeeded();
    await Promise.race([
      (async () => {
        await servicesLink.click();
      })(),
      (async () => {
        // Fallback: if first click didn't navigate within 1.5s (webkit flake) try again
        await page.waitForTimeout(1500);
        if (!/\/services$/.test(page.url())) {
          await servicesLink.click();
        }
      })(),
    ]);
    await page.waitForURL('**/services', { timeout: 15000 });
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: /Services/i })).toBeVisible({ timeout: 15000 });
  });

  test('captures full-page screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'e2e/screenshots/home-full.png', fullPage: true });
  });

  test('verifies new professional sections and captures section screenshots', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const capabilities = page.getByRole('heading', { name: /Capabilities/i });
    await expect(capabilities).toBeVisible();
    await capabilities.screenshot({ path: 'e2e/screenshots/home-capabilities-heading.png' });

    const process = page.getByRole('heading', { name: /How engagements work/i });
    await expect(process).toBeVisible();
    await process.screenshot({ path: 'e2e/screenshots/home-process-heading.png' });

    const testimonials = page.getByRole('heading', { name: /Client perspective/i });
    await expect(testimonials).toBeVisible();
    await testimonials.screenshot({ path: 'e2e/screenshots/home-testimonials-heading.png' });

    // Capture a focused screenshot of the value propositions grid using its aria-label
    const valueProps = page.getByLabel('Key value propositions');
    await expect(valueProps).toBeVisible();
    await valueProps.screenshot({ path: 'e2e/screenshots/home-value-props.png' });
  });
});
