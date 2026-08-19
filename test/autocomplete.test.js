const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), 'utf8'));
}

function collectPrefixes(snippets) {
  const prefixes = new Set();

  for (const snippet of Object.values(snippets)) {
    const values = Array.isArray(snippet.prefix) ? snippet.prefix : [snippet.prefix];
    values.forEach((value) => prefixes.add(value));
  }

  return prefixes;
}

test('quick email autocomplete prefixes are available', () => {
  const files = [
    'snippets/structure.code-snippets',
    'snippets/content.code-snippets',
    'snippets/images.code-snippets',
    'snippets/buttons.code-snippets',
    'snippets/utilities.code-snippets',
  ];

  const prefixes = new Set();
  for (const file of files) {
    for (const prefix of collectPrefixes(readJson(file))) {
      prefixes.add(prefix);
    }
  }

  [
    'email-section',
    'email-table',
    'email-text',
    'email-link',
    'email-image',
    'email-button',
    'email-columns',
    'email-columns-6040',
    'email-columns-4060',
    'email-columns-reverse',
    'email-divider',
    'email-spacer',
    'email-bullet',
  ].forEach((prefix) => {
    assert.ok(prefixes.has(prefix), `Expected snippet prefix ${prefix}`);
  });
});

test('extension activates for HTML to provide dynamic email-template completion', () => {
  const manifest = readJson('package.json');
  assert.ok(manifest.activationEvents.includes('onLanguage:html'));
});
