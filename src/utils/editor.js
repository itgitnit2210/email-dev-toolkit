const vscode = require('vscode');

function getHtmlEditor() {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage('Open an HTML file before using Email Dev Toolkit.');
    return null;
  }

  if (editor.document.languageId !== 'html') {
    vscode.window.showWarningMessage('Email Dev Toolkit is designed for HTML email files.');
  }

  return editor;
}

async function insertIntoEditor(editor, text) {
  const selection = editor.selection;

  return editor.edit((editBuilder) => {
    if (!selection.isEmpty) {
      editBuilder.replace(selection, text);
    } else {
      editBuilder.insert(selection.active, text);
    }
  });
}

module.exports = {
  getHtmlEditor,
  insertIntoEditor,
};
