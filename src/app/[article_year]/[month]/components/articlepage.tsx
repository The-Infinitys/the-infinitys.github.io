import { getArticleIndexes, Article } from "../../../article/article";
import ArticleList from "../../../article/components/list";

export default function ArticlePage({ year, month }: { year: string; month: string }) {
  const articles: Article[] = getArticleIndexes().filter((article) =>
    article.date.trim().startsWith(`${year}-${month}-`),
  );
  return <ArticleList articles={articles} />;
}
