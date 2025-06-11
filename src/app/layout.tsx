import "./globals.css";
import Header from "./layout/header";
import Footer from "./layout/footer";
import { Suspense } from "react";
import BackToTopButton from "./layout/back2top";
import I18nProvider from "./i18nProvider";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import Loading from "./loading";
export const metadata: Metadata = {
  title: "The Infinity's",
  description: "Believe in The Infinite Possibilities!",
};
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>
          <Suspense fallback={<Loading />}>
            <Header />
            {children}
            <Footer />
          </Suspense>
        </I18nProvider>
        <BackToTopButton />
      </body>
    </html>
  );
}
