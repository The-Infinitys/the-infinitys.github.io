// src/components/I18nProvider.tsx
"use client";
import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { Translation } from "@/i18n/request";
import { AvailableLocales, defaultLocale, getMessages } from "@/i18n/request";
import { useSyncExternalStore } from "react";

// ローカルストレージのキー
const LOCALE_STORAGE_KEY = "language";

export default function I18nProvider({ children }: { children: ReactNode }) {
  const locale = useLocale();
  const messages: Translation = getMessages(locale);
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone="Asia/Tokyo"
    >
      {children}
    </NextIntlClientProvider>
  );
}

// ローカルストレージから現在のロケールを取得するカスタムフック
export function useLocale(): AvailableLocales {
  const locale = useSyncExternalStore(
    subscribeToStorage,
    () => localStorage.getItem(LOCALE_STORAGE_KEY) || defaultLocale,
    () => defaultLocale,
  );

  return locale as AvailableLocales;
}

// ローカルストレージにロケールを設定する関数
export function setLocale(locale: string): void {
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  console.log(locale);
}

// ストレージイベントを購読する関数
function subscribeToStorage(callback: () => void) {
  const handler = () => callback();
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("storage", handler);
  };
}
