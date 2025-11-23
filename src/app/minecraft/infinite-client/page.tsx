"use client";
import React from "react";
import "./page.css";
import { useTranslations } from "next-intl";

export default function InfiniteClientPage() {
  const t = useTranslations("pages.infiniteClient");
  return (
    <>
      <section className="title">
        <h1>{t("title")}</h1>
      </section>
      <section className="section">
        <p>{t("description.msg1")}</p>
        <p>{t("description.msg2")}</p>
      </section>
      <section className="section">
        <h2>{t("features.title")}</h2>
        <ul>
          <li>{t("features.feature1")}</li>
          <li>{t("features.feature2")}</li>
          <li>{t("features.feature3")}</li>
          <li>{t("features.feature4")}</li>
          <li>{t("features.feature5")}</li>
        </ul>
      </section>
      <section className="section">
        <h2>{t("download.title")}</h2>
        <p>{t("download.msg1")}</p>
        <a
          href="https://github.com/The-Infinitys/minecraft.infinite-client"
          target="_blank"
        >
          {t("download.link")}
        </a>
      </section>
      <section className="section">
        <h2>{t("support.title")}</h2>
        <p>{t("support.msg1")}</p>
      </section>
    </>
  );
}
