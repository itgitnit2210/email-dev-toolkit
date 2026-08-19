const vscode = require('vscode');
const { generateColumns } = require('../generators/columnGenerator');
const { getHtmlEditor, insertIntoEditor } = require('../utils/editor');
const { validatePositiveInteger } = require('../utils/validation');

function percentagePresets(count) {
  if (count === 2) {
    return [
      { label: '50 / 50', values: [50, 50] },
      { label: '60 / 40', values: [60, 40] },
      { label: '40 / 60', values: [40, 60] },
      { label: '70 / 30', values: [70, 30] },
      { label: '30 / 70', values: [30, 70] },
    ];
  }

  if (count === 3) {
    return [
      { label: '33 / 33 / 33', values: [33.33, 33.33, 33.34] },
      { label: '25 / 50 / 25', values: [25, 50, 25] },
    ];
  }

  return [
    { label: '25 / 25 / 25 / 25', values: [25, 25, 25, 25] },
  ];
}

function registerInsertColumnsCommand() {
  return vscode.commands.registerCommand('emailDev.insertColumns', async () => {
    const editor = getHtmlEditor();
    if (!editor) return;

    const countPick = await vscode.window.showQuickPick(['2', '3', '4'], {
      placeHolder: 'Number of columns',
    });
    if (!countPick) return;

    const count = Number(countPick);
    const ratioPick = await vscode.window.showQuickPick(percentagePresets(count), {
      placeHolder: 'Desktop column ratio',
    });
    if (!ratioPick) return;

    const orderPick = await vscode.window.showQuickPick([
      { label: 'Normal', description: 'Keep desktop order when stacking', reverse: false },
      { label: 'Reverse', description: 'Reverse the visual order on mobile', reverse: true },
    ], {
      placeHolder: 'Mobile stacking order',
    });
    if (!orderPick) return;

    const gapInput = await vscode.window.showInputBox({
      prompt: 'Column gap in pixels',
      value: '0',
      validateInput(value) {
        return validatePositiveInteger(value, { min: 0, max: 120 }) === null
          ? 'Enter a whole number between 0 and 120.'
          : undefined;
      },
    });
    if (gapInput === undefined) return;

    const html = generateColumns({
      count,
      percentages: ratioPick.values,
      gap: Number(gapInput),
      reverseOnMobile: orderPick.reverse,
    });

    await insertIntoEditor(editor, html);
  });
}

module.exports = { registerInsertColumnsCommand };
