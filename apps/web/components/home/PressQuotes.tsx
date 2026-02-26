import React from "react";
import { PRESS_QUOTES } from "@/lib/constants";

export function PressQuotes() {
  return (
    <section className="py-16 px-4 bg-bg-secondary border-y border-bg-elevated overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-center mb-12">What They&apos;re Saying</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRESS_QUOTES.map((quote, i) => (
            <div
              key={i}
              className="bg-bg-card border border-bg-elevated rounded-xl p-6 flex flex-col gap-4"
            >
              <div className="text-accent-gold text-3xl">&ldquo;</div>
              <p className="text-text-primary italic leading-relaxed flex-1">{quote.quote}</p>
              <div className="text-text-muted text-sm font-semibold">— {quote.source}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
