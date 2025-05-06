"use client";

import { Article } from "../../../../article/article-client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { generateArticleButton } from "../../../../article/article-client";
import { useTranslations, useLocale } from "next-intl";

interface ClientComponentProps {
  articles: Article[];
  slug: string;
  toc: { id: string; text: string; level: string }[];
  processedContent: string;
}

export default function ClientComponent({
  articles,
  slug,
  toc,
  processedContent,
}: ClientComponentProps) {
  const tocRef = useRef<HTMLElement>(null);
  const t = useTranslations();
  const locale = t("info.lang");

  const article = articles.find((a) => a.slug === slug && a.lang === locale);
  const otherArticles = articles.filter(
    (a) => a.slug !== slug && a.lang === locale
  );

  if (!article) {
    return null;
  }

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

  return (
    <div className="article-container">
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
