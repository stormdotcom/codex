import GithubGistExtractor from "./ExtractorGithubGist";
import OpenAIGenerator from "./ExtractorOpenAI";
import OpenRouterGenerator from "./ExtractorOpenRouter";
import StackoverflowExtractor from "./ExtractorStackOverflow";

const SnippetExtractors = [
  new StackoverflowExtractor(),
  new GithubGistExtractor(),
  new OpenAIGenerator(),
  new OpenRouterGenerator(),
];

export default SnippetExtractors;
