# Email Dev Toolkit

A general-purpose VS Code extension for responsive HTML email development.

## Fastest workflow: type `email-`

Open an HTML file and type:

```text
email-
```

VS Code IntelliSense will show the available email-development snippets. Select one and press `Enter` or `Tab`.

Common quick inserts:

- `email-template` — complete responsive email shell generated from your current extension settings
- `email-section` — padded email section
- `email-table` — presentation table
- `email-text` — email-safe text row
- `email-link` — styled link
- `email-image` — fluid responsive image
- `email-image-link` — clickable fluid image
- `email-button` — simple HTML email button
- `email-columns` — 50/50 responsive columns
- `email-columns-6040` — 60/40 responsive columns
- `email-columns-4060` — 40/60 responsive columns
- `email-columns-reverse` — 50/50 columns that reverse stack order on mobile
- `email-divider` — divider row
- `email-spacer` — vertical spacer
- `email-bullet` — table-based bullet row
- `email-preheader` — hidden preview text
- `email-mobile-hide` — mobile visibility helper
- `email-mobile-show` — mobile-only visibility helper

The static `email-` snippets are optimized for speed. The Command Palette workflows remain available when you need configurable values such as custom column ratios, gaps, button dimensions, or image behavior.

## Core responsive model

- Desktop uses a configurable maximum design width. Default: `720px`.
- Production mobile width is fluid: `100%`.
- Mobile preview width is a reference value only. Default: `360px`.
- Mobile inner spacing is controlled with horizontal padding. Default: `20px` per side.
- Images can scale fluidly.
- Columns can stack or reverse-stack on mobile.
- Outlook fallbacks are optional and generated only where needed.

Choosing a `720px` desktop width does not force a `360px` production mobile width. At the configured mobile breakpoint, the generated `.email-container` becomes `width: 100% !important`, so it follows the available device width.

## Commands

Open the Command Palette and search for `Email Dev`:

- **Email Dev: Insert Responsive Email Template**
- **Email Dev: Configure Layout**
- **Email Dev: Insert Columns**
- **Email Dev: Insert Button**
- **Email Dev: Insert Responsive Image**
- **Email Dev: Validate Current Email**

Use commands when you need interactive configuration. For everyday markup insertion, type `email-` directly in an HTML file.

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
  completions/   Dynamic HTML IntelliSense completions
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
