
import useTranslation from "@/app/i18n/translate";
import { getArticleIndexes, Article } from "./article";
import "./article.css"; // CSSファイルをインポート
import ArticleList from "./components/list";

export default async function Home() {
  const { t } = useTranslation;
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
