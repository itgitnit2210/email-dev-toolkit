# Email Dev Toolkit

A general-purpose VS Code extension for responsive HTML email development.

## Core responsive model

- Desktop uses a configurable maximum design width. Default: `720px`.
- Production mobile width is fluid: `100%`.
- Mobile preview width is a reference value only. Default: `360px`.
- Mobile inner spacing is controlled with horizontal padding. Default: `20px` per side.
- Images can scale fluidly.
- Columns can stack or reverse-stack on mobile.
- Outlook fallbacks are optional and generated only where needed.

## Commands

Open the Command Palette and search for `Email Dev`:

- **Email Dev: Insert Responsive Email Template**
- **Email Dev: Configure Layout**
- **Email Dev: Insert Columns**
- **Email Dev: Insert Button**
- **Email Dev: Insert Responsive Image**
- **Email Dev: Validate Current Email**

## Snippets

Type `email-` in an HTML file. Included snippets cover:

- presentation tables
- padded sections
- spacers and dividers
- two-column layouts
- text, links, bullets, preheaders, superscript
- fluid, linked, and fixed images
- simple buttons
- mobile visibility helpers

Dynamic structures such as full templates, configurable buttons, responsive images, and columns are generated through commands rather than duplicated as width-specific snippets.

## Settings

```json
{
  "emailDev.desktopWidth": 720,
  "emailDev.mobilePreviewWidth": 360,
  "emailDev.desktopPadding": 40,
  "emailDev.mobilePadding": 20,
  "emailDev.mobileBreakpoint": 480,
  "emailDev.defaultBackground": "#ffffff",
  "emailDev.defaultFontFamily": "Arial, Helvetica, sans-serif",
  "emailDev.imageDirectory": "images",
  "emailDev.includeOutlookFallbacks": true
}
```

`mobilePreviewWidth` does not set a fixed production width. Generated mobile CSS uses `width: 100% !important` for the email container.

## Run locally

```bash
npm install
```

Open the project in VS Code and press `F5`. A new Extension Development Host window will open.

## Validate the project

```bash
npm run check
npm test
```

## Build a VSIX

No global package installation is required.

```bash
npm install
npm run package
```

The package script runs syntax checks, snippet validation, terminology checks, automated tests, and then packages the extension with the locally installed packaging tool.

## Project structure

```text
src/
  commands/      Command Palette workflows
  generators/    Dynamic email markup generators
  config/        Defaults, presets, and settings access
  email/         Shared CSS, reset, Outlook, and markup helpers
  utils/         Editor and validation helpers
snippets/        Static reusable HTML snippets
scripts/         Project quality checks
test/            Automated tests
```

## Design principles

1. Semantic class names instead of dimension-based class names.
2. Fixed or maximum desktop design width, fluid production mobile width.
3. Padding for mobile gutters instead of a fixed inner mobile table.
4. Static patterns stay snippets; configurable patterns use generators.
5. Component-specific widths, such as buttons and icons, do not automatically scale when the email container width changes.
6. Generated markup remains platform-neutral and intended for general email development.
