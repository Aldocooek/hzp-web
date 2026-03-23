"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Locale } from "@/middleware";
import type { Dictionary } from "@/lib/getDictionary";

interface HeroProps {
  lang: Locale;
  dict: Dictionary;
}

export default function Hero({ lang, dict }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const easing = [0.16, 1, 0.3, 1] as const;

  const lineVariants = {
    hidden: { y: "110%", opacity: 0 },
    visible: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: {
        duration: 1.1,
        ease: easing,
        delay: 0.1 + i * 0.08,
      },
    }),
  };

  const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: easing,
        delay: 0.5 + i * 0.1,
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-end bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(250,250,249,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,249,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Large background text */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none select-none overflow-hidden w-full"
        aria-hidden="true"
      >
        <div
          className="text-[20vw] font-bold leading-none text-[#fafaf9]/[0.015] whitespace-nowrap"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.05em" }}
        >
          HŽP 1951
        </div>
      </div>

      {/* Red accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: easing, delay: 0.2 }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#e94560] via-[#e94560]/50 to-transparent origin-left"
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-10 lg:px-20 pb-24 pt-36 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-end">
          <div className="lg:col-span-8">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: easing, delay: 0.05 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-8 h-px bg-[#e94560]" />
              <span
                className="text-[#e94560] text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {lang === "cs" ? "Prostějov, Česká republika" : "Prostějov, Czech Republic"}
              </span>
            </motion.div>

            {/* Headline */}
            <h1 style={{ fontFamily: "var(--font-display)" }}>
              <div className="overflow-hidden">
                <motion.div
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  variants={lineVariants}
                  className="text-[#fafaf9] leading-[0.92] font-bold"
                  style={{
                    fontSize: "clamp(3rem, 8vw, 9rem)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {dict.hero.headline1}
                </motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.div
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  variants={lineVariants}
                  className="text-[#fafaf9] leading-[0.92] font-bold"
                  style={{
                    fontSize: "clamp(3rem, 8vw, 9rem)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {dict.hero.headline2}
                </motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.div
                  custom={2}
                  initial="hidden"
                  animate="visible"
                  variants={lineVariants}
                  className="leading-[0.92] font-bold"
                  style={{
                    fontSize: "clamp(3rem, 8vw, 9rem)",
                    letterSpacing: "-0.03em",
                    color: "#e94560",
                  }}
                >
                  {dict.hero.headline3}
                </motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.div
                  custom={3}
                  initial="hidden"
                  animate="visible"
                  variants={lineVariants}
                  className="text-[#fafaf9]/40 leading-[0.92] font-bold"
                  style={{
                    fontSize: "clamp(3rem, 8vw, 9rem)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {dict.hero.subheadline}
                </motion.div>
              </div>
            </h1>
          </div>

          {/* Right column */}
          <div className="lg:col-span-4 lg:pb-4">
            <motion.p
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeVariants}
              className="text-[#c2c2c2] text-base leading-relaxed mb-8 max-w-sm"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {dict.hero.sub}
            </motion.p>

            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeVariants}
              className="flex flex-wrap gap-3"
            >
              <Link
                href={`/${lang}/${dict.nav.productsSlug}`}
                className="group inline-flex items-center gap-3 bg-[#e94560] text-[#fafaf9] px-7 py-4 font-semibold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#c73651]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {dict.hero.cta1}
                <motion.span
                  className="block"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  →
                </motion.span>
              </Link>
              <Link
                href={`/${lang}/${dict.nav.contactSlug}`}
                className="inline-flex items-center gap-3 border border-[#fafaf9]/20 text-[#fafaf9] px-7 py-4 font-semibold text-sm tracking-wider uppercase transition-all duration-300 hover:border-[#fafaf9]/60 hover:bg-white/5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {dict.hero.cta2}
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom stats bar */}
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeVariants}
          className="mt-20 pt-8 border-t border-white/5 flex flex-wrap gap-12"
        >
          {[
            { val: dict.stats.foundedVal, label: dict.stats.founded },
            { val: dict.stats.springsVal, label: dict.stats.springs },
            { val: dict.stats.employeesVal, label: dict.stats.employees },
            { val: dict.stats.yearsVal, label: dict.stats.years },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-4">
              <div>
                <div
                  className="text-[#fafaf9] text-2xl font-bold leading-none"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
                >
                  {stat.val}
                </div>
                <div className="text-[#c2c2c2]/60 text-xs mt-1 tracking-wider uppercase">
                  {stat.label}
                </div>
              </div>
              {i < 3 && <div className="w-px h-8 bg-white/10" />}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 right-12 hidden lg:flex flex-col items-center gap-2"
      >
        <span
          className="text-[#c2c2c2]/40 text-[10px] tracking-[0.3em] uppercase rotate-90 origin-center"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {lang === "cs" ? "Scrollovat" : "Scroll"}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-[#e94560]/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
