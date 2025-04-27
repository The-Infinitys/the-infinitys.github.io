"use client"; // Add this directive for useState

import { Chakra_Petch } from "next/font/google";
import Link from "next/link";
import Image from "next/image"; // Import Image component
import React, { useState } from "react";

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra-petch",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const menus_list = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Articles",
    link: "/article",
  },
];

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
          } md:opacity-100 md:max-h-none /* Show/hide based on state and screen size */
          transition-all duration-300 ease-in-out /* Smooth animation */
          fixed md:relative top-0 left-0 w-full h-full md:w-auto md:h-100%
          bg-[var(--primary)] md:bg-transparent /* Background for mobile */
          z-20 /* Ensure menu is below header content but above main */
          overflow-hidden /* Prevent content overflow during animation */
          flex flex-col md:flex-row items-center justify-center md:justify-end /* Center items for mobile, right-align for desktop */
        `}
      >
        <ul
          className={`
            flex flex-col md:flex-row md:space-x-6 /* Layout adjustments */
            items-center /* Center items for better mobile view */
            p-4 md:p-0 /* Padding for mobile */
          `}
        >
          {menus_list.map((menu, index) => (
            <li key={index}>
              <Link
                href={menu.link}
                onClick={handleLinkClick}
                className={`${chakraPetch.className} block py-2 md:py-0 hover:text-[var(--foreground)]`}
                style={{
                  fontStyle: "italic",
                }}
              >
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
