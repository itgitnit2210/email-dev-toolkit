const test = require('node:test');
const assert = require('node:assert/strict');
const { generateColumns } = require('../src/generators/columnGenerator');

test('two columns support 60/40 layout', () => {
  const html = generateColumns({ count: 2, percentages: [60, 40] });
  assert.match(html, /COLUMN 1 CONTENT/);
  assert.match(html, /width="60\.00%"/);
  assert.match(html, /COLUMN 2 CONTENT/);
  assert.match(html, /width="40\.00%"/);
  assert.match(html, /mobile-stack/);
});

test('reverse mobile stacking reverses source order while enabling RTL desktop layout', () => {
  const html = generateColumns({ count: 2, percentages: [60, 40], reverseOnMobile: true });
  assert.match(html, /dir="rtl"/);
  assert.ok(html.indexOf('COLUMN 2 CONTENT') < html.indexOf('COLUMN 1 CONTENT'));
  assert.match(html, /width="40\.00%"[\s\S]*?COLUMN 2 CONTENT/);
  assert.match(html, /width="60\.00%"[\s\S]*?COLUMN 1 CONTENT/);
});

test('column gap uses a fixed spacer cell that hides on mobile', () => {
  const html = generateColumns({ count: 2, percentages: [50, 50], gap: 20 });
  assert.match(html, /width="20" class="mobile-hide"/);
});
