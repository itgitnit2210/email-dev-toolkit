function buildResetCss(fontFamily) {
  return `
    html,
    body {
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      height: 100% !important;
    }

    body {
      font-family: ${fontFamily};
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    table {
      border-spacing: 0;
    }

    img {
      border: 0;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    a {
      text-decoration: none;
    }

    a[x-apple-data-detectors],
    u + .body a,
    #MessageViewBody a {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }

    .preheader {
      display: none !important;
      max-height: 0 !important;
      max-width: 0 !important;
      opacity: 0 !important;
      overflow: hidden !important;
      visibility: hidden !important;
      mso-hide: all !important;
      font-size: 1px !important;
      line-height: 1px !important;
    }
  `.trim();
}

module.exports = { buildResetCss };
