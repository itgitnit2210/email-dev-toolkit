const PRESETS = Object.freeze({
  wide: Object.freeze({
    label: 'Wide',
    description: '720px desktop, 360px mobile preview, fluid production mobile',
    desktopWidth: 720,
    mobilePreviewWidth: 360,
    desktopPadding: 40,
    mobilePadding: 20,
    mobileBreakpoint: 480,
  }),
  classic: Object.freeze({
    label: 'Classic',
    description: '600px desktop, 320px mobile preview, fluid production mobile',
    desktopWidth: 600,
    mobilePreviewWidth: 320,
    desktopPadding: 40,
    mobilePadding: 20,
    mobileBreakpoint: 480,
  }),
});

module.exports = { PRESETS };
