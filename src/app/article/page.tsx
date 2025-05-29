import "./article.css"; // CSSファイルをインポート
import "./page.css";
import Explains from "./components/explains";
import ArticlePage from "./components/articlepage"; // クライアントコンポーネントをインポート
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Infinity's Articles",
  description: "Much! A lot of! Ideas!",
};

export default function Article() {
  return (
    <>
      <Explains />
      <ArticlePage />
    </>
  );
}
