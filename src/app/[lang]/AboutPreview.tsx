"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import type { Locale } from "@/middleware";
import type { Dictionary } from "@/lib/getDictionary";
import { l } from "@/sanity/helpers";

interface AboutPreviewProps {
  lang: Locale;
  dict: Dictionary;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings?: any;
}

export default function AboutPreview({ lang, dict, settings }: AboutPreviewProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-10%" });

  // Resolve content — prefer Sanity settings, fall back to dict
  const aboutData = settings?.about;
  const mission = aboutData?.mission ? l(aboutData.mission, lang) : dict.about.mission;
  const subtitle = aboutData?.subtitle ? l(aboutData.subtitle, lang) : dict.about.subtitle;
  const historyText = aboutData?.historyText ? l(aboutData.historyText, lang) : dict.about.historyText;
  const history2 = aboutData?.history2 ? l(aboutData.history2, lang) : dict.about.history2;

  return (
    <section ref={ref} className="bg-[#0a0a0a] py-28 lg:py-40 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          {/* Left: large year */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Big year */}
              <div
                className="text-[#fafaf9]/[0.04] font-bold leading-none select-none absolute -top-8 -left-4"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(8rem, 20vw, 22rem)",
                  letterSpacing: "-0.05em",
                }}
                aria-hidden="true"
              >
                1951
              </div>

              {/* Content card */}
              <div className="relative bg-[#12122a] border border-white/5 p-8 lg:p-10">
                <div
                  className="text-[#e94560] text-xs tracking-[0.3em] uppercase mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {lang === "cs" ? "Naše mise" : "Our mission"}
                </div>
                <blockquote
                  className="text-[#fafaf9] font-medium leading-relaxed"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  &ldquo;{mission}&rdquo;
                </blockquote>

                <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-6">
                  <div>
                    <div
                      className="text-[#fafaf9] text-3xl font-bold leading-none"
                      style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
                    >
                      70+
                    </div>
                    <div className="text-[#c2c2c2]/60 text-xs mt-1 tracking-wider uppercase">
                      {lang === "cs" ? "let na trhu" : "years in business"}
                    </div>
                  </div>
                  <div>
                    <div
                      className="text-[#fafaf9] text-3xl font-bold leading-none"
                      style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
                    >
                      EU
                    </div>
                    <div className="text-[#c2c2c2]/60 text-xs mt-1 tracking-wider uppercase">
                      {lang === "cs" ? "export" : "wide exports"}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: text */}
          <div className="lg:col-span-6 lg:col-start-7">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-px bg-[#e94560]" />
              <span
                className="text-[#e94560] text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {lang === "cs" ? "Kdo jsme" : "Who we are"}
              </span>
            </motion.div>

            <div className="overflow-hidden mb-6">
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                animate={isInView ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="text-[#fafaf9] font-bold leading-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                {subtitle}
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
              className="flex flex-col gap-4"
            >
              <p className="text-[#c2c2c2] text-base leading-relaxed">
                {historyText}
              </p>
              <p className="text-[#c2c2c2] text-base leading-relaxed">
                {history2}
              </p>

              <div className="mt-4">
                <Link
                  href={`/${lang}/${dict.nav.aboutSlug}`}
                  className="inline-flex items-center gap-3 text-[#fafaf9] font-semibold text-sm tracking-wider uppercase border border-[#fafaf9]/20 px-7 py-4 hover:border-[#e94560] hover:text-[#e94560] transition-all duration-300"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {dict.common.learnMore}
                  <span>→</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
