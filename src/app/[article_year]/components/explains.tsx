"use client";
import { useTranslations } from "next-intl";

export default function Explains({ year }: { year: string }) {
  const t = useTranslations();
  return (
    <>
      <section className="title">
        <h1>{t("pages.article.title") + " of " + year}</h1>
      </section>
      <section className="description">
        <p>{t("pages.article.description.msg1")}</p>
        <p>{t("pages.article.description.msg2")}</p>
      </section>
    </>
  );
}
