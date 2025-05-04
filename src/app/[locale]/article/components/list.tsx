import { ReactNode } from "react";
import { generateArticleButton, Article } from "../article";;
import {getTranslations} from 'next-intl/server';
interface ArticleListProps {
  articles: Article[];
}

export default async function ArticleList({ articles }: ArticleListProps) {
  const t = await getTranslations();
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
