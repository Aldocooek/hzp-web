"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Locale } from "@/middleware";
import type { Dictionary } from "@/lib/getDictionary";

interface IndustrySectionProps {
  lang: Locale;
  dict: Dictionary;
}

const industryIcons = {
  automotive: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
      <rect x="8" y="22" width="48" height="20" rx="4" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="18" cy="42" r="6" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="46" cy="42" r="6" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M14 22 L20 12 H44 L50 22" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M30 22 V12" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  railway: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
      <rect x="12" y="12" width="40" height="32" rx="4" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="12" y1="28" x2="52" y2="28" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="21" cy="50" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="43" cy="50" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="8" y1="54" x2="56" y2="54" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="21" y1="46" x2="21" y2="44" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="43" y1="46" x2="43" y2="44" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  industrial: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
      <path d="M8 48 L8 28 L20 20 L20 28 L32 20 L32 28 L44 20 L44 48 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <line x1="8" y1="48" x2="56" y2="48" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="48" y="32" width="8" height="16" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="18" y="36" width="8" height="12" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="30" y="36" width="8" height="12" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
};

export default function IndustrySection({ lang, dict }: IndustrySectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-10%" });

  const industries = [
    {
      key: "automotive",
      name: dict.industries.automotive.name,
      desc: dict.industries.automotive.desc,
      icon: industryIcons.automotive,
    },
    {
      key: "railway",
      name: dict.industries.railway.name,
      desc: dict.industries.railway.desc,
      icon: industryIcons.railway,
    },
    {
      key: "industrial",
      name: dict.industries.industrial.name,
      desc: dict.industries.industrial.desc,
      icon: industryIcons.industrial,
    },
  ];

  return (
    <section ref={ref} className="bg-[#f5f5f0] py-28 lg:py-40">
      <div className="max-w-[1200px] mx-auto px-10 lg:px-20">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-5">
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
                {lang === "cs" ? "Kde pracujeme" : "Where we work"}
              </span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                animate={isInView ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="text-[#0a0a0a] font-bold leading-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 4rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                {dict.industries.title}
              </motion.h2>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-[#0a0a0a]/60 text-base leading-relaxed"
            >
              {dict.industries.subtitle}
            </motion.p>
          </div>
        </div>

        {/* Industry cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {industries.map((industry, i) => (
            <motion.div
              key={industry.key}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1 + i * 0.12,
              }}
              className="group relative bg-[#0a0a0a] p-8 lg:p-10 overflow-hidden cursor-default"
            >
              {/* Hover bg effect */}
              <div className="absolute inset-0 bg-[#e94560] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }} />

              <div className="relative">
                {/* Icon */}
                <div className="text-[#e94560] group-hover:text-[#fafaf9] transition-colors duration-300 mb-6">
                  {industry.icon}
                </div>

                {/* Number */}
                <div
                  className="text-[#fafaf9]/5 text-6xl font-bold absolute top-0 right-0 leading-none select-none"
                  style={{ fontFamily: "var(--font-display)" }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                <h3
                  className="text-[#fafaf9] text-xl font-semibold mb-4"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
                >
                  {industry.name}
                </h3>
                <p className="text-[#c2c2c2] group-hover:text-[#fafaf9]/80 text-sm leading-relaxed transition-colors duration-300">
                  {industry.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
