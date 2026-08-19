const vscode = require('vscode');
const { getEmailConfig } = require('../config/getConfig');
const { generateResponsiveTemplate } = require('../generators/templateGenerator');
const { getHtmlEditor, insertIntoEditor } = require('../utils/editor');

function registerInsertTemplateCommand() {
  return vscode.commands.registerCommand('emailDev.insertResponsiveTemplate', async () => {
    const editor = getHtmlEditor();
    if (!editor) return;

    try {
      const config = getEmailConfig();
      const template = generateResponsiveTemplate(config);
      await insertIntoEditor(editor, template);
    } catch (error) {
      vscode.window.showErrorMessage(`Unable to generate email template: ${error.message}`);
    }
  });
}

module.exports = { registerInsertTemplateCommand };
