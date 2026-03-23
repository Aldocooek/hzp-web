"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import type { Locale } from "@/middleware";
import type { Dictionary } from "@/lib/getDictionary";

interface CtaBannerProps {
  lang: Locale;
  dict: Dictionary;
}

export default function CtaBanner({ lang, dict }: CtaBannerProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="relative bg-[#e94560] py-28 lg:py-36 overflow-hidden"
    >
      {/* Pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `repeating-linear-gradient(-45deg, #fff, #fff 1px, transparent 0, transparent 50%)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Large bg text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-bold text-[#fafaf9]/[0.04] whitespace-nowrap select-none pointer-events-none"
        style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.05em" }}
        aria-hidden="true"
      >
        HŽP
      </div>

      <div className="relative max-w-[1200px] mx-auto px-10 lg:px-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="text-[#fafaf9]/60 text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {lang === "cs" ? "Spolupracujte s námi" : "Work with us"}
          </div>

          <h2
            className="text-[#fafaf9] font-bold leading-tight mb-6 mx-auto"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 5rem)",
              letterSpacing: "-0.03em",
              maxWidth: "900px",
            }}
          >
            {lang === "cs"
              ? "Máte zájem o naše pružiny?"
              : "Interested in our springs?"}
          </h2>

          <p
            className="text-[#fafaf9]/70 text-base leading-relaxed mb-10 mx-auto"
            style={{ maxWidth: "500px", fontFamily: "var(--font-body)" }}
          >
            {lang === "cs"
              ? "Kontaktujte náš obchodní tým. Připravíme pro vás nezávaznou nabídku."
              : "Contact our sales team. We'll prepare a no-obligation quote for you."}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${lang}/${dict.nav.contactSlug}`}
              className="inline-flex items-center gap-3 bg-[#fafaf9] text-[#e94560] px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#0a0a0a] hover:text-[#fafaf9]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {dict.common.contactUs}
              <span>→</span>
            </Link>
            <a
              href="tel:+420582344469"
              className="inline-flex items-center gap-3 border-2 border-[#fafaf9]/40 text-[#fafaf9] px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:border-[#fafaf9] hover:bg-[#fafaf9]/10"
              style={{ fontFamily: "var(--font-display)" }}
            >
              +420 582 344 469
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
