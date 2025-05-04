"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    // ブラウザの言語を取得
    const browserLanguage = navigator.language || navigator.languages[0];
    const languageCode = browserLanguage.split("-")[0]; // 言語コードのみ取得 (例: "en", "ja")

    // サポートされている言語とデフォルト言語
    const supportedLanguages = ["en", "ja"]; // サポートする言語を追加
    const defaultLanguage = "ja";

    // リダイレクト先を決定
    const targetLanguage = supportedLanguages.includes(languageCode)
      ? languageCode
      : defaultLanguage;

    // リダイレクト
    router.push(`/${targetLanguage}`);
  }, [router]);

  return <div>Loading...</div>;
};

export default Page;