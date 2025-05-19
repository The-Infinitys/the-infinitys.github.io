"use client";
import LanguageSwitcher from "./components/localeSwitcher";

interface LinkInfo {
  href: string;
  target: string;
  text: string;
}

export default function Footer() {
  const link_info: LinkInfo[] = [
    {
      href: "https://github.com/The-Infinitys/",
      target: "blank",
      text: "GitHub",
    },
    {
      href: "https://x.com/The_Infinity_s/",
      target: "blank",
      text: "X (Twitter)",
    },
  ];
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
        <LanguageSwitcher />
      </nav>
    </footer>
  );
}
