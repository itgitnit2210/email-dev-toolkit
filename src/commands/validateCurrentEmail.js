const vscode = require('vscode');
const { getHtmlEditor } = require('../utils/editor');
const { validateEmailHtml } = require('../utils/emailValidator');

function registerValidateCurrentEmailCommand(outputChannel) {
  return vscode.commands.registerCommand('emailDev.validateCurrentEmail', async () => {
    const editor = getHtmlEditor();
    if (!editor) return;

    const text = editor.document.getText();
    const issues = validateEmailHtml(text);

    outputChannel.clear();
    outputChannel.appendLine(`Email Dev validation: ${editor.document.fileName}`);
    outputChannel.appendLine('');

    if (!issues.length) {
      outputChannel.appendLine('No issues found by the built-in checks.');
      vscode.window.showInformationMessage('Email Dev: no issues found by the built-in checks.');
      return;
    }

    for (const issue of issues) {
      outputChannel.appendLine(`[${issue.severity.toUpperCase()}] Line ${issue.line}: ${issue.message}`);
    }

    outputChannel.show(true);
    vscode.window.showWarningMessage(`Email Dev found ${issues.length} potential issue${issues.length === 1 ? '' : 's'}. See the output panel.`);
  });
}

module.exports = { registerValidateCurrentEmailCommand };
