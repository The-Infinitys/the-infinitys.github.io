import ArticleServer from "./components/server";
import { getArticleIndexes } from "@/app/article/article";
import { toHTML } from "@/app/article/article";
import "./page.css";
import { Metadata } from "next";
export async function generateStaticParams() {
  const indexes = getArticleIndexes();

  // 静的に生成するパスを返す
  return indexes.map((article) => {
    const [article_year, month, aid] = article.slug.split("/");
    return { article_year, month, aid };
  });
}

// メタデータを生成する generateMetadata 関数を追加
// この関数はページコンポーネントよりも先に実行されます
export async function generateMetadata({
  params,
}: {
  params: Promise<{ article_year: string; month: string; aid: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  // 1. paramsからslugを再構築
  const slug = `${resolvedParams.article_year}/${resolvedParams.month}/${resolvedParams.aid}`;

  // 2. 記事データを取得
  // toHTML関数が記事のコンテンツだけでなく、タイトルやディスクリプションなどのメタデータも
  // 含むオブジェクトの配列を返すことを前提とします。
  const indexes = getArticleIndexes();
  const articles = await toHTML(indexes); // articlesは[{ slug: '...', title: '...', description: '...', lang: '...', content: '...' }, ...] のような形式を想定

  // 3. 現在のslugに一致する記事データを検索
  // generateStaticParams の設計から、slug に一致する記事は存在するはずですが、
  // toHTML が複数の言語バージョンを同じ slug で返す可能性があるため、
  // 最初に見つかったものをメタデータとして利用します。
  const article = articles.find((a) => a.slug === slug && a.lang === "en");

  // 4. 記事データからタイトルとディスクリプションを取得し、Metadata オブジェクトを生成
  const title = article?.title || "記事が見つかりません"; // 記事が見つからない場合のデフォルトタイトル
  const description =
    article?.description || "要求された記事が見つかりませんでした。"; // 記事が見つからない場合のデフォルトディスクリプション

  // 必要に応じて、サイト名などをタイトルに追加する
  const fullTitle = `${title} | The Infinity's`; // 例: "Next.jsでメタデータを生成する | あなたのサイト名"
  const og_image_url = `${slug}/${article?.thumbnail?.split("/").slice(-1)[0]}`;
  const metadata: Metadata = {
    metadataBase: new URL(
      process.env.BASE_URL || "https://the-infinitys.f5.si",
    ),
    title: fullTitle, // ページのタイトルを設定
    description: description, // ページのディスクリプションを設定
    alternates: {
      canonical: `/${slug}`, //
    },
    // Open Graph メタデータ (SNS共有時に表示される情報)
    openGraph: {
      title: fullTitle,
      description: description,
      url: `/${slug}`, // 絶対URLが推奨
      type: "article", // コンテンツタイプを記事に設定
      // 記事に画像がある場合は、imagesプロパティを追加
      images: [og_image_url || ""],
      locale: article?.lang || "ja_JP", // 記事の言語に対応したロケールを設定
    },
  };
  return metadata;
}

export default function ArticlePage({
  params,
}: {
  params: Promise<{ article_year: string; month: string; aid: string }>;
}) {
  return <ArticleServer params={params} />;
}
