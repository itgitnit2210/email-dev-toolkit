function lineNumberAt(text, index) {
  return text.slice(0, index).split('\n').length;
}

function addMatches(issues, text, regex, makeIssue) {
  let match;
  while ((match = regex.exec(text)) !== null) {
    issues.push(makeIssue(match, lineNumberAt(text, match.index)));
  }
}

function validateEmailHtml(html) {
  const issues = [];

  addMatches(issues, html, /<img\b(?![^>]*\balt\s*=)[^>]*>/gi, (match, line) => ({
    severity: 'error',
    line,
    message: 'Image is missing an alt attribute.',
  }));

  addMatches(issues, html, /<a\b[^>]*\bhref\s*=\s*["']\s*(?:#|javascript:void\(0\)|)["'][^>]*>/gi, (match, line) => ({
    severity: 'warning',
    line,
    message: 'Link has an empty or placeholder href.',
  }));

  addMatches(issues, html, /@media[^{}]*\{[\s\S]*?\.email-container\s*\{[^}]*\bwidth\s*:\s*(?!100%)(\d+)px\s*!important/gi, (match, line) => ({
    severity: 'warning',
    line,
    message: 'Mobile .email-container appears to use a fixed pixel width. Prefer width: 100% !important.',
  }));

  addMatches(issues, html, /<table\b(?![^>]*\brole\s*=\s*["']presentation["'])[^>]*>/gi, (match, line) => ({
    severity: 'info',
    line,
    message: 'Table does not declare role="presentation". Confirm whether it is a layout table.',
  }));

  addMatches(issues, html, /#[0-9A-Fa-f]{3}(?![0-9A-Fa-f])/g, (match, line) => ({
    severity: 'info',
    line,
    message: `Three-digit hex color ${match[0]} found. Six-digit colors are safer for strict email workflows.`,
  }));

  return issues.sort((a, b) => a.line - b.line);
}

module.exports = { validateEmailHtml };
