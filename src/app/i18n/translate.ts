import translation_en from "./en.json"; // en.json が存在することを確認
import translation_ja from "./ja.json"; // ja.json が存在することを確認

// サポートされる言語の型を定義
type Language = "en" | "ja";

// 翻訳データの型を定義
interface Translation {
  [key: string]: string | Translation; // ネストされたオブジェクトも許容
}

// 翻訳リソースの型を定義
type Resources = {
  [key in Language]: {
    translation: Translation;
  };
};

// リソースの定義
const resources: Resources = {
  ja: {
    translation: translation_ja as Translation, // 型アサーションを使用
  },
  en: {
    translation: translation_en as Translation, // 型アサーションを使用
  },
};

// 現在の言語を保持する変数（クッキーから取得、デフォルトは "en"）
let currentLanguage: Language ="en" as Language;

// 言語を設定する関数
export function setLanguage(language: string): void {
  if (resources[language as Language]) {
    currentLanguage = language as Language;
  } else {
    console.warn(`Unsupported language: ${language}`);
  }
}

// 現在の言語を取得する関数
export function getLanguage(): string {
  return currentLanguage;
}

// 翻訳キーを取得する関数
export default function useTranslation(key: string): string {
  const keys = key.split("."); // ドット区切りでネストされたキーに対応
  let translation: Translation = resources[currentLanguage].translation; // 型を Translation に修正

  for (const k of keys) {
    if (typeof translation !== "object" || translation[k] === undefined) {
      console.warn(`Missing translation for key: ${key}`);
      return key;
    }
    translation = translation[k] as Translation; // 型アサーションを使用
  }

  return typeof translation === "string" ? translation : key;
}
