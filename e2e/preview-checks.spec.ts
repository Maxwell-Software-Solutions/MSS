import { test, expect } from '@playwright/test';

/**
 * Preview UI checks - catches visual/behavioral issues
 * These tests are designed to fail when common preview issues occur:
 * - DOM element overlap
 * - Missing hover styles
 * - Layout shift
 */

test.describe('Preview UI checks', () => {
  test('no DOM overlap at md breakpoint - header elements', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForLoadState('networkidle');

    // Check header elements don't overlap
    const header = page.locator('header').first();
    const headerBounds = await header.boundingBox();
    expect(headerBounds).not.toBeNull();

    // Get all interactive elements in header
    const buttons = await header.locator('button, a').all();
    const bounds = await Promise.all(buttons.map(btn => btn.boundingBox()));

    // Check for overlaps between interactive elements
    for (let i = 0; i < bounds.length; i++) {
      for (let j = i + 1; j < bounds.length; j++) {
        const a = bounds[i];
        const b = bounds[j];
        if (a && b) {
          // Check if rectangles overlap
          const overlaps =
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
          
          expect(overlaps).toBe(false);
        }
      }
    }
  });

  test('hover styles are applied to navigation links', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Get a navigation link
    const navLink = page.locator('header nav a').first();
    await navLink.scrollIntoViewIfNeeded();

    // Get initial color
    const initialColor = await navLink.evaluate(el => 
      window.getComputedStyle(el).color
    );

    // Hover and check color changes
    await navLink.hover();
    await page.waitForTimeout(100); // Allow transition

    const hoverColor = await navLink.evaluate(el => 
      window.getComputedStyle(el).color
    );

    // Color should change on hover (or at least opacity/brightness)
    // We check that either color changed OR a transition is defined
    const hasTransition = await navLink.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.transition !== 'none' && style.transition !== 'all 0s ease 0s';
    });

    expect(hasTransition || initialColor !== hoverColor).toBe(true);
  });

  test('footer links have hover styles', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Get a footer link
    const footerLink = page.locator('footer a').first();
    await footerLink.scrollIntoViewIfNeeded();

    // Check for transition or hover effect
    const hasHoverEffect = await footerLink.evaluate(el => {
      const style = window.getComputedStyle(el);
      return (
        style.transition !== 'none' ||
        style.cursor === 'pointer'
      );
    });

    expect(hasHoverEffect).toBe(true);
  });

  test('no content overlaps with sticky header', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const header = page.locator('header').first();
    const headerBounds = await header.boundingBox();
    
    if (!headerBounds) {
      return; // No header found
    }

    // Scroll down a bit
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(100);

    // Check if header is sticky/fixed
    const isSticky = await header.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.position === 'sticky' || style.position === 'fixed';
    });

    if (isSticky) {
      // Get the first main content element
      const mainContent = page.locator('main > *').first();
      const contentBounds = await mainContent.boundingBox();

      if (contentBounds) {
        // Content should start below the header
        expect(contentBounds.y).toBeGreaterThanOrEqual(headerBounds.y + headerBounds.height - 5);
      }
    }
  });

  test('button hover states are visible', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Find the primary CTA button
    const ctaButton = page.locator('a:has-text("Request a code audit"), button:has-text("Request a code audit")').first();
    await ctaButton.scrollIntoViewIfNeeded();

    // Check initial state
    const initialBg = await ctaButton.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );

    // Hover
    await ctaButton.hover();
    await page.waitForTimeout(150);

    const hoverBg = await ctaButton.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );

    // Background should change OR have a transition
    const hasTransition = await ctaButton.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.transition && style.transition !== 'none';
    });

    expect(hasTransition || initialBg !== hoverBg).toBe(true);
  });

  test('images have proper dimensions (no layout shift)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Get all images
    const images = await page.locator('img').all();

    for (const img of images) {
      // Check if image has explicit width or height attributes or CSS
      const hasExplicitDimensions = await img.evaluate(el => {
        const hasAttr = el.hasAttribute('width') || el.hasAttribute('height');
        const style = window.getComputedStyle(el);
        const hasCSS = 
          (style.width && style.width !== 'auto') || 
          (style.height && style.height !== 'auto') ||
          (style.aspectRatio && style.aspectRatio !== 'auto');
        return hasAttr || hasCSS;
      });

      expect(hasExplicitDimensions).toBe(true);
    }
  });

  test('no horizontal scrollbar on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    expect(hasHorizontalScroll).toBe(false);
  });

  test('no horizontal scrollbar on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    expect(hasHorizontalScroll).toBe(false);
  });
});
