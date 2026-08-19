const { escapeAttribute } = require('../email/utilities');

function wrapWithLink(content, url, alt) {
  if (!url) {
    return content;
  }

  return `<a href="${escapeAttribute(url)}" target="_blank" title="${escapeAttribute(alt)}" style="display:block; border:0; text-decoration:none;">
  ${content}
</a>`;
}

function generateFluidImage({ src, alt, width, linkUrl = '' }) {
  const image = `<img src="${escapeAttribute(src)}" width="${width}" alt="${escapeAttribute(alt)}" border="0" class="fluid-image" style="display:block; width:100%; max-width:${width}px; height:auto;" />`;
  return wrapWithLink(image, linkUrl, alt);
}

function generateResponsiveSwapImage({ desktopSrc, mobileSrc, alt, width, linkUrl = '' }) {
  const desktop = wrapWithLink(
    `<img src="${escapeAttribute(desktopSrc)}" width="${width}" alt="${escapeAttribute(alt)}" border="0" class="fluid-image" style="display:block; width:100%; max-width:${width}px; height:auto;" />`,
    linkUrl,
    alt
  );

  const mobile = wrapWithLink(
    `<img src="${escapeAttribute(mobileSrc)}" width="100%" alt="${escapeAttribute(alt)}" border="0" style="display:block; width:100%; max-width:100%; height:auto;" />`,
    linkUrl,
    alt
  );

  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
  <tr>
    <td align="left" valign="top" class="mobile-hide">
      ${desktop}
    </td>
  </tr>
  <!--[if !mso]><!-->
  <tr>
    <td align="left" valign="top" class="mobile-show" style="display:none; max-height:0; overflow:hidden;">
      ${mobile}
    </td>
  </tr>
  <!--<![endif]-->
</table>`;
}

module.exports = {
  generateFluidImage,
  generateResponsiveSwapImage,
};
