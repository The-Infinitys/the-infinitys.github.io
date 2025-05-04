import "./globals.css";
import Header from "./layout/header";
import Footer from "./layout/footer";
import BackToTopButton from "./layout/back2top";
import I18nProvider from "./i18nProvider";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages,AvailableLocales } from "@/i18n/request";
export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  if (!routing.locales.includes(locale as AvailableLocales)) {
    notFound();
  }
  const messages = getMessages(locale as AvailableLocales);
  console.log(messages);
  return (
    <>
      <I18nProvider locale={locale} messages={messages}>
        <Header />
        <main style={{ minHeight: "100vh" }}>{children}</main>
        <Footer />
      </I18nProvider>
      <BackToTopButton />
    </>
  );
}
export function generateStaticParams() {
  const locales = ["en", "ja"];
  return locales.map((locale) => ({ locale }));
}