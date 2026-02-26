"use client";

import React from "react";
import { FEATURES } from "@/lib/constants";

export function FeaturesShowcase() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">Why Play Wynncraft?</h2>
          <p className="section-subtitle max-w-xl mx-auto">
            A fully realized MMORPG experience within Minecraft
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              className="card p-6 hover:border-accent-gold/30 transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-gold/5"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-heading font-bold text-xl text-text-primary mb-2 group-hover:text-accent-gold transition-colors">
                {feature.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
