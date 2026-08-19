const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const IGNORE = new Set(['node_modules', '.git']);
const ALLOWED_EXTENSIONS = new Set(['.js', '.json', '.md', '.txt', '.code-snippets']);

const encodedTerms = [
  'dmVldmE=',
  'cGZpemVy',
  'YmlvZ2Vu',
  'cHJvbW9tYXRz'
];
const blockedTerms = encodedTerms.map((value) => Buffer.from(value, 'base64').toString('utf8').toLowerCase());

function walk(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walk(fullPath));
      continue;
    }

    const extension = entry.name.endsWith('.code-snippets') ? '.code-snippets' : path.extname(entry.name);
    if (ALLOWED_EXTENSIONS.has(extension)) {
      results.push(fullPath);
    }
  }
  return results;
}

const violations = [];
for (const file of walk(ROOT)) {
  if (path.basename(file) === path.basename(__filename)) continue;
  const content = fs.readFileSync(file, 'utf8').toLowerCase();
  for (const term of blockedTerms) {
    if (content.includes(term)) {
      violations.push(`${path.relative(ROOT, file)} contains blocked terminology.`);
    }
  }
}

if (violations.length) {
  console.error(violations.join('\n'));
  process.exit(1);
}

console.log('Terminology check passed.');
