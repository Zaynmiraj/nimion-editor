'use client';

// Toolbar — pure presentation. All side effects (formatting commands,
// modals, selection handling) live in the parent. The toolbar gets a
// `cmds` bag of callbacks plus an `active` record of currently-on formats
// so it can highlight buttons.

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Icon } from './icons.js';

export type CmdBag = {
  undo: () => void;
  redo: () => void;
  setBlock: (tag: string) => void;
  setFontSize: (px: number) => void;
  setFontFamily: (family: string) => void;
  toggle: (cmd: 'bold' | 'italic' | 'underline') => void;
  setColor: (kind: 'fore' | 'back', color: string | null) => void;
  align: (dir: 'Left' | 'Center' | 'Right' | 'Full') => void;
  list: (kind: 'ul' | 'ol') => void;
  link: () => void;
  unlink: () => void;
  image: () => void;
  table: (rows: number, cols: number) => void;
  removeFormat: () => void;
  toggleSource: () => void;
  toggleFullscreen: () => void;
};

export interface ToolbarProps {
  cmds: CmdBag;
  active: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    align: 'left' | 'center' | 'right' | 'justify' | null;
    block: string;
    fontFamily: string;
    fontSize: number;
    sourceMode: boolean;
    fullscreen: boolean;
  };
  fontFamilies: { label: string; value: string }[];
  blockFormats: { label: string; value: string }[];
}

const PALETTE = [
  '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#efefef', '#ffffff',
  '#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#4a86e8', '#9900ff',
  '#e6b8af', '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#cfe2f3', '#d9d2e9',
  '#cc4125', '#e06666', '#f6b26b', '#ffd966', '#93c47d', '#76a5af', '#6fa8dc', '#8e7cc3',
];

function Separator(): JSX.Element {
  return <div className="nimion-editor__sep" />;
}

function Button({
  onClick,
  active,
  title,
  children,
  disabled,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: ReactNode;
  disabled?: boolean;
}): JSX.Element {
  return (
    <button
      type="button"
      className={'nimion-editor__btn' + (active ? ' is-active' : '')}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      title={title}
      aria-label={title}
      aria-pressed={active}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function FontSizeStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (px: number) => void;
}): JSX.Element {
  const [draft, setDraft] = useState(String(value));
  useEffect(() => {
    setDraft(String(value));
  }, [value]);
  const commit = (next: number): void => {
    const clamped = Math.max(8, Math.min(96, Math.round(next)));
    onChange(clamped);
    setDraft(String(clamped));
  };
  return (
    <div className="nimion-editor__fontsize" title="Font size">
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => commit(value - 1)}
        aria-label="Decrease font size"
      >
        <Icon.Minus />
      </button>
      <input
        type="text"
        inputMode="numeric"
        value={draft}
        onChange={(e) => setDraft(e.target.value.replace(/[^\d]/g, ''))}
        onBlur={() => commit(parseInt(draft || '0', 10) || value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            commit(parseInt(draft || '0', 10) || value);
            (e.target as HTMLInputElement).blur();
          }
        }}
      />
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => commit(value + 1)}
        aria-label="Increase font size"
      >
        <Icon.Plus />
      </button>
    </div>
  );
}

function ColorButton({
  kind,
  current,
  onPick,
  icon,
  title,
}: {
  kind: 'fore' | 'back';
  current: string;
  onPick: (color: string | null) => void;
  icon: ReactNode;
  title: string;
}): JSX.Element {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent): void => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);
  return (
    <div className="nimion-editor__color" ref={wrapRef}>
      <button
        type="button"
        className="nimion-editor__btn"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setOpen((o) => !o)}
        title={title}
        aria-label={title}
        aria-expanded={open}
      >
        <span style={{ position: 'relative' }}>
          {icon}
          <span
            className="nimion-editor__swatch"
            style={{ ['--swatch' as string]: current } as React.CSSProperties}
          />
        </span>
        <Icon.ChevronDown />
      </button>
      {open && (
        <div className="nimion-editor__popover" role="dialog">
          {PALETTE.map((c) => (
            <button
              key={c}
              type="button"
              className="swatch"
              style={{ background: c }}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                onPick(c);
                setOpen(false);
              }}
              aria-label={c}
              title={c}
            />
          ))}
          <div className="row">
            <input
              type="color"
              defaultValue={current || '#000000'}
              onChange={(e) => {
                onPick(e.target.value);
                setOpen(false);
              }}
            />
            <button
              type="button"
              className="clear"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                onPick(null);
                setOpen(false);
              }}
            >
              {kind === 'fore' ? 'Reset' : 'No fill'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function TableButton({
  onPick,
}: {
  onPick: (rows: number, cols: number) => void;
}): JSX.Element {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<{ r: number; c: number }>({ r: 0, c: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent): void => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);
  const ROWS = 8;
  const COLS = 8;
  return (
    <div className="nimion-editor__color" ref={wrapRef}>
      <Button onClick={() => setOpen((o) => !o)} title="Insert table">
        <Icon.Table />
        <Icon.ChevronDown />
      </Button>
      {open && (
        <div className="nimion-editor__tablegrid" role="dialog">
          <div className="grid">
            {Array.from({ length: ROWS }).flatMap((_, r) =>
              Array.from({ length: COLS }).map((__, c) => (
                <button
                  key={`${r}-${c}`}
                  type="button"
                  className={'cell' + (r <= hover.r && c <= hover.c ? ' on' : '')}
                  onMouseEnter={() => setHover({ r, c })}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onPick(r + 1, c + 1);
                    setOpen(false);
                  }}
                  aria-label={`${r + 1} by ${c + 1} table`}
                />
              )),
            )}
          </div>
          <div className="label">
            {hover.r + 1} × {hover.c + 1}
          </div>
        </div>
      )}
    </div>
  );
}

