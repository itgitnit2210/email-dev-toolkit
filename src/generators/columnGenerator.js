function normalizePercentages(percentages, count) {
  if (!Array.isArray(percentages) || percentages.length !== count) {
    return Array.from({ length: count }, () => 100 / count);
  }

  const total = percentages.reduce((sum, value) => sum + value, 0);
  if (total <= 0) {
    return Array.from({ length: count }, () => 100 / count);
  }

  return percentages.map((value) => (value / total) * 100);
}

function buildColumnCell(column) {
  return `    <td dir="ltr" width="${column.width.toFixed(2)}%" align="left" valign="top" class="mobile-stack" style="width:${column.width.toFixed(2)}%;">
      <!-- COLUMN ${column.number} CONTENT -->
    </td>`;
}

function buildGapCell(gap) {
  return `    <td width="${gap}" class="mobile-hide" style="width:${gap}px; font-size:0; line-height:0;">&nbsp;</td>`;
}

function interleaveWithGaps(columns, gap) {
  if (!gap) return columns.map(buildColumnCell).join('\n');

  const parts = [];
  columns.forEach((column, index) => {
    if (index > 0) {
      parts.push(buildGapCell(gap));
    }
    parts.push(buildColumnCell(column));
  });
  return parts.join('\n');
}

function generateColumns({ count = 2, percentages, gap = 0, reverseOnMobile = false } = {}) {
  const safeCount = Math.max(2, Math.min(4, Number(count) || 2));
  const widths = normalizePercentages(percentages, safeCount);
  const logicalColumns = widths.map((width, index) => ({
    number: index + 1,
    width,
  }));

  // For reverse mobile stacking, reverse source order and use RTL table direction.
  // RTL restores the intended left-to-right desktop presentation, while block-level
  // mobile cells follow the reversed source order.
  const sourceColumns = reverseOnMobile ? [...logicalColumns].reverse() : logicalColumns;
  const direction = reverseOnMobile ? ' dir="rtl"' : '';
  const cells = interleaveWithGaps(sourceColumns, Math.max(0, Number(gap) || 0));

  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"${direction}>
  <tr>
${cells}
  </tr>
</table>`;
}

module.exports = { generateColumns };
