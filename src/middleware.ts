import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const locales = ["cs", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "cs";

function getLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get("accept-language") || "";
  const preferredLanguage = acceptLanguage.split(",")[0]?.split("-")[0]?.toLowerCase();

  if (preferredLanguage && locales.includes(preferredLanguage as Locale)) {
    return preferredLanguage as Locale;
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for Sanity Studio
  if (pathname.startsWith('/studio')) return NextResponse.next();

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Redirect to locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\..*).+)",
    "/",
  ],
};
