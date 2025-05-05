"use client";
import {
  generateArticleButton,
  Article,
  toHTML
} from "../../../article/article-client";
import "../../../article/article.css";
import { notFound } from "next/navigation";
import Image from "next/image";
import crypto from "crypto";
import { useLocale } from "@/app/i18nProvider";

export default async function ArticleContent({
  slug,
  indexes,
  articles
}: {
    slug: string;
    indexes: {
      slug: string;
      title: any;
      date: any;
      thumbnail: string | null;
      articlePath: string;
      description: any;
      lang: string;
    }[];
    articles: Article[];
}) {
  // デフォルトの言語を設定
  const locale = useLocale();

  // 言語に基づいて記事をフィルタリング
  const index = indexes.find(
    (a) => a.slug === slug && a.lang === locale
  );
  if (!index) {
    notFound(); // 記事が見つからない場合は404ページを表示
  }

  const article = await toHTML(index);
  if (!article) {
    notFound(); // 記事が見つからない場合は404ページを表示
  }

  // 他の記事一覧を取得（同じ言語の記事のみ）
  const otherArticles: Article[] = articles.filter(
    (a) => a.slug !== slug && a.lang === locale
  );

  // 目次を生成
  const headings = article.content.match(/<h[1-6]>.*?<\/h[1-6]>/g) || [];
  const toc = headings.map((heading) => {
    const text = heading.replace(/<.*?>/g, "").trim();
    const id = crypto.createHash("sha512").update(text).digest("hex"); // ハッシュ生成
    const level = "index-" + heading.slice(1, 3);
    return { id, text, level };
  });
  return (
    <div className="article-container">
      <aside className="toc relative md:sticky">
        <h2>目次</h2>
        <ul>
          {toc.map((item) => (
            <li key={item.id}>
              <a className={item.level} href={`#${item.id}`}>
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </aside>
      <article className="article-detail">
        <h1>{article.title}</h1>
        <p>{article.date}</p>
        {article.thumbnail && (
          <Image
            src={article.thumbnail}
            alt={article.title}
            width={800}
            height={450} // 16:9 の比率
            objectFit="cover"
            className="article-thumbnail"
          />
        )}
        <div
          className="article-content"
          dangerouslySetInnerHTML={{
            __html: article.content.replace(
              /<h([1-6])>(.*?)<\/h[1-6]>/g,
              (match, level, text) => {
                const newLevel = Math.min(parseInt(level) + 1, 6);
                const id = crypto
                  .createHash("sha512")
                  .update(text)
                  .digest("hex"); // ハッシュ生成
                return `<h${newLevel} id="${id}">${text}</h${newLevel}>`;
              }
            ),
          }}
        />
      </article>
      <section className="other-articles relative md:sticky">
        <h2>他の記事</h2>
        <ul>{otherArticles.map((other) => generateArticleButton(other))}</ul>
      </section>
    </div>
  );
}
