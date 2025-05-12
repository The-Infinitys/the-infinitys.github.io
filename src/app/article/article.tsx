import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeFormat from "rehype-format";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import "highlight.js/styles/gradient-dark.css";
import { ReactNode } from "react";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

const postsDirectory = path.join(process.cwd(), "public");

// SVGファイルをBase64に変換してLoadingImageに代入
const svgFilePath = path.join(process.cwd(), "public", "next-loading.svg");
const LoadingImage =
  "data:image/svg+xml," + fs.readFileSync(svgFilePath, "utf-8").toString();

export function getArticleIndexes() {
  const years = fs.readdirSync(postsDirectory).filter((year) => {
    const yearPath = path.join(postsDirectory, year);
    if (!fs.statSync(yearPath).isDirectory()) return false; // ファイルの場合はスキップ
    return true;
  });

  const articles = years.reverse().flatMap((year) => {
    const yearPath = path.join(postsDirectory, year);
    const months = fs.readdirSync(yearPath).filter((month) => {
      const monthPath = path.join(yearPath, month);
      if (!fs.statSync(monthPath).isDirectory()) return false; // ファイルの場合はスキップ
      if (year.startsWith("article-")) return true; // article-で始まらない場合はスキップ
      return false;
    });

    return months.reverse().flatMap((month) => {
      const monthPath = path.join(yearPath, month);
      const articleIds = fs.readdirSync(monthPath).filter((articleId) => {
        const articlePath = path.join(monthPath, articleId);
        if (!fs.statSync(articlePath).isDirectory()) return false; // ファイルの場合はスキップ
        return true;
      });

      return articleIds.reverse()
        .map((articleId) => {
          const articleDir = path.join(monthPath, articleId);
          const articleFiles = fs
            .readdirSync(articleDir)
            .filter(
              (file) => file.startsWith("article") && file.endsWith(".md")
            );

          if (articleFiles.length === 0) {
            return null; // article*.md が存在しない場合はスキップ
          }

          const thumbnailPath = findThumbnailFile(articleDir);

          return articleFiles.map((articleFile) => {
            const articlePath = path.join(articleDir, articleFile);
            const fileContents = fs.readFileSync(articlePath, "utf-8");
            const { data } = matter(fileContents);

            // 言語を判定 (デフォルトは "ja")
            const langMatch = articleFile.match(/article(?:-(\w+))?\.md$/);
            const lang = langMatch && langMatch[1] ? langMatch[1] : "ja";

            return {
              slug: `${year}/${month}/${articleId}`,
              title: data.title || "Untitled",
              date: data.date || "Unknown date",
              thumbnail: thumbnailPath,
              articlePath,
              description: data.description || "No description available",
              lang,
            };
          });
        })
        .filter(
          (article): article is NonNullable<typeof article> => article !== null
        )
        .flat(); // ネストされた配列を平坦化
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

export type Article = {
  slug: string;
  title: string;
  date: string;
  thumbnail: string | null;
  articlePath: string;
  description: string; // description を追加
  lang: string; // lang を追加
};

// 該当箇所の置き換え
export async function toHTML(articles: Article[]) {
  const htmlArticles = await Promise.all(
    articles.map(async (article) => {
      const fileContents = fs.readFileSync(article.articlePath, "utf-8");
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

export function generateArticleButton(article: Article): ReactNode{

  // スラッグから年、月、記事IDを抽出
  const [year, month, aid] = article.slug.split("/");
  return (
    <Link
      key={article.slug+article.lang}
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
            placeholder={LoadingImage as PlaceholderValue}
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
