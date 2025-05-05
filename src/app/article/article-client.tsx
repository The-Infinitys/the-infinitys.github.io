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
import { Article } from "./article";

export async function toHTML(articles: Article[]) {
  const htmlArticles = await Promise.all(
    articles.map(async (article) => {
      const fileContents = await fetch(article.articlePath).then((res) =>
        res.text()
      );
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
    })
  );

  return htmlArticles;
}