const { buildResetCss } = require('../email/reset');
const { buildResponsiveCss } = require('../email/css');
const {
  buildMsoDocumentSettings,
  buildMsoFixedWrapperOpen,
  buildMsoFixedWrapperClose,
} = require('../email/outlook');

function indentBlock(text, spaces) {
  const prefix = ' '.repeat(spaces);
  return text.split('\n').map((line) => `${prefix}${line}`).join('\n');
}

function generateResponsiveTemplate(config) {
  const {
    desktopWidth,
    desktopPadding,
    defaultBackground,
    defaultFontFamily,
    includeOutlookFallbacks,
  } = config;

  const resetCss = indentBlock(buildResetCss(defaultFontFamily), 4);
  const responsiveCss = indentBlock(buildResponsiveCss(config), 4);
  const msoSettings = includeOutlookFallbacks
    ? `${indentBlock(buildMsoDocumentSettings(), 2)}\n`
    : '';
  const msoOpen = includeOutlookFallbacks
    ? `${indentBlock(buildMsoFixedWrapperOpen(desktopWidth), 8)}\n`
    : '';
  const msoClose = includeOutlookFallbacks
    ? `\n${indentBlock(buildMsoFixedWrapperClose(), 8)}`
    : '';

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="format-detection" content="telephone=no,date=no,address=no,email=no" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Email</title>
${msoSettings}  <style type="text/css">
${resetCss}

${responsiveCss}
  </style>
</head>
<body class="body" style="margin:0; padding:0; width:100%; background-color:${defaultBackground};">
  <div class="preheader" style="display:none; max-height:0; overflow:hidden; opacity:0; visibility:hidden; mso-hide:all;">
    Preview text goes here.
  </div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="${defaultBackground}" style="width:100%; background-color:${defaultBackground};">
    <tr>
      <td align="center" valign="top">
${msoOpen}        <table role="presentation" width="${desktopWidth}" cellspacing="0" cellpadding="0" border="0" class="email-container" style="width:${desktopWidth}px; max-width:${desktopWidth}px;">
          <tr>
            <td align="left" valign="top" class="mobile-padding" style="padding:0 ${desktopPadding}px;">
              <!-- EMAIL CONTENT START -->
              
              <!-- EMAIL CONTENT END -->
            </td>
          </tr>
        </table>${msoClose}
      </td>
    </tr>
  </table>
</body>
</html>`;
}

module.exports = { generateResponsiveTemplate };
