import { getArticleIndexes, Article } from "../../article/article";
import ArticleList from "../../article/components/list";

export default function ArticlePage({ year }: { year: string }) {
  const articles: Article[] = getArticleIndexes().filter((article) =>
    article.date.trim().startsWith(year),
  );
  return <ArticleList articles={articles} />;
}
