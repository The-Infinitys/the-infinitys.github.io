import Link from 'next/link';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const currentLocale = useLocale();
  const pathname = usePathname();

  const switchLocalePath = (newLocale: string) => {
    // 現在のパスを分割してロケール部分を置き換える
    const segments = pathname.split('/');
    if (segments[1] === currentLocale) {
      segments[1] = newLocale; // ロケール部分を新しいロケールに置き換える
    }
    return segments.join('/');
  };

  return (
    <div className="mt-4">
      <Link
        href={switchLocalePath('en')}
        className={`language-button ${currentLocale === 'en' ? 'active' : ''}`}
      >
        English
      </Link>
      <Link
        href={switchLocalePath('ja')}
        className={`language-button ${currentLocale === 'ja' ? 'active' : ''}`}
      >
        日本語
      </Link>
    </div>
  );
}