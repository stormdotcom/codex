import axios from 'axios';
import * as vscode from 'vscode';

/**
 * Fetches a code suggestion from the backend API based on the user's selected text.
 * @param userCode The selected text in the editor.
 * @param languageId The language of the editor (used for better context in the suggestion).
 * @returns The suggested code or null if no suggestion is generated.
 */
async function fetchCodeSuggestion(userCode: string, languageId: string): Promise<string | null> {
    try {
        const response = await axios.post('http://localhost:8000/code-suggestions', {
            input: userCode,
            language: languageId,
        });

        return response.data.suggestion || null;
    } catch (error) {
        console.error('Error fetching suggestion:', error);
        throw new Error('Failed to fetch suggestion from the server.');
    }
}

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

    // Show a loading message while fetching the suggestion
    const loadingMessage = vscode.window.setStatusBarMessage('Fetching AI suggestion...');
    try {
        const suggestion = await fetchCodeSuggestion(userCode, editor.document.languageId);

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
    } catch (error: any) {
        vscode.window.showErrorMessage(error.message);
    } finally {
        // Clear the loading message
        loadingMessage.dispose();
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
