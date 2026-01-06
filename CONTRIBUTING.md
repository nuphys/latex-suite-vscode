# Contributing to LaTeX Suite

Thank you for your interest in contributing to LaTeX Suite! This document provides guidelines and information for contributors.

## Getting Started

### Development Setup

1. **Prerequisites**
   - Node.js (v14 or higher)
   - VS Code
   - Git

2. **Clone and Setup**
   ```bash
   git clone https://github.com/nuphys/latex-suite-vscode.git
   cd latex-suite-vscode
   npm install
   ```

3. **Build**
   ```bash
   npm run compile
   ```

4. **Test**
   - Open the folder in VS Code
   - Press `F5` to launch Extension Development Host
   - Open a `.tex` file and test your changes

### Project Structure

```
src/
├── extension.ts          # Main entry point
├── snippetExpander.ts    # Core expansion logic
├── mathModeDetector.ts   # Context detection
├── snippetDefinitions.ts # Built-in snippets
└── config.ts            # Configuration management
```

## How to Contribute

### Reporting Issues

- Use GitHub Issues to report bugs
- Include:
  - VS Code version
  - Extension version
  - Steps to reproduce
  - Expected vs actual behavior
  - Sample `.tex` file if relevant

### Suggesting Features

- Open a GitHub Issue with label "enhancement"
- Describe the feature and use case
- Provide examples if possible

### Code Contributions

1. **Fork the repository**

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test thoroughly**
   - Test in Extension Development Host
   - Verify existing features still work
   - Test edge cases

5. **Commit your changes**
   ```bash
   git commit -m "Add feature: description"
   ```

6. **Push and create Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

## Development Guidelines

### Code Style

- Use TypeScript
- Follow existing naming conventions
- Use meaningful variable names
- Add JSDoc comments for public APIs

### TypeScript

- Enable strict mode
- Properly type all functions
- Avoid `any` when possible

### Testing

- Test in a real `.tex` file
- Test math mode detection
- Test comment exclusion
- Test placeholder navigation
- Test with custom configuration

### Documentation

- Update README.md for user-facing changes
- Update USAGE.md for usage examples
- Update CHANGELOG.md
- Add JSDoc comments in code

## Areas for Contribution

### High Priority

1. **Improved Math Mode Detection**
   - Handle more edge cases
   - Better multi-line detection
   - Nested environments

2. **More Built-in Snippets**
   - Additional Greek letters
   - More templates
   - Environments

3. **Testing Infrastructure**
   - Unit tests
   - Integration tests
   - CI/CD pipeline

### Medium Priority

1. **Import Obsidian Snippets**
   - Parse Obsidian format
   - Convert to VS Code format

2. **Completion Provider**
   - IntelliSense integration
   - Snippet preview

3. **Performance**
   - Optimize math mode detection
   - Reduce expansion latency

### Nice to Have

1. **Bracket Jump Helpers**
   - Jump to matching bracket
   - Select within brackets

2. **Visual Feedback**
   - Status bar integration
   - Expansion notifications

3. **Advanced Configuration**
   - Per-file settings
   - Per-environment settings

## Pull Request Process

1. **Code Review**
   - Maintainer will review code
   - Address feedback promptly
   - Keep PR focused and small

2. **Testing**
   - Ensure all checks pass
   - Test manually if needed

3. **Merge**
   - Maintainer will merge when ready
   - Squash commits if needed

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Follow GitHub community guidelines

## Questions?

- Open a GitHub Discussion
- Check existing issues
- Read the documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Thank You!

Every contribution, no matter how small, makes LaTeX Suite better for everyone. We appreciate your help! 🎉
