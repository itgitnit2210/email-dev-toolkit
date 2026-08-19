# Email Dev Toolkit

Build responsive HTML emails faster inside VS Code.

Open an HTML file, type `email-`, choose what you need, and keep coding. The extension gives you reusable email markup, responsive layouts, Outlook friendly fallbacks, and a quick validation check before handoff.

## Start in a few seconds

1. Create or open an `.html` file.
2. Type `email-`.
3. Choose a suggestion from IntelliSense.
4. Press `Enter` or `Tab`.

If suggestions do not open automatically, press `Control + Space`.

For a brand new email, start with:

```text
email-template
```

That inserts the complete responsive email shell using your current Email Dev Toolkit settings.

## A simple workflow

For most emails, you can work like this:

```text
email-template

email-image

email-text

email-button

email-columns

email-divider

email-text
```

You can mix the snippets in any order. They are normal HTML, so after insertion you can edit everything yourself.

## What `email-template` gives you

The template creates the base structure developers usually have to write again and again:

- XHTML email document structure
- Email reset styles
- Responsive CSS
- Hidden preheader text
- Centered desktop container
- Fluid mobile container
- Mobile padding
- Outlook support when enabled
- A clear place to start adding content

The default desktop width is `720px`.

On smaller screens, the email does not stay `720px` and it does not become a fixed `360px` template. The container becomes fluid and uses the available screen width.

```text
Desktop
Maximum email width: 720px

Mobile
Email width: 100% of the available screen
```

The default mobile breakpoint is `480px` and the default mobile padding is `20px` on each side.

`360px` is only the mobile preview reference. It does not force the production email to be 360px wide.

## Quick inserts

Type `email-` and choose from the suggestions.

**`email-template`**

Complete responsive email shell using your current settings.

**`email-section`**

A padded content section.

**`email-table`**

A presentation table for email layout.

**`email-text`**

A text row with common email safe typography styles.

**`email-link`**

A styled link ready to edit.

**`email-image`**

A fluid image that can scale with the email container.

**`email-image-link`**

A clickable fluid image.

**`email-button`**

A quick HTML email button.

**`email-columns`**

Two responsive columns using a 50/50 layout.

**`email-columns-6040`**

Two responsive columns using a 60/40 layout.

**`email-columns-4060`**

Two responsive columns using a 40/60 layout.

**`email-columns-reverse`**

Two columns that keep the intended desktop order and reverse their stacking order on mobile.

**`email-divider`**

A divider row.

**`email-spacer`**

Vertical spacing without relying on margins.

**`email-bullet`**

A table based bullet row for predictable email rendering.

**`email-preheader`**

Hidden inbox preview text.

**`email-mobile-hide`**

Content that is visible on desktop and hidden on mobile.

**`email-mobile-show`**

Content that is hidden on desktop and shown on mobile.

## Need more control?

The snippets are the fastest option. Use the Command Palette when you need custom values.

Press:

```text
Cmd + Shift + P
```

Then search for:

```text
Email Dev
```

Available commands:

**Email Dev: Configure Layout**

Set the desktop width, mobile reference width, padding, breakpoint, background, font stack, image folder, and Outlook fallback preference.

**Email Dev: Insert Responsive Email Template**

Insert the same responsive base template available through `email-template`.

**Email Dev: Insert Columns**

Create a custom column layout when the quick 50/50, 60/40, or 40/60 snippets are not enough. You can choose the number of columns, widths, gap, and mobile stacking behavior.

**Email Dev: Insert Button**

Create a configurable button with dimensions, colors, border, radius, alignment, and optional Outlook VML fallback.

**Email Dev: Insert Responsive Image**

Create a responsive image with configurable source, alt text, width, link, and responsive image behavior.

**Email Dev: Validate Current Email**

Run a quick check on the HTML file you are currently editing.

## Validate before handoff

Run:

```text
Email Dev: Validate Current Email
```

The validator currently checks for:

- Images missing an `alt` attribute
- Empty or placeholder links
- A fixed pixel width on `.email-container` inside mobile CSS
- Layout tables that may be missing `role="presentation"`
- Three digit hex colors that may be unsafe for stricter email workflows

This is a quick developer check, not a replacement for testing the final email in real email clients.

## Settings

Default settings:

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

You can change these through **Email Dev: Configure Layout** or directly in VS Code settings.

## Good to know

Email Dev Toolkit is made for developers who write HTML emails by hand. It does not hide the generated code and it is not a drag and drop email builder.

The goal is simple: remove repetitive setup, make common email patterns faster to write, and keep the final HTML fully under your control.
