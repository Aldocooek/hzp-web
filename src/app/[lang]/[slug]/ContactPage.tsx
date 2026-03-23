"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ContactForm from "@/components/ContactForm";
import type { Locale } from "@/middleware";
import type { Dictionary } from "@/lib/getDictionary";

interface Props {
  lang: Locale;
  dict: Dictionary;
}

export default function ContactPage({ lang, dict }: Props) {
  const deptsRef = useRef<HTMLElement>(null);
  const deptsInView = useInView(deptsRef as React.RefObject<Element>, { once: true, margin: "-10%" });

  const formRef = useRef<HTMLElement>(null);
  const formInView = useInView(formRef as React.RefObject<Element>, { once: true, margin: "-10%" });

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
              {dict.contact.title}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="text-[#c2c2c2] text-lg max-w-xl"
          >
            {dict.contact.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Main info + form */}
      <section ref={formRef} className="bg-[#1a1a2e] py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-10 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 flex flex-col gap-8"
            >
              {/* Address block */}
              <div>
                <div
                  className="text-[#e94560] text-xs tracking-[0.3em] uppercase mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {dict.contact.address}
                </div>
                <p className="text-[#fafaf9] text-sm leading-relaxed">
                  HŽP a.s.<br />
                  {dict.contact.addressVal}
                </p>
              </div>

              {/* Phone */}
              <div>
                <div
                  className="text-[#e94560] text-xs tracking-[0.3em] uppercase mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {dict.contact.phone}
                </div>
                <a
                  href={`tel:${dict.contact.phoneVal.replace(/\s/g, "")}`}
                  className="text-[#fafaf9] text-sm hover:text-[#e94560] transition-colors duration-200"
                >
                  {dict.contact.phoneVal}
                </a>
              </div>

              {/* Email */}
              <div>
                <div
                  className="text-[#e94560] text-xs tracking-[0.3em] uppercase mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {dict.contact.email}
                </div>
                <a
                  href={`mailto:${dict.contact.emailVal}`}
                  className="text-[#fafaf9] text-sm hover:text-[#e94560] transition-colors duration-200"
                >
                  {dict.contact.emailVal}
                </a>
              </div>

              {/* IČO */}
              <div>
                <div
                  className="text-[#e94560] text-xs tracking-[0.3em] uppercase mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {dict.contact.ico}
                </div>
                <p className="text-[#fafaf9] text-sm">{dict.contact.icoVal}</p>
              </div>

              {/* Map placeholder */}
              <div className="bg-[#0a0a0a] border border-white/5 p-6 flex items-center justify-center min-h-[200px]">
                <div className="text-center">
                  <div className="text-[#e94560] mb-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 mx-auto">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                      <circle cx="12" cy="9" r="2.5"/>
                    </svg>
                  </div>
                  <p className="text-[#c2c2c2]/60 text-xs">Prostějov, CZ</p>
                  <a
                    href="https://maps.google.com/?q=Dolní+3137/100,+Prostějov"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#e94560] text-xs mt-2 block hover:underline"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {lang === "cs" ? "Otevřít v Google Maps →" : "Open in Google Maps →"}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="lg:col-span-7 lg:col-start-6"
            >
              <h2
                className="text-[#fafaf9] font-bold mb-8"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.5rem, 2.5vw, 2.5rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                {dict.contact.formTitle}
              </h2>
              <ContactForm dict={dict} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section ref={deptsRef} className="bg-[#0a0a0a] py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-10 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={deptsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <div
              className="text-[#e94560] text-xs tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {lang === "cs" ? "Přímo na odpovědné osoby" : "Direct contacts"}
            </div>
            <h2
              className="text-[#fafaf9] font-bold"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 4rem)",
                letterSpacing: "-0.03em",
              }}
            >
              {dict.contact.departments}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dict.contact.depts.map((dept, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={deptsInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.1,
                }}
                className="bg-[#12122a] border border-white/5 p-6 hover:border-[#e94560]/30 transition-colors duration-300 group"
              >
                <div
                  className="text-[#e94560] text-xs tracking-[0.2em] uppercase mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {dept.name}
                </div>
                <div
                  className="text-[#fafaf9] font-semibold text-sm mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {dept.person}
                </div>
                <div className="flex flex-col gap-2">
                  <a
                    href={`tel:${dept.phone.replace(/\s/g, "")}`}
                    className="text-[#c2c2c2] text-xs hover:text-[#e94560] transition-colors duration-200 flex items-center gap-2"
                  >
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3 flex-shrink-0">
                      <path d="M2 2h3l1.5 3.5-1.75 1.05a9 9 0 004.7 4.7L10.5 9.5 14 11v3c-6.5 0-12-5.5-12-12z"/>
                    </svg>
                    {dept.phone}
                  </a>
                  <a
                    href={`mailto:${dept.email}`}
                    className="text-[#c2c2c2] text-xs hover:text-[#e94560] transition-colors duration-200 flex items-center gap-2 break-all"
                  >
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3 flex-shrink-0">
                      <rect x="1" y="3" width="14" height="10" rx="1"/>
                      <path d="M1 3l7 5 7-5"/>
                    </svg>
                    {dept.email}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
