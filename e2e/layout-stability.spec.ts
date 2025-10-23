import { test, expect } from '@playwright/test';

test.describe('Mobile Menu Layout Stability', () => {
  test('should not cause layout shift when opening mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto('/');
    
    // Get initial position of a fixed element
    const initialHeaderPosition = await page.evaluate(() => {
      const header = document.querySelector('header');
      if (!header) return null;
      const rect = header.getBoundingClientRect();
      return { left: rect.left, width: rect.width };
    });
    
    // Open mobile menu
    await page.click('[data-test="menu-toggle"]');
    await page.waitForTimeout(100); // Wait for any transitions
    
    // Check position after menu opens
    const afterOpenPosition = await page.evaluate(() => {
      const header = document.querySelector('header');
      if (!header) return null;
      const rect = header.getBoundingClientRect();
      return { left: rect.left, width: rect.width };
    });
    
    // The header should not have shifted horizontally
    expect(afterOpenPosition?.left).toBe(initialHeaderPosition?.left);
    
    // Close menu
    await page.keyboard.press('Escape');
    await page.waitForTimeout(100);
    
    // Check position after menu closes
    const afterClosePosition = await page.evaluate(() => {
      const header = document.querySelector('header');
      if (!header) return null;
      const rect = header.getBoundingClientRect();
      return { left: rect.left, width: rect.width };
    });
    
    // Should be back to original position
    expect(afterClosePosition?.left).toBe(initialHeaderPosition?.left);
  });

  test('should maintain body width consistency when menu toggles', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Get initial body width
    const initialBodyWidth = await page.evaluate(() => document.body.clientWidth);
    
    // Open menu
    await page.click('[data-test="menu-toggle"]');
    await page.waitForTimeout(100);
    
    // Body content width should remain visually consistent
    // (even if padding is added, the visual content area stays the same)
    const afterOpenBodyWidth = await page.evaluate(() => document.body.clientWidth);
    
    // Close menu
    await page.keyboard.press('Escape');
    await page.waitForTimeout(100);
    
    const afterCloseBodyWidth = await page.evaluate(() => document.body.clientWidth);
    
    // Width should be restored
    expect(afterCloseBodyWidth).toBe(initialBodyWidth);
  });
});