"use client";
import { ReactNode, useState } from "react";
import { generateArticleButton, Article } from "../article-client";
import { useTranslations } from "next-intl";

interface ArticleListProps {
  articles: Article[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  const t = useTranslations();
  const locale = t("info.lang");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const articlesPerPage = 8;

  // 検索とフィルタリング
  const filteredArticles = articles
    .filter((a) => a.lang === locale)
    .filter((a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // ページネーション用の計算
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = filteredArticles.slice(
    startIndex,
    startIndex + articlesPerPage
  );

  // ページ変更ハンドラー
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="articles">
      <input
        type="text"
        placeholder="Search articles..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      {currentArticles.map(
        (article: Article): ReactNode => generateArticleButton(article)
      )}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {t("pages.article.words.previous")}
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {t("pages.article.words.next")}
        </button>
      </div>
    </section>
  );
}
