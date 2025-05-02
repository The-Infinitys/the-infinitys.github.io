"use client";
import { useState } from "react";
import i18n from "i18next"; // i18nextをインポート

export default function Footer() {
  const [language, setLanguage] = useState(i18n.language || "en"); // 初期言語を設定

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang); // 言語を切り替え
    console.log(`Language changed to: ${lang}`);
  };

  return (
    <footer className="p-4 text-center bg-[var(--primary)]">
      <p className="text-sm text-[var(--foreground)]">
        &copy; 2025 The Infinity&apos;s. All rights reserved.
      </p>
      <nav>
        <ul className="list-none p-0 flex flex-col md:flex-row justify-center items-center gap-4">
          <li>
            <a
              href="https://github.com/The-Infinitys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--link-color)] hover:underline"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://the-infinitys.f5.si/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--link-color)] hover:underline"
            >
              Homepage
            </a>
          </li>
          <li>
            <a
              href="https://g.dev/the-infinitys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--link-color)] hover:underline"
            >
              Google Developer Profile
            </a>
          </li>
          <li>
            <a
              href="https://x.com/The_Infinity_s"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--link-color)] hover:underline"
            >
              X (Twitter)
            </a>
          </li>
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
