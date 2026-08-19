const test = require('node:test');
const assert = require('node:assert/strict');
const { generateButton } = require('../src/generators/buttonGenerator');

test('button includes VML fallback when enabled', () => {
  const html = generateButton({
    text: 'Learn more',
    url: 'https://example.com',
    width: 280,
    height: 44,
    radius: 22,
    background: '#000000',
    color: '#ffffff',
    includeOutlookFallback: true,
  });

  assert.match(html, /<v:roundrect/);
  assert.match(html, /href="https:\/\/example\.com"/);
});

test('button can omit VML fallback', () => {
  const html = generateButton({
    text: 'Learn more',
    url: 'https://example.com',
    includeOutlookFallback: false,
  });

  assert.doesNotMatch(html, /<v:roundrect/);
});
