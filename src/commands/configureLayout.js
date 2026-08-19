const vscode = require('vscode');
const { PRESETS } = require('../config/presets');
const { DEFAULTS } = require('../config/defaults');
const { updateEmailConfig } = require('../config/getConfig');
const { validateLayoutConfig, validatePositiveInteger } = require('../utils/validation');

async function askNumber(prompt, value, min, max) {
  const result = await vscode.window.showInputBox({
    prompt,
    value: String(value),
    validateInput(input) {
      return validatePositiveInteger(input, { min, max }) === null
        ? `Enter a whole number between ${min} and ${max}.`
        : undefined;
    },
  });

  return result === undefined ? undefined : Number(result);
}

async function collectCustomValues(seed) {
  const desktopWidth = await askNumber('Desktop email width in pixels', seed.desktopWidth, 320, 1200);
  if (desktopWidth === undefined) return null;

  const mobilePreviewWidth = await askNumber('Mobile preview reference width in pixels', seed.mobilePreviewWidth, 280, 600);
  if (mobilePreviewWidth === undefined) return null;

  const desktopPadding = await askNumber('Desktop horizontal padding in pixels', seed.desktopPadding, 0, 160);
  if (desktopPadding === undefined) return null;

  const mobilePadding = await askNumber('Mobile horizontal padding in pixels', seed.mobilePadding, 0, 80);
  if (mobilePadding === undefined) return null;

  const mobileBreakpoint = await askNumber('Mobile breakpoint in pixels', seed.mobileBreakpoint, 320, 900);
  if (mobileBreakpoint === undefined) return null;

  return {
    desktopWidth,
    mobilePreviewWidth,
    desktopPadding,
    mobilePadding,
    mobileBreakpoint,
  };
}

function registerConfigureLayoutCommand() {
  return vscode.commands.registerCommand('emailDev.configureLayout', async () => {
    const selection = await vscode.window.showQuickPick([
      { label: PRESETS.wide.label, description: PRESETS.wide.description, value: 'wide' },
      { label: PRESETS.classic.label, description: PRESETS.classic.description, value: 'classic' },
      { label: 'Custom', description: 'Choose widths, padding, and breakpoint', value: 'custom' },
    ], {
      placeHolder: 'Choose an email layout preset',
    });

    if (!selection) return;

    let values;
    if (selection.value === 'custom') {
      values = await collectCustomValues(DEFAULTS);
      if (!values) return;
    } else {
      const preset = PRESETS[selection.value];
      values = {
        desktopWidth: preset.desktopWidth,
        mobilePreviewWidth: preset.mobilePreviewWidth,
        desktopPadding: preset.desktopPadding,
        mobilePadding: preset.mobilePadding,
        mobileBreakpoint: preset.mobileBreakpoint,
      };
    }

    const validationInput = {
      ...DEFAULTS,
      ...values,
    };
    const errors = validateLayoutConfig(validationInput);
    if (errors.length) {
      vscode.window.showErrorMessage(errors.join(' '));
      return;
    }

    const targetPick = await vscode.window.showQuickPick([
      { label: 'User Settings', description: 'Use this layout in all workspaces', target: vscode.ConfigurationTarget.Global },
      { label: 'Workspace Settings', description: 'Use this layout only in the current workspace', target: vscode.ConfigurationTarget.Workspace },
    ], {
      placeHolder: 'Where should these settings be saved?',
    });

    if (!targetPick) return;

    await updateEmailConfig(values, targetPick.target);
    vscode.window.showInformationMessage('Email layout settings updated. Mobile production width remains fluid.');
  });
}

module.exports = { registerConfigureLayoutCommand };
