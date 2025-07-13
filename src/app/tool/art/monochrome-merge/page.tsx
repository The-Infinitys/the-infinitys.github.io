"use client";

import { useTranslations } from "next-intl";
import MonochromeMergeClient from "./client";

export default function MonochromeMergePage() {
  const t = useTranslations("pages.tool.art.monochrome-merge");
  return (
    <>
      <section className="title">
        <h1>{t("title")}</h1>
        <p>{t("description")}</p>
      </section>
      <section className="monochrome-merge-tool-section">
        <MonochromeMergeClient />
      </section>
    </>
  );
}
