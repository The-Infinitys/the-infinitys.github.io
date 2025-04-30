import fs from "fs";
import path from "path";
import matter from "gray-matter";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeFormat from "rehype-format";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import "highlight.js/styles/gradient-dark.css";
const postsDirectory = path.join(process.cwd(), "public");

export function getArticleIndexes() {
  const years = fs.readdirSync(postsDirectory).filter((year) => {
    const yearPath = path.join(postsDirectory, year);
    if (!fs.statSync(yearPath).isDirectory()) return false; // ファイルの場合はスキップ
    return true;
  });

  const articles = years.flatMap((year) => {
    const yearPath = path.join(postsDirectory, year);
    const months = fs.readdirSync(yearPath).filter((month) => {
      const monthPath = path.join(yearPath, month);
      if (!fs.statSync(monthPath).isDirectory()) return false; // ファイルの場合はスキップ
      if (year.startsWith("article-")) return true; // article_で始まらない場合はスキップ
      return false;
    });

    return months.flatMap((month) => {
      const monthPath = path.join(yearPath, month);
      const articleIds = fs.readdirSync(monthPath).filter((articleId) => {
        const articlePath = path.join(monthPath, articleId);
        if (!fs.statSync(articlePath).isDirectory()) return false; // ファイルの場合はスキップ
        return true;
      });

      return articleIds
        .map((articleId) => {
          const articlePath = path.join(monthPath, articleId, "article.md");
          const thumbnailPath = findThumbnailFile(
            path.join(monthPath, articleId)
          );

          if (!fs.existsSync(articlePath)) {
            return null; // article.md が存在しない場合はスキップ
          }

          const fileContents = fs.readFileSync(articlePath, "utf-8");
          const { data } = matter(fileContents);

          return {
            slug: `${year}/${month}/${articleId}`,
            title: data.title || "Untitled", // タイトルがない場合のデフォルト値
            date: data.date || "Unknown date", // 日付がない場合のデフォルト値
            thumbnail: thumbnailPath,
            articlePath,
          };
        })
        .filter(
          (article): article is NonNullable<typeof article> => article !== null
        ); // null を除外
    });
  });

  return articles;
}
function findThumbnailFile(directory: string): string | null {
  const files = fs.readdirSync(directory);
  const thumbnail = files.find((file) => file.startsWith("thumbnail."));
  return thumbnail
    ? `/${path.relative("public", path.join(directory, thumbnail))}`
    : null;
}

export async function toHTML(
  articles:
    | {
        slug: string;
        title: string;
        date: string;
        thumbnail: string | null;
        articlePath: string;
      }[]
) {
  const htmlArticles = await Promise.all(
    articles.map(async (article) => {
      const fileContents = fs.readFileSync(article.articlePath, "utf-8");
      const { content } = matter(fileContents);

      const processedContent = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypePrettyCode)
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
