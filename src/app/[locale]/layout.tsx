import "./globals.css";
import Header from "./layout/header";
import Footer from "./layout/footer";
import BackToTopButton from "./layout/back2top";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  if (!routing.locales.includes(locale as "en" | "ja")) {
    notFound();
  }
  const message = await getMessages({ locale: locale });
  return (
    <>
      <NextIntlClientProvider locale={locale} messages={message}>
        <Header />
        <main style={{ minHeight: "100vh" }}>{children}</main>
        <Footer />
      </NextIntlClientProvider>
      <BackToTopButton />
    </>
  );
}
export function generateStaticParams() {
  const locales = ["en", "ja"];
  return locales.map((locale) => ({ locale }));
}