"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Locale } from "@/middleware";
import type { Dictionary } from "@/lib/getDictionary";

interface HeaderProps {
  lang: Locale;
  dict: Dictionary;
}

export default function Header({ lang, dict }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/${dict.nav.productsSlug}`, label: dict.nav.products },
    { href: `/${lang}/${dict.nav.aboutSlug}`, label: dict.nav.about },
    { href: `/${lang}/${dict.nav.careerSlug}`, label: dict.nav.career },
    { href: `/${lang}/${dict.nav.contactSlug}`, label: dict.nav.contact },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-10 lg:px-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href={`/${lang}`}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="w-10 h-10 border-2 border-[#e94560] flex items-center justify-center transition-all duration-300 group-hover:bg-[#e94560]">
                <span
                  className="text-[#fafaf9] text-sm font-bold tracking-widest transition-colors duration-300"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  HŽP
                </span>
              </div>
            </div>
            <div>
              <div
                className="text-[#fafaf9] text-base font-semibold tracking-wide leading-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                HŽP a.s.
              </div>
              <div className="text-[#c2c2c2] text-xs tracking-widest uppercase mt-0.5">
                {lang === "cs" ? "Výrobce pružin" : "Spring Manufacturer"}
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wider uppercase transition-all duration-300 relative group ${
                  isActive(link.href)
                    ? "text-[#e94560]"
                    : "text-[#c2c2c2] hover:text-[#fafaf9]"
                }`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-[#e94560] transition-all duration-300 ${
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher currentLang={lang} />

            {/* CTA */}
            <Link
              href={`/${lang}/${dict.nav.contactSlug}`}
              className="hidden lg:flex items-center gap-2 bg-[#e94560] text-[#fafaf9] text-sm font-medium px-5 py-2.5 tracking-wider uppercase transition-all duration-300 hover:bg-[#c73651] hover:scale-105"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {dict.nav.contact}
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-1.5 w-8 h-6 justify-center cursor-pointer"
              aria-label="Toggle menu"
            >
              <motion.span
                className="block h-0.5 bg-[#fafaf9] origin-center"
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.span
                className="block h-0.5 bg-[#fafaf9]"
                animate={menuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-0.5 bg-[#fafaf9] origin-center"
                animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col pt-24 px-8 pb-12"
          >
            <nav className="flex flex-col gap-2 flex-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.05 * i,
                  }}
                >
                  <Link
                    href={link.href}
                    className={`block text-4xl font-semibold tracking-tight py-3 border-b border-white/5 transition-colors duration-200 ${
                      isActive(link.href)
                        ? "text-[#e94560]"
                        : "text-[#fafaf9] hover:text-[#e94560]"
                    }`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-2 text-[#c2c2c2] text-sm">
                <span>+420 582 344 469</span>
                <span className="text-[#c2c2c2]/30">|</span>
                <span>springs@hzp.cz</span>
              </div>
              <LanguageSwitcher currentLang={lang} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
