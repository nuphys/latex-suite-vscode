# LaTeX Suite for VS Code

A VS Code extension that brings powerful LaTeX snippet expansion and auto-replacement functionality, inspired by the Obsidian LaTeX Suite plugin.

## Features

### Auto-Replacement Snippets

Type LaTeX shortcuts that automatically expand into full LaTeX commands:

- **Greek Letters**: Type `;a` → `\alpha`, `;b` → `\beta`, `;g` → `\gamma`, etc.
- **Fractions**: Type `ff` + space → `\frac{}{}`
- **Summations**: Type `sum` + space → `\sum_{i}^{n}`
- **Integrals**: Type `int` + space → `\int_{a}^{b} \, dx`
- **Common Operators**: `!=` → `\neq`, `<=` → `\leq`, `>=` → `\geq`, `xx` → `\times`
- **Templates**: `beg` + space → `\begin{environment}\n\t\n\end{environment}`

### Intelligent Context Awareness

- **Math Mode Detection**: Snippets marked as `mathOnly` only expand within math environments (`$...$`, `$$...$$`, `\[...\]`, `\(...\)`, or math environments like `equation`, `align`, etc.)
- **Comment Exclusion**: Snippets won't expand in LaTeX comments (after `%`)
- **Configurable Trigger Modes**: Choose when snippets expand

### Three Trigger Modes

1. **Immediate Mode**: Expands as soon as you finish typing the trigger
   - Example: `;a` immediately becomes `\alpha`
   
2. **Delimiter Mode**: Expands when you type a delimiter after the trigger (space, newline, punctuation, etc.)
   - Example: `ff` + space becomes `\frac{}{}`
   
3. **Manual Mode**: Only expands when you explicitly invoke the expansion command
   - Use the command palette: "LaTeX Suite: Expand snippet at cursor"

### Snippet Placeholders

All snippets support VS Code's snippet placeholder syntax:
- Tab through placeholders using `Tab`
- Type in placeholders and press `Tab` to move to the next one
- `$0` marks the final cursor position

## Installation

1. Clone or download this repository
2. Open the folder in VS Code
3. Run `npm install` to install dependencies
4. Run `npm run compile` to compile the extension
5. Press `F5` to open a new VS Code window with the extension loaded

For production use, package the extension with `vsce package` and install the `.vsix` file.

## Usage

1. Open a `.tex` file in VS Code
2. Start typing LaTeX content
3. Use the built-in snippets or define your own
4. Snippets will expand automatically based on their configured mode

### Manual Expansion

To manually expand a snippet at the cursor:
1. Position your cursor right after a snippet trigger
2. Open the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
3. Run: **LaTeX Suite: Expand snippet at cursor**

## Configuration

### User-Defined Snippets

Add custom snippets in your VS Code `settings.json`:

```json
{
  "latexSuite.snippets": [
    {
      "trigger": "oo",
      "replacement": "\\infty",
      "mode": "immediate",
      "mathOnly": true
    },
    {
      "trigger": "vec",
      "replacement": "\\vec{${1}}$0",
      "mode": "delimiter",
      "mathOnly": true
    },
    {
      "trigger": "mat",
      "replacement": "\\begin{pmatrix}\n\t${1}\n\\end{pmatrix}$0",
      "mode": "delimiter",
      "mathOnly": true
    }
  ]
}
```

### Configuration Options

- **`latexSuite.snippets`**: Array of user-defined snippets
  - `trigger` (string): The text that triggers the snippet
  - `replacement` (string): The replacement text (supports VS Code snippet syntax with `${1}`, `${2}`, `$0` for placeholders)
  - `mode` (string): When to expand - `"immediate"`, `"delimiter"`, or `"manual"`
  - `mathOnly` (boolean, optional): Only expand in math mode

- **`latexSuite.delimiterChars`**: Characters that trigger delimiter-mode snippets
  - Default: `" \n\t.,;:!?)]}'\""`

- **`latexSuite.enableBuiltinSnippets`**: Enable or disable built-in snippets
  - Default: `true`

### Example Configuration

