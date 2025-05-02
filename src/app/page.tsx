'use client';

import { useEffect } from "react";
import i18n from "@/app/i18n/configs";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  
  useEffect(() => {
    // クライアントサイドでのみ実行される初期化処理
    const savedLang = localStorage.getItem("language");
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, []);
  
  return (
    <>
      <section className="title">
        <h1>{t("home.title")}</h1>
      </section>
      <section>
        <p>{t("home.description.msg1")}</p>
        <p>{t("home.description.msg2")}</p>
        <p>{t("home.description.msg3")}</p>
        <p>{t("home.description.msg4")}</p>
        <p>{t("home.description.msg5")}</p>
        <p>{t("home.description.msg6")}</p>
      </section>
    </>
  );
}
