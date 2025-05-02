import i18n from "i18next";
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

// i18nextの初期化
i18n.init({
  resources, // リソースを設定
  fallbackLng: "ja", // フォールバック言語を英語に設定
  interpolation: {
    escapeValue: false, // ReactはXSS対策済み
  },
  debug: true, // デバッグモードを有効化（必要に応じて削除）
});

export default i18n;
