const test = require('node:test');
const assert = require('node:assert/strict');
const { validateEmailHtml } = require('../src/utils/emailValidator');

test('validator catches missing alt and placeholder link', () => {
  const issues = validateEmailHtml('<a href="#"><img src="x.jpg"></a>');
  assert.ok(issues.some((issue) => issue.message.includes('alt')));
  assert.ok(issues.some((issue) => issue.message.includes('placeholder')));
});

test('validator accepts fluid mobile container width', () => {
  const html = '<style>@media only screen and (max-width:480px){.email-container{width:100% !important;}}</style>';
  const issues = validateEmailHtml(html);
  assert.ok(!issues.some((issue) => issue.message.includes('fixed pixel width')));
});
