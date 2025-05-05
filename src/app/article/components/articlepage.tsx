
import { getArticleIndexes, Article } from "../article";
import ArticleList from "./list";

export default function ArticlePage() {
  const articles: Article[] = getArticleIndexes();
  return (
    <ArticleList articles={articles} />
  );
}