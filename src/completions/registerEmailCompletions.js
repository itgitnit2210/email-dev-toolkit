const vscode = require('vscode');

const { getEmailConfig } = require('../config/getConfig');
const { generateResponsiveTemplate } = require('../generators/templateGenerator');

const TEMPLATE_MARKER = [
  '              <!-- EMAIL CONTENT START -->',
  '              ',
  '              <!-- EMAIL CONTENT END -->',
].join('\n');

function getTypedEmailPrefix(document, position) {
  const lineText = document.lineAt(position.line).text.slice(0, position.character);
  const match = lineText.match(/(?:^|[\s>])((?:email-)[A-Za-z0-9-]*)$/);

  if (!match) {
    return null;
  }

  const value = match[1];
  return {
    value,
    startCharacter: position.character - value.length,
  };
}

function buildTemplateSnippet(config) {
  const template = generateResponsiveTemplate(config);
  const markerIndex = template.indexOf(TEMPLATE_MARKER);

  if (markerIndex === -1) {
    const fallback = new vscode.SnippetString();
    fallback.appendText(template);
    return fallback;
  }

  const beforeMarker = '              <!-- EMAIL CONTENT START -->\n              ';
  const afterMarker = '\n              <!-- EMAIL CONTENT END -->';
  const snippet = new vscode.SnippetString();

  snippet.appendText(template.slice(0, markerIndex));
  snippet.appendText(beforeMarker);
  snippet.appendTabstop(0);
  snippet.appendText(afterMarker);
  snippet.appendText(template.slice(markerIndex + TEMPLATE_MARKER.length));

  return snippet;
}

function createTemplateCompletion(document, position, typedPrefix) {
  let config;
  try {
    config = getEmailConfig();
  } catch (error) {
    return null;
  }

  const item = new vscode.CompletionItem('email-template', vscode.CompletionItemKind.Snippet);
  item.detail = 'Email Dev Toolkit · responsive template using current settings';
  item.documentation = new vscode.MarkdownString(
    'Insert a complete responsive HTML email shell using your current Email Dev Toolkit settings. Mobile output remains fluid.'
  );
  item.filterText = 'email-template';
  item.sortText = '000-email-template';
  item.range = new vscode.Range(
    position.line,
    typedPrefix.startCharacter,
    position.line,
    position.character
  );
  item.insertText = buildTemplateSnippet(config);

  return item;
}

function registerEmailCompletionProvider() {
  return vscode.languages.registerCompletionItemProvider(
    { language: 'html' },
    {
      provideCompletionItems(document, position) {
        const typedPrefix = getTypedEmailPrefix(document, position);
        if (!typedPrefix) {
          return undefined;
        }

        const templateCompletion = createTemplateCompletion(document, position, typedPrefix);
        return templateCompletion ? [templateCompletion] : [];
      },
    },
    '-'
  );
}

module.exports = {
  registerEmailCompletionProvider,
};
