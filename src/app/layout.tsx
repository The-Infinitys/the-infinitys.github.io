import "./globals.css";
import Header from "./layout/header";
import Footer from "./layout/footer";
import BackToTopButton from "./layout/back2top";
import I18nProvider from "./i18nProvider";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";

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
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>
          <Header />
          <main style={{ minHeight: "100vh" }}>{children}</main>
          <Footer />
        </I18nProvider>
        <BackToTopButton />
      </body>
    </html>
  );
}