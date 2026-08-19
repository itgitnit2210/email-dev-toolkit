const fs = require('fs');
const path = require('path');

const snippetsDir = path.resolve(__dirname, '..', 'snippets');
const files = fs.readdirSync(snippetsDir).filter((name) => name.endsWith('.code-snippets'));

let count = 0;
for (const fileName of files) {
  const fullPath = path.join(snippetsDir, fileName);
  const parsed = JSON.parse(fs.readFileSync(fullPath, 'utf8'));

  for (const [name, snippet] of Object.entries(parsed)) {
    if (!snippet.prefix || !snippet.body || !snippet.description) {
      throw new Error(`${fileName}: snippet "${name}" must include prefix, body, and description.`);
    }

    if (!Array.isArray(snippet.body)) {
      throw new Error(`${fileName}: snippet "${name}" body must be an array.`);
    }

    count += 1;
  }
}

console.log(`Snippet validation passed (${count} snippets).`);
