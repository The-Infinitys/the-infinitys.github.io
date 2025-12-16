import articleStyles from "../article/article.module.css"; // CSSファイルをインポート
import pageStyles from "../article/page.module.css";
import Explains from "./components/explains";
import ArticlePage from "./components/articlepage"; // クライアントコンポーネントをインポート
import { getArticleIndexes } from "@/app/article/article";

export async function generateStaticParams() {
  const indexes = getArticleIndexes();
  // 静的に生成するパスを返す
  return indexes.map((article) => {
    const [article_year] = article.slug.split("/");
    return { article_year };
  });
}

export default async function Home({ params }: { params: Promise<{ article_year: string }> }) {
  const resolvedParams = await params;
  const article_year = parseInt(resolvedParams.article_year.replace("article-", "")).toString();
  return (
    <>
      <Explains year={article_year} />
      <ArticlePage year={article_year} />
    </>
  );
}
