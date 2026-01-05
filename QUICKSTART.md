# Quick Start Guide

Get started with LaTeX Suite in 5 minutes!

## Installation for Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nuphys/latex-suite-vscode.git
   cd latex-suite-vscode
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Compile the extension:**
   ```bash
   npm run compile
   ```

4. **Test the extension:**
   - Open the folder in VS Code
   - Press `F5` to launch Extension Development Host
   - Open or create a `.tex` file
   - Start typing!

## First Steps

### 1. Try Greek Letters

Open a `.tex` file and type in math mode:

```latex
$;a$
```

As soon as you type the `a`, it expands to:

```latex
$\alpha$
```

Try others: `;b` → `\beta`, `;g` → `\gamma`, `;d` → `\delta`

### 2. Try Fractions

In math mode, type:

```latex
$ff $
```

(That's `f`, `f`, then space)

It expands to:

```latex
$\frac{•}{}$
```

The cursor is at the first placeholder (marked with `•`). Type your numerator, press `Tab`, then type your denominator!

### 3. Try Summations

In math mode, type:

```latex
$$sum $$
```

(That's `sum` followed by space)

It expands to:

```latex
$$\sum_{i}^{n} •$$
```

### 4. Notice Context Awareness

Try typing `;a` outside math mode - nothing happens! The extension is smart about when to expand.

Try typing in a comment:

```latex
% This is a comment: ;a
```

Again, nothing happens - snippets don't expand in comments.

## Customization

### Add Your First Custom Snippet

1. Open VS Code Settings (File → Preferences → Settings, or `Ctrl+,`)
2. Search for "latex suite"
3. Click "Edit in settings.json" under "Latex Suite: Snippets"
4. Add your snippet:

```json
{
  "latexSuite.snippets": [
    {
      "trigger": "oo",
      "replacement": "\\infty",
      "mode": "immediate",
      "mathOnly": true
    }
  ]
}
```

Now typing `oo` in math mode becomes `\infty`!

## Common Snippets Cheat Sheet

### Greek Letters (immediate, math-only)
- `;a` → `\alpha`
- `;b` → `\beta`
- `;g` → `\gamma`
- `;d` → `\delta`
- `;t` → `\theta`
- `;l` → `\lambda`
- `;s` → `\sigma`
- `;o` → `\omega`

### Templates (delimiter + space, math-only)
- `ff ` → `\frac{}{}`
- `sum ` → `\sum_{i}^{n}`
- `prod ` → `\prod_{i}^{n}`
- `int ` → `\int_{a}^{b} \, dx`
- `lim ` → `\lim_{n \to \infty}`

### Operators (immediate, math-only)
- `!=` → `\neq`
- `<=` → `\leq`
- `>=` → `\geq`
- `xx` → `\times`

### Text Mode (delimiter + space)
- `beg ` → `\begin{env}...\end{env}`

## Next Steps

1. **Read the full README** for detailed feature descriptions
2. **Check USAGE.md** for comprehensive examples
3. **Customize your snippets** in settings.json
4. **See .vscode/settings.example.json** for more snippet ideas

## Tips

- **Tab key**: Navigate through snippet placeholders
- **Command Palette**: Search "LaTeX Suite" to see all commands
- **Manual expansion**: Use "LaTeX Suite: Expand snippet at cursor" for manual-mode snippets

## Troubleshooting

**Extension not activating?**
- Make sure your file has `.tex` extension
- Check the language mode in bottom-right corner says "LaTeX"

**Snippets not expanding?**
- Math-only snippets require math mode (`$...$`, `$$...$$`, etc.)
- Delimiter-mode snippets need a delimiter character (space, comma, etc.)
- Make sure you're not in a comment (after `%`)

**Want different behavior?**
- Change trigger mode: `immediate`, `delimiter`, or `manual`
- Customize delimiter characters in settings
- Disable built-in snippets if you only want your own

## Get Help

- Check the [README](README.md) for full documentation
- Review [USAGE.md](USAGE.md) for detailed examples
- Open an issue on GitHub for bugs or feature requests

Happy LaTeXing! 🎉
