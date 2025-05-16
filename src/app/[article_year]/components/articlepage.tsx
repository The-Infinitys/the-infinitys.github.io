import { getArticleIndexes, Article } from "../../article/article";
import ArticleList from "../../article/components/list";

export default function ArticlePage() {
  const articles: Article[] = getArticleIndexes();
  return <ArticleList articles={articles} />;
}
