"use client"; // Add this directive for useState

import { Chakra_Petch } from "next/font/google";
import Link from "next/link";
import Image from "next/image"; // Import Image component
// import TheInfiniteImage from "../../../public/The-Infinite.svg";
import React, { useState, useEffect } from "react";
import { TheInfiniteX } from "./img";
import i18n from "@/app/i18n/configs";

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra-petch",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const menus_list = [
  {
    name: "Home",
    link: "/",
    target: "_self",
    label: "Home",
  },
  {
    name: "Articles",
    link: "/article",
    target: "_self",
    label: "Articles",
  },
  {
    img: TheInfiniteX,
    link: "https://x.com/The_Infinity_s/",
    target: "_blank",
    label: "X (Twitter)",
  },
];

// 言語切り替えコンポーネント
const LanguageSwitcher = () => {
  const [currentLang, setCurrentLang] = useState("ja");

  useEffect(() => {
    // 保存された言語設定があれば読み込む
    const savedLang = localStorage.getItem("language");
    if (savedLang) {
      setCurrentLang(savedLang);
      i18n.changeLanguage(savedLang);
    }
  }, []);

  const switchLanguage = (lang: string) => {
    setCurrentLang(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    // ページをリロードして翻訳を適用
    window.location.reload();
  };

  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={() => switchLanguage("ja")}
        className={`px-2 py-1 rounded ${
          currentLang === "ja" ? "bg-[var(--primary)] text-[var(--foreground)]" : ""
        }`}
        aria-label="日本語に切り替え"
      >
        日本語
      </button>
      <button
        onClick={() => switchLanguage("en")}
        className={`px-2 py-1 rounded ${
          currentLang === "en" ? "bg-[var(--primary)] text-[var(--foreground)]" : ""
        }`}
        aria-label="Switch to English"
      >
        English
      </button>
    </div>
  );
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when a link is clicked (optional but good UX)
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    // Added padding, flex layout for alignment
    <header className="p-4 flex justify-between items-center relative">
      {/* Title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        {/* <Image src={TheInfiniteImage} alt="" width={30} height={30} /> */}
        <h1
          className={`${chakraPetch.className} italic font-semibold text-3xl`} // Use Tailwind classes
          style={{
            fontStyle: "italic",
            fontWeight: "600",
            fontSize: "32px", // Use text-3xl or similar
          }}
        >
          <Link
            href="/"
            onClick={handleLinkClick}
            style={{
              color: "var(--foreground)",
            }}
          >
            {"The Infinity's"}
            {/* Added Link here for consistency */}
          </Link>
        </h1>
      </div>
      {/* Hamburger Button - Hidden on md and larger screens */}
      <button
        onClick={toggleMenu}
        className="md:hidden z-30 p-2" // z-index to be above the menu
        aria-label="メニューを開閉"
        aria-expanded={isMenuOpen}
        aria-controls="navigation-menu"
      >
        <Image
          src={isMenuOpen ? "/layout/close.svg" : "/layout/open.svg"}
          alt={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
          width={30} // Adjust size as needed
          height={30} // Adjust size as needed
          priority // Load icons quickly
        />
      </button>

      {/* Navigation Menu */}
      <nav
        id="navigation-menu"
        className={`
          ${
            isMenuOpen ? "opacity-100 max-h-screen" : "opacity-0 max-h-0"
          } md:opacity-100 md:max-h-none
          transition-all duration-300 ease-in-out
          fixed md:relative top-0 left-0 w-full h-full md:w-auto md:h-100%
          md:bg-transparent
          z-20 overflow-hidden
          flex flex-col md:flex-row items-center justify-center md:justify-end
        `}
      >
        <ul
          className={`
            flex flex-col md:flex-row md:space-x-6
            items-center
            p-4 md:p-0
          `}
        >
          {menus_list.map((menu, index) => (
            <li key={index}>
              <Link
                href={menu.link}
                onClick={handleLinkClick}
                target={menu.target} // target属性を追加
                className={`${chakraPetch.className} block py-2 md:py-0 hover:text-[var(--foreground)]`}
                aria-label={menu.label}
                style={{
                  fontStyle: "italic",
                }}
              >
                {menu.img && menu.img}
                {menu.name}
              </Link>
            </li>
          ))}
          <li>
            <LanguageSwitcher />
          </li>
        </ul>
      </nav>
    </header>
  );
}
