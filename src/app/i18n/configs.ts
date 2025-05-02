import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 言語jsonファイルのimport
import translation_en from "./en.json"; // en.json が存在することを確認
import translation_ja from "./ja.json"; // ja.json が存在することを確認

// リソースの定義
const resources = {
  ja: {
    translation: translation_ja, // JSONファイルの内容が正しいか確認
  },
  en: {
    translation: translation_en, // JSONファイルの内容が正しいか確認
  },
};

// クライアントサイドでのローカルストレージチェック
const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    const savedLang = localStorage.getItem("language");
    return savedLang || "ja";
  }
  return "ja";
};

// i18nextの初期化
i18n
  .use(initReactI18next) // react-i18nextを使用
  .init({
    resources, // リソースを設定
    lng: typeof window !== 'undefined' ? getInitialLanguage() : "ja", // 言語設定
    fallbackLng: "en", // フォールバック言語を英語に設定
    interpolation: {
      escapeValue: false, // ReactはXSS対策済み
    },
    react: {
      useSuspense: false, // Suspenseを使わない設定
    },
  });

export default i18n;
