"use client";
import React from "react";
import styles from "./page.module.css"; // Import as module
import { useTranslations } from "next-intl";

export default function InfiniteClientPage() {
  const t = useTranslations("pages.infiniteClient");
  return (
    <>
      <section className={styles.title}>
        <h1 className={styles.titleH1}>{t("title")}</h1>
      </section>
      <section className={styles.section}>
        <p className={styles.sectionP}>{t("description.msg1")}</p>
        <p className={styles.sectionP}>{t("description.msg2")}</p>
      </section>
      <section className={styles.section}>
        <h2 className={styles.sectionH2}>{t("features.title")}</h2>
        <ul className={styles.sectionUl}>
          <li className={styles.sectionLi}>{t("features.feature1")}</li>
          <li className={styles.sectionLi}>{t("features.feature2")}</li>
          <li className={styles.sectionLi}>{t("features.feature3")}</li>
          <li className={styles.sectionLi}>{t("features.feature4")}</li>
          <li className={styles.sectionLi}>{t("features.feature5")}</li>
        </ul>
      </section>
      <section className={styles.section}>
        <h2 className={styles.sectionH2}>{t("download.title")}</h2>
        <p className={styles.sectionP}>{t("download.msg1")}</p>
        <a
          href="https://github.com/The-Infinitys/minecraft.infinite-client"
          target="_blank"
          className={styles.sectionA}
        >
          {t("download.link")}
        </a>
      </section>
      <section className={styles.section}>
        <h2 className={styles.sectionH2}>{t("support.title")}</h2>
        <p className={styles.sectionP}>{t("support.msg1")}</p>
      </section>
    </>
  );
}
