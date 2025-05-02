import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/app/layout/header";
import Footer from "@/app/layout/footer";
import BackToTopButton from "@/app/layout/back2top";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main style={{ minHeight: "100vh" }}>{children}</main>
        <Footer />
        <BackToTopButton />
      </body>
    </html>
  );
}
