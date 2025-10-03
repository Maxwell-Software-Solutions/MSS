import fs from 'fs';
import path from 'path';

/**
 * Recursively collect all .svg files under a directory.
 */
function collectSvgFiles(dir: string, baseDir = dir): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectSvgFiles(full, baseDir));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.svg')) {
      files.push(path.relative(baseDir, full).replace(/\\/g, '/'));
    }
  }
  return files;
}

describe('SVG asset integrity', () => {
  const imagesRoot = path.join(process.cwd(), 'public', 'images');
  let svgFiles: string[] = [];

  beforeAll(() => {
    expect(fs.existsSync(imagesRoot)).toBe(true);
    svgFiles = collectSvgFiles(imagesRoot);
  });

  it('discovers SVG files', () => {
    // Expect at least a baseline number (blog + case studies + misc)
    expect(svgFiles.length).toBeGreaterThanOrEqual(10);
  });

  it('all SVG files are non-empty and readable', () => {
    const failures: string[] = [];
    svgFiles.forEach(rel => {
      const full = path.join(imagesRoot, rel);
      try {
        const content = fs.readFileSync(full, 'utf8');
        if (content.trim().length < 50) {
          failures.push(`${rel} (too small)`);
        }
        if (!content.includes('<svg')) {
          failures.push(`${rel} (missing <svg tag)`);
        }
      } catch (e) {
        failures.push(`${rel} (read error: ${(e as Error).message})`);
      }
    });
    expect(failures).toEqual([]);
  });

  it('expected key illustration files are present', () => {
    const required = [
      // Blog illustrations
      'blog/solid-principles-hero.svg',
      'blog/srp-illustration.svg',
      'blog/isp-illustration.svg',
      'blog/lsp-illustration.svg',
      'blog/ocp-illustration.svg',
      'blog/dip-illustration.svg',
      'blog/refactoring-legacy-code.svg',
      'blog/tdd-business-value.svg',
      // Case studies
      'case-studies/retail-platform.svg',
      'case-studies/fintech-api.svg',
      'case-studies/saas-migration.svg'
    ];
    for (const file of required) {
      expect(svgFiles).toContain(file);
    }
  });
});
