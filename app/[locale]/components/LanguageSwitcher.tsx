'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1];

  return (
    <div className="flex gap-4">
      <Link
        href={`/fr${pathname.substring(3)}`}
        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
          currentLocale === 'fr'
            ? 'bg-gray-100 text-gray-900'
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        <Image
          src="/images/fr-flag.svg"
          alt="Français"
          width={20}
          height={20}
          className="rounded-sm"
        />
        <span className="font-medium">FR</span>
      </Link>
      <Link
        href={`/en${pathname.substring(3)}`}
        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
          currentLocale === 'en'
            ? 'bg-gray-100 text-gray-900'
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        <Image
          src="/images/gb-flag.svg"
          alt="English"
          width={20}
          height={20}
          className="rounded-sm"
        />
        <span className="font-medium">EN</span>
      </Link>
    </div>
  );
}