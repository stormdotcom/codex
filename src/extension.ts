import axios from 'axios';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const provider = vscode.languages.registerInlineCompletionItemProvider(
        { scheme: 'file', language: '*' }, // Enable for all files
        {
            async provideInlineCompletionItems(document, position, context, token) {
                const textBeforeCursor = document.getText(
                    new vscode.Range(new vscode.Position(0, 0), position)
                );

                try {
                    const response = await axios.post('http://localhost:8000/code-suggestions', {
                        input: textBeforeCursor,
                    });

                    const suggestion = response.data.suggestion;

                    if (suggestion) {
                        return [
                            new vscode.InlineCompletionItem(
                                suggestion,
                                new vscode.Range(position, position),
                                suggestion
                            ),
                        ];
                    }
                } catch (error) {
                    console.error('Error fetching suggestion:', error);
                }

                return [];
            },
        }
    );

    context.subscriptions.push(provider);
}

export function deactivate() {}
