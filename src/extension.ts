import * as vscode from "vscode";

import { matchSearchPhrase } from "./utils/matchSearchPhrase";
import { search } from "./utils/search";

export function activate(_: vscode.ExtensionContext) {
  const provider: vscode.CompletionItemProvider = {
    // @ts-ignore
    provideInlineCompletionItems: async (document, position, context, token) => {
    // provideCompletionItems: async (document, position, context, token) => {
      const textBeforeCursor = document.getText(
        new vscode.Range(position.with(undefined, 0), position)
      );

      const match = matchSearchPhrase(textBeforeCursor);
      let items: any[] = [];

      if (match) {
        let rs;
        try {
          rs = await search(match.searchPhrase);
          if (rs) {
            items = rs.results.map((item) => {
              const output = `\n${match.commentSyntax} Source: ${item.sourceURL} ${match.searchPhrase}\n${item.code}`;
              return {
                text: output,
                insertText: output,
                range: new vscode.Range(
                  position.translate(0, output.length),
                  position
                ),
              };
            });
          }
        } catch (err: any) {
          vscode.window.showErrorMessage(err.toString());
        }
      }
      return { items };
    },
  };

  // @ts-ignore
  vscode.languages.registerInlineCompletionItemProvider({ pattern: "**" }, provider);
}

const startChars = ["<!--", "#", "//", "/*"];
const keywords = ["find", "generate"];
const triggerKeywords = startChars.map(s => keywords.map(k => [`${s} ${k}`, `${s}${k}`])).flat(2);