import "./article.css"; // CSSファイルをインポート
import Explains from "./components/explains";
import ArticlePage from "./components/articlepage"; // クライアントコンポーネントをインポート

export default function Home() {
  return (
    <>
      <Explains />
      <ArticlePage/>
    </>
  );
}
