// Test setup: jsdom doesn't implement document.execCommand or query*Command*,
// so we stub them to record calls. The stubs are wired so that toggling
// commands like `bold` flip state, which is enough to drive the component's
// active-format detection in tests.

import '@testing-library/jest-dom/vitest';
import { vi, beforeEach } from 'vitest';

interface ExecCommandCall {
  cmd: string;
  value?: string;
}

declare global {
  // eslint-disable-next-line no-var
  var __execCalls: ExecCommandCall[];
  // eslint-disable-next-line no-var
  var __cmdState: Record<string, boolean>;
  // eslint-disable-next-line no-var
  var __cmdValue: Record<string, string>;
}

globalThis.__execCalls = [];
globalThis.__cmdState = {};
globalThis.__cmdValue = {};

beforeEach(() => {
  globalThis.__execCalls = [];
  globalThis.__cmdState = {};
  globalThis.__cmdValue = {};
});

// @ts-expect-error — jsdom typings mark this readonly but we replace it.
document.execCommand = vi.fn((cmd: string, _ui?: boolean, value?: string) => {
  globalThis.__execCalls.push({ cmd, value });
  // Toggle stateful commands so queryCommandState reflects clicks.
  if (['bold', 'italic', 'underline'].includes(cmd)) {
    globalThis.__cmdState[cmd] = !globalThis.__cmdState[cmd];
  }
  if (cmd.startsWith('justify')) {
    // Clear other justify states first.
    ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'].forEach(
      (k) => (globalThis.__cmdState[k] = false),
    );
    globalThis.__cmdState[cmd] = true;
  }
  if (cmd === 'fontName' && value) globalThis.__cmdValue.fontName = value;
  return true;
});

// @ts-expect-error — same
document.queryCommandState = vi.fn(
  (cmd: string) => Boolean(globalThis.__cmdState[cmd]),
);

// @ts-expect-error — same
document.queryCommandValue = vi.fn(
  (cmd: string) => globalThis.__cmdValue[cmd] ?? '',
);

// jsdom's Range.surroundContents works only on collapsed ranges containing
// text — good enough for our wrapSelectionStyle tests.
