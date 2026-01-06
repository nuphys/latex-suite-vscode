/**
 * LaTeX Suite extension for VS Code
 * Main entry point
 */

import * as vscode from 'vscode';
import { SnippetExpander } from './snippetExpander';

let snippetExpander: SnippetExpander;

/**
 * Extension activation
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('LaTeX Suite extension is now active');

    // Create snippet expander instance
    snippetExpander = new SnippetExpander();

    // Register document change listener for auto-expansion
    const changeListener = vscode.workspace.onDidChangeTextDocument(async (event) => {
        await snippetExpander.handleDocumentChange(event);
    });

    // Register manual expansion command
    const expandCommand = vscode.commands.registerCommand('latexSuite.expandAtCursor', async () => {
        await snippetExpander.expandAtCursor();
    });

    // Add to subscriptions for proper cleanup
    context.subscriptions.push(changeListener);
    context.subscriptions.push(expandCommand);
}

/**
 * Extension deactivation
 */
export function deactivate() {
    console.log('LaTeX Suite extension is now deactivated');
}
