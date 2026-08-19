function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function normalizePathSegment(value) {
  return String(value).replace(/^\/+|\/+$/g, '');
}

module.exports = {
  escapeHtml,
  escapeAttribute,
  normalizePathSegment,
};
