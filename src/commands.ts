// Command layer. We wrap `document.execCommand` because building a full
// Selection/Range mutation engine from scratch is a multi-thousand-line
// project. `execCommand` is "deprecated" in the spec but every browser
// still implements it for contentEditable; it's the pragmatic choice for
// a from-scratch editor with reasonable scope.
//
// On top of execCommand we add: selection save/restore for modals,
// pixel-precise font size (execCommand only does 1–7 buckets), and a
// raw HTML inserter.

export interface SavedSelection {
  range: Range;
}

export function saveSelection(): SavedSelection | null {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return null;
  return { range: sel.getRangeAt(0).cloneRange() };
}

export function restoreSelection(saved: SavedSelection | null): void {
  if (!saved) return;
  const sel = window.getSelection();
  if (!sel) return;
  sel.removeAllRanges();
  sel.addRange(saved.range);
}

/** True if the current selection sits inside `el`. */
export function selectionInside(el: HTMLElement): boolean {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return false;
  return el.contains(sel.anchorNode);
}

/** Place caret at the end of `el`. Used after programmatic content loads. */
export function placeCaretAtEnd(el: HTMLElement): void {
  el.focus();
  const range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  const sel = window.getSelection();
  if (!sel) return;
  sel.removeAllRanges();
  sel.addRange(range);
}

/** Run a built-in contentEditable command via document.execCommand. */
export function runCommand(cmd: string, value?: string): boolean {
  try {
    return document.execCommand(cmd, false, value);
  } catch {
    return false;
  }
}

/** Insert arbitrary HTML at the caret / replacing the selection. */
export function insertHTML(html: string): void {
  runCommand('insertHTML', html);
}

/** Query whether a formatting command is currently active on the caret. */
export function queryState(cmd: string): boolean {
  try {
    return document.queryCommandState(cmd);
  } catch {
    return false;
  }
}

/** Query the value of a formatting command (e.g. fontName, foreColor). */
export function queryValue(cmd: string): string {
  try {
    return document.queryCommandValue(cmd);
  } catch {
    return '';
  }
}

/** Switch to CSS-style formatting so commands produce inline styles. */
export function enableCssStyling(): void {
  try {
    document.execCommand('styleWithCSS', false, 'true');
  } catch {
    /* ignore — not all browsers honor this */
  }
}

/**
 * Apply an arbitrary inline style to the current selection by wrapping it
 * in a `<span>`. Used for pixel-precise font sizing (execCommand's
 * `fontSize` only supports the 1–7 bucketing).
 */
export function wrapSelectionStyle(style: Partial<CSSStyleDeclaration>): void {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  const range = sel.getRangeAt(0);
  if (range.collapsed) return;
  const span = document.createElement('span');
  Object.assign(span.style, style);
  try {
    range.surroundContents(span);
  } catch {
    // surroundContents throws when the range crosses element boundaries.
    // Fall back to extract+wrap.
    const contents = range.extractContents();
    span.appendChild(contents);
    range.insertNode(span);
  }
  // Re-select the newly wrapped content so the user can chain styling.
  const newRange = document.createRange();
  newRange.selectNodeContents(span);
  sel.removeAllRanges();
  sel.addRange(newRange);
}

/** Promote the selected block to a heading / paragraph / blockquote / pre. */
export function setBlockFormat(tag: string): void {
  // Browsers vary: Chromium accepts both "h1" and "<h1>", Firefox needs
  // the angle brackets. We pass the bracketed form.
  runCommand('formatBlock', `<${tag}>`);
}

/** Build the HTML for a simple table with the given dimensions. */
export function buildTableHTML(rows: number, cols: number): string {
  const cells = (cellTag: 'td' | 'th') =>
    Array.from({ length: cols })
      .map(() => `<${cellTag}><br /></${cellTag}>`)
      .join('');
  const body = Array.from({ length: rows - 1 })
    .map(() => `<tr>${cells('td')}</tr>`)
    .join('');
  return (
    `<table class="nimion-table" style="border-collapse:collapse;width:100%">` +
    `<thead><tr>${cells('th')}</tr></thead>` +
    `<tbody>${body}</tbody>` +
    `</table><p><br /></p>`
  );
}
