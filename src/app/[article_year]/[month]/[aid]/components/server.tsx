import { getArticleIndexes, toHTML } from "../../../../article/article";
import "../../../../article/article.css";
import crypto from "crypto";
import ClientComponent from "./client";
import { AvailableLocales } from "@/i18n/request";

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

  const headings_list = articles
    .filter((a) => a.slug === slug)
    .map((article) => {
      return {
        lang: article.lang as AvailableLocales,
        toc: article.content.match(/<h[1-6]>.*?<\/h[1-6]>/g) || [],
      };
    });
  const tocs = headings_list.map((headings) => {
    return {
      toc: headings.toc.map((heading) => {
        const text = heading.replace(/<.*?>/g, "").trim();
        const id = crypto.createHash("sha512").update(text).digest("hex");
        const level = "index-" + heading.slice(1, 3);
        return { id, text, level };
      }),
      lang: headings.lang,
    };
  });

  const processedContents = articles
    .filter((a) => a.slug === slug)
    .map((article) => {
      return {
        content: article.content.replace(
          /<h([1-6])>(.*?)<\/h[1-6]>/g,
          (match, level, text) => {
            const newLevel = Math.min(parseInt(level) + 1, 6);
            const id = crypto.createHash("sha512").update(text).digest("hex");
            return `<h${newLevel} id="${id}">${text}</h${newLevel}>`;
          }
        ),
        lang: article.lang as AvailableLocales,
      };
    });

  return (
    <ClientComponent
      articles={articles}
      slug={slug}
      tocs={tocs}
      processedContents={processedContents}
    />
  );
}
