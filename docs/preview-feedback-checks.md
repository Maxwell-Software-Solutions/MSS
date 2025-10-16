# Preview Feedback Checks - Implementation Summary

This implementation adds automated CI checks that encode preview issues, allowing Copilot to fix failing tests/lints triggered by PRs.

## What Was Added

### 1. Playwright Preview UI Checks (`.github/workflows/preview-ui.yml`)
A new workflow that runs on every pull request to validate:
- **DOM element overlap** at various breakpoints (especially md breakpoint)
- **Hover styles** for navigation links, footer links, and buttons
- **Layout shift prevention** (images have proper dimensions)
- **No horizontal scrollbar** on mobile and tablet viewports
- **Sticky header** doesn't overlap with content

The workflow:
- Uses npm instead of pnpm for compatibility
- Installs Playwright with dependencies
- Builds and starts the app
- Runs all Playwright tests
- Uploads test reports as artifacts (retained for 30 days)

### 2. Lighthouse CI Workflow (`.github/workflows/lhci.yml`)
A new workflow that runs Lighthouse performance checks on PRs:
- **CLS (Cumulative Layout Shift)** threshold set to **0.01** (error level) - 10x stricter than Google's "good" threshold of 0.1
- **Image size budget** to flag heavy PNG files (max 200KB)
- **Duplicate JavaScript** detection (max 10KB)
- Tests multiple pages: home, about, blog, services, contact, project-showcase

### 3. Preview UI Tests (`e2e/preview-checks.spec.ts`)
A comprehensive test suite that checks for common preview issues:
- DOM overlap detection in headers at md breakpoint
- Hover state validation for links and buttons
- Sticky header positioning
- Image dimension validation (prevents layout shift)
- Horizontal scroll prevention on mobile/tablet
- Interactive element styling verification

### 4. PNG Detection Script (`scripts/check-no-pngs.cjs`)
A Node.js script that:
- Scans the `/public/` directory for PNG files
- Fails the build if any PNGs are found
- Provides helpful error messages explaining why SVG is preferred
- Integrated into the `npm run lint` command

### 5. Configuration Updates
- **`lighthouserc.js`**: Tightened CLS threshold from 0.1 to 0.01, added image size and duplicate detection
- **`package.json`**: Updated lint script to include PNG checks
- **`playwright.config.ts`**: Changed from pnpm to npm for CI compatibility

## How to Use

When a PR has failing Playwright or Lighthouse checks, leave a comment like:

```
@copilot Please fix failing Playwright and Lighthouse checks on this PR.
- Convert PNG files to SVG format.
- Reduce CLS below 0.01 on /.
- Address header overlap at md breakpoint.
```

Copilot will then push commits to fix the issues until all checks pass.

## Benefits

1. **Automated quality gates**: Preview issues are caught before merge
2. **Self-documenting**: Test failures explain exactly what's wrong
3. **Copilot-friendly**: Tests are designed to be fixable by AI
4. **No new dependencies**: Uses existing Playwright and Lighthouse setup
5. **Fast feedback**: Runs on every PR, catches issues early

## Test Results

The PNG check script has been validated:
- ✓ Successfully detects PNG files when present
- ✓ Passes when no PNG files exist in /public/ directory
- ✓ ESLint passes with PNG check integrated
- ✓ Playwright config updated to use npm
- ✓ Lighthouse config has strict CLS threshold (0.01)

## Next Steps

The workflows will automatically run on the next pull request. If they fail:
1. Review the failure in the GitHub Actions tab
2. Either fix manually or ask Copilot to fix
3. Copilot will analyze the failing tests and push fixes
