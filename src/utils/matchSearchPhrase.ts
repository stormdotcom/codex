import { window } from "vscode";
import CSConfig from "../config";

type SearchMatchResult = {
  commentSyntax: string;
  commentSyntaxEnd: string;
  searchPhrase: string;
};

export function matchSearchPhrase(input: string): SearchMatchResult | undefined {
  const match = CSConfig.SEARCH_PATTERN.exec(input);
  if (match && match.length > 2) {
    const [_, commentSyntax, searchSymbol, searchPhrase, commentSyntaxEnd] = match;
    let fileType = window.activeTextEditor ? window.activeTextEditor.document.languageId : "";
    if (fileType === "plaintext") {
      fileType = "";
    }

    return {
      commentSyntax,
      commentSyntaxEnd,
      searchPhrase: `${searchPhrase} ${fileType}`.trim(),
    };
  }
  return undefined;
}
