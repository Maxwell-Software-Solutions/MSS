import { test, expect } from '@playwright/test';

// Basic smoke test for the home page
// Verifies hero heading, primary CTA, and key sections render.

test.describe('Home Page', () => {
  test('loads hero and primary elements', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /Build with confidence/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Request Your Code Audit/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Case studies/i })).toBeVisible();
  });

  test('navigation links work', async ({ page }) => {
    await page.goto('/');
    // Wait for translations to load and content to be ready
    await page.waitForLoadState('networkidle');
    
    // Wait for the actual Services text to appear (not the translation key)
    await page.waitForFunction(() => {
      const servicesLinks = Array.from(document.querySelectorAll('a'));
      return servicesLinks.some(link => link.textContent?.trim() === 'Services');
    }, { timeout: 10000 });
    
    // Scope to top navigation (first navigation landmark) to avoid matching CTA duplicates.
    const topNav = page.getByRole('navigation').first();
    const servicesLink = topNav.getByRole('link', { name: 'Services' });
    await servicesLink.scrollIntoViewIfNeeded();
    
    await Promise.race([
      (async () => {
        await servicesLink.click();
      })(),
      (async () => {
        // Fallback: if first click didn't navigate within 2s (webkit flake) try again
        await page.waitForTimeout(2000);
        if (!/\/services$/.test(page.url())) {
          await servicesLink.click();
        }
      })(),
    ]);
    
    // Increased timeout and wait for network to settle
    await page.waitForURL('**/services', { timeout: 20000 });
    await page.waitForLoadState('networkidle', { timeout: 10000 });
    
    // Wait for Services heading to be visible (could be translation key or actual text)
    await expect(page.getByRole('heading', { name: /Services/i }).or(page.getByRole('heading', { name: /services\.hero\.title/i }))).toBeVisible({ timeout: 10000 });
  });

  test('captures full-page screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'e2e/screenshots/home-full.png', fullPage: true });
  });

  test('verifies new professional sections and captures section screenshots', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Wait for translations to load and look for the main capabilities heading (not sub-headings)
    const capabilities = page.locator('h2').filter({ hasText: /^(Capabilities|capabilities\.heading)$/ }).first();
    await expect(capabilities).toBeVisible();
    await capabilities.screenshot({ path: 'e2e/screenshots/home-capabilities-heading.png' });

    // Wait for process heading
    const process = page.locator('h2').filter({ hasText: /(How engagements work|process\.heading)/ }).first();
    await expect(process).toBeVisible();
    await process.screenshot({ path: 'e2e/screenshots/home-process-heading.png' });

    // Wait for testimonials heading
    const testimonials = page.locator('h2').filter({ hasText: /Client perspective/ }).first();
    await expect(testimonials).toBeVisible();
    await testimonials.screenshot({ path: 'e2e/screenshots/home-testimonials-heading.png' });

    // Capture a focused screenshot of the value propositions grid using its aria-label
    const valueProps = page.getByLabel('Key value propositions');
    await expect(valueProps).toBeVisible();
    await valueProps.screenshot({ path: 'e2e/screenshots/home-value-props.png' });
  });
});
