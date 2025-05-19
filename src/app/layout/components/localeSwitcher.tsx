"use client";
import { useLocale, setLocale } from "@/app/i18nProvider";

export default function LanguageSwitcher() {
  const currentLocale = useLocale();

  const switchLocale = (newLocale: string) => {
    setLocale(newLocale);
    window.location.reload();
  };

  return (
    <div className="mt-4">
      <button
        onClick={() => switchLocale("en")}
        className={`language-button ${currentLocale === "en" ? "active" : ""}`}
      >
        English
      </button>
      <button
        onClick={() => switchLocale("ja")}
        className={`language-button ${currentLocale === "ja" ? "active" : ""}`}
      >
        日本語
      </button>
    </div>
  );
}
