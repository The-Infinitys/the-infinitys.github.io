import { getArticleIndexes, toHTML } from "../../../../article/article";
import "../../../../article/article.css";
import crypto from "crypto";
import ClientComponent from "./client";
import { AvailableLocales } from "@/i18n/request";

// generateStaticParams は既存のまま

export async function generateStaticParams() {
  const indexes = getArticleIndexes();
  return indexes
    .map((article) => {
      // slugが "YYYY/MM/AID" の形式であることを前提とする
      const parts = article.slug.split("/");
      // partsの最後の3つの要素を取り出すことで、"lang/YYYY/MM/AID"のような形式にも対応できるようにする
      if (parts.length >= 3) {
        const [article_year, month, aid] = parts.slice(-3);
        return { article_year, month, aid };
      }
      // 予期しない形式のslugはスキップするか、ログを出す
      console.warn(
        `Skipping invalid slug format in generateStaticParams: ${article.slug}`,
      );
      return null; // nullを返して後でfilter(Boolean)で除外する
    })
    .filter(Boolean); // nullを除外
}

// ArticleServer コンポーネントは既存のまま、または generateMetadata で取得した
// データを再利用するようにリファクタリング可能ですが、ここでは generateMetadata の追加のみに留めます。
// Next.js のApp Routerは、generateMetadata と ページコンポーネントで同じ
// データ取得関数（getArticleIndexes, toHTMLなど）を呼び出した場合、
// 可能であれば自動的に deduplicate (重複排除) してくれるため、
// データの二重取得による大きなパフォーマンス低下は起きにくい設計になっています。

export default async function ArticleServer({
  params,
}: {
  params: Promise<{ article_year: string; month: string; aid: string }>;
}) {
  const resolvedParams = await params;
  const indexes = getArticleIndexes();
  const articles = await toHTML(indexes); // ここで再度データを取得
  const slug = `${resolvedParams.article_year}/${resolvedParams.month}/${resolvedParams.aid}`;

  // スラッグに一致する記事のみをフィルタリング
  const articlesForSlug = articles.filter((a) => a.slug === slug);

  // TOC生成ロジック (既存のまま)
  const headings_list = articlesForSlug.map((article) => {
    return {
      lang: article.lang as AvailableLocales,
      toc: article.content.match(/<h[1-6]>.*?<\/h[1-6]>/g) || [],
    };
  });
  const tocs = headings_list.map((headings) => {
    return {
      toc: headings.toc.map((heading) => {
        const text = heading.replace(/<.*?>/g, "").trim();
        const id = crypto.createHash("sha512").update(text).digest("hex");
        // headingタグからレベルを抽出する処理をより頑健に
        const levelMatch = heading.match(/^<h([1-6])>/);
        const level = levelMatch ? `index-h${levelMatch[1]}` : "index-heading"; // 例: <h1> -> index-h1
        return { id, text, level };
      }),
      lang: headings.lang,
    };
  });

  // コンテンツ処理ロジック (既存のまま)
  const processedContents = articlesForSlug.map((article) => {
    return {
      content: article.content.replace(
        /<h([1-6])>(.*?)<\/h[1-6]>/g,
        (match, level, text) => {
          // 見出しレベルを1つ下げる（h1 -> h2, h2 -> h3など）
          const newLevel = Math.min(parseInt(level) + 1, 6);
          // IDは元の見出しテキストから生成
          const id = crypto.createHash("sha512").update(text).digest("hex");
          return `<h${newLevel} id="${id}">${text}</h${newLevel}>`;
        },
      ),
      lang: article.lang as AvailableLocales,
    };
  });

  return (
    <ClientComponent
      // ClientComponentに渡すarticlesは、スラッグでフィルタリングしたものを渡すのが効率的ですが、
      // 元のコードに合わせてarticles全体（またはClientComponentが必要とするデータ構造）を渡します。
      // ここではarticles全体を渡す元のロジックを踏襲します。
      articles={articles} // 全記事データを渡す (元のコード通り)
      slug={slug}
      tocs={tocs} // フィルタリング済みのTOCs
      processedContents={processedContents} // フィルタリング済みのコンテンツ
    />
  );
}
