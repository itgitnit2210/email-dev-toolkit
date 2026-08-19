const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const SCAN_DIRS = ['src', 'scripts', 'test'];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      files.push(fullPath);
    }
  }

  return files;
}

let failed = false;
for (const relativeDir of SCAN_DIRS) {
  const dir = path.join(ROOT, relativeDir);
  for (const file of walk(dir)) {
    const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
    if (result.status !== 0) {
      failed = true;
      process.stderr.write(result.stderr || result.stdout);
    }
  }
}

if (failed) {
  process.exit(1);
}

console.log('JavaScript syntax check passed.');
