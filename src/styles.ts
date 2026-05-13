// CSS injected once on first mount. Scoped under `.nimion-editor` so it
// doesn't bleed into the host application.

export const STYLE_TAG_ID = 'nimion-editor-styles';

export const CSS = `
.nimion-editor {
  --ne-border: #e5e7eb;
  --ne-border-strong: #d0d7de;
  --ne-bg: #ffffff;
  --ne-bg-muted: #f6f8fa;
  --ne-fg: #1f2328;
  --ne-fg-muted: #57606a;
  --ne-accent: #0969da;
  --ne-accent-soft: #ddf4ff;
  --ne-radius: 8px;

  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  color: var(--ne-fg);
  border: 1px solid var(--ne-border);
  border-radius: var(--ne-radius);
  background: var(--ne-bg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.nimion-editor.is-fullscreen {
  position: fixed;
  inset: 0;
  z-index: 9999;
  border-radius: 0;
}

.nimion-editor__toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px;
  padding: 6px 8px;
  border-bottom: 1px solid var(--ne-border);
  background: var(--ne-bg);
  position: sticky;
  top: 0;
  z-index: 2;
}

.nimion-editor__sep {
  width: 1px;
  height: 22px;
  background: var(--ne-border);
  margin: 0 4px;
}

.nimion-editor__btn {
  appearance: none;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 6px;
  color: var(--ne-fg);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px;
  min-width: 30px;
  height: 30px;
  font: inherit;
  line-height: 1;
  transition: background 80ms ease, border-color 80ms ease;
}
.nimion-editor__btn:hover { background: var(--ne-bg-muted); }
.nimion-editor__btn:active { background: #eaeef2; }
.nimion-editor__btn.is-active {
  background: var(--ne-accent-soft);
  color: var(--ne-accent);
}
.nimion-editor__btn:disabled { opacity: .4; cursor: not-allowed; }
.nimion-editor__btn:focus-visible {
  outline: 2px solid var(--ne-accent);
  outline-offset: 1px;
}

.nimion-editor__select {
  appearance: none;
  background: var(--ne-bg);
  border: 1px solid var(--ne-border);
  border-radius: 6px;
  padding: 4px 28px 4px 8px;
  height: 30px;
  font: inherit;
  font-size: 13px;
  color: var(--ne-fg);
  cursor: pointer;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2357606a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>");
  background-repeat: no-repeat;
  background-position: right 8px center;
}
.nimion-editor__select:hover { background-color: var(--ne-bg-muted); }
.nimion-editor__select:focus-visible {
  outline: 2px solid var(--ne-accent);
  outline-offset: 1px;
}

.nimion-editor__fontsize {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--ne-border);
  border-radius: 6px;
  overflow: hidden;
  height: 30px;
}
.nimion-editor__fontsize input {
  width: 44px;
  height: 100%;
  border: 0;
  text-align: center;
  font: inherit;
  font-size: 13px;
  background: transparent;
  color: var(--ne-fg);
}
.nimion-editor__fontsize input:focus { outline: none; }
.nimion-editor__fontsize button {
  width: 28px;
  height: 100%;
  border: 0;
  background: transparent;
  cursor: pointer;
  color: var(--ne-fg-muted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.nimion-editor__fontsize button:hover { background: var(--ne-bg-muted); color: var(--ne-fg); }

.nimion-editor__color {
  position: relative;
  display: inline-flex;
}
.nimion-editor__color > .nimion-editor__btn { padding-right: 4px; }
.nimion-editor__swatch {
  width: 12px;
  height: 3px;
  border-radius: 1px;
  margin-top: 9px;
  margin-left: 2px;
  background: var(--swatch, #1f2328);
}
.nimion-editor__popover {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 10;
  background: var(--ne-bg);
  border: 1px solid var(--ne-border);
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 8px 24px rgba(0,0,0,.08);
  display: grid;
  grid-template-columns: repeat(8, 18px);
  gap: 4px;
}
.nimion-editor__popover .swatch {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 1px solid rgba(0,0,0,.08);
  cursor: pointer;
  padding: 0;
}
.nimion-editor__popover .row {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding-top: 4px;
  border-top: 1px solid var(--ne-border);
  font-size: 12px;
  color: var(--ne-fg-muted);
}
.nimion-editor__popover input[type="color"] {
  width: 28px; height: 22px;
  border: 1px solid var(--ne-border);
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
}
.nimion-editor__popover button.clear {
  appearance: none;
  background: transparent;
  border: 1px solid var(--ne-border);
  border-radius: 4px;
  padding: 2px 6px;
  cursor: pointer;
  font-size: 12px;
  color: var(--ne-fg);
}

.nimion-editor__tablegrid {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 10;
  background: var(--ne-bg);
  border: 1px solid var(--ne-border);
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 8px 24px rgba(0,0,0,.08);
}
.nimion-editor__tablegrid .grid {
  display: grid;
  grid-template-columns: repeat(8, 16px);
  gap: 2px;
}
.nimion-editor__tablegrid .cell {
  width: 16px;
  height: 16px;
  border: 1px solid var(--ne-border);
  background: var(--ne-bg-muted);
  cursor: pointer;
}
.nimion-editor__tablegrid .cell.on {
  background: var(--ne-accent-soft);
  border-color: var(--ne-accent);
}
.nimion-editor__tablegrid .label {
  margin-top: 6px;
  text-align: center;
  font-size: 12px;
  color: var(--ne-fg-muted);
}

.nimion-editor__content {
  flex: 1;
  min-height: 200px;
  padding: 14px 18px;
  outline: none;
  overflow: auto;
  font-size: 15px;
  line-height: 1.6;
  background: var(--ne-bg);
}
.nimion-editor__content:empty::before {
  content: attr(data-placeholder);
  color: #9ca3af;
  pointer-events: none;
}
.nimion-editor__content h1 { font-size: 28px; font-weight: 700; margin: .6em 0 .4em; line-height: 1.25; }
.nimion-editor__content h2 { font-size: 22px; font-weight: 700; margin: .6em 0 .4em; line-height: 1.3; }
.nimion-editor__content h3 { font-size: 18px; font-weight: 600; margin: .6em 0 .4em; }
.nimion-editor__content h4 { font-size: 16px; font-weight: 600; margin: .6em 0 .4em; }
.nimion-editor__content h5 { font-size: 14px; font-weight: 600; margin: .6em 0 .4em; }
.nimion-editor__content h6 { font-size: 13px; font-weight: 600; margin: .6em 0 .4em; color: var(--ne-fg-muted); }
.nimion-editor__content p { margin: .5em 0; }
.nimion-editor__content blockquote {
  border-left: 3px solid var(--ne-border-strong);
  padding-left: 12px;
  color: var(--ne-fg-muted);
  margin: .5em 0;
}
.nimion-editor__content pre {
  background: var(--ne-bg-muted);
  padding: 12px;
  border-radius: 6px;
  overflow: auto;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 13.5px;
}
.nimion-editor__content code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  background: var(--ne-bg-muted);
  padding: 1px 4px;
  border-radius: 4px;
  font-size: 90%;
}
.nimion-editor__content a { color: var(--ne-accent); }
.nimion-editor__content img { max-width: 100%; height: auto; }
.nimion-editor__content table {
  border-collapse: collapse;
  width: 100%;
  margin: .5em 0;
}
.nimion-editor__content table td,
.nimion-editor__content table th {
  border: 1px solid var(--ne-border-strong);
  padding: 6px 10px;
  min-width: 40px;
}
.nimion-editor__content table th {
  background: var(--ne-bg-muted);
  text-align: left;
}
.nimion-editor__content ul,
.nimion-editor__content ol { padding-left: 24px; margin: .5em 0; }
.nimion-editor__content hr {
  border: 0;
  border-top: 1px solid var(--ne-border);
  margin: 1em 0;
}

.nimion-editor__source {
  flex: 1;
  display: flex;
  min-height: 200px;
}
.nimion-editor__source textarea {
  flex: 1;
  border: 0;
  outline: none;
  resize: none;
  padding: 14px 18px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 13px;
  line-height: 1.6;
  color: var(--ne-fg);
  background: var(--ne-bg);
}

.nimion-editor__status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 10px;
  border-top: 1px solid var(--ne-border);
  font-size: 12px;
  color: var(--ne-fg-muted);
  background: var(--ne-bg);
}
`;

/** Inject the stylesheet once per page (idempotent). */
export function ensureStylesInjected(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_TAG_ID)) return;
  const tag = document.createElement('style');
  tag.id = STYLE_TAG_ID;
  tag.textContent = CSS;
  document.head.appendChild(tag);
}
