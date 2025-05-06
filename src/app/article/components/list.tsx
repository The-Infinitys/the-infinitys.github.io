"use client";
import { ReactNode } from "react";
import { generateArticleButton, Article } from "../article-client";
import { useLocale } from "@/app/i18nProvider";

interface ArticleListProps {
  articles: Article[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  const locale = useLocale();
  const filteredArticles = articles.filter((a) => a.lang === locale);
  return (
    <section className="articles">
      {filteredArticles.map(
        (article: Article): ReactNode => generateArticleButton(article)
      )}
    </section>
  );
}