```json
{
  "latexSuite.enableBuiltinSnippets": true,
  "latexSuite.delimiterChars": " \n\t.,;:!?)]}'\"",
  "latexSuite.snippets": [
    {
      "trigger": "intf",
      "replacement": "\\int_{-\\infty}^{\\infty} ${1} \\, d${2:x}$0",
      "mode": "delimiter",
      "mathOnly": true
    },
    {
      "trigger": "dint",
      "replacement": "\\int\\int ${1} \\, d${2:x} \\, d${3:y}$0",
      "mode": "delimiter",
      "mathOnly": true
    }
  ]
}
```

## Built-in Snippets

### Greek Letters (Immediate, Math-only)

| Trigger | Replacement | Trigger | Replacement |
|---------|-------------|---------|-------------|
| `;a`    | `\alpha`    | `;A`    | (none)      |
| `;b`    | `\beta`     | `;B`    | (none)      |
| `;g`    | `\gamma`    | `;G`    | `\Gamma`    |
| `;d`    | `\delta`    | `;D`    | `\Delta`    |
| `;e`    | `\epsilon`  | `;E`    | (none)      |
| `;z`    | `\zeta`     | `;Z`    | (none)      |
| `;t`    | `\theta`    | `;T`    | `\Theta`    |
| `;k`    | `\kappa`    | `;K`    | (none)      |
| `;l`    | `\lambda`   | `;L`    | `\Lambda`   |
| `;m`    | `\mu`       | `;M`    | (none)      |
| `;n`    | `\nu`       | `;N`    | (none)      |
| `;x`    | `\xi`       | `;X`    | `\Xi`       |
| `;p`    | `\pi`       | `;P`    | `\Pi`       |
| `;r`    | `\rho`      | `;R`    | (none)      |
| `;s`    | `\sigma`    | `;S`    | `\Sigma`    |
| `;o`    | `\omega`    | `;O`    | `\Omega`    |

### Math Templates (Delimiter, Math-only)

| Trigger | Replacement | Description |
|---------|-------------|-------------|
| `ff`    | `\frac{${1}}{${2}}$0` | Fraction |
| `sum`   | `\sum_{${1:i}}^{${2:n}} $0` | Summation |
| `prod`  | `\prod_{${1:i}}^{${2:n}} $0` | Product |
| `lim`   | `\lim_{${1:n \to \infty}} $0` | Limit |
| `int`   | `\int_{${1:a}}^{${2:b}} ${3} \, d${4:x}$0` | Integral |

### Subscripts/Superscripts (Immediate, Math-only)

| Trigger | Replacement |
|---------|-------------|
| `__`    | `_{${1}}$0` |
| `sq`    | `^{2}`      |
| `cb`    | `^{3}`      |

### Operators (Immediate, Math-only)

| Trigger | Replacement |
|---------|-------------|
| `!=`    | `\neq`      |
| `<=`    | `\leq`      |
| `>=`    | `\geq`      |
| `~=`    | `\approx`   |
| `xx`    | `\times`    |
| `...`   | `\ldots`    |

### Text Mode (Delimiter)

| Trigger | Replacement |
|---------|-------------|
| `beg`   | `\begin{${1:environment}}\n\t$0\n\end{${1:environment}}` |

## Math Mode Detection

The extension detects math mode using:
- Inline math: `$...$`
- Display math: `$$...$$`
- LaTeX delimiters: `\(...\)` and `\[...\]`
- Math environments: `equation`, `align`, `gather`, `multline`, `eqnarray`, `flalign`, `math`, `displaymath` (and starred variants)

## Known Limitations

- Math mode detection is line-based and may not handle all edge cases perfectly in the MVP
- IME/composition events are handled by not expanding during composition
- The extension only activates for files with the `latex` language ID

## Development

### Building

```bash
npm install
npm run compile
```

### Testing

Open the extension folder in VS Code and press `F5` to launch the Extension Development Host.

### Project Structure

```
src/
  ├── extension.ts          # Main entry point
  ├── snippetExpander.ts    # Core expansion logic
  ├── mathModeDetector.ts   # Math mode detection
  ├── snippetDefinitions.ts # Built-in snippets
  └── config.ts             # Configuration management
```

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT

## Credits

Inspired by the [Obsidian LaTeX Suite](https://github.com/artisticat1/obsidian-latex-suite) plugin.