import { ReactNode } from "react";
import { generateArticleButton, Article } from "../article";
import { useTranslations } from "next-intl";

interface ArticleListProps {
  articles: Article[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  const t = useTranslations();
  const language = t("info.lang");

  // 言語で記事をフィルタリング
  const filteredArticles = articles.filter((article) => article.lang === language);

  return (
    <>
      <section>
        <p>{language}</p>
      </section>
      <section className="articles">
        {filteredArticles.map(
          (article: Article): ReactNode => generateArticleButton(article)
        )}
      </section>
    </>
  );
}
