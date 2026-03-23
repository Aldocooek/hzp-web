"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import type { Locale } from "@/middleware";
import type { Dictionary } from "@/lib/getDictionary";

interface ProductsSectionProps {
  lang: Locale;
  dict: Dictionary;
}

export default function ProductsSection({ lang, dict }: ProductsSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-10%" });

  const products = [
    {
      name: dict.products.helical.name,
      desc: dict.products.helical.desc,
      href: `/${lang}/${dict.nav.productsSlug}#helical`,
    },
    {
      name: dict.products.trapezoidal.name,
      desc: dict.products.trapezoidal.desc,
      href: `/${lang}/${dict.nav.productsSlug}#trapezoidal`,
    },
    {
      name: dict.products.parabolic.name,
      desc: dict.products.parabolic.desc,
      href: `/${lang}/${dict.nav.productsSlug}#parabolic`,
    },
  ];

  return (
    <section ref={ref} className="bg-[#1a1a2e] py-28 lg:py-40">
      <div className="max-w-[1200px] mx-auto px-10 lg:px-20">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-px bg-[#e94560]" />
              <span
                className="text-[#e94560] text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {lang === "cs" ? "Co vyrábíme" : "What we make"}
              </span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                animate={isInView ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="text-[#fafaf9] font-bold leading-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 4rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                {dict.products.title}
              </motion.h2>
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 flex items-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="flex flex-col gap-4 items-start"
            >
              <p className="text-[#c2c2c2] text-sm leading-relaxed">
                {dict.products.subtitle}
              </p>
              <Link
                href={`/${lang}/${dict.nav.productsSlug}`}
                className="text-[#fafaf9] text-sm font-medium tracking-wider uppercase border-b border-[#fafaf9]/20 pb-1 hover:border-[#e94560] hover:text-[#e94560] transition-all duration-300 flex items-center gap-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {dict.common.viewAll}
                <span>→</span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, i) => (
            <ProductCard
              key={i}
              {...product}
              index={i}
              lang={lang}
              dict={dict}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
