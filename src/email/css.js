function buildResponsiveCss(config) {
  const { mobileBreakpoint, mobilePadding } = config;

  return `
    @media only screen and (max-width: ${mobileBreakpoint}px) {
      .email-container {
        width: 100% !important;
        max-width: 100% !important;
      }

      .mobile-stack {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
      }

      .mobile-padding {
        padding-left: ${mobilePadding}px !important;
        padding-right: ${mobilePadding}px !important;
      }

      .mobile-padding-reset {
        padding-left: 0 !important;
        padding-right: 0 !important;
      }

      .mobile-full-width {
        width: 100% !important;
        max-width: 100% !important;
      }

      .fluid-image {
        width: 100% !important;
        max-width: 100% !important;
        height: auto !important;
      }

      .mobile-center {
        text-align: center !important;
        margin-left: auto !important;
        margin-right: auto !important;
      }

      .mobile-left {
        text-align: left !important;
      }

      .mobile-hide {
        display: none !important;
        max-height: 0 !important;
        overflow: hidden !important;
        mso-hide: all !important;
      }

      .mobile-show {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        max-height: none !important;
        overflow: visible !important;
      }
    }
  `.trim();
}

module.exports = { buildResponsiveCss };
