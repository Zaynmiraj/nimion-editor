// Inline SVG icons for the toolbar. Each is a 20×20 stroke-based glyph
// that inherits `currentColor` so it themes with the surrounding text.

import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export const Icon = {
  Undo: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M3 7v6h6" />
      <path d="M21 17a9 9 0 0 0-15-6.7L3 13" />
    </svg>
  ),
  Redo: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M21 7v6h-6" />
      <path d="M3 17a9 9 0 0 1 15-6.7L21 13" />
    </svg>
  ),
  Bold: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M7 4h6a4 4 0 0 1 0 8H7z" />
      <path d="M7 12h7a4 4 0 0 1 0 8H7z" />
    </svg>
  ),
  Italic: (p: IconProps) => (
    <svg {...base} {...p}>
      <line x1="19" y1="4" x2="10" y2="4" />
      <line x1="14" y1="20" x2="5" y2="20" />
      <line x1="15" y1="4" x2="9" y2="20" />
    </svg>
  ),
  Underline: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M6 3v8a6 6 0 0 0 12 0V3" />
      <line x1="4" y1="21" x2="20" y2="21" />
    </svg>
  ),
  Strike: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M16 4H9a3 3 0 0 0-2.83 4" />
      <path d="M14 12a4 4 0 0 1 0 8H6" />
      <line x1="4" y1="12" x2="20" y2="12" />
    </svg>
  ),
  AlignLeft: (p: IconProps) => (
    <svg {...base} {...p}>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="14" y2="12" />
      <line x1="4" y1="18" x2="18" y2="18" />
    </svg>
  ),
  AlignCenter: (p: IconProps) => (
    <svg {...base} {...p}>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="7" y1="12" x2="17" y2="12" />
      <line x1="5" y1="18" x2="19" y2="18" />
    </svg>
  ),
  AlignRight: (p: IconProps) => (
    <svg {...base} {...p}>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="10" y1="12" x2="20" y2="12" />
      <line x1="6" y1="18" x2="20" y2="18" />
    </svg>
  ),
  AlignJustify: (p: IconProps) => (
    <svg {...base} {...p}>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  ),
  Bullet: (p: IconProps) => (
    <svg {...base} {...p}>
      <line x1="9" y1="6" x2="20" y2="6" />
      <line x1="9" y1="12" x2="20" y2="12" />
      <line x1="9" y1="18" x2="20" y2="18" />
      <circle cx="4.5" cy="6" r="1.2" fill="currentColor" />
      <circle cx="4.5" cy="12" r="1.2" fill="currentColor" />
      <circle cx="4.5" cy="18" r="1.2" fill="currentColor" />
    </svg>
  ),
  Number: (p: IconProps) => (
    <svg {...base} {...p}>
      <line x1="10" y1="6" x2="20" y2="6" />
      <line x1="10" y1="12" x2="20" y2="12" />
      <line x1="10" y1="18" x2="20" y2="18" />
      <path d="M3 4h2v4" />
      <path d="M3 14h2.5a1.5 1.5 0 0 1 0 3H3v1h3" />
    </svg>
  ),
  Link: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
      <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
    </svg>
  ),
  Unlink: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M18.84 12.16a4 4 0 0 0-5.66-5.66l-1.41 1.41" />
      <path d="M5.16 11.84a4 4 0 0 0 5.66 5.66l1.41-1.41" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  ),
  Image: (p: IconProps) => (
    <svg {...base} {...p}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="9" cy="9" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  ),
  Table: (p: IconProps) => (
    <svg {...base} {...p}>
      <rect x="3" y="3" width="18" height="18" rx="1.5" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
    </svg>
  ),
  Code: (p: IconProps) => (
    <svg {...base} {...p}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Fullscreen: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M3 9V4h5" />
      <path d="M21 9V4h-5" />
      <path d="M3 15v5h5" />
      <path d="M21 15v5h-5" />
    </svg>
  ),
  ClearFormat: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M4 7V4h16v3" />
      <path d="M14 4l-3 16" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="3" y1="3" x2="21" y2="21" />
    </svg>
  ),
  Color: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M12 3s7 8 7 13a7 7 0 0 1-14 0c0-5 7-13 7-13z" />
    </svg>
  ),
  Highlight: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M14 3l7 7-9 9-7-7z" />
      <path d="M5 19l-2 2h6" />
    </svg>
  ),
  Font: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M5 20l5-14h2l5 14" />
      <line x1="7" y1="15" x2="15" y2="15" />
    </svg>
  ),
  Plus: (p: IconProps) => (
    <svg {...base} {...p}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Minus: (p: IconProps) => (
    <svg {...base} {...p}>
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  ChevronDown: (p: IconProps) => (
    <svg {...base} {...p} width={12} height={12}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  Quote: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M6 17a4 4 0 0 1-2-7c0-2 2-4 5-4v3a2 2 0 0 0-2 2 2 2 0 0 0 2 2v4z" />
      <path d="M16 17a4 4 0 0 1-2-7c0-2 2-4 5-4v3a2 2 0 0 0-2 2 2 2 0 0 0 2 2v4z" />
    </svg>
  ),
  Indent: (p: IconProps) => (
    <svg {...base} {...p}>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="11" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
      <polyline points="3 10 7 12 3 14" />
    </svg>
  ),
  Outdent: (p: IconProps) => (
    <svg {...base} {...p}>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="11" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
      <polyline points="7 10 3 12 7 14" />
    </svg>
  ),
};
