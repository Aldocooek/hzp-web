"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import type { Locale } from "@/middleware";
import type { Dictionary } from "@/lib/getDictionary";
import { l } from "@/sanity/helpers";

interface Props {
  lang: Locale;
  dict: Dictionary;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sanityPage?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sanityProducts?: any[];
}

function ProductDetail({
  id,
  name,
  desc,
  detail,
  specs,
  index,
  lang,
  dict,
}: {
  id: string;
  name: string;
  desc: string;
  detail: string;
  specs: string[];
  index: number;
  lang: Locale;
  dict: Dictionary;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-10%" });

  const isEven = index % 2 === 0;

  const icons = [
    <svg key="h" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M20 100 Q35 30 50 60 Q65 90 80 20 Q95 -10 100 30" stroke="#e94560" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M15 105 Q30 35 45 65 Q60 95 75 25 Q90 -5 105 35" stroke="#e94560" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3"/>
      <circle cx="20" cy="100" r="4" fill="#e94560"/>
      <circle cx="100" cy="30" r="4" fill="#e94560"/>
      <line x1="10" y1="108" x2="30" y2="108" stroke="#e94560" strokeWidth="2" opacity="0.5"/>
      <line x1="90" y1="22" x2="110" y2="22" stroke="#e94560" strokeWidth="2" opacity="0.5"/>
    </svg>,
    <svg key="t" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="10" y="44" width="100" height="14" rx="2" stroke="#e94560" strokeWidth="2"/>
      <rect x="18" y="60" width="84" height="12" rx="2" stroke="#e94560" strokeWidth="2" opacity="0.7"/>
      <rect x="26" y="74" width="68" height="10" rx="2" stroke="#e94560" strokeWidth="2" opacity="0.5"/>
      <rect x="34" y="86" width="52" height="8" rx="2" stroke="#e94560" strokeWidth="2" opacity="0.3"/>
      <path d="M10 51 Q60 34 110 51" stroke="#e94560" strokeWidth="1.5" fill="none" opacity="0.4"/>
      <circle cx="10" cy="51" r="3" fill="none" stroke="#e94560" strokeWidth="1.5"/>
      <circle cx="110" cy="51" r="3" fill="none" stroke="#e94560" strokeWidth="1.5"/>
    </svg>,
    <svg key="p" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M10 80 Q60 30 110 80" stroke="#e94560" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M18 84 Q60 40 102 84" stroke="#e94560" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
      <path d="M26 88 Q60 50 94 88" stroke="#e94560" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.35"/>
      <circle cx="10" cy="80" r="5" fill="none" stroke="#e94560" strokeWidth="2"/>
      <circle cx="110" cy="80" r="5" fill="none" stroke="#e94560" strokeWidth="2"/>
      <line x1="5" y1="94" x2="15" y2="94" stroke="#e94560" strokeWidth="2" opacity="0.5"/>
      <line x1="105" y1="94" x2="115" y2="94" stroke="#e94560" strokeWidth="2" opacity="0.5"/>
    </svg>,
  ];

  const icon = icons[index % icons.length];

  return (
    <div id={id} ref={ref} className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${index < 2 ? "border-b border-white/5" : ""}`}>
      {/* Visual panel */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`bg-[#12122a] flex items-center justify-center p-12 lg:p-20 min-h-[380px] ${!isEven ? "lg:order-2" : ""}`}
      >
        <div className="relative w-full max-w-[280px] aspect-square">
          {/* Background glow */}
          <div className="absolute inset-0 bg-[#e94560]/5 rounded-full blur-3xl" />
          <div className="relative w-full h-full opacity-80 hover:opacity-100 transition-opacity duration-300">
            {icon}
          </div>
        </div>
      </motion.div>

      {/* Content panel */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 40 : -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={`bg-[#1a1a2e] p-10 lg:p-14 flex flex-col justify-center ${!isEven ? "lg:order-1" : ""}`}
      >
        <div
          className="text-[#e94560] text-xs tracking-[0.3em] uppercase mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {String(index + 1).padStart(2, "0")} / {dict.products.title}
        </div>

        <h2
          className="text-[#fafaf9] font-bold mb-6 leading-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 3vw, 3rem)",
            letterSpacing: "-0.02em",
          }}
        >
          {name}
        </h2>

        <p className="text-[#c2c2c2] text-base leading-relaxed mb-4">
          {desc}
        </p>
        <p className="text-[#c2c2c2]/70 text-sm leading-relaxed mb-8">
          {detail}
        </p>

        {/* Specs */}
        <div className="bg-[#0a0a0a]/50 border border-white/5 p-5 mb-8">
          <div
            className="text-[#fafaf9] text-xs tracking-widest uppercase mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {dict.products.specifications}
          </div>
          <ul className="flex flex-col gap-2">
            {specs.map((spec, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-[#c2c2c2]">
                <span className="w-1.5 h-1.5 bg-[#e94560] flex-shrink-0" />
                {spec}
              </li>
            ))}
          </ul>
        </div>

        <Link
          href={`/${lang}/${dict.nav.contactSlug}`}
          className="inline-flex items-center gap-3 bg-[#e94560] text-[#fafaf9] px-7 py-4 font-semibold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#c73651] self-start"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {dict.products.contactSales}
          <span>→</span>
        </Link>
      </motion.div>
    </div>
  );
}

export default function ProductsPage({ lang, dict, sanityPage, sanityProducts }: Props) {
  const heroRef = useRef<HTMLElement>(null);

  // Page title/subtitle — prefer Sanity page data, fall back to dict
  const pageTitle = sanityPage?.title ? l(sanityPage.title, lang) : dict.products.title;
  const pageSubtitle = sanityPage?.subtitle ? l(sanityPage.subtitle, lang) : dict.products.subtitle;

  // Build products list — prefer Sanity, fall back to dict
  const products = sanityProducts && sanityProducts.length > 0
    ? sanityProducts.map((p: any, i: number) => ({
        id: p.slug?.current || p._id || `product-${i}`,
        name: l(p.name, lang),
        desc: l(p.description, lang),
        detail: l(p.detail, lang) || '',
        specs: Array.isArray(p.specs)
          ? p.specs.map((spec: any) =>
              typeof spec === 'string' ? spec : l(spec, lang)
            )
          : [],
      }))
    : [
        {
          id: "helical",
          name: dict.products.helical.name,
          desc: dict.products.helical.desc,
          detail: dict.products.helical.detail,
          specs: dict.products.helical.specs,
        },
        {
          id: "trapezoidal",
          name: dict.products.trapezoidal.name,
          desc: dict.products.trapezoidal.desc,
          detail: dict.products.trapezoidal.detail,
          specs: dict.products.trapezoidal.specs,
        },
        {
          id: "parabolic",
          name: dict.products.parabolic.name,
          desc: dict.products.parabolic.desc,
          detail: dict.products.parabolic.detail,
          specs: dict.products.parabolic.specs,
        },
      ];

  return (
    <main>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative bg-[#0a0a0a] pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(250,250,249,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,249,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#e94560] via-[#e94560]/50 to-transparent origin-left"
        />

        <div className="relative max-w-[1200px] mx-auto px-10 lg:px-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-px bg-[#e94560]" />
            <span
              className="text-[#e94560] text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              HŽP a.s.
            </span>
          </motion.div>

          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-[#fafaf9] font-bold leading-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 7vw, 8rem)",
                letterSpacing: "-0.03em",
              }}
            >
              {pageTitle}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="text-[#c2c2c2] text-lg max-w-xl"
          >
            {pageSubtitle}
          </motion.p>
        </div>
      </section>

      {/* Products */}
      <div className="bg-[#0a0a0a] border-t border-white/5">
        {products.map((product, i) => (
          <ProductDetail
            key={product.id}
            {...product}
            index={i}
            lang={lang}
            dict={dict}
          />
        ))}
      </div>
    </main>
  );
}
