import { getArticleIndexes,toHTML } from "../../../article/article";
import { notFound } from "next/navigation";
import Image from "next/image";
import "./page.css"; // 必要に応じてCSSをインポート

export async function generateStaticParams() {
  const indexes = getArticleIndexes();

  // 静的に生成するパスを返す
  return indexes.map((article) => {
    const [year, month, aid] = article.slug.split("/");
    return { year, month, aid };
  });
}

export default async function ArticlePage({
  params,
}: {
  params: { year: string; month: string; aid: string };
}) {
  const indexes = getArticleIndexes();
  const articles = await toHTML(indexes);

  // スラッグに一致する記事を探す
  const slug = `${params.year}/${params.month}/${params.aid}`;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound(); // 記事が見つからない場合は404ページを表示
  }

  return (
    <article className="article-detail">
      <h1>{article.title}</h1>
      <p>{article.date}</p>
      {article.thumbnail && (
        <Image
          src={article.thumbnail}
          alt={article.title}
          width={600}
          height={400}
          objectFit="cover"
          className="article-thumbnail"
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </article>
  );
}
