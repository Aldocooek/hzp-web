import type { Metadata } from "next";
import { isValidLocale, type Locale } from "@/lib/locale";
import { getDictionary } from "@/lib/getDictionary";
import { getHomePageData } from "@/sanity/queries";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import ProductsSection from "./ProductsSection";
import IndustrySection from "@/components/IndustrySection";
import AboutPreview from "./AboutPreview";
import CtaBanner from "./CtaBanner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang: Locale = isValidLocale(rawLang) ? rawLang : "cs";
  return {
    title: lang === "cs" ? "HŽP a.s. — Výrobce pružin od roku 1951" : "HŽP a.s. — Spring Manufacturer since 1951",
    description: lang === "cs"
      ? "Přední evropský výrobce pružin pro železniční a automobilový průmysl. Šroubové pružiny, listové pružiny trapézové a parabolické."
      : "Europe's leading spring manufacturer for railway and automotive industries. Helical, trapezoidal and parabolic leaf springs.",
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang: Locale = isValidLocale(rawLang) ? rawLang : "cs";
  const dict = await getDictionary(lang);
  const { settings, products, industries } = await getHomePageData();

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          // .replace prevents script-tag injection via </script> in JSON values
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "HŽP a.s.",
            url: "https://www.hzp.cz",
            logo: "https://www.hzp.cz/logo.png",
            foundingDate: "1951",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Dolní 3137/100",
              addressLocality: "Prostějov",
              postalCode: "796 01",
              addressCountry: "CZ",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+420-582-344-469",
              contactType: "customer service",
              email: "springs@hzp.cz",
            },
            description: lang === "cs"
              ? "Přední evropský výrobce pružin pro železniční a automobilový průmysl."
              : "Europe's leading spring manufacturer for railway and automotive industries.",
            numberOfEmployees: { "@type": "QuantitativeValue", value: 280 },
          }).replace(/</g, "\\u003c"),
        }}
      />

      <Hero lang={lang} dict={dict} settings={settings} />
      <Stats dict={dict} settings={settings} />
      <ProductsSection lang={lang} dict={dict} sanityProducts={products} />
      <IndustrySection lang={lang} dict={dict} sanityIndustries={industries} />
      <AboutPreview lang={lang} dict={dict} settings={settings} />
      <CtaBanner lang={lang} dict={dict} />
    </>
  );
}
