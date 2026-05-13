# Changelog

All notable changes to `nimion-editor` are documented here. The format
follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this
project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-05-13

### Added
- Fully custom, dependency-free WYSIWYG rich-text editor for React 18+.
- Single-row modern toolbar: undo / redo, block format, `− Npx +` font-size
  stepper, B/I/U, foreground + highlight color pickers with 32-swatch
  palette and custom color input, font-family dropdown, link / image /
  table inserts, four-way alignment, bullet / numbered lists, clear
  formatting, source HTML view, fullscreen.
- Table picker with a hover-driven 8×8 grid.
- Source-view mode with HTML textarea round-tripping through `onChange`.
- Fullscreen overlay mode.
- Controlled (`value`) and uncontrolled (`defaultValue`) APIs.
- `onImageUpload` hook for swapping the URL prompt with a real upload.
- 36 integration tests against the editor's contract under Vitest + jsdom.

[Unreleased]: https://github.com/Zaynmiraj/nimion-editor/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/Zaynmiraj/nimion-editor/releases/tag/v0.1.0
