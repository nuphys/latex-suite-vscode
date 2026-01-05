/**
 * Snippet expansion logic for LaTeX Suite
 */

import * as vscode from 'vscode';
import { SnippetDefinition } from './snippetDefinitions';
import { MathModeDetector } from './mathModeDetector';
import { Config } from './config';

export class SnippetExpander {
    private mathDetector: MathModeDetector;
    private isExpanding = false; // Prevent infinite loops

    constructor() {
        this.mathDetector = new MathModeDetector();
    }

    /**
     * Handle document changes and perform auto-expansion
     */
    public async handleDocumentChange(event: vscode.TextDocumentChangeEvent): Promise<void> {
        // Only process LaTeX files
        if (event.document.languageId !== 'latex') {
            return;
        }

        // Prevent infinite loops
        if (this.isExpanding) {
            return;
        }

        // Only process single-character additions (typing)
        if (event.contentChanges.length !== 1) {
            return;
        }

        const change = event.contentChanges[0];
        if (change.text.length !== 1) {
            return;
        }

        const editor = vscode.window.activeTextEditor;
        if (!editor || editor.document !== event.document) {
            return;
        }

        const typedChar = change.text;
        const position = change.range.end;

        await this.tryExpand(editor, position, typedChar);
    }

    /**
     * Try to expand a snippet at the current position
     */
    private async tryExpand(
        editor: vscode.TextEditor,
        position: vscode.Position,
        typedChar: string
    ): Promise<boolean> {
        const document = editor.document;
        const snippets = Config.getSnippets();

        // Get text before cursor
        const lineText = document.lineAt(position.line).text;
        const textBeforeCursor = lineText.substring(0, position.character);

        // Try to match snippets
        for (const snippet of snippets) {
            // Check if the text before cursor ends with the trigger
            if (!textBeforeCursor.endsWith(snippet.trigger + typedChar)) {
                continue;
            }

            // Determine if we should expand based on mode
            let shouldExpand = false;

            if (snippet.mode === 'immediate') {
                // For immediate mode, expand if we just completed the trigger
                shouldExpand = textBeforeCursor.endsWith(snippet.trigger + typedChar) && 
                               typedChar === snippet.trigger[snippet.trigger.length - 1];
            } else if (snippet.mode === 'delimiter') {
                // For delimiter mode, expand if typed char is a delimiter
                shouldExpand = Config.isDelimiterChar(typedChar);
            } else {
                // Manual mode - don't auto-expand
                continue;
            }

            if (!shouldExpand) {
                continue;
            }

            // Get document context for math mode detection
            const offset = document.offsetAt(position);
            const fullText = document.getText();
            const lineOffset = position.character;
            const context = this.mathDetector.detectContext(fullText, offset, lineText, lineOffset);

            // Skip if in comment
            if (context.inComment) {
                continue;
            }

            // Skip if snippet is mathOnly and we're not in math
            if (snippet.mathOnly && !context.inMath) {
                continue;
            }

            // Perform the expansion
            await this.expandSnippet(editor, snippet, position, typedChar);
            return true;
        }

        return false;
    }

    /**
     * Expand a snippet at the given position
     */
    private async expandSnippet(
        editor: vscode.TextEditor,
        snippet: SnippetDefinition,
        position: vscode.Position,
        typedChar: string
    ): Promise<void> {
        this.isExpanding = true;

        try {
            const document = editor.document;

            // Calculate the range to replace
            // For immediate mode: trigger + typed char (which is part of trigger)
            // For delimiter mode: trigger + delimiter char
            let replaceLength = snippet.trigger.length;
            
            if (snippet.mode === 'delimiter') {
                // Include the delimiter character
                replaceLength += typedChar.length;
            }

            const startPos = new vscode.Position(position.line, position.character - replaceLength);
            const endPos = position;
            const range = new vscode.Range(startPos, endPos);

            // Perform replacement with snippet string
            await editor.edit((editBuilder) => {
                editBuilder.delete(range);
            }, {
                undoStopBefore: true,
                undoStopAfter: false
            });

            // Insert snippet with placeholders
            const snippetString = new vscode.SnippetString(snippet.replacement);
            
            // For delimiter mode, add back the delimiter if it's not consumed by the snippet
            if (snippet.mode === 'delimiter' && !snippet.replacement.includes(typedChar)) {
                snippetString.appendText(typedChar);
            }

            await editor.insertSnippet(snippetString, startPos, {
                undoStopBefore: false,
                undoStopAfter: true
            });

        } finally {
            this.isExpanding = false;
        }
    }

    /**
     * Manual expansion command - expand snippet at cursor
     */
    public async expandAtCursor(): Promise<void> {
        const editor = vscode.window.activeTextEditor;
        if (!editor || editor.document.languageId !== 'latex') {
            return;
        }

        const position = editor.selection.active;
        const document = editor.document;
        const lineText = document.lineAt(position.line).text;
        const textBeforeCursor = lineText.substring(0, position.character);

        const snippets = Config.getSnippets();

        // Find the longest matching snippet
        let matchedSnippet: SnippetDefinition | null = null;
        let matchLength = 0;

        for (const snippet of snippets) {
            if (textBeforeCursor.endsWith(snippet.trigger) && snippet.trigger.length > matchLength) {
                // Check context
                const offset = document.offsetAt(position);
                const fullText = document.getText();
                const lineOffset = position.character;
                const context = this.mathDetector.detectContext(fullText, offset, lineText, lineOffset);

                if (context.inComment) {
                    continue;
                }

                if (snippet.mathOnly && !context.inMath) {
                    continue;
                }

                matchedSnippet = snippet;
                matchLength = snippet.trigger.length;
            }
        }

        if (matchedSnippet) {
            await this.expandSnippetManual(editor, matchedSnippet, position);
        } else {
            vscode.window.showInformationMessage('No snippet found at cursor');
        }
    }

    /**
     * Manual snippet expansion (no delimiter consumed)
     */
    private async expandSnippetManual(
        editor: vscode.TextEditor,
        snippet: SnippetDefinition,
        position: vscode.Position
    ): Promise<void> {
        this.isExpanding = true;

        try {
            const startPos = new vscode.Position(position.line, position.character - snippet.trigger.length);
            const range = new vscode.Range(startPos, position);

            await editor.edit((editBuilder) => {
                editBuilder.delete(range);
            }, {
                undoStopBefore: true,
                undoStopAfter: false
            });

            const snippetString = new vscode.SnippetString(snippet.replacement);
            await editor.insertSnippet(snippetString, startPos, {
                undoStopBefore: false,
                undoStopAfter: true
            });

        } finally {
            this.isExpanding = false;
        }
    }
}
