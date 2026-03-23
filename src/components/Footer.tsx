"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Locale } from "@/middleware";
import type { Dictionary } from "@/lib/getDictionary";
import { l } from "@/sanity/helpers";

interface FooterProps {
  lang: Locale;
  dict: Dictionary;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings?: any;
}

export default function Footer({ lang, dict, settings }: FooterProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-5%" });

  const navLinks = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/${dict.nav.productsSlug}`, label: dict.nav.products },
    { href: `/${lang}/${dict.nav.aboutSlug}`, label: dict.nav.about },
    { href: `/${lang}/${dict.nav.careerSlug}`, label: dict.nav.career },
    { href: `/${lang}/${dict.nav.contactSlug}`, label: dict.nav.contact },
  ];

  return (
    <footer
      ref={ref}
      className="bg-[#0a0a0a] border-t border-white/5 pt-20 lg:pt-24 pb-10"
    >
      <div className="max-w-[1200px] mx-auto px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-1"
          >
            <Link href={`/${lang}`} className="flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 border-2 border-[#e94560] flex items-center justify-center transition-all duration-300 group-hover:bg-[#e94560]">
                <span
                  className="text-[#fafaf9] text-sm font-bold tracking-widest"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  HŽP
                </span>
              </div>
              <div>
                <div
                  className="text-[#fafaf9] text-base font-semibold leading-none"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  HŽP a.s.
                </div>
              </div>
            </Link>
            <p className="text-[#c2c2c2] text-sm leading-relaxed mb-4">
              {settings?.footer?.tagline ? l(settings.footer.tagline, lang) : dict.footer.tagline}
            </p>
            <p className="text-[#c2c2c2]/60 text-xs">
              {lang === "cs" ? "Dolní 3137/100" : "Dolní 3137/100"}<br />
              796 01 Prostějov<br />
              {lang === "cs" ? "Česká republika" : "Czech Republic"}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <h3
              className="text-[#fafaf9] text-sm font-semibold tracking-widest uppercase mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {dict.footer.quickLinks}
            </h3>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#c2c2c2] text-sm hover:text-[#e94560] transition-colors duration-200 group flex items-center gap-2"
                  >
                    <span className="w-4 h-px bg-[#e94560]/0 group-hover:bg-[#e94560]/60 transition-all duration-300 group-hover:w-6" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <h3
              className="text-[#fafaf9] text-sm font-semibold tracking-widest uppercase mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {dict.footer.contactUs}
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="tel:+420582344469"
                  className="text-[#c2c2c2] text-sm hover:text-[#e94560] transition-colors duration-200"
                >
                  +420 582 344 469
                </a>
              </li>
              <li>
                {/* Email constructed via JS to prevent simple scraper harvesting */}
                <a
                  href={`mailto:${"springs"}@${"hzp.cz"}`}
                  className="text-[#c2c2c2] text-sm hover:text-[#e94560] transition-colors duration-200"
                >
                  {"springs"}&#64;{"hzp.cz"}
                </a>
              </li>
              <li className="text-[#c2c2c2]/60 text-xs mt-2">
                {lang === "cs" ? "IČO:" : "Company ID:"} 26955342
              </li>
            </ul>
          </motion.div>

          {/* Accent block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="bg-[#e94560]/5 border border-[#e94560]/20 p-6"
          >
            <div
              className="text-[#e94560] text-xs tracking-widest uppercase mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {lang === "cs" ? "Od roku" : "Since"}
            </div>
            <div
              className="text-[#fafaf9] text-6xl font-bold leading-none mb-3"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
            >
              1951
            </div>
            <p className="text-[#c2c2c2] text-sm leading-relaxed">
              {lang === "cs"
                ? "Přes 70 let zkušeností ve výrobě pružin pro průmysl."
                : "Over 70 years of experience in spring manufacturing for industry."}
            </p>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#c2c2c2]/40 text-xs">
            © {new Date().getFullYear()} HŽP a.s. {dict.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href={`/${lang}/${dict.nav.contactSlug}`}
              className="text-[#c2c2c2]/40 text-xs hover:text-[#c2c2c2] transition-colors duration-200"
            >
              {dict.footer.privacy}
            </Link>
            <Link
              href={`/${lang}/${dict.nav.contactSlug}`}
              className="text-[#c2c2c2]/40 text-xs hover:text-[#c2c2c2] transition-colors duration-200"
            >
              {dict.footer.cookies}
            </Link>
            <a
              href="https://www.linkedin.com/company/hzp-as"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c2c2c2]/40 text-xs hover:text-[#e94560] transition-colors duration-200 uppercase tracking-wider"
              style={{ fontFamily: "var(--font-display)" }}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
