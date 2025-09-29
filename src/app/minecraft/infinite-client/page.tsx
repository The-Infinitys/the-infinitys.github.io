import React from "react";
import "./page.css";
export default function InfiniteClientPage() {
  return (
    <>
      <section className="title">
        <h1>Infinite Client</h1>
      </section>
      <section className="section">
        <p>
          Infinite
          Clientは、Minecraftのプレイ体験を拡張するために開発された高機能なクライアントです。
        </p>
        <p>
          快適な操作性と多彩な機能を備え、初心者から上級者まで幅広いユーザーにおすすめです。
        </p>
      </section>
      <section className="section">
        <h2>主な特徴</h2>
        <ul>
          <li>軽量かつ高速な動作</li>
          <li>スタイリッシュなUI</li>
          <li>統合されたショートカット機能</li>
          <li>サーバー対策強化</li>
          <li>最新バージョンへの迅速な対応</li>
        </ul>
      </section>
      <section className="section">
        <h2>ダウンロード</h2>
        <p>最新版のダウンロードは以下のリンクから行えます。</p>
        <a
          href="https://github.com/The-Infinitys/minecraft.infinite-client"
          target="_blank"
        >
          Infinite Client ダウンロードページ
        </a>
      </section>
      <section className="section">
        <h2>サポート・お問い合わせ</h2>
        <p>ご質問や不具合報告は、GitHubまたはDiscordよりご連絡ください。</p>
      </section>
    </>
  );
}
