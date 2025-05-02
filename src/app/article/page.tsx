import "@/app/i18n/configs";
import useTranslation from "i18next";
import { generateArticleButton, getArticleIndexes, Article } from "./article";
import "./article.css"; // CSSファイルをインポート
import { ReactNode } from "react";

export default async function Home() {
  const { t } = useTranslation;
  const articles: Article[] = getArticleIndexes();
  return (
    <>
      <section className="title">
        <h1>{t("article.title")}</h1>
      </section>
      <section className="description">
        <p>{t("article.description.msg1")}</p>
        <p>{t("article.description.msg2")}</p>
      </section>
      <section className="articles">
        {articles.map(
          (article: Article): ReactNode => generateArticleButton(article)
        )}
      </section>
    </>
  );
}
