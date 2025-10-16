#!/usr/bin/env node
/**
 * Check for forbidden PNG files in public directory.
 * This script is run as part of CI to ensure we don't use PNG files
 * where SVG would be more appropriate (smaller, scalable).
 */

const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

function findPngFiles(dir, baseDir = dir) {
  const pngFiles = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      pngFiles.push(...findPngFiles(fullPath, baseDir));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.png')) {
      pngFiles.push(path.relative(baseDir, fullPath));
    }
  }

  return pngFiles;
}

const pngFiles = findPngFiles(publicDir);

if (pngFiles.length > 0) {
  console.error('❌ Found PNG files in /public/ directory. Please use SVG instead:');
  pngFiles.forEach(file => console.error(`  - ${file}`));
  console.error('\nPNG files are discouraged in /public/ because:');
  console.error('  • SVG files are smaller and scale better');
  console.error('  • SVG files work better with responsive designs');
  console.error('  • PNG files can hurt performance metrics (Lighthouse)');
  process.exit(1);
}

console.log('✓ No PNG files found in /public/ directory');
process.exit(0);
