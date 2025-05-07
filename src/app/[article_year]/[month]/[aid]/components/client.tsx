"use client";

import { Article } from "../../../../article/article-client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react"; // useStateを追加
import { generateArticleButton } from "../../../../article/article-client";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { AvailableLocales } from "@/i18n/request";

interface ClientComponentProps {
  articles: Article[];
  slug: string;
  tocs: { lang: AvailableLocales; toc: { id: string; text: string; level: string }[] }[];
  processedContents: { content: string; lang: AvailableLocales }[];
}

export default function ClientComponent({
  articles,
  slug,
  tocs,
  processedContents,
}: ClientComponentProps) {
  const tocRef = useRef<HTMLElement>(null);
  const t = useTranslations();
  const locale = t("info.lang");
  const processedContent = processedContents.find((c) => c.lang === locale)?.content;
  const toc = tocs.find((t) => t.lang === locale)?.toc || [];
  const article = articles.find((a) => a.slug === slug && a.lang === locale);
  const otherArticles = articles.filter((a) => a.slug !== slug && a.lang === locale);

  // 検索機能用の状態
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  // 検索実行用の関数
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      // 正規表現を作成（エラーハンドリング付き）
      const regex = new RegExp(query, "i"); // 大文字小文字を無視
      const results: string[] = [];

      // 記事のタイトルと内容を検索
      if (article?.title && regex.test(article.title)) {
        results.push(`Title: ${article.title}`);
      }

      if (processedContent) {
        // HTMLタグを除去して純粋なテキストを検索
        const div = document.createElement("div");
        div.innerHTML = processedContent;
        const textContent = div.textContent || div.innerText || "";
        const lines = textContent.split("\n").filter((line) => regex.test(line));

        lines.forEach((line) => {
          if (line.trim()) {
            results.push(line.trim());
          }
        });
      }

      setSearchResults(results);
    } catch (error) {
      console.error("Invalid regular expression:", error);
      setSearchResults(["Invalid regular expression"]);
    }
  };

  // 検索クエリが変更されたときに検索を実行
  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      if (!tocRef.current) return;

      const headings = document.querySelectorAll("h2, h3, h4, h5, h6");

      headings.forEach((heading) => {
        const id = heading.id;
        const element = document.getElementById(id);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const offset = 100;

        if (rect.top <= offset && rect.bottom >= offset) {
          const tocLink = tocRef.current?.querySelector(`a[href="#${id}"]`);
          if (tocLink) {
            tocLink.classList.add("active");
          }
        } else {
          const tocLink = tocRef.current?.querySelector(`a[href="#${id}"]`);
          if (tocLink) {
            tocLink.classList.remove("active");
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!article || !processedContent) {
    return notFound();
  }

  return (
    <div className="article-container">
      {/* 検索バーを追加 */}
      <div className="search-bar">
        <input
          type="text"
          placeholder={t("pages.article.content.words.searchPlaceholder") || "Search article..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        {searchResults.length > 0 && (
          <div className="search-results">
            <h3>{t("pages.article.content.words.searchResults") || "Search Results"}</h3>
            <ul>
              {searchResults.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <aside className="toc relative md:sticky" ref={tocRef}>
        <h2>{t("pages.article.content.words.index")}</h2>
        <ul>
          {toc.map((item) => (
            <li key={item.id}>
              <a className={item.level} href={`#${item.id}`}>
                {item.text}
              </a>
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
            height={450}
            priority
            className="article-thumbnail"
          />
        )}
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: processedContent }}
        />
      </article>
      <section className="other-articles relative md:sticky">
        <h2>{t("pages.article.content.words.others")}</h2>
        <ul>{otherArticles.map((other) => generateArticleButton(other))}</ul>
      </section>
    </div>
  );
}