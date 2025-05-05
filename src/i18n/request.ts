import enCommon from "./en/common.json";
import jaCommon from "./ja/common.json";
import { getRequestConfig } from "next-intl/server";
// 利用可能なロケールを型として定義
export const defaultLocale = "ja";
export type AvailableLocales = "en" | "ja";
export interface Translation {
  [key: string]: string | Translation; // ネストされたオブジェクトも許容
}
export type Resources = {
  [key in AvailableLocales]: Translation;
};
// 静的なロケールデータを直接使用
const messages: Resources = {
  en: enCommon,
  ja: jaCommon,
};

// 翻訳リソースの型を定義
// 指定されたロケールに基づいてメッセージを取得
export function getMessages(locale: AvailableLocales): Translation {
  return messages[locale];
}

export default getRequestConfig(async ({ locale }) => {
  // 利用可能なロケールかどうかを確認
  const availableLocale = (["en", "ja"] as AvailableLocales[]).includes(
    locale as AvailableLocales
  )
    ? (locale as AvailableLocales)
    : "en"; // デフォルトは "en"

  return {
    locale: availableLocale,
    messages: messages[availableLocale],
  };
});
