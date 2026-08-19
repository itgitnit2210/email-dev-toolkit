const vscode = require('vscode');
const { getEmailConfig } = require('../config/getConfig');
const { generateFluidImage, generateResponsiveSwapImage } = require('../generators/imageGenerator');
const { getHtmlEditor, insertIntoEditor } = require('../utils/editor');
const { validatePositiveInteger } = require('../utils/validation');

function joinImagePath(directory, fileName) {
  const cleanDir = String(directory || '').replace(/^\/+|\/+$/g, '');
  const cleanFile = String(fileName || '').replace(/^\/+/, '');
  return cleanDir ? `${cleanDir}/${cleanFile}` : cleanFile;
}

function registerInsertResponsiveImageCommand() {
  return vscode.commands.registerCommand('emailDev.insertResponsiveImage', async () => {
    const editor = getHtmlEditor();
    if (!editor) return;

    const config = getEmailConfig();
    const mode = await vscode.window.showQuickPick([
      { label: 'Fluid image', value: 'fluid', description: 'One image that scales with its container' },
      { label: 'Desktop / mobile swap', value: 'swap', description: 'Use different artwork on desktop and mobile' },
    ], {
      placeHolder: 'Responsive image type',
    });
    if (!mode) return;

    const alt = await vscode.window.showInputBox({ prompt: 'Alt text', value: 'Descriptive image text' });
    if (alt === undefined) return;

    const widthInput = await vscode.window.showInputBox({
      prompt: 'Maximum desktop image width in pixels',
      value: String(config.desktopWidth),
      validateInput(value) {
        return validatePositiveInteger(value, { min: 1, max: 2000 }) === null
          ? 'Enter a whole number between 1 and 2000.'
          : undefined;
      },
    });
    if (widthInput === undefined) return;

    const linkUrl = await vscode.window.showInputBox({
      prompt: 'Optional link URL. Leave blank for a non-clickable image.',
      value: '',
    });
    if (linkUrl === undefined) return;

    let html;
    if (mode.value === 'fluid') {
      const imageName = await vscode.window.showInputBox({ prompt: 'Image file name', value: 'hero.jpg' });
      if (!imageName) return;

      html = generateFluidImage({
        src: joinImagePath(config.imageDirectory, imageName),
        alt,
        width: Number(widthInput),
        linkUrl,
      });
    } else {
      const desktopName = await vscode.window.showInputBox({ prompt: 'Desktop image file name', value: 'hero-desktop.jpg' });
      if (!desktopName) return;

      const mobileName = await vscode.window.showInputBox({ prompt: 'Mobile image file name', value: 'hero-mobile.jpg' });
      if (!mobileName) return;

      html = generateResponsiveSwapImage({
        desktopSrc: joinImagePath(config.imageDirectory, desktopName),
        mobileSrc: joinImagePath(config.imageDirectory, mobileName),
        alt,
        width: Number(widthInput),
        linkUrl,
      });
    }

    await insertIntoEditor(editor, html);
  });
}

module.exports = { registerInsertResponsiveImageCommand };
