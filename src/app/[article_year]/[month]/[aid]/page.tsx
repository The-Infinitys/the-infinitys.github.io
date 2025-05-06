import ArticleServer from "./components/server";
import { getArticleIndexes } from "@/app/article/article";
import "./page.css";

export async function generateStaticParams() {
  const indexes = getArticleIndexes();

  // 静的に生成するパスを返す
  return indexes.map((article) => {
    const [article_year, month, aid] = article.slug.split("/");
    return { article_year, month, aid };
  });
}


export default function ArticlePage({
  params,
}: {
  params: Promise<{ article_year: string; month: string; aid: string }>;
}) {
  return <ArticleServer params={params} />;
}
