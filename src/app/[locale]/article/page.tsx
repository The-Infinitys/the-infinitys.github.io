import { getArticleIndexes, Article } from "./article";
import "./article.css"; // CSSファイルをインポート
import ArticleList from "./components/list";
import Explains from "./components/explains";
export default function Home() {
  const articles: Article[] = getArticleIndexes();
  return (
    <>
      <Explains />
      <ArticleList articles={articles} />
    </>
  );
}
