import axios from 'axios';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.getCodeSuggestion', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found!');
            return;
        }

        const userCode = editor.document.getText(editor.selection);
        try {
            const response = await axios.post('http://localhost:5000/code-suggestions', {
                input: userCode,
            });
            const suggestion = response.data.suggestion;
            vscode.window.showInformationMessage(`AI Suggestion: ${suggestion}`);
        } catch (error) {
            vscode.window.showErrorMessage('Error fetching suggestion!');
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
