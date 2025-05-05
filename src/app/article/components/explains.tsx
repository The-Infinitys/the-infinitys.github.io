"use client";
import { useTranslations } from "next-intl";

export default function Explains() {
  const t = useTranslations();
  const language = t("info.lang");
  return (
    <>
      <section className="title">
        <h1>{t("pages.article.title")}</h1>
      </section>
      <section className="description">
        <p>{t("pages.article.description.msg1")}</p>
        <p>{t("pages.article.description.msg2")}</p>
      </section></>)
}