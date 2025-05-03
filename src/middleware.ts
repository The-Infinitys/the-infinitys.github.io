import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/(ja|en)/:path*"],
};

export function generateStaticParams() {
  const locales = ["ja", "en"];
  const paths = ["", "about", "contact"]; // 必要に応じて静的パスを追加してください

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      locale,
      path,
    }))
  );
}
