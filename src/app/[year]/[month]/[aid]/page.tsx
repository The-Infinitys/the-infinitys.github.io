import { getArticleIndexes, toHTML } from "../../../article/article";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
  const slug = `${await params.year}/${await params.month}/${await params.aid}`;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound(); // 記事が見つからない場合は404ページを表示
  }

  // 他の記事一覧を取得
  const otherArticles = articles.filter((a) => a.slug !== slug);

  // 目次を生成
  const headings = article.content.match(/<h[1-6]>.*?<\/h[1-6]>/g) || [];
  const toc = headings.map((heading) => {
    const id = heading
      .replace(/<.*?>/g, "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");
    return { id, text: heading.replace(/<.*?>/g, "").trim() };
  });

  return (
    <div className="article-container">
      <aside className="toc relative md:sticky">
        <h2>目次</h2>
        <ul>
          {toc.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`}>{item.text}</a>
            </li>
          ))}
        </ul>
      </aside>
      <article className="article-detail">
        <h1>{article.title}</h1>
        <p>{article.date}</p>
        {article.thumbnail && (
          <Image
            src={article.thumbnail}
            alt={article.title}
            width={800}
            height={450} // 16:9 の比率
            objectFit="cover"
            className="article-thumbnail"
          />
        )}
        <div
          className="article-content"
          dangerouslySetInnerHTML={{
            __html: article.content.replace(/<h[1-6]>/g, (match) => {
              const id = match
                .replace(/<.*?>/g, "")
                .trim()
                .toLowerCase()
                .replace(/\s+/g, "-");
              return `<h2 id="${id}">`;
            }),
          }}
        />
      </article>
      <section className="other-articles relative md:sticky">
        <h2>他の記事</h2>
        <ul>
          {otherArticles.map((other) => (
            <li key={other.slug}>
              <Link href={`/${other.slug}`}>
                <a>{other.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
