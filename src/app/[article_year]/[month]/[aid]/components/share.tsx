"use client";
import { TheInfiniteX } from "./img"; // TheInfiniteX は適切な画像のパスに置き換えてください
import "./share.css";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react"; // useEffectとuseStateをインポート

interface ToXTwitterProps {
  hashtags?: string[]; // ツイートに含めるハッシュタグの配列 (オプション)
  via?: string; // ツイートに含めるvia (オプション)
}
export default function SNSShare() {
  return (
    <div className="sns-share">
      <ToXTwitter />
    </div>
  );
}
export function ToXTwitter({ hashtags, via }: ToXTwitterProps) {
  const t = useTranslations("pages.article.content.words"); // 翻訳フック
  const [shareUrl, setShareUrl] = useState("#"); // 共有URLを保持するstate。初期値は無効なリンク'#'

  useEffect(() => {
    // このeffectはクライアントサイドでのみ実行されます
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const pageUrl = window.location.href; // 現在のページのURLを自動取得
      // ページのタイトルまたは適切なテキストを自動取得（ここではタイトルを使用）
      const pageText = document.title || ""; // document.titleがない場合を考慮

      const baseUrl = "https://twitter.com/intent/tweet";
      const queryParams = new URLSearchParams({
        text: pageText,
        url: pageUrl,
      });

      // オプションのハッシュタグを追加
      if (hashtags && hashtags.length > 0) {
        queryParams.append("hashtags", hashtags.join(","));
      }

      // オプションのviaを追加
      if (via) {
        queryParams.append("via", via);
      }

      // 生成した共有URLをstateにセット
      setShareUrl(`${baseUrl}?${queryParams.toString()}`);
    }
    // hashtags または via props が変更されたらeffectを再実行
  }, [hashtags, via]);

  return (
    <a
      href={shareUrl} // stateから取得した共有URLを使用
      target="_blank"
      rel="noopener noreferrer"
      className="twitter-share-button" // このクラス名でCSSを適用
      aria-label={t("shareX")} // 翻訳されたテキストをaria-labelに使用
    >
      {/* Xのアイコン画像 - next/imageコンポーネントを使用 */}
      {TheInfiniteX}
      {/* 共有ボタンのテキスト - 翻訳されたテキストを使用 */}
      <p>{t("shareX")}</p>
    </a>
  );
}
