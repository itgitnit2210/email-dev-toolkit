const vscode = require('vscode');
const { DEFAULTS } = require('./defaults');
const { validateLayoutConfig } = require('../utils/validation');

function readValue(config, key) {
  return config.get(key, DEFAULTS[key]);
}

function getEmailConfig() {
  const config = vscode.workspace.getConfiguration('emailDev');

  const values = {
    desktopWidth: readValue(config, 'desktopWidth'),
    mobilePreviewWidth: readValue(config, 'mobilePreviewWidth'),
    desktopPadding: readValue(config, 'desktopPadding'),
    mobilePadding: readValue(config, 'mobilePadding'),
    mobileBreakpoint: readValue(config, 'mobileBreakpoint'),
    defaultBackground: readValue(config, 'defaultBackground'),
    defaultFontFamily: readValue(config, 'defaultFontFamily'),
    imageDirectory: readValue(config, 'imageDirectory'),
    includeOutlookFallbacks: readValue(config, 'includeOutlookFallbacks'),
  };

  const errors = validateLayoutConfig(values);
  if (errors.length) {
    throw new Error(errors.join(' '));
  }

  return values;
}

async function updateEmailConfig(values, target = vscode.ConfigurationTarget.Global) {
  const config = vscode.workspace.getConfiguration('emailDev');
  const entries = Object.entries(values);

  for (const [key, value] of entries) {
    await config.update(key, value, target);
  }
}

module.exports = {
  getEmailConfig,
  updateEmailConfig,
};
