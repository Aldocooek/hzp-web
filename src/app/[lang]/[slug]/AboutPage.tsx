"use client";

import { useRef } from "react";
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
  sanityValues?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sanityTeam?: any[];
}

export default function AboutPage({ lang, dict, sanityPage, sanityValues, sanityTeam }: Props) {
  const valuesRef = useRef<HTMLElement>(null);
  const valuesInView = useInView(valuesRef as React.RefObject<Element>, { once: true, margin: "-10%" });

  const mgmtRef = useRef<HTMLElement>(null);
  const mgmtInView = useInView(mgmtRef as React.RefObject<Element>, { once: true, margin: "-10%" });

  const visionRef = useRef<HTMLElement>(null);
  const visionInView = useInView(visionRef as React.RefObject<Element>, { once: true, margin: "-10%" });

  // Resolve page-level content
  const aboutData = sanityPage?.about;
  const pageTitle = aboutData?.title ? l(aboutData.title, lang) : dict.about.title;
  const pageSubtitle = aboutData?.subtitle ? l(aboutData.subtitle, lang) : dict.about.subtitle;
  const mission = aboutData?.mission ? l(aboutData.mission, lang) : dict.about.mission;
  const historyTitle = aboutData?.historyTitle ? l(aboutData.historyTitle, lang) : dict.about.historyTitle;
  const historyText = aboutData?.historyText ? l(aboutData.historyText, lang) : dict.about.historyText;
  const history2 = aboutData?.history2 ? l(aboutData.history2, lang) : dict.about.history2;
  const visionTitle = aboutData?.visionTitle ? l(aboutData.visionTitle, lang) : dict.about.visionTitle;
  const visionText = aboutData?.visionText ? l(aboutData.visionText, lang) : dict.about.visionText;
  const valuesTitle = aboutData?.valuesTitle ? l(aboutData.valuesTitle, lang) : dict.about.valuesTitle;
  const managementTitle = aboutData?.managementTitle ? l(aboutData.managementTitle, lang) : dict.about.managementTitle;

  // Values list — prefer Sanity, fall back to dict
  const values = sanityValues && sanityValues.length > 0
    ? sanityValues.map((v: any) => ({
        title: l(v.title, lang),
        desc: l(v.description, lang),
      }))
    : dict.about.values;

  // Management / team — prefer Sanity, fall back to dict
  const management = sanityTeam && sanityTeam.length > 0
    ? sanityTeam.map((m: any) => ({
        name: m.name || '',
        role: m.role ? l(m.role, lang) : '',
      }))
    : dict.about.management;

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-[#0a0a0a] pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
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
              {lang === "cs" ? "Od roku 1951" : "Since 1951"}
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

      {/* History */}
      <section className="bg-[#1a1a2e] py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-10 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <div className="sticky top-28">
                <div
                  className="text-[#fafaf9]/[0.04] font-bold leading-none select-none"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(6rem, 15vw, 18rem)",
                    letterSpacing: "-0.05em",
                  }}
                  aria-hidden="true"
                >
                  1951
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-10">
              <div>
                <h2
                  className="text-[#fafaf9] font-bold mb-6 leading-tight"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.8rem, 3vw, 3rem)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {historyTitle}
                </h2>
                <p className="text-[#c2c2c2] text-base leading-relaxed mb-4">
                  {historyText}
                </p>
                <p className="text-[#c2c2c2] text-base leading-relaxed">
                  {history2}
                </p>
              </div>

              {/* Mission */}
              <div className="bg-[#e94560]/5 border-l-2 border-[#e94560] p-8">
                <div
                  className="text-[#e94560] text-xs tracking-[0.3em] uppercase mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {lang === "cs" ? "Naše mise" : "Our mission"}
                </div>
                <blockquote
                  className="text-[#fafaf9] font-medium leading-relaxed"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1rem, 1.3vw, 1.25rem)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  &ldquo;{mission}&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section ref={visionRef} className="bg-[#0a0a0a] py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-10 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={visionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="text-[#e94560] text-xs tracking-[0.3em] uppercase mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {lang === "cs" ? "Kam směřujeme" : "Where we're headed"}
              </div>
              <h2
                className="text-[#fafaf9] font-bold mb-6 leading-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem, 3vw, 3rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                {visionTitle}
              </h2>
              <p className="text-[#c2c2c2] text-base leading-relaxed">
                {visionText}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={visionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { num: "572k+", label: lang === "cs" ? "pružin ročně" : "springs/year" },
                { num: "280", label: lang === "cs" ? "zaměstnanců" : "employees" },
                { num: "EU", label: lang === "cs" ? "export" : "wide export" },
                { num: "70+", label: lang === "cs" ? "let zkušeností" : "years experience" },
              ].map((item, i) => (
                <div key={i} className="bg-[#12122a] border border-white/5 p-6">
                  <div
                    className="text-[#fafaf9] text-3xl font-bold leading-none mb-2"
                    style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
                  >
                    {item.num}
                  </div>
                  <div className="text-[#c2c2c2]/60 text-xs tracking-wider uppercase">
                    {item.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="bg-[#f5f5f0] py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-10 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <div
              className="text-[#e94560] text-xs tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {lang === "cs" ? "Co nás definuje" : "What defines us"}
            </div>
            <h2
              className="text-[#0a0a0a] font-bold leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 4rem)",
                letterSpacing: "-0.03em",
              }}
            >
              {valuesTitle}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.1,
                }}
                className="bg-[#0a0a0a] p-8 group hover:bg-[#e94560] transition-colors duration-400"
                style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", transitionDuration: "400ms" }}
              >
                <div
                  className="text-[#e94560] group-hover:text-[#fafaf9] text-4xl font-bold leading-none mb-4 transition-colors duration-300"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3
                  className="text-[#fafaf9] font-semibold text-xl mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {value.title}
                </h3>
                <p className="text-[#c2c2c2] group-hover:text-[#fafaf9]/80 text-sm leading-relaxed transition-colors duration-300">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Management */}
      <section ref={mgmtRef} className="bg-[#1a1a2e] py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-10 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mgmtInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <h2
              className="text-[#fafaf9] font-bold leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 4rem)",
                letterSpacing: "-0.03em",
              }}
            >
              {managementTitle}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {management.map((person, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={mgmtInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.1,
                }}
                className="bg-[#0a0a0a] border border-white/5 p-6 hover:border-[#e94560]/30 transition-colors duration-300"
              >
                {/* Avatar placeholder */}
                <div className="w-12 h-12 bg-[#e94560]/10 border border-[#e94560]/20 flex items-center justify-center mb-5">
                  <span className="text-[#e94560] font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>
                    {person.name.split(" ").find((w: string) => !w.startsWith("Ing.") && !w.endsWith("."))?.charAt(0) || "H"}
                  </span>
                </div>
                <div
                  className="text-[#fafaf9] font-semibold text-sm mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {person.name}
                </div>
                <div className="text-[#c2c2c2]/60 text-xs">
                  {person.role}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
