const fetch = require("node-fetch").default;

export type FetchPageResult = {
  textContent: string;
  url: string;
};

export function fetchPageTextContent(url: string): Promise<FetchPageResult> {
  return fetch(url)
    .then((rs: Response) => rs.text())
    .then((textContent: string) => ({ textContent, url }));
}
