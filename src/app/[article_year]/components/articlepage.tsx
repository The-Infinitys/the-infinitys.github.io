import { getArticleIndexes, Article } from "../../article/article";
import ArticleList from "../../article/components/list";

export default function ArticlePage({ target_year }: string) {
  const articles: Article[] = getArticleIndexes().filter(article => { article.date.startswith(target_year) });
  return <ArticleList articles={articles} />;
}
