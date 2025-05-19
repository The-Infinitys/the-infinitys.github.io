"use client";
import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
export type Article = {
  slug: string;
  title: string;
  date: string;
  thumbnail: string | null;
  articlePath: string;
  description: string; // description を追加
  lang: string; // lang を追加
};

export function generateArticleButton(article: Article): ReactNode {
  // スラッグから年、月、記事IDを抽出
  const [year, month, aid] = article.slug.split("/");
  return (
    <Link
      key={article.slug + article.lang}
      href={`/${year}/${month}/${aid}`}
      className="article-link"
    >
      <article>
        {article.thumbnail && (
          <Image
            src={article.thumbnail}
            alt={article.title}
            width={300}
            height={200}
            className="article-thumbnail"
          />
        )}
        <div className="article-content">
          <h2>{article.title}</h2>
          <p>{article.date}</p>
          <p>{article.description}</p>
        </div>
      </article>
    </Link>
  );
}
