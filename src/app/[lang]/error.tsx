"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="text-center px-6">
        <h1
          className="text-[8vw] font-bold text-[#e94560] leading-none mb-6"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
        >
          Chyba
        </h1>
        <p className="text-[#c2c2c2] text-lg mb-8 max-w-md mx-auto">
          Něco se pokazilo. Zkuste to prosím znovu.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-3 bg-[#e94560] text-[#fafaf9] px-7 py-4 font-semibold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#c73651]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Zkusit znovu
        </button>
      </div>
    </main>
  );
}
