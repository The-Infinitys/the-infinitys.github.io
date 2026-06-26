// src/i18n/useTranslation.ts
import { Locale, locales, routing } from "@/i18n/routing";
import { messagesMap } from "@/i18n/locales";
import { Messages } from "./types";

export function useTranslation(locale: string): Messages {
  // 1. 引数の locale が定義済み Locale か確認
  const isSupported = (l: string): l is Locale => locales.includes(l as Locale);

  // 2. 正しければその言語、ダメならデフォルト言語をキーにする
  const targetLocale = isSupported(locale) ? locale : routing.defaultLocale;

  // 3. マップから取得（念のためフォールバックとしてデフォルト言語のデータを返す）
  return messagesMap[targetLocale] || messagesMap[routing.defaultLocale];
}

export function resolveLocale(): Locale {
  // 1. Next.jsのサーバーサイド実行時（SSR/ビルド時）は window がないため即座にデフォルトを返す
  if (typeof window === "undefined") {
    return "en" as Locale;
  }

  try {
    // 2. localStorage から 'locale' を取得して検証
    const savedLocale = localStorage.getItem("locale");
    if (savedLocale && locales.includes(savedLocale as Locale)) {
      return savedLocale as Locale;
    }

    // 3. 現在の URL パス（location.pathname）から最初のセグメントを抽出して検証
    // 例: "/ja/products" -> ["", "ja", "products"] -> "ja"
    const pathSegments = window.location.pathname.split("/");
    const pathLocale = pathSegments[1]; // スラッシュの直後の文字列

    if (pathLocale && locales.includes(pathLocale as Locale)) {
      return pathLocale as Locale;
    }
  } catch (error) {
    // localStorageがブロックされているブラウザ環境などのセーフティネット
    console.error("Failed to resolve locale:", error);
  }

  // 4. すべてに該当しない、または不正な値の場合はフォールバックとして "en" を返す
  return "en" as Locale;
}

export function toLocale(locale: string): Locale {
  return locales.includes(locale as Locale) ? (locale as Locale) : ("en" as Locale);
}
