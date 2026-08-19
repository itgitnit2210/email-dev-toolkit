const test = require('node:test');
const assert = require('node:assert/strict');
const { generateResponsiveTemplate } = require('../src/generators/templateGenerator');
const { DEFAULTS } = require('../src/config/defaults');

function config(overrides = {}) {
  return { ...DEFAULTS, ...overrides };
}

test('wide template uses 720px desktop and fluid mobile container', () => {
  const html = generateResponsiveTemplate(config());
  assert.match(html, /width="720"/);
  assert.match(html, /\.email-container\s*\{[\s\S]*?width:\s*100%\s*!important;/);
  assert.doesNotMatch(html, /\.email-container\s*\{[\s\S]*?width:\s*360px\s*!important;/);
  assert.match(html, /padding-left:\s*20px\s*!important;/);
});

test('classic template changes desktop width without fixing mobile width', () => {
  const html = generateResponsiveTemplate(config({
    desktopWidth: 600,
    mobilePreviewWidth: 320,
  }));
  assert.match(html, /width="600"/);
  assert.match(html, /width:\s*100%\s*!important;/);
  assert.doesNotMatch(html, /width:\s*320px\s*!important;/);
});
