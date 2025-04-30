---
title: Next.jsで生まれ変わる！
date: "2025-04-28"
description: "記事のデータが引き継げませんでした(´・ω・)"
---

# Next.js

Hello, World!

どうも！ The Infinity's です！
今回！ついに！私のサイトを Next.js で置き換えることに成功しました！

## Next.js に変えようと思った経緯

Web サイトを Next.js に変えようと思ったのには様々な理由がありますが、
特に大きかったのは**パフォーマンスの向上**と**開発体験の向上**、

そして**SSG（Static Site Generation、静的サイト生成)**の実現でした。

### パフォーマンスの向上（SSG について）

以前のサイトでは、アクセスが増加した際に表示速度が遅くなることが課題でした。そこで注目したのが Next.js の SSG（Static Site Generation）です。SSG は、**事前に HTML ファイルを生成しておくことで、ユーザーがアクセスした際に高速にページを表示できる**という点が魅力です。

まるで、レストランで注文を受けてから料理を作るのではなく、人気メニューをあらかじめ用意しておくようなイメージでしょうか。これにより、サーバーへの負荷を減らし、**爆速でコンテンツを届けることができる**らしいです！

### 開発体験の向上（TypeScript, TSX）

また、開発体験の向上も大きな理由の一つです。
以前から**TypeScript や JSX での開発に興味**があり、
より型安全でコンポーネントベースの開発を効率的に行いたいと考えていました。

Next.js は TypeScript を標準でサポートしており、
React の JSX と組み合わせることで、**よりモダンで保守性の高いコード**を書くことができます。
(TSX)学習はかなり大変でしたが、実際に開発を始めてみると、その恩恵をひしひしと感じています。
コードの可読性が向上し、バグも早期に発見しやすくなったと実感しています。
新しい技術を学ぶのは大変でしたが、それに見合うだけの価値は十分にあると感じています！💻

#### TypeScriptの例

```tsx title="example.tsx" showLineNumbers
"use client";

import { useState, useEffect } from "react";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300); // 300px以上スクロールしたら表示
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`back-to-top ${isVisible ? "visible" : ""}`}
      aria-label="ページの先頭に戻る"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="36"
        height="36"
      >
        <path d="M12 4l-8 8h4l4 8l4 -8h4z" />
      </svg>
    </button>
  );
}
```

### 実現したかった機能：SSG

そして、最も実現したかった機能が、先ほども触れた**SSG（Static Site Generation）**です。
ブログのような静的なコンテンツが中心のサイトでは、SSG の恩恵を最大限に活かせると考えました。

**コンテンツを事前に生成することで、表示速度が向上するだけでなく、セキュリティ面でも有利**になります。
また、CDN との相性も良く、より安定した配信が可能になります。
今回の Next.js への移行は、まさにこの SSG を活用して、より快適なウェブサイト体験を提供したいという強い思いから実現しました。

## まとめと今後の展望

今回の Next.js への移行は、パフォーマンスの向上、開発体験の向上、そして何より SSG による高速で安定したウェブサイトの実現という、私にとって大きな一歩となりました。記事のデータ移行という想定外の課題はありましたが、新しい技術に触れ、学びながらサイトを再構築していく過程は、非常に刺激的で楽しいものでした。

まだ移行したばかりで、これからさらに Next.js の機能を使いこなしていく必要があると感じています。今後は、動的なコンテンツの導入や、より洗練された UI/UX の実現など、この新しい基盤を活かして様々なことに挑戦していきたいと考えています。

これからも The Infinity's をどうぞよろしくお願いいたします！
