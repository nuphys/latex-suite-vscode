/**
 * Math mode detection for LaTeX documents
 */

export interface MathContext {
    inMath: boolean;
    inComment: boolean;
}

/**
 * Detects if a position in a LaTeX document is in math mode or a comment
 */
export class MathModeDetector {
    /**
     * Check if a position is in a comment (after unescaped %)
     */
    private isInComment(line: string, position: number): boolean {
        let escaped = false;
        for (let i = 0; i < position; i++) {
            if (line[i] === '\\') {
                escaped = !escaped;
            } else if (line[i] === '%' && !escaped) {
                return true;
            } else {
                escaped = false;
            }
        }
        return false;
    }

    /**
     * Count unescaped occurrences of a character before position
     */
    private countUnescaped(text: string, char: string, endPos: number): number {
        let count = 0;
        let escaped = false;
        for (let i = 0; i < endPos; i++) {
            if (text[i] === '\\') {
                escaped = !escaped;
            } else if (text[i] === char && !escaped) {
                count++;
            } else {
                escaped = false;
            }
        }
        return count;
    }

    /**
     * Check if we're in an inline math delimiter at position
     */
    private isInInlineMath(text: string, position: number): boolean {
        // Count unescaped $ before position
        const dollarCount = this.countUnescaped(text, '$', position);
        return dollarCount % 2 === 1;
    }

    /**
     * Check if we're in a display math delimiter ($$)
     */
    private isInDisplayMath(text: string, position: number): boolean {
        const beforeText = text.substring(0, position);
        
        // Look for $$ pairs
        let count = 0;
        let i = 0;
        let escaped = false;
        
        while (i < beforeText.length) {
            if (beforeText[i] === '\\') {
                escaped = !escaped;
                i++;
            } else if (beforeText[i] === '$' && !escaped) {
                if (i + 1 < beforeText.length && beforeText[i + 1] === '$') {
                    count++;
                    i += 2;
                    continue;
                }
                i++;
            } else {
                escaped = false;
                i++;
            }
        }
        
        return count % 2 === 1;
    }

    /**
     * Check if we're in a \( ... \) or \[ ... \] delimiter
     */
    private isInParenBracketMath(text: string, position: number): boolean {
        const beforeText = text.substring(0, position);
        
        // Count \( and \)
        const openParen = (beforeText.match(/\\\(/g) || []).length;
        const closeParen = (beforeText.match(/\\\)/g) || []).length;
        
        // Count \[ and \]
        const openBracket = (beforeText.match(/\\\[/g) || []).length;
        const closeBracket = (beforeText.match(/\\\]/g) || []).length;
        
        return (openParen > closeParen) || (openBracket > closeBracket);
    }

    /**
     * Check if we're in a math environment like equation, align, etc.
     */
    private isInMathEnvironment(fullText: string, offset: number): boolean {
        const beforeText = fullText.substring(0, offset);
        
        // Common math environments
        const mathEnvs = [
            'equation', 'equation\\*',
            'align', 'align\\*',
            'gather', 'gather\\*',
            'multline', 'multline\\*',
            'flalign', 'flalign\\*',
            'eqnarray', 'eqnarray\\*',
            'math', 'displaymath'
        ];
        
        for (const env of mathEnvs) {
            const beginPattern = new RegExp(`\\\\begin\\{${env}\\}`, 'g');
            const endPattern = new RegExp(`\\\\end\\{${env}\\}`, 'g');
            
            const begins = (beforeText.match(beginPattern) || []).length;
            const ends = (beforeText.match(endPattern) || []).length;
            
            if (begins > ends) {
                return true;
            }
        }
        
        return false;
    }

    /**
     * Detect if a position is in math mode and not in a comment
     */
    public detectContext(fullText: string, offset: number, line: string, lineOffset: number): MathContext {
        // First check for comments
        const inComment = this.isInComment(line, lineOffset);
        if (inComment) {
            return { inMath: false, inComment: true };
        }

        // Get text up to current position in the document
        const textUpToPosition = fullText.substring(0, offset);

        // Check various math mode delimiters
        // Priority: $$ before $, then \( \), then \[ \], then environments
        
        // Check display math first ($$)
        if (this.isInDisplayMath(textUpToPosition, textUpToPosition.length)) {
            return { inMath: true, inComment: false };
        }

        // Check inline math ($)
        if (this.isInInlineMath(textUpToPosition, textUpToPosition.length)) {
            return { inMath: true, inComment: false };
        }

        // Check \( \) and \[ \]
        if (this.isInParenBracketMath(textUpToPosition, textUpToPosition.length)) {
            return { inMath: true, inComment: false };
        }

        // Check math environments
        if (this.isInMathEnvironment(fullText, offset)) {
            return { inMath: true, inComment: false };
        }

        return { inMath: false, inComment: false };
    }
}
