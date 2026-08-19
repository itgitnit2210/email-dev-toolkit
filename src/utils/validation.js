const HEX_6 = /^#[0-9A-Fa-f]{6}$/;

function isFiniteInteger(value) {
  return Number.isInteger(value) && Number.isFinite(value);
}

function validateLayoutConfig(config) {
  const errors = [];

  if (!isFiniteInteger(config.desktopWidth) || config.desktopWidth < 320 || config.desktopWidth > 1200) {
    errors.push('Desktop width must be an integer between 320 and 1200.');
  }

  if (!isFiniteInteger(config.mobilePreviewWidth) || config.mobilePreviewWidth < 280 || config.mobilePreviewWidth > 600) {
    errors.push('Mobile preview width must be an integer between 280 and 600.');
  }

  if (config.mobilePreviewWidth > config.desktopWidth) {
    errors.push('Mobile preview width cannot be greater than desktop width.');
  }

  if (!isFiniteInteger(config.desktopPadding) || config.desktopPadding < 0 || config.desktopPadding > 160) {
    errors.push('Desktop padding must be an integer between 0 and 160.');
  }

  if (!isFiniteInteger(config.mobilePadding) || config.mobilePadding < 0 || config.mobilePadding > 80) {
    errors.push('Mobile padding must be an integer between 0 and 80.');
  }

  if (config.mobilePadding * 2 >= config.mobilePreviewWidth) {
    errors.push('Mobile padding is too large for the configured mobile preview width.');
  }

  if (!isFiniteInteger(config.mobileBreakpoint) || config.mobileBreakpoint < 320 || config.mobileBreakpoint > 900) {
    errors.push('Mobile breakpoint must be an integer between 320 and 900.');
  }

  if (config.mobileBreakpoint < config.mobilePreviewWidth) {
    errors.push('Mobile breakpoint should be greater than or equal to the mobile preview width.');
  }

  if (!HEX_6.test(config.defaultBackground)) {
    errors.push('Default background must be a six-digit hex color such as #ffffff.');
  }

  if (typeof config.defaultFontFamily !== 'string' || !config.defaultFontFamily.trim()) {
    errors.push('Default font family cannot be empty.');
  }

  if (typeof config.imageDirectory !== 'string' || !config.imageDirectory.trim()) {
    errors.push('Image directory cannot be empty.');
  }

  return errors;
}

function validateHexColor(value) {
  return HEX_6.test(value);
}

function validatePositiveInteger(value, { min = 1, max = 5000 } = {}) {
  const number = Number(value);
  if (!Number.isInteger(number) || number < min || number > max) {
    return null;
  }
  return number;
}

module.exports = {
  validateLayoutConfig,
  validateHexColor,
  validatePositiveInteger,
};
