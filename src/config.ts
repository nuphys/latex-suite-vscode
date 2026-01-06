/**
 * Configuration management for LaTeX Suite
 */

import * as vscode from 'vscode';
import { SnippetDefinition, builtinSnippets } from './snippetDefinitions';

export class Config {
    /**
     * Get all active snippets (built-in + user-defined)
     */
    public static getSnippets(): SnippetDefinition[] {
        const config = vscode.workspace.getConfiguration('latexSuite');
        const enableBuiltin = config.get<boolean>('enableBuiltinSnippets', true);
        const userSnippets = config.get<SnippetDefinition[]>('snippets', []);

        const snippets: SnippetDefinition[] = [];

        if (enableBuiltin) {
            snippets.push(...builtinSnippets);
        }

        snippets.push(...userSnippets);

        return snippets;
    }

    /**
     * Get delimiter characters for delimiter-mode snippets
     */
    public static getDelimiterChars(): string {
        const config = vscode.workspace.getConfiguration('latexSuite');
        return config.get<string>('delimiterChars', ' \n\t.,;:!?)]}\'"');
    }

    /**
     * Check if a character is a delimiter
     */
    public static isDelimiterChar(char: string): boolean {
        const delimiters = this.getDelimiterChars();
        return delimiters.includes(char);
    }
}
