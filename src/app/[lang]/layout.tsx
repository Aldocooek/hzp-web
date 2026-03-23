import type { Metadata } from "next";
import { locales } from "@/middleware";
import { isValidLocale, type Locale } from "@/lib/locale";
import { getDictionary } from "@/lib/getDictionary";
import { getSiteSettings } from "@/sanity/queries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang: Locale = isValidLocale(rawLang) ? rawLang : "cs";

  const titles = {
    cs: "HŽP a.s. — Výrobce pružin od roku 1951",
    en: "HŽP a.s. — Spring Manufacturer since 1951",
  };

  const descriptions = {
    cs: "HŽP a.s. je přední evropský výrobce pružin pro železniční a automobilový průmysl se sídlem v Prostějově od roku 1951.",
    en: "HŽP a.s. is a leading European spring manufacturer for railway and automotive industries, based in Prostějov, Czech Republic since 1951.",
  };

  const description = descriptions[lang];

  return {
    title: {
      default: titles[lang],
      template: `%s | HŽP a.s.`,
    },
    description,
    openGraph: {
      title: titles[lang],
      description,
      locale: lang === "cs" ? "cs_CZ" : "en_US",
      type: "website",
      siteName: "HŽP a.s.",
    },
    twitter: {
      card: "summary_large_image",
      title: titles[lang],
      description,
    },
    alternates: {
      canonical: `/${lang}`,
      languages: {
        cs: "/cs",
        en: "/en",
      },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang: Locale = isValidLocale(rawLang) ? rawLang : "cs";
  const [dict, settings] = await Promise.all([
    getDictionary(lang),
    getSiteSettings(),
  ]);

  return (
    <>
      {/* Set html lang attribute dynamically — runs before hydration */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang="${lang}";`,
        }}
      />
      <SmoothScroll>
        <div className="noise-overlay">
          <Header lang={lang} dict={dict} />
          {children}
          <Footer lang={lang} dict={dict} settings={settings} />
        </div>
      </SmoothScroll>
    </>
  );
}
