import { type Locale, defaultLocale, locales } from "@/i18n/routing";
import { messagesMap } from "@/i18n/locales";

// サーバー・クライアント両方で使える辞書取得関数
export function getTranslation(locale: string | undefined) {
  // 1. Astro.currentLocale は undefined になる可能性があるため、フォールバックを設定
  const targetLocale = locale && locale in locales ? (locale as Locale) : defaultLocale;

  return messagesMap[targetLocale] || messagesMap[defaultLocale];
}
