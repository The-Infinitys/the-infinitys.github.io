"use client";
import { useTranslations } from "next-intl";
export default function Home() {
  const t = useTranslations("pages.home");
  return (
    <>
      <section className="title">
        <h1>{t("title")}</h1>
      </section>
      <section>
        <p>{t("description.msg1")}</p>
        <p>{t("description.msg2")}</p>
        <p>{t("description.msg3")}</p>
        <p>{t("description.msg4")}</p>
        <p>{t("description.msg5")}</p>
        <p>{t("description.msg6")}</p>
      </section>
    </>
  );
}
