"use client";

import React, { useEffect, useRef, useState } from "react";
import { STATS_COUNTERS } from "@/lib/constants";

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const duration = 2000;
          const start = Date.now();
          const timer = setInterval(() => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress >= 1) clearInterval(timer);
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  const format = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
    return n.toString();
  };

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-heading font-bold text-accent-gold">
      {format(count)}{suffix}
    </span>
  );
}

export function StatsCounter() {
  return (
    <section className="py-16 bg-bg-secondary border-y border-bg-elevated">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS_COUNTERS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2">
              <CountUp target={stat.value} suffix={stat.suffix} />
              <span className="text-text-secondary font-heading uppercase tracking-wider text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
