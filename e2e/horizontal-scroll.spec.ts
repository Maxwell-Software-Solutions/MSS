import { test, expect } from '@playwright/test';

test.describe('Horizontal Scroll Prevention', () => {
  test('should not have horizontal scrollbar on homepage - mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto('/');
    
    // Check that page width doesn't exceed viewport
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    expect(hasHorizontalScroll).toBe(false);
  });

  test('should not have horizontal scrollbar on homepage - desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    // Check that page width doesn't exceed viewport
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    expect(hasHorizontalScroll).toBe(false);
  });

  test('should not have horizontal scrollbar on contact page - mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/contact');
    
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    expect(hasHorizontalScroll).toBe(false);
  });

  test('overflow-x hidden is applied to body and html', async ({ page }) => {
    await page.goto('/');
    
    const overflowSettings = await page.evaluate(() => {
      const htmlOverflow = getComputedStyle(document.documentElement).overflowX;
      const bodyOverflow = getComputedStyle(document.body).overflowX;
      return { htmlOverflow, bodyOverflow };
    });
    
    expect(overflowSettings.htmlOverflow).toBe('hidden');
    expect(overflowSettings.bodyOverflow).toBe('hidden');
  });
});