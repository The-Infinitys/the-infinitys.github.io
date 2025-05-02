'use client';

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 言語jsonファイルのimport
import translation_en from "./en.json"; 
import translation_ja from "./ja.json"; 

// リソースの定義
const resources = {
  ja: {
    translation: translation_ja,
  },
  en: {
    translation: translation_en,
  },
};

// クライアントサイドでのローカルストレージチェック
const getInitialLanguage = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedLang = localStorage.getItem("language");
      return savedLang || "ja";
    }
  } catch (error) {
    console.error("Error accessing localStorage:", error);
  }
  return "ja";
};

// i18nextの初期化（ブラウザ環境でのみ実行）
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: typeof window !== 'undefined' ? getInitialLanguage() : "ja",
      fallbackLng: "en",
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    })
    .catch(error => {
      console.error("Error initializing i18n:", error);
    });
}

export default i18n;
