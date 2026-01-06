# LaTeX Suite Usage Examples

This document provides practical examples of using the LaTeX Suite extension.

## Basic Usage

### Greek Letters (Immediate Mode)

In math mode, type Greek letter shortcuts followed by the last character to trigger expansion:

```latex
% Type this:
$;a + ;b = ;g$

% Expands to:
$\alpha + \beta = \gamma$
```

### Fractions (Delimiter Mode)

Type `ff` followed by a space or delimiter to create fractions:

```latex
% Type this:
$ff $

% Expands to (with cursor at first placeholder):
$\frac{•}{} $

% After typing numerator and pressing Tab:
$\frac{x+1}{•} $
```

### Summations and Integrals

```latex
% Type this:
$sum $

% Expands to:
$\sum_{i}^{n} •$

% Type this:
$int $

% Expands to:
$\int_{a}^{b} • \, dx$
```

## Context Awareness

### Math Mode Only

Math-only snippets won't expand outside math environments:

```latex
% This WON'T expand:
In text mode, typing ;a does nothing.

% This WILL expand:
In math mode: $;a$ → $\alpha$
```

### Comment Exclusion

Snippets won't expand in comments:

```latex
% Typing ;a here won't expand
% Even in math: $;a$ won't expand in a comment

But here it will: $;a$ → $\alpha$
```

### Different Math Environments

The extension recognizes various math environments:

```latex
% Inline math
The equation $;a + ;b = 0$ becomes $\alpha + \beta = 0$

% Display math
$$
  sum 
$$
% Becomes:
$$
  \sum_{i}^{n} 
$$

% LaTeX delimiters
\[
  int 
\]
% Becomes:
\[
  \int_{a}^{b}  \, dx
\]

% Math environments
\begin{equation}
  ff 
\end{equation}
% Becomes:
\begin{equation}
  \frac{}{}
\end{equation}
```

## Custom Snippets

### Adding Your Own Snippets

Add to your `settings.json`:

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

Now typing `oo` in math mode expands to `\infty`.

### Complex Example with Placeholders

```json
{
  "latexSuite.snippets": [
    {
      "trigger": "lim",
      "replacement": "\\lim_{${1:n \\to \\infty}} ${2}$0",
      "mode": "delimiter",
      "mathOnly": true
    }
  ]
}
```

Usage:
1. Type `lim` followed by space
2. First placeholder `n \to \infty` is selected - modify if needed
3. Press Tab to move to next placeholder
4. Press Tab again to move to final cursor position

### Text Mode Snippets

```json
{
  "latexSuite.snippets": [
    {
      "trigger": "sec",
      "replacement": "\\section{${1}}$0",
      "mode": "delimiter",
      "mathOnly": false
    },
    {
      "trigger": "fig",
      "replacement": "\\begin{figure}[${1:htbp}]\n\t\\centering\n\t\\includegraphics[width=${2:0.8}\\textwidth]{${3:filename}}\n\t\\caption{${4:caption}}\n\t\\label{fig:${5:label}}\n\\end{figure}$0",
      "mode": "delimiter",
      "mathOnly": false
    }
  ]
}
```

## Manual Expansion

If you want to use manual mode for more control:

```json
{
  "latexSuite.snippets": [
    {
      "trigger": "matrix",
      "replacement": "\\begin{bmatrix}\n\t${1}\n\\end{bmatrix}$0",
      "mode": "manual",
      "mathOnly": true
    }
  ]
}
```

To expand:
1. Type `matrix`
2. Open command palette (Ctrl+Shift+P / Cmd+Shift+P)
3. Run: "LaTeX Suite: Expand snippet at cursor"

## Tips and Tricks

### 1. Combining Snippets

You can chain snippets together:

```latex
% Type: $sum ff $
% Step 1: sum expands → $\sum_{i}^{n} •$
% Step 2: Type ff followed by space
% Result: $\sum_{i}^{n} \frac{•}{}$
```

### 2. Custom Delimiter Characters

Modify what characters trigger delimiter-mode snippets:

```json
{
  "latexSuite.delimiterChars": " \n\t.,"
}
```

Now only space, newline, tab, period, and comma trigger expansions.

### 3. Disabling Built-in Snippets

If you want only your custom snippets:

```json
{
  "latexSuite.enableBuiltinSnippets": false,
  "latexSuite.snippets": [
    // Your snippets here
  ]
}
```

### 4. Quick Common Patterns

Build your library of frequently-used patterns:

```json
{
  "latexSuite.snippets": [
    {
      "trigger": "beg",
      "replacement": "\\begin{${1:env}}\n\t$0\n\\end{${1:env}}",
      "mode": "delimiter",
      "mathOnly": false
    },
    {
      "trigger": "itm",
      "replacement": "\\begin{itemize}\n\t\\item $0\n\\end{itemize}",
      "mode": "delimiter",
      "mathOnly": false
    },
    {
      "trigger": "enum",
      "replacement": "\\begin{enumerate}\n\t\\item $0\n\\end{enumerate}",
      "mode": "delimiter",
      "mathOnly": false
    }
  ]
}
```

## Troubleshooting

### Snippet Not Expanding

1. **Check file type**: Extension only works in `.tex` files
2. **Math-only snippets**: Ensure you're in a math environment
3. **Delimiter mode**: Make sure you typed a delimiter character
4. **Comments**: Snippets don't expand in comments (after `%`)

### Unexpected Expansion

1. **Adjust trigger mode**: Change from `immediate` to `delimiter` or `manual`
2. **Modify delimiter characters**: Remove characters you don't want to trigger expansions
3. **Disable specific snippets**: Set `enableBuiltinSnippets: false` and define only what you need

### Math Mode Detection Issues

The MVP math mode detector handles common cases but may have edge cases. If you experience issues:

1. Use explicit math delimiters (`$...$`, `$$...$$`)
2. Prefer standard math environments
3. Report issues for future improvements
