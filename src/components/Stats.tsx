"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { Dictionary } from "@/lib/getDictionary";
import { l } from "@/sanity/helpers";
import type { Locale } from "@/middleware";

interface StatsProps {
  dict: Dictionary;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings?: any;
  lang?: Locale;
}

function AnimatedCounter({
  target,
  duration = 2000,
  suffix = "",
  prefix = "",
}: {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-10%" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const start = performance.now();
    const easing = (t: number) => 1 - Math.pow(1 - t, 4);

    const update = (currentTime: number) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(progress);
      setCount(Math.floor(easedProgress * target));

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(update);
  }, [isInView, target, duration]);

  const formatted = count.toLocaleString("cs-CZ");

  return (
    <span ref={ref}>
      {prefix}{formatted}{suffix}
    </span>
  );
}

export default function Stats({ dict, settings, lang = "cs" }: StatsProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-10%" });

  const statsData = settings?.stats;

  const stats = [
    {
      value: statsData?.founded?.numericValue ?? 1951,
      suffix: statsData?.founded?.suffix ?? "",
      label: statsData?.founded?.label ? l(statsData.founded.label, lang) : dict.stats.founded,
    },
    {
      value: statsData?.springs?.numericValue ?? 572945,
      suffix: statsData?.springs?.suffix ?? "",
      label: statsData?.springs?.label ? l(statsData.springs.label, lang) : dict.stats.springs,
    },
    {
      value: statsData?.employees?.numericValue ?? 280,
      suffix: statsData?.employees?.suffix ?? "",
      label: statsData?.employees?.label ? l(statsData.employees.label, lang) : dict.stats.employees,
    },
    {
      value: statsData?.years?.numericValue ?? 65,
      suffix: statsData?.years?.suffix ?? "+",
      label: statsData?.years?.label ? l(statsData.years.label, lang) : dict.stats.years,
    },
  ];

  return (
    <section
      ref={ref}
      className="bg-[#e94560] py-24 lg:py-32 overflow-hidden relative"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(-45deg, #fff, #fff 1px, transparent 0, transparent 50%)`,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-10 lg:px-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.1,
              }}
              className="relative flex flex-col items-start"
            >
              <div
                className="text-[#fafaf9] font-bold leading-none mb-3"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 4rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  duration={1800}
                />
              </div>
              <div
                className="text-[#fafaf9]/70 text-xs tracking-wider uppercase"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {stat.label}
              </div>
              {i < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-[#fafaf9]/20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
