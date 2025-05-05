"use client";
import matter from "gray-matter";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeFormat from "rehype-format";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import "highlight.js/styles/gradient-dark.css";
import Image from "next/image";
import Link from "next/link";
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

export async function toHTML(article: Article) {
  const article_path = "/" + article.slug + "/article.md";
  console.log(article_path);
  const fileContents = await fetch(article_path).then((res) => res.text());
  const { content } = matter(fileContents);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      defaultLang: "plaintext",
      theme: "github-dark-high-contrast",
      keepBackground: true,
    })
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(content);

  return {
    ...article,
    content: processedContent.toString(),
  };
}

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
