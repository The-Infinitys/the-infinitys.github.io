import React from "react";

export default function InfiniteClientPage() {
  return (
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
        Infinite Client
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
        Infinite Clientは、Minecraftのプレイ体験を拡張するために開発された高機能なクライアントです。快適な操作性と多彩な機能を備え、初心者から上級者まで幅広いユーザーにおすすめです。
      </p>
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>主な特徴</h2>
        <ul style={{ fontSize: "1.1rem", paddingLeft: "1.5rem" }}>
          <li>軽量かつ高速な動作</li>
          <li>スタイリッシュなUI</li>
          <li>統合されたショートカット機能</li>
          <li>サーバー対策強化</li>
          <li>最新バージョンへの迅速な対応</li>
        </ul>
      </section>
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>ダウンロード</h2>
        <p>
          最新版のダウンロードは以下のリンクから行えます。
        </p>
        <a href="https://github.com/The-Infinitys/minecraft.infinite-client" target="_blank" style={{ color: "#1976d2", textDecoration: "underline", fontWeight: "bold" }}>
          Infinite Client ダウンロードページ
        </a>
      </section>
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>サポート・お問い合わせ</h2>
        <p>
          ご質問や不具合報告は、GitHubまたはDiscordよりご連絡ください。
        </p>
      </section>
  );
}
