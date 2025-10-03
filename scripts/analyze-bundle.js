#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Analyzing bundle performance...\n');

// Set environment variable for bundle analysis
process.env.ANALYZE = 'true';

try {
  // Build the project with bundle analysis
  console.log('📦 Building project with bundle analysis...');
  execSync('pnpm run build', { stdio: 'inherit' });

  // Check if bundle report was generated
  const reportPath = path.join(__dirname, '..', 'bundle-report.html');
  if (fs.existsSync(reportPath)) {
    console.log('\n✅ Bundle analysis complete!');
    console.log(`📊 Report generated: ${reportPath}`);
    console.log('\n📈 Bundle Performance Summary:');

    // Read and parse the bundle report for summary
    const reportContent = fs.readFileSync(reportPath, 'utf8');

    // Extract basic stats (this is a simplified version)
    const totalSizeMatch = reportContent.match(/Total Size: ([0-9.]+ [KMGT]B)/);
    const chunkCountMatch = reportContent.match(/Chunks: (\d+)/);

    if (totalSizeMatch) {
      console.log(`   📏 Total Bundle Size: ${totalSizeMatch[1]}`);
    }
    if (chunkCountMatch) {
      console.log(`   📦 Number of Chunks: ${chunkCountMatch[1]}`);
    }

    console.log('\n💡 Performance Tips:');
    console.log('   • Consider code splitting for large components');
    console.log('   • Lazy load non-critical routes');
    console.log('   • Optimize images and use WebP format');
    console.log('   • Remove unused dependencies');
  } else {
    console.log('❌ Bundle report not found. Check build output for errors.');
  }
} catch (error) {
  console.error('❌ Bundle analysis failed:', error.message);
  process.exit(1);
}
