"use client";
import { useState } from "react";
import { setLanguage, getLanguage } from "@/app/i18n/translate";


// クッキーから言語を取得する関数（クライアントサイドでのみ実行）
function getCookie(name: string): string | undefined {
  if (typeof window === "undefined") {
    console.warn("getCookie can only be used in the browser.");
    return undefined;
  }
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : undefined;
}

// クッキーに言語を設定する関数
function setCookie(name: string, value: string, days: number): void {
  if (typeof window === "undefined") {
    console.warn("setCookie can only be used in the browser.");
    return;
  }
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(
    value
  )};expires=${date.toUTCString()};path=/`;
}

const link_info = [
  {
    href: "https://github.com/The-Infinitys",
    target: "blank",
    text: "GitHub"
  },
  {
    href: "https://the-infinitys.f5.si/",
    target: "blank",
    text: "Homepage"
  },
  {
    href: "https://g.dev/the-infinitys",
    target: "blank",
    text: "Google Developer Profile"
  },
  {
    href: "https://x.com/The_Infinity_s",
    target: "blank",
    text: "X (Twitter)"
  }
];

export default function Footer() {
  const [language, setLanguageState] = useState<string>(getLanguage()); // 現在の言語を状態として管理

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang); // 言語を設定
    setLanguageState(lang); // 状態を更新
    window.location.reload();
    console.log(`Language changed to: ${lang}`);
  };

  return (
    <footer className="p-4 text-center bg-[var(--primary)]">
      <p className="text-sm text-[var(--foreground)]">
        &copy; 2025 The Infinity&apos;s. All rights reserved.
      </p>
      <nav>
        <ul className="list-none p-0 flex flex-col md:flex-row justify-center items-center gap-4">
          {link_info.map((link, index) => (
            <li key={index}>
              <a
                href={link.href}
                target={"_" + link.target}
                rel="noopener noreferrer"
                className="text-[var(--link-color)] hover:underline"
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-4">
        <button
          onClick={() => handleLanguageChange("en")}
          className={`language-button ${language === "en" ? "active" : ""}`}
        >
          English
        </button>
        <button
          onClick={() => handleLanguageChange("ja")}
          className={`language-button ${language === "ja" ? "active" : ""}`}
        >
          日本語
        </button>
      </div>
    </footer>
  );
}
