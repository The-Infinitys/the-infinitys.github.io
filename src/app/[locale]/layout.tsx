import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./layout/header";
import Footer from "./layout/footer";
import BackToTopButton from "./layout/back2top";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Infinity's",
  description: "Believe in The Infinite Possibilities!",
};

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (!routing.locales.includes(locale as "en" | "ja")) {
    notFound();
  }
  const message = await getMessages();
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={message}>
          <Header />
          <main style={{ minHeight: "100vh" }}>{children}</main>
          <Footer /></NextIntlClientProvider>
        <BackToTopButton /> {/* 上に戻るボタンを追加 */}
      </body>
    </html>
  );
}
