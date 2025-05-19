"use client";
import { ReactNode, useState } from "react";
import { generateArticleButton, Article } from "../article-client";
import { useTranslations } from "next-intl";
import { useLocale } from "@/app/i18nProvider";

interface ArticleListProps {
  articles: Article[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  const t = useTranslations("pages.article");
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(""); // 範囲指定の開始日
  const [endDate, setEndDate] = useState(""); // 範囲指定の終了日
  const [currentPage, setCurrentPage] = useState(1);

  const articlesPerPage = 8;

  // 検索とフィルタリング
  const filteredArticles = articles
    .filter((a) => a.lang === locale)
    .filter((a) => a.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((a) => {
      if (!startDate && !endDate) return true; // 日付範囲が指定されていない場合はすべて通す
      const articleDate = new Date(a.date).toISOString().split("T")[0]; // 記事の日付をフォーマット
      if (startDate && articleDate < startDate) return false; // 開始日より前は除外
      if (endDate && articleDate > endDate) return false; // 終了日より後は除外
      return true;
    });

  // ページネーション用の計算
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = filteredArticles.slice(
    startIndex,
    startIndex + articlesPerPage,
  );

  // ページ変更ハンドラー
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <section className="search">
        <input
          type="text"
          placeholder={t("words.search")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <details>
          <summary>{t("words.advancedSearch")}</summary>
          <div className="advanced-search">
            <label>
              {t("words.startDate")}
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="search-date"
              />
            </label>
            <label>
              {t("words.endDate")}
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="search-date"
              />
            </label>
          </div>
        </details>
      </section>
      <section className="articles">
        {currentArticles.map(
          (article: Article): ReactNode => generateArticleButton(article),
        )}
      </section>
      <section className="pager">
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {t("words.previous")}
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {t("words.next")}
          </button>
        </div>
      </section>
    </>
  );
}
