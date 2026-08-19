const vscode = require('vscode');
const { getEmailConfig } = require('../config/getConfig');
const { generateButton } = require('../generators/buttonGenerator');
const { getHtmlEditor, insertIntoEditor } = require('../utils/editor');
const { validateHexColor, validatePositiveInteger } = require('../utils/validation');

function registerInsertButtonCommand() {
  return vscode.commands.registerCommand('emailDev.insertButton', async () => {
    const editor = getHtmlEditor();
    if (!editor) return;

    const config = getEmailConfig();

    const text = await vscode.window.showInputBox({ prompt: 'Button text', value: 'Learn more' });
    if (!text) return;

    const url = await vscode.window.showInputBox({ prompt: 'Button URL', value: 'https://example.com' });
    if (!url) return;

    const stylePick = await vscode.window.showQuickPick([
      { label: 'Solid square', radius: 0, borderWidth: 0 },
      { label: 'Solid rounded', radius: 22, borderWidth: 0 },
      { label: 'Outline rounded', radius: 22, borderWidth: 2 },
    ], {
      placeHolder: 'Button style',
    });
    if (!stylePick) return;

    const widthInput = await vscode.window.showInputBox({
      prompt: 'Button width in pixels',
      value: '280',
      validateInput(value) {
        return validatePositiveInteger(value, { min: 80, max: 600 }) === null
          ? 'Enter a whole number between 80 and 600.'
          : undefined;
      },
    });
    if (widthInput === undefined) return;

    const background = await vscode.window.showInputBox({
      prompt: 'Background color',
      value: stylePick.borderWidth > 0 ? '#ffffff' : '#000000',
      validateInput(value) {
        return validateHexColor(value) ? undefined : 'Use a six-digit hex color such as #000000.';
      },
    });
    if (!background) return;

    const foreground = await vscode.window.showInputBox({
      prompt: 'Text color',
      value: stylePick.borderWidth > 0 ? '#000000' : '#ffffff',
      validateInput(value) {
        return validateHexColor(value) ? undefined : 'Use a six-digit hex color such as #ffffff.';
      },
    });
    if (!foreground) return;

    const borderColor = stylePick.borderWidth > 0
      ? await vscode.window.showInputBox({
          prompt: 'Border color',
          value: '#000000',
          validateInput(value) {
            return validateHexColor(value) ? undefined : 'Use a six-digit hex color such as #000000.';
          },
        })
      : background;

    if (!borderColor) return;

    const html = generateButton({
      text,
      url,
      width: Number(widthInput),
      background,
      color: foreground,
      borderColor,
      borderWidth: stylePick.borderWidth,
      radius: stylePick.radius,
      fontFamily: config.defaultFontFamily,
      includeOutlookFallback: config.includeOutlookFallbacks,
    });

    await insertIntoEditor(editor, html);
  });
}

module.exports = { registerInsertButtonCommand };
