import { ReactNode } from "react";
import { generateArticleButton, Article } from "../article";

interface ArticleListProps {
  articles: Article[];
}

export default async function ArticleList({ articles }: ArticleListProps) {
  return (
    <section className="articles">
      {articles.map(
        (article: Article): ReactNode => generateArticleButton(article)
      )}
    </section>
  );
}