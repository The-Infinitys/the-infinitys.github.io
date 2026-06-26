// src/i18n/locales.ts
import { type Locale } from "@/i18n/routing";
import { ja } from "./locales/ja";
import { en } from "./locales/en";
import { type Messages } from "./types";

// ここで言語とデータの紐付けを行う
export const messagesMap: Record<Locale, Messages> = {
  ja,
  en,
};
