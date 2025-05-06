import {
  getArticleIndexes,
  toHTML,
  generateArticleButton,
  Article,
} from "../../../../article/article";
import "../../../../article/article.css";
import { notFound } from "next/navigation";
import Image from "next/image";
import crypto from "crypto";
import ClientComponent from "./client";

export async function generateStaticParams() {
  const indexes = getArticleIndexes();
  return indexes.map((article) => {
    const [article_year, month, aid] = article.slug.split("/");
    return { article_year, month, aid };
  });
}

export default async function ArticleServer({
  params,
}: {
  params: Promise<{ article_year: string; month: string; aid: string }>;
}) {
  const resolvedParams = await params;
  const indexes = getArticleIndexes();
  const articles = await toHTML(indexes);
  const slug = `${resolvedParams.article_year}/${resolvedParams.month}/${resolvedParams.aid}`;

  const headings =
    articles
      .find((a) => a.slug === slug)
      ?.content.match(/<h[1-6]>.*?<\/h[1-6]>/g) || [];
  const toc = headings.map((heading) => {
    const text = heading.replace(/<.*?>/g, "").trim();
    const id = crypto.createHash("sha512").update(text).digest("hex");
    const level = "index-" + heading.slice(1, 3);
    return { id, text, level };
  });

  const processedContent =
    articles
      .find((a) => a.slug === slug)
      ?.content.replace(/<h([1-6])>(.*?)<\/h[1-6]>/g, (match, level, text) => {
        const newLevel = Math.min(parseInt(level) + 1, 6);
        const id = crypto.createHash("sha512").update(text).digest("hex");
        return `<h${newLevel} id="${id}">${text}</h${newLevel}>`;
      }) || "";

  return (
    <ClientComponent
      articles={articles}
      slug={slug}
      toc={toc}
      processedContent={processedContent}
    />
  );
}