export function Toolbar({
  cmds,
  active,
  fontFamilies,
  blockFormats,
}: ToolbarProps): JSX.Element {
  return (
    <div className="nimion-editor__toolbar" role="toolbar" aria-label="Formatting">
      <Button onClick={cmds.undo} title="Undo (Ctrl+Z)">
        <Icon.Undo />
      </Button>
      <Button onClick={cmds.redo} title="Redo (Ctrl+Y)">
        <Icon.Redo />
      </Button>

      <Separator />

      <select
        className="nimion-editor__select"
        value={active.block || 'p'}
        onMouseDown={(e) => e.stopPropagation()}
        onChange={(e) => cmds.setBlock(e.target.value)}
        title="Block format"
        aria-label="Block format"
      >
        {blockFormats.map((b) => (
          <option key={b.value} value={b.value}>
            {b.label}
          </option>
        ))}
      </select>

      <Separator />

      <FontSizeStepper value={active.fontSize} onChange={cmds.setFontSize} />

      <Separator />

      <Button onClick={() => cmds.toggle('bold')} active={active.bold} title="Bold (Ctrl+B)">
        <Icon.Bold />
      </Button>
      <Button onClick={() => cmds.toggle('italic')} active={active.italic} title="Italic (Ctrl+I)">
        <Icon.Italic />
      </Button>
      <Button onClick={() => cmds.toggle('underline')} active={active.underline} title="Underline (Ctrl+U)">
        <Icon.Underline />
      </Button>

      <Separator />

      <ColorButton
        kind="fore"
        current="#1f2328"
        onPick={(c) => cmds.setColor('fore', c)}
        icon={<Icon.Color />}
        title="Text color"
      />
      <ColorButton
        kind="back"
        current="#ffff00"
        onPick={(c) => cmds.setColor('back', c)}
        icon={<Icon.Highlight />}
        title="Highlight color"
      />

      <Separator />

      <select
        className="nimion-editor__select"
        value={active.fontFamily || ''}
        onMouseDown={(e) => e.stopPropagation()}
        onChange={(e) => cmds.setFontFamily(e.target.value)}
        title="Font family"
        aria-label="Font family"
        style={{ maxWidth: 140 }}
      >
        <option value="">Default font</option>
        {fontFamilies.map((f) => (
          <option key={f.value} value={f.value} style={{ fontFamily: f.value }}>
            {f.label}
          </option>
        ))}
      </select>

      <Separator />

      <Button onClick={cmds.link} title="Insert link">
        <Icon.Link />
      </Button>
      <Button onClick={cmds.image} title="Insert image">
        <Icon.Image />
      </Button>
      <TableButton onPick={cmds.table} />

      <Separator />

      <Button onClick={() => cmds.align('Left')} active={active.align === 'left'} title="Align left">
        <Icon.AlignLeft />
      </Button>
      <Button onClick={() => cmds.align('Center')} active={active.align === 'center'} title="Align center">
        <Icon.AlignCenter />
      </Button>
      <Button onClick={() => cmds.align('Right')} active={active.align === 'right'} title="Align right">
        <Icon.AlignRight />
      </Button>
      <Button onClick={() => cmds.align('Full')} active={active.align === 'justify'} title="Justify">
        <Icon.AlignJustify />
      </Button>

      <Separator />

      <Button onClick={() => cmds.list('ul')} title="Bullet list">
        <Icon.Bullet />
      </Button>
      <Button onClick={() => cmds.list('ol')} title="Numbered list">
        <Icon.Number />
      </Button>

      <Separator />

      <Button onClick={cmds.removeFormat} title="Clear formatting">
        <Icon.ClearFormat />
      </Button>

      <Separator />

      <Button onClick={cmds.toggleSource} active={active.sourceMode} title="Source code">
        <Icon.Code />
      </Button>
      <Button onClick={cmds.toggleFullscreen} active={active.fullscreen} title="Fullscreen">
        <Icon.Fullscreen />
      </Button>
    </div>
  );
}
