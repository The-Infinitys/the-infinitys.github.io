import { useTranslations } from "next-intl";
import { getArticleIndexes, Article } from "./article";
import "./article.css"; // CSSファイルをインポート
import ArticleList from "./components/list";

export default function Home() {
  const t  = useTranslations();
  const articles: Article[] = getArticleIndexes();
  return (
    <>
      <section className="title">
        <h1>{t("pages.article.title")}</h1>
      </section>
      <section className="description">
        <p>{t("pages.article.description.msg1")}</p>
        <p>{t("pages.article.description.msg2")}</p>
      </section>
      <ArticleList articles={articles} />
    </>
  );
}
