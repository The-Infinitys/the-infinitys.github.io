// src/i18n/routing.ts
// 1. 言語の定数定義
export const locales = ["ja", "en"] as const;

// 2. 型としての抽出
export type Locale = (typeof locales)[number];

// 3. デフォルト言語の定義
export const defaultLocale: Locale = "en";

// 4. 利用可能な言語かチェックするヘルパー
export const isLocale = (locale: string): locale is Locale => {
  return locales.includes(locale as Locale);
};
