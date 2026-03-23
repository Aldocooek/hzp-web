import { locales, type Locale } from "@/middleware";

export function isValidLocale(lang: string): lang is Locale {
  return locales.includes(lang as Locale);
}

export type { Locale };
export { locales };
