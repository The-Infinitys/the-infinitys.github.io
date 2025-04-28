import "@/app/i18n/configs";
import useTranslation from "i18next";
import { getArticleIndexes, toHTML } from "@/app/article/posts/article";

export default async function Home() {
  const { t } = useTranslation;
  const articles = await toHTML(getArticleIndexes());

  return (
    <>
      <section className="title">
        <h1>{t("article.title")}</h1>
      </section>
      <section>
        {articles.map((article) => (
          <article key={article.slug}>
            <h2>{article.title}</h2>
            <p>{article.date}</p>
            {article.thumbnail && <img src={article.thumbnail} alt={article.title} />}
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </article>
        ))}
      </section>
    </>
  );
}
