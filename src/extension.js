const vscode = require('vscode');

const { registerInsertTemplateCommand } = require('./commands/insertTemplate');
const { registerConfigureLayoutCommand } = require('./commands/configureLayout');
const { registerInsertColumnsCommand } = require('./commands/insertColumns');
const { registerInsertButtonCommand } = require('./commands/insertButton');
const { registerInsertResponsiveImageCommand } = require('./commands/insertResponsiveImage');
const { registerValidateCurrentEmailCommand } = require('./commands/validateCurrentEmail');
const { registerEmailCompletionProvider } = require('./completions/registerEmailCompletions');

function activate(context) {
  const outputChannel = vscode.window.createOutputChannel('Email Dev Toolkit');

  context.subscriptions.push(
    outputChannel,
    registerEmailCompletionProvider(),
    registerInsertTemplateCommand(),
    registerConfigureLayoutCommand(),
    registerInsertColumnsCommand(),
    registerInsertButtonCommand(),
    registerInsertResponsiveImageCommand(),
    registerValidateCurrentEmailCommand(outputChannel)
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
