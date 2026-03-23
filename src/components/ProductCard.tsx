"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Locale } from "@/middleware";
import type { Dictionary } from "@/lib/getDictionary";

interface ProductCardProps {
  name: string;
  desc: string;
  index: number;
  href: string;
  lang: Locale;
  dict: Dictionary;
  isInView: boolean;
}

export default function ProductCard({
  name,
  desc,
  index,
  href,
  lang,
  dict,
  isInView,
}: ProductCardProps) {
  const icons = [
    // Helical spring icon (coil)
    <svg key="helical" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M20 60 Q30 20 40 40 Q50 60 60 20" stroke="#e94560" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8"/>
      <path d="M15 65 Q25 25 35 45 Q45 65 55 25 Q65 5 70 15" stroke="#e94560" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4"/>
      <circle cx="20" cy="60" r="2" fill="#e94560"/>
      <circle cx="60" cy="20" r="2" fill="#e94560"/>
    </svg>,
    // Leaf spring trapezoid
    <svg key="trapezoid" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="10" y="28" width="60" height="8" rx="1" stroke="#e94560" strokeWidth="1.5" fill="none"/>
      <rect x="15" y="38" width="50" height="6" rx="1" stroke="#e94560" strokeWidth="1.5" fill="none" opacity="0.7"/>
      <rect x="20" y="46" width="40" height="5" rx="1" stroke="#e94560" strokeWidth="1.5" fill="none" opacity="0.5"/>
      <path d="M10 32 Q40 22 70 32" stroke="#e94560" strokeWidth="1" fill="none" opacity="0.4"/>
    </svg>,
    // Parabolic leaf spring
    <svg key="parabolic" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M10 50 Q40 20 70 50" stroke="#e94560" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M15 53 Q40 27 65 53" stroke="#e94560" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7"/>
      <path d="M20 56 Q40 34 60 56" stroke="#e94560" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4"/>
      <circle cx="10" cy="50" r="3" fill="none" stroke="#e94560" strokeWidth="1.5"/>
      <circle cx="70" cy="50" r="3" fill="none" stroke="#e94560" strokeWidth="1.5"/>
    </svg>,
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.12,
      }}
      className="group"
    >
      <Link href={href} className="block h-full">
        <div className="relative h-full bg-[#12122a] border border-white/5 p-8 lg:p-10 overflow-hidden transition-all duration-500 hover:border-[#e94560]/30 hover:bg-[#1a1a2e]">
          {/* Number */}
          <div
            className="absolute top-6 right-8 text-[#fafaf9]/5 text-8xl font-bold leading-none select-none"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.05em" }}
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, "0")}
          </div>

          {/* Icon */}
          <div className="w-16 h-16 mb-8 transition-transform duration-500 group-hover:scale-110">
            {icons[index]}
          </div>

          {/* Content */}
          <div className="relative">
            <h3
              className="text-[#fafaf9] text-xl font-semibold mb-4 leading-tight"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
            >
              {name}
            </h3>
            <p className="text-[#c2c2c2] text-sm leading-relaxed mb-8">
              {desc}
            </p>

            {/* CTA */}
            <div className="flex items-center gap-2 text-[#e94560] text-sm font-medium transition-all duration-300 group-hover:gap-4">
              <span style={{ fontFamily: "var(--font-display)" }}>{dict.products.learnMore}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </div>
          </div>

          {/* Bottom border accent */}
          <div className="absolute bottom-0 left-0 h-0.5 bg-[#e94560] w-0 group-hover:w-full transition-all duration-500 ease-out" />
        </div>
      </Link>
    </motion.div>
  );
}
