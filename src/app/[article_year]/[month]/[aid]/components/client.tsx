"use client";
import SNSShare from "./share";
import { Article } from "../../../../article/article-client";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { generateArticleButton } from "../../../../article/article-client";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { AvailableLocales } from "@/i18n/request";
import { useLocale } from "@/app/i18nProvider";
interface ClientComponentProps {
  articles: Article[];
  slug: string;
  tocs: {
    lang: AvailableLocales;
    toc: { id: string; text: string; level: string }[];
  }[];
  processedContents: { content: string; lang: AvailableLocales }[];
}

// Helper function to generate SHA256 hash and return as hex string
async function generateSha256Hex(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

export default function ClientComponent({
  articles,
  slug,
  tocs,
  processedContents,
}: ClientComponentProps) {
  const tocRef = useRef<HTMLElement>(null);
  const t = useTranslations("pages.article.content");
  const locale = useLocale();
  const processedContent = processedContents.find(
    (c) => c.lang === locale,
  )?.content;
  const toc = tocs.find((t) => t.lang === locale)?.toc || [];
  const [sha256Seed, setSha256Seed] = useState<number | null>(null);
  const max_show_others = 2;
  // シードに基づいた疑似乱数生成器 (Mulberry32)
  const mulberry32 = (seed: number) => {
    return () => {
      let t = (seed += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  useEffect(() => {
    const seedString = `${slug}-${locale}`;
    generateSha256Hex(seedString)
      .then((hashHex) => {
        // Use the first 8 hex characters (32 bits) as a numeric seed
        // Provide a fallback of 0 if parsing fails or results in NaN
        const numericSeed = parseInt(hashHex.substring(0, 8), 16) || 0;
        setSha256Seed(numericSeed);
      })
      .catch((error) => {
        console.warn(
          "SHA-256 hashing failed, falling back to simple character code sum seed:",
          error,
        );
        // Fallback to a simple hash if SHA-256 fails
        let fallbackSeed = 0;
        for (let i = 0; i < seedString.length; i++) {
          fallbackSeed = (fallbackSeed + seedString.charCodeAt(i)) % 2147483647; // Keep it a positive int
        }
        setSha256Seed(fallbackSeed | 0); // Ensure it's a 32-bit integer
      });
  }, [slug, locale]);

  const currentArticleData = useMemo(() => {
    const article = articles.find((a) => a.slug === slug && a.lang === locale);

    if (sha256Seed === null) {
      // Seed is not yet generated, return current article but no shuffled related articles
      return { article, randomOtherArticles: [] };
    }

    const otherArticles = articles.filter(
      (a) => a.slug !== slug && a.lang === locale,
    );

    const pseudoRandom = mulberry32(sha256Seed);

    const shuffledOtherArticles = [...otherArticles];
    // Fisher-Yates shuffle using the pseudo-random generator
    for (let i = shuffledOtherArticles.length - 1; i > 0; i--) {
      const j = Math.floor(pseudoRandom() * (i + 1));
      [shuffledOtherArticles[i], shuffledOtherArticles[j]] = [
        shuffledOtherArticles[j],
        shuffledOtherArticles[i],
      ];
    }
    const randomOtherArticles = shuffledOtherArticles.slice(0, max_show_others);
    return { article, randomOtherArticles };
  }, [articles, slug, locale, sha256Seed]);

  const { article, randomOtherArticles } = currentArticleData;

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
      <aside className="toc relative md:sticky" ref={tocRef}>
        <h2>{t("words.index")}</h2>
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
        <SNSShare />
      </article>
      <section className="other-articles relative md:sticky">
        <h2>{t("words.others")}</h2>
        <ul>
          {randomOtherArticles.map((other) => generateArticleButton(other))}
        </ul>
      </section>
    </div>
  );
}
