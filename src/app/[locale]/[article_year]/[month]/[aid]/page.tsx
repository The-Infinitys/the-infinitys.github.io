import {
  getArticleIndexes,
  toHTML,
  generateArticleButton,
  Article,
} from "../../../article/article";
import "../../../article/article.css";
import { notFound } from "next/navigation";
import Image from "next/image";
import crypto from "crypto";
import "./page.css";

export async function generateStaticParams() {
  const indexes = getArticleIndexes();

  // 静的に生成するパスを返す
  return indexes.map((article) => {
    const [article_year, month, aid] = article.slug.split("/");
    return { article_year, month, aid };
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ article_year: string; month: string; aid: string }>;
}) {
  // 非同期でparamsを解決
  const resolvedParams = await params;

  const indexes = getArticleIndexes();
  const articles = await toHTML(indexes);

  // スラッグに一致する記事を探す
  const slug = `${resolvedParams.article_year}/${resolvedParams.month}/${resolvedParams.aid}`;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound(); // 記事が見つからない場合は404ページを表示
  }

  // 他の記事一覧を取得
  const otherArticles: Article[] = articles.filter((a) => a.slug !== slug);

  // 目次を生成
  const headings = article.content.match(/<h[1-6]>.*?<\/h[1-6]>/g) || [];
  const toc = headings.map((heading) => {
    const text = heading.replace(/<.*?>/g, "").trim();
    const id = crypto.createHash("sha512").update(text).digest("hex"); // ハッシュ生成
    const level = "index-"+heading.slice(1, 3);
    return { id, text, level };
  });
  return (
    <div className="article-container">
      <aside className="toc relative md:sticky">
        <h2>目次</h2>
        <ul>
          {toc.map((item) => (
            <li key={item.id}>
              <a className={item.level} href={`#${item.id}`}>{item.text}</a>
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
            __html: article.content.replace(
              /<h([1-6])>(.*?)<\/h[1-6]>/g,
              (match, level, text) => {
                const newLevel = Math.min(parseInt(level) + 1, 6);
                const id = crypto
                  .createHash("sha512")
                  .update(text)
                  .digest("hex"); // ハッシュ生成
                return `<h${newLevel} id="${id}">${text}</h${newLevel}>`;
              }
            ),
          }}
        />
      </article>
      <section className="other-articles relative md:sticky">
        <h2>他の記事</h2>
        <ul>{otherArticles.map((other) => generateArticleButton(other))}</ul>
      </section>
    </div>
  );
}
