# Change Log

All notable changes to the LaTeX Suite extension will be documented in this file.

## [0.1.0] - 2026-01-05

### Added
- Initial release of LaTeX Suite for VS Code
- Auto-replacement snippets with three trigger modes:
  - Immediate: expand as soon as trigger is typed
  - Delimiter: expand when followed by delimiter character
  - Manual: expand via command only
- Built-in snippet library:
  - Greek letters (`;a` → `\alpha`, etc.)
  - Math templates (`ff` → `\frac{}{}`, `sum` → `\sum_{i}^{n}`, etc.)
  - Common operators (`!=` → `\neq`, `<=` → `\leq`, etc.)
  - Text mode shortcuts (`beg` → `\begin{environment}...\end{environment}`)
- Context-aware expansion:
  - Math mode detection (inline `$...$`, display `$$...$$`, LaTeX delimiters, math environments)
  - Comment exclusion (no expansion after `%`)
  - Math-only snippet restriction
- VS Code snippet placeholder support with Tab navigation
- Manual expansion command: "LaTeX Suite: Expand snippet at cursor"
- User-configurable snippets via settings
- Configurable delimiter characters
- Built-in snippets can be disabled
- Extension only activates for LaTeX files
