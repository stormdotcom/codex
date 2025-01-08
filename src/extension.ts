import axios from 'axios';
import * as vscode from 'vscode';

/**
 * Generates a code suggestion based on the selected text in the editor.
 */
async function generateCodeSuggestion(): Promise<void> {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        vscode.window.showErrorMessage('No active editor found!');
        return;
    }

    // Get the selected text
    const userCode = editor.document.getText(editor.selection);
    if (!userCode) {
        vscode.window.showErrorMessage('Please select some text to get a suggestion.');
        return;
    }

    // Call the API
    try {
        const response = await axios.post('http://localhost:8000/code-suggestions', {
            input: userCode,
        });
        const suggestion = response.data.suggestion;

        if (suggestion) {
            // Display the suggestion in a new editor tab
            const doc = await vscode.workspace.openTextDocument({
                content: suggestion,
                language: editor.document.languageId,
            });
            vscode.window.showTextDocument(doc);
        } else {
            vscode.window.showInformationMessage('No suggestion generated.');
        }
    } catch (error) {
        console.error('Error fetching suggestion:', error);
        vscode.window.showErrorMessage('Error fetching suggestion. Check your server and try again.');
    }
}

/**
 * Called when the extension is activated.
 */
export function activate(context: vscode.ExtensionContext): void {
    console.log('Codex AI Assistant extension is now active.');

    // Register the generateCodeSuggestion command
    const disposable = vscode.commands.registerCommand(
        'codexAiAssistant.generateCodeSuggestion',
        generateCodeSuggestion
    );

    // Add to context subscriptions for cleanup on deactivate
    context.subscriptions.push(disposable);
}

/**
 * Called when the extension is deactivated.
 */
export function deactivate(): void {
    console.log('Codex AI Assistant extension is now deactivated.');
}
