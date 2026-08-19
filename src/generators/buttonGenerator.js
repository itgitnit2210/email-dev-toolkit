const { escapeHtml, escapeAttribute } = require('../email/utilities');

function generateButton(options) {
  const {
    text,
    url,
    width = 280,
    height = 44,
    background = '#000000',
    color = '#ffffff',
    borderColor = background,
    borderWidth = 0,
    radius = 0,
    fontSize = 16,
    fontFamily = 'Arial, Helvetica, sans-serif',
    align = 'center',
    includeOutlookFallback = true,
  } = options;

  const safeText = escapeHtml(text);
  const safeUrl = escapeAttribute(url);
  const arcsize = Math.max(0, Math.min(100, Math.round((radius / Math.max(1, height)) * 200)));
  const stroke = borderWidth > 0 ? 't' : 'f';
  const borderStyle = borderWidth > 0 ? `border:${borderWidth}px solid ${borderColor};` : '';

  const msoOpen = includeOutlookFallback
    ? `<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${safeUrl}" style="height:${height}px;v-text-anchor:middle;width:${width}px;" arcsize="${arcsize}%" stroke="${stroke}" strokecolor="${borderColor}" strokeweight="${borderWidth}px" fillcolor="${background}">
  <w:anchorlock/>
  <center style="color:${color};font-family:${fontFamily};font-size:${fontSize}px;font-weight:bold;">
<![endif]-->`
    : '';

  const msoClose = includeOutlookFallback
    ? `<!--[if mso]>
  </center>
</v:roundrect>
<![endif]-->`
    : '';

  return `<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="${align}">
  <tr>
    <td align="${align}" valign="middle">
      ${msoOpen}
      <a href="${safeUrl}" target="_blank" title="${safeText}" style="display:inline-block;width:${width}px;background-color:${background};color:${color};${borderStyle}border-radius:${radius}px;font-family:${fontFamily};font-size:${fontSize}px;font-weight:bold;line-height:${height}px;text-align:center;text-decoration:none;-webkit-text-size-adjust:none;mso-hide:all;">
        ${safeText}
      </a>
      ${msoClose}
    </td>
  </tr>
</table>`;
}

module.exports = { generateButton };
