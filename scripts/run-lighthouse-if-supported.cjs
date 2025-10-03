#!/usr/bin/env node
/*
  Conditionally run Lighthouse (lhci autorun) only when Node version supports JSON import attributes (>=20.10.0).
  This avoids failures on environments (e.g. CI agents or local dev) still on 20.9.x where Lighthouse's ESM JSON imports break.
*/
const [major, minor] = process.versions.node.split('.').map(Number);
if (major > 20 || (major === 20 && minor >= 10)) {
  console.log(`Node ${process.versions.node} satisfies >=20.10.0; running Lighthouse...`);
  const { spawn } = require('child_process');
  const cmd = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
  const child = spawn(cmd, ['run', 'lighthouse'], { stdio: 'inherit' });
  child.on('exit', (code) => process.exit(code));
} else {
  console.log(
    `Skipping Lighthouse: Node ${process.versions.node} < 20.10.0 (upgrade to enable Lighthouse in test:full).`
  );
}
