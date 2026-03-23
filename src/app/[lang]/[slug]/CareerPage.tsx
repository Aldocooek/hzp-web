"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import type { Locale } from "@/middleware";
import type { Dictionary } from "@/lib/getDictionary";

interface Props {
  lang: Locale;
  dict: Dictionary;
}

export default function CareerPage({ lang, dict }: Props) {
  const benefitsRef = useRef<HTMLElement>(null);
  const benefitsInView = useInView(benefitsRef as React.RefObject<Element>, { once: true, margin: "-10%" });

  const ctaRef = useRef<HTMLElement>(null);
  const ctaInView = useInView(ctaRef as React.RefObject<Element>, { once: true, margin: "-10%" });

  const benefitIcons = [
    <svg key="1" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <circle cx="16" cy="16" r="12"/>
      <path d="M12 16l3 3 5-6"/>
    </svg>,
    <svg key="2" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M16 4l2.4 7.2H26l-6.2 4.5 2.4 7.2L16 18.4l-6.2 4.5 2.4-7.2L6 11.2h7.6L16 4z"/>
    </svg>,
    <svg key="3" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <rect x="4" y="8" width="24" height="18" rx="2"/>
      <path d="M22 8V6a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
      <path d="M4 18h24"/>
    </svg>,
    <svg key="4" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <circle cx="12" cy="12" r="5"/>
      <circle cx="22" cy="12" r="5"/>
      <path d="M4 26c0-4 3.6-7 8-7h8c4.4 0 8 3 8 7"/>
    </svg>,
    <svg key="5" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M16 4L4 10v12l12 6 12-6V10L16 4z"/>
      <path d="M4 10l12 6 12-6"/>
      <path d="M16 16v10"/>
    </svg>,
    <svg key="6" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <circle cx="16" cy="16" r="4"/>
      <path d="M16 4v4M16 24v4M4 16h4M24 16h4"/>
      <path d="M7.8 7.8l2.8 2.8M21.4 21.4l2.8 2.8M7.8 24.2l2.8-2.8M21.4 10.6l2.8-2.8"/>
    </svg>,
  ];

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

        {/* Large bg number */}
        <div
          className="absolute top-1/2 right-0 -translate-y-1/2 text-[#fafaf9]/[0.02] font-bold select-none pointer-events-none"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(8rem, 25vw, 30rem)",
            letterSpacing: "-0.05em",
          }}
          aria-hidden="true"
        >
          280
        </div>

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
              {lang === "cs" ? "Přidejte se k nám" : "Join our team"}
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
              {dict.career.title}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="text-[#c2c2c2] text-lg max-w-xl"
          >
            {dict.career.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-[#1a1a2e] py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-10 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <p
                className="text-[#fafaf9] leading-relaxed"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)",
                  letterSpacing: "-0.01em",
                }}
              >
                {dict.career.intro}
              </p>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { val: "280", desc: lang === "cs" ? "zaměstnanců" : "employees" },
                  { val: "70+", desc: lang === "cs" ? "let na trhu" : "years in business" },
                  { val: "EU", desc: lang === "cs" ? "export" : "wide export" },
                  { val: "1951", desc: lang === "cs" ? "rok vzniku" : "founded" },
                ].map((item, i) => (
                  <div key={i} className="bg-[#0a0a0a] border border-white/5 p-5">
                    <div
                      className="text-[#fafaf9] text-3xl font-bold leading-none mb-2"
                      style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
                    >
                      {item.val}
                    </div>
                    <div className="text-[#c2c2c2]/60 text-xs tracking-wider uppercase">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section ref={benefitsRef} className="bg-[#f5f5f0] py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-10 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <div
              className="text-[#e94560] text-xs tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {lang === "cs" ? "Co nabízíme" : "What we offer"}
            </div>
            <h2
              className="text-[#0a0a0a] font-bold leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 4rem)",
                letterSpacing: "-0.03em",
              }}
            >
              {dict.career.whyTitle}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dict.career.benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.08,
                }}
                className="bg-[#0a0a0a] p-8 group hover:bg-[#1a1a2e] transition-colors duration-400"
                style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", transitionDuration: "400ms" }}
              >
                <div className="text-[#e94560] mb-6">
                  {benefitIcons[i]}
                </div>
                <h3
                  className="text-[#fafaf9] font-semibold text-lg mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {benefit.title}
                </h3>
                <p className="text-[#c2c2c2] text-sm leading-relaxed">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section className="bg-[#1a1a2e] py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-10 lg:px-20">
          <div className="mb-12">
            <div
              className="text-[#e94560] text-xs tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {lang === "cs" ? "Aktuálně" : "Currently"}
            </div>
            <h2
              className="text-[#fafaf9] font-bold"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 4rem)",
                letterSpacing: "-0.03em",
              }}
            >
              {dict.career.openPositions}
            </h2>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 p-10 text-center">
            <p className="text-[#c2c2c2] text-sm leading-relaxed max-w-lg mx-auto">
              {dict.career.noPositions}
            </p>
          </div>
        </div>
      </section>

      {/* HR CTA */}
      <section ref={ctaRef} className="bg-[#e94560] py-20 lg:py-28 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `repeating-linear-gradient(-45deg, #fff, #fff 1px, transparent 0, transparent 50%)`,
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative max-w-[1200px] mx-auto px-10 lg:px-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="text-[#fafaf9] font-bold mb-4"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 4rem)",
                letterSpacing: "-0.03em",
              }}
            >
              {dict.career.contactHR}
            </h2>
            <p className="text-[#fafaf9]/70 text-base mb-8">
              {dict.career.hrPerson}
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href={`tel:${dict.career.hrPhone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-3 bg-[#fafaf9] text-[#e94560] px-7 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#0a0a0a] hover:text-[#fafaf9]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {dict.career.hrPhone}
              </a>
              <a
                href={`mailto:${dict.career.hrEmail}`}
                className="inline-flex items-center gap-3 border-2 border-[#fafaf9]/40 text-[#fafaf9] px-7 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:border-[#fafaf9] hover:bg-[#fafaf9]/10"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {dict.career.sendCV}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
