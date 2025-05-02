import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
  const router = useRouter();
  const currentLocale = useLocale();

  const switchLocale = (newLocale: string) => {
    const pathname = window.location.pathname;

    const newPath = pathname.replace(
      new RegExp(`\\b(${currentLocale})\\b`, 'g'),
      newLocale
    );

    return newPath;
  };

  return (
    <div className="mt-4">
      <button
        onClick={() => { router.push(switchLocale("en")) }}
        className={`language-button ${currentLocale === "en" ? "active" : ""}`}
      >
        English
      </button>
      <button
        onClick={() => { router.push(switchLocale("ja")) }}
        className={`language-button ${currentLocale === "ja" ? "active" : ""}`}
      >
        日本語
      </button>
    </div>
  );
}