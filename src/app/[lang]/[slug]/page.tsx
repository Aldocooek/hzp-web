import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { locales } from "@/middleware";
import { isValidLocale, type Locale } from "@/lib/locale";
import { getDictionary } from "@/lib/getDictionary";
import ProductsPage from "./ProductsPage";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";
import CareerPage from "./CareerPage";

const BASE_URL = "https://hzp-web.vercel.app";

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];

  for (const lang of locales) {
    const dict = await getDictionary(lang);
    params.push(
      { lang, slug: dict.nav.productsSlug },
      { lang, slug: dict.nav.aboutSlug },
      { lang, slug: dict.nav.contactSlug },
      { lang, slug: dict.nav.careerSlug }
    );
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const lang: Locale = isValidLocale(rawLang) ? rawLang : "cs";
  const dict = await getDictionary(lang);

  type PageKey = "products" | "about" | "contact" | "career";

  const slugToPageKey: Record<string, PageKey> = {
    [dict.nav.productsSlug]: "products",
    [dict.nav.aboutSlug]: "about",
    [dict.nav.contactSlug]: "contact",
    [dict.nav.careerSlug]: "career",
  };

  const pageKey = slugToPageKey[slug];
  if (!pageKey) return {};

  const titles: Record<PageKey, string> = {
    products: dict.products.title,
    about: dict.about.title,
    contact: dict.contact.title,
    career: dict.career.title,
  };

  const descriptions: Record<PageKey, string> = {
    products: dict.meta.products,
    about: dict.meta.about,
    contact: dict.meta.contact,
    career: dict.meta.career,
  };

  const title = titles[pageKey];
  const description = descriptions[pageKey];
  const canonicalUrl = `${BASE_URL}/${lang}/${slug}`;

  // Cross-language alternate URLs
  const csSlugMap: Record<PageKey, string> = {
    products: "produkty",
    about: "o-nas",
    contact: "kontakty",
    career: "kariera",
  };
  const enSlugMap: Record<PageKey, string> = {
    products: "products",
    about: "about",
    contact: "contact",
    career: "career",
  };

  return {
    title,
    description,
    openGraph: {
      title: `${title} | HŽP a.s.`,
      description,
      url: canonicalUrl,
      siteName: "HŽP a.s.",
      locale: lang === "cs" ? "cs_CZ" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | HŽP a.s.`,
      description,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        cs: `${BASE_URL}/cs/${csSlugMap[pageKey]}`,
        en: `${BASE_URL}/en/${enSlugMap[pageKey]}`,
      },
    },
  };
}

function getContactJsonLd(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "HŽP a.s.",
    url: BASE_URL,
    telephone: "+420582344469",
    email: "springs@hzp.cz",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Dolní 3137/100",
      addressLocality: "Prostějov",
      postalCode: "796 01",
      addressCountry: "CZ",
    },
    description:
      lang === "cs"
        ? "Výrobce pružin pro železniční a automobilový průmysl od roku 1951."
        : "Spring manufacturer for railway and automotive industries since 1951.",
    foundingDate: "1951",
    numberOfEmployees: { "@type": "QuantitativeValue", value: 280 },
  };
}

function getProductsJsonLd(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name:
      lang === "cs"
        ? "Naše produkty — HŽP a.s."
        : "Our Products — HŽP a.s.",
    description:
      lang === "cs"
        ? "Šroubové pružiny, trapézové a parabolické listové pružiny pro železniční a automobilový průmysl."
        : "Helical springs, trapezoidal and parabolic leaf springs for railway and automotive industries.",
    url: `${BASE_URL}/${lang}/${lang === "cs" ? "produkty" : "products"}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: lang === "cs" ? "Šroubové pružiny" : "Helical Springs",
        },
        {
          "@type": "ListItem",
          position: 2,
          name:
            lang === "cs"
              ? "Listové pružiny trapézové"
              : "Trapezoidal Leaf Springs",
        },
        {
          "@type": "ListItem",
          position: 3,
          name:
            lang === "cs"
              ? "Listové pružiny parabolické"
              : "Parabolic Leaf Springs",
        },
      ],
    },
  };
}

function getAboutJsonLd(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name:
      lang === "cs" ? "O společnosti HŽP a.s." : "About HŽP a.s.",
    description:
      lang === "cs"
        ? "Přes 70 let zkušeností ve výrobě pružin. 280 zaměstnanců, export do celé Evropy."
        : "Over 70 years of spring manufacturing expertise. 280 employees, EU-wide exports.",
    url: `${BASE_URL}/${lang}/${lang === "cs" ? "o-nas" : "about"}`,
    about: {
      "@type": "Organization",
      name: "HŽP a.s.",
      foundingDate: "1951",
      numberOfEmployees: { "@type": "QuantitativeValue", value: 280 },
    },
  };
}

function getCareerJsonLd(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: lang === "cs" ? "Kariéra — HŽP a.s." : "Career — HŽP a.s.",
    description:
      lang === "cs"
        ? "Volné pracovní pozice a kariérní příležitosti ve společnosti HŽP a.s. v Prostějově."
        : "Open positions and career opportunities at HŽP a.s. in Prostějov, Czech Republic.",
    url: `${BASE_URL}/${lang}/${lang === "cs" ? "kariera" : "career"}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "HŽP a.s.",
          item: `${BASE_URL}/${lang}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: lang === "cs" ? "Kariéra" : "Career",
          item: `${BASE_URL}/${lang}/${lang === "cs" ? "kariera" : "career"}`,
        },
      ],
    },
  };
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: rawLang, slug } = await params;
  const lang: Locale = isValidLocale(rawLang) ? rawLang : "cs";
  const dict = await getDictionary(lang);

  if (slug === dict.nav.productsSlug) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getProductsJsonLd(lang)),
          }}
        />
        <ProductsPage lang={lang} dict={dict} />
      </>
    );
  }
  if (slug === dict.nav.aboutSlug) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getAboutJsonLd(lang)),
          }}
        />
        <AboutPage lang={lang} dict={dict} />
      </>
    );
  }
  if (slug === dict.nav.contactSlug) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getContactJsonLd(lang)),
          }}
        />
        <ContactPage lang={lang} dict={dict} />
      </>
    );
  }
  if (slug === dict.nav.careerSlug) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getCareerJsonLd(lang)),
          }}
        />
        <CareerPage lang={lang} dict={dict} />
      </>
    );
  }

  notFound();
}
