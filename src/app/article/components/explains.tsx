"use client";
import { useTranslations } from "next-intl";

export default function Explains() {
  const t = useTranslations("pages.article");
  return (
    <>
      <section className="title">
        <h1>{t("title")}</h1>
      </section>
      <section className="description">
        <p>{t("description.msg1")}</p>
        <p>{t("description.msg2")}</p>
      </section></>)
}
