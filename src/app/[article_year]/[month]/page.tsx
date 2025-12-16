import articleStyles from "../../article/article.module.css"; // CSSファイルをインポート
import pageStyles from "../../article/page.module.css";
import Explains from "./components/explains";
import ArticlePage from "./components/articlepage"; // クライアントコンポーネントをインポート
import { getArticleIndexes } from "@/app/article/article";

export async function generateStaticParams() {
  const indexes = getArticleIndexes();
  // 静的に生成するパスを返す
  return indexes.map((article) => {
    const [article_year, month] = article.slug.split("/");
    return { article_year, month };
  });
}

export default async function Home({
  params,
}: {
  params: Promise<{ article_year: string; month: string }>;
}) {
  const resolvedParams = await params;
  const article_year = parseInt(resolvedParams.article_year.replace("article-", "")).toString();
  const month = resolvedParams.month;
  return (
    <>
      <Explains year={article_year} month={month} />
      <ArticlePage year={article_year} month={month} />
    </>
  );
}
