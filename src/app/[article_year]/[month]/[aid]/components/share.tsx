"use client";
import { TheInfiniteX } from "./img"; // TheInfiniteX は適切な画像のパスに置き換えてください
import "./share.css";
import { useTranslations } from "next-intl";

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

  const baseUrl = "https://twitter.com/intent/tweet";
  const queryParams = new URLSearchParams();

  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const pageUrl = window.location.href; // 現在のページのURLを自動取得
    const pageText = document.title || ""; // document.titleがない場合を考慮
    queryParams.set("text", pageText);
    queryParams.set("url", pageUrl);
  }

  if (hashtags && hashtags.length > 0) {
    queryParams.append("hashtags", hashtags.join(","));
  }

  if (via) {
    queryParams.append("via", via);
  }

  const shareUrl = `${baseUrl}?${queryParams.toString()}`;

  return (
    <a
      href={shareUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="twitter-share-button"
      aria-label={t("shareX")}
    >
      {TheInfiniteX}
      <p>{t("shareX")}</p>
    </a>
  );
}
