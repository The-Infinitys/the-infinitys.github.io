import "./article.css"; // CSSファイルをインポート
import "./page.css";
import Explains from "./components/explains";
import ArticlePage from "./components/articlepage"; // クライアントコンポーネントをインポート
import { Metadata } from "next";
import Loading from "@/app/loading";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "The Infinity's Articles",
  description: "Much! A lot of! Ideas!",
};

export default function Article() {
  return (
    <>
      <Explains />
      <Suspense fallback={<Loading />}>
        <ArticlePage />
      </Suspense>
    </>
  );
}
