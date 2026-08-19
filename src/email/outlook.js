function buildMsoFixedWrapperOpen(width) {
  return `<!--[if mso]>
<table role="presentation" width="${width}" align="center" cellspacing="0" cellpadding="0" border="0">
  <tr>
    <td>
<![endif]-->`;
}

function buildMsoFixedWrapperClose() {
  return `<!--[if mso]>
    </td>
  </tr>
</table>
<![endif]-->`;
}

function buildMsoDocumentSettings() {
  return `<!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->`;
}

module.exports = {
  buildMsoFixedWrapperOpen,
  buildMsoFixedWrapperClose,
  buildMsoDocumentSettings,
};
