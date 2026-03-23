import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Stránka nenalezena / Page not found",
  description:
    "Tato stránka neexistuje nebo byla přesunuta. This page does not exist or has been moved.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-center px-6">
        <div
          className="text-[#fafaf9]/5 font-bold leading-none mb-8 select-none"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(8rem, 20vw, 20rem)",
            letterSpacing: "-0.05em",
          }}
          aria-hidden="true"
        >
          404
        </div>
        <h1
          className="text-[#fafaf9] text-3xl font-bold mb-2"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
        >
          Stránka nenalezena
        </h1>
        <p
          className="text-[#e94560] text-lg font-semibold mb-6"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
        >
          Page not found
        </p>
        <p className="text-[#c2c2c2] text-sm mb-2 max-w-md mx-auto">
          Tato stránka neexistuje nebo byla přesunuta.
        </p>
        <p className="text-[#c2c2c2]/60 text-sm mb-10 max-w-md mx-auto">
          This page does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/cs"
            className="inline-flex items-center gap-3 bg-[#e94560] text-[#fafaf9] px-7 py-4 font-semibold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#c73651]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Zpět domů (CZ)
          </Link>
          <Link
            href="/en"
            className="inline-flex items-center gap-3 border border-[#e94560]/40 text-[#fafaf9] px-7 py-4 font-semibold text-sm tracking-wider uppercase transition-all duration-300 hover:border-[#e94560] hover:text-[#e94560]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Back home (EN)
          </Link>
        </div>
      </div>
    </main>
  );
}
