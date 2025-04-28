import "@/app/i18n/configs";
import useTranslation from "i18next";
import { getArticleIndexes, toHTML } from "./article";
import Image from "next/image";
import Link from "next/link";
import "./page.css"; // CSSファイルをインポート

export default async function Home() {
  const { t } = useTranslation;
  const indexes = getArticleIndexes(); // null を除外済み
  const articles = await toHTML(indexes);

  return (
    <>
      <section className="title">
        <h1>{t("article.title")}</h1>
      </section>
      <section className="articles">
        {articles.map((article) => {
          // スラッグから年、月、記事IDを抽出
          const [year, month, aid] = article.slug.split("/");

          return (
            <Link
              key={article.slug}
              href={`/${year}/${month}/${aid}`} // 動的に記事のパスを生成
              className="article-link"
            >
              <article>
                {article.thumbnail && (
                  <Image
                    src={article.thumbnail}
                    alt={article.title}
                    width={300}
                    height={200}
                    objectFit="cover"
                    className="article-thumbnail"
                  />
                )}
                <div className="article-content">
                  <h2>{article.title}</h2>
                  <p>{article.date}</p>
                </div>
              </article>
            </Link>
          );
        })}
      </section>
    </>
  );
}
