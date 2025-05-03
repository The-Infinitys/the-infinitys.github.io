import { routing } from "./routing";
import enCommon from "../../public/locales/en/common.json";
import jaCommon from "../../public/locales/ja/common.json";
// 静的なロケールデータを直接使用
const messages = {
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
    messages: messages[locale],
  };
}
