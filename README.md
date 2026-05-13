# nimion-editor

A **from-scratch** React rich-text editor for web apps — no TinyMCE, no
ProseMirror, no Slate, no third-party editor engine. Built directly on
`contentEditable` with our own toolbar, icons, styles, and command layer.

**Runtime dependencies:** none. Just `react` + `react-dom` as peers.

```tsx
import { NimionEditor } from 'nimion-editor';
import { useState } from 'react';

export default function PostForm() {
  const [html, setHtml] = useState('<p>Write something…</p>');
  return <NimionEditor value={html} onChange={setHtml} height={400} />;
}
```

## Install

```bash
npm install nimion-editor
# peer deps:
npm install react react-dom
```

## What's in the toolbar

A single-row modern layout matching the look of the reference design:

`undo redo` · `block format` · `− 16px +` (font size stepper) ·
`B I U` · `text color` · `highlight` · `font family` ·
`link image table` · `align L/C/R/J` · `bullet/numbered lists` ·
`clear formatting` · `source HTML` · `fullscreen`

- **Block format** dropdown with Paragraph, H1–H6, Preformatted, Blockquote.
- **Font size stepper** — type or step in 1-pixel increments (clamped 8–96).
- **Color pickers** — 32-swatch palette + native `<input type="color">` for
  custom colors + a reset/clear option.
- **Table picker** — hover an 8×8 grid to choose dimensions.
- **Link & image** — URL prompt by default; pass `onImageUpload` to swap in
  a real file upload.
- **Source view** — toggles between WYSIWYG and an HTML textarea so users
  can hand-edit markup.
- **Fullscreen** — fixed-position overlay on the whole viewport.
- **Status bar** — live word count and current block / font size.

## Props

| Prop             | Type                                  | Default          | Description                                          |
| ---------------- | ------------------------------------- | ---------------- | ---------------------------------------------------- |
| `value`          | `string`                              | —                | Controlled HTML.                                     |
| `defaultValue`   | `string`                              | —                | Initial HTML if uncontrolled.                        |
| `onChange`       | `(html: string) => void`              | —                | Fires on every edit (including source-view edits).  |
| `height`         | `number \| string`                    | `400`            | Min height of the editing surface.                   |
| `placeholder`    | `string`                              | `"Write something…"` | Empty-state placeholder.                         |
| `disabled`       | `boolean`                             | `false`          | Read-only mode.                                      |
| `fontFamilies`   | `{ label, value }[]`                  | sensible default | Override the font dropdown.                          |
| `blockFormats`   | `{ label, value }[]`                  | sensible default | Override the block dropdown.                         |
| `onImageUpload`  | `(file: File) => Promise<string>`     | —                | If set, the image button opens a file picker and you return the resulting URL. |
| `style`          | `CSSProperties`                       | —                | Wrapper style.                                       |
| `className`      | `string`                              | —                | Wrapper className (in addition to `nimion-editor`).  |

## How it works

```
src/
  NimionEditor.tsx   main component — state, lifecycle, command bag
  Toolbar.tsx        toolbar UI + dropdowns / popovers
  commands.ts        execCommand wrapper, selection save/restore, table HTML
  icons.tsx          inline SVG icons (no icon-font dependency)
  styles.ts          scoped CSS, injected once on mount
  index.ts           exports
```

The editing surface is a `contentEditable` `<div>`. Formatting commands go
through `document.execCommand` — yes, it's "deprecated" in the spec, but
every browser still implements it for contentEditable and the alternative
is a multi-thousand-line Selection/Range mutation engine.

Where execCommand isn't enough we go custom:

- **Pixel-precise font size** — execCommand only supports the 1–7
  bucketing, so we wrap the selection in a `<span style="font-size:Npx">`
  via the Selection / Range API.
- **Table insertion** — we generate the HTML and use `insertHTML`.
- **Color reset** — we pass `inherit` / `transparent` rather than a color.
- **Selection survives toolbar clicks** — toolbar buttons preventDefault on
  `mousedown` so focus stays in the editor; modal commands (link, image)
  save and restore the selection across the prompt.
- **Source view** — swaps the contentEditable for a textarea bound to the
  current HTML; flushing on toggle keeps them in sync.

## Security

The editor reads and writes HTML directly. If the `value` you pass in
originated from another user (e.g. a database round-trip), sanitize it at
the trust boundary before rendering it back or surfacing it elsewhere:

```ts
import DOMPurify from 'dompurify';
const safe = DOMPurify.sanitize(htmlFromDb);
<NimionEditor value={safe} onChange={setHtml} />
```

The editor itself produces structured HTML that should round-trip
losslessly — sanitize once on write to your store, not on every keystroke.

## Develop

```bash
npm install
npm run build      # emits dist/ with .js + .d.ts
npm run dev        # tsc --watch
```

## License

MIT.
