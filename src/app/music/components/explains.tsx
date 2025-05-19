"use client";
import { useTranslations } from "next-intl";

export default function Explains() {
  const t = useTranslations("pages.music");
  return (
    <section>
      <p>{t("description.msg1")}</p>
      <p>{t("description.msg2")}</p>
    </section>);
}