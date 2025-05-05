import { getArticleIndexes,toHTML } from "@/app/article/article";
import ArticleContent from "./content";
import "./page.css";

export async function generateStaticParams() {
  const indexes = getArticleIndexes();

  // 静的に生成するパスを返す
  return indexes.map((article) => {
    const [article_year, month, aid] = article.slug.split("/");
    return { article_year, month, aid };
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ article_year: string; month: string; aid: string }>;
}) {
  // 非同期でparamsを解決
  const resolvedParams = await params;
  // スラッグに一致する記事を探す
  const slug = `${resolvedParams.article_year}/${resolvedParams.month}/${resolvedParams.aid}`;
  const indexes=getArticleIndexes();
  const articles = await toHTML(indexes);
  return (
    <ArticleContent slug={slug} indexes={indexes} articles={articles} />
  );
}
