import type { Locale } from '@/lib/locale';

// Pick the correct language from an i18n field
// Usage: l(settings.hero.headline1, lang) → returns the string for current locale
export function l(field: { cs?: string; en?: string } | undefined | null, locale: Locale): string {
  if (!field) return '';
  return field[locale] || field.cs || field.en || '';
}
