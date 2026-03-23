"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/middleware";

interface LanguageSwitcherProps {
  currentLang: Locale;
}

// Maps slugs when switching between CS and EN so /cs/produkty → /en/products (not a 404)
const slugMap: Record<string, Record<string, string>> = {
  "cs-to-en": {
    produkty: "products",
    "o-nas": "about",
    kontakty: "contact",
    kariera: "career",
  },
  "en-to-cs": {
    products: "produkty",
    about: "o-nas",
    contact: "kontakty",
    career: "kariera",
  },
};

function translateSlug(slug: string, from: Locale, to: Locale): string {
  const key = `${from}-to-${to}`;
  return slugMap[key]?.[slug] ?? slug;
}

export default function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const pathname = usePathname();

  const getLocalizedPath = (targetLocale: Locale): string => {
    if (targetLocale === currentLang) return pathname;

    const segments = pathname.split("/");
    // segments[0] = "" (before leading slash), segments[1] = locale
    segments[1] = targetLocale;

    // Translate the slug segment if present (segments[2])
    if (segments[2]) {
      segments[2] = translateSlug(segments[2], currentLang, targetLocale);
    }

    return segments.join("/") || `/${targetLocale}`;
  };

  return (
    <div className="flex items-center gap-1">
      <Link
        href={getLocalizedPath("cs")}
        className={`text-sm font-medium tracking-wider transition-all duration-300 px-2 py-1 rounded ${
          currentLang === "cs"
            ? "text-[#e94560] border border-[#e94560]/30"
            : "text-[#c2c2c2] hover:text-[#fafaf9]"
        }`}
        style={{ fontFamily: "var(--font-display)" }}
      >
        CS
      </Link>
      <span className="text-[#c2c2c2]/30 text-xs" aria-hidden="true">/</span>
      <Link
        href={getLocalizedPath("en")}
        className={`text-sm font-medium tracking-wider transition-all duration-300 px-2 py-1 rounded ${
          currentLang === "en"
            ? "text-[#e94560] border border-[#e94560]/30"
            : "text-[#c2c2c2] hover:text-[#fafaf9]"
        }`}
        style={{ fontFamily: "var(--font-display)" }}
      >
        EN
      </Link>
    </div>
  );
}
