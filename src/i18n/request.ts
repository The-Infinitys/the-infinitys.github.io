import { routing } from "./routing";
import enCommon from "./en/common.json";
import jaCommon from "./ja/common.json";

// 静的なロケールデータを直接使用
const messages: Record<"en" | "ja", typeof enCommon> = {
  en: enCommon,
  ja: jaCommon,
};

export default function getStaticLocaleConfig(locale: string) {
  // 有効なロケールを確認
  if (!routing.locales.includes(locale as "en" | "ja")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: messages[locale as "en" | "ja"], // 型を明示的にキャスト
  };
}
