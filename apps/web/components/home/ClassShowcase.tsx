"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CLASS_DATA } from "@/lib/constants";

const classes = Object.entries(CLASS_DATA);

export function ClassShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % classes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const [className, classData] = classes[activeIndex];

  return (
    <section className="py-24 px-4 bg-bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">Choose Your Class</h2>
          <p className="section-subtitle">Master unique abilities and playstyles</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Class selector */}
          <div className="flex flex-col gap-3">
            {classes.map(([cls, data], i) => (
              <button
                key={cls}
                onClick={() => setActiveIndex(i)}
                className={`flex items-center gap-4 p-4 rounded-lg border transition-all text-left ${
                  i === activeIndex
                    ? "border-opacity-100 bg-bg-elevated"
                    : "border-bg-elevated hover:border-bg-card"
                }`}
                style={{
                  borderColor: i === activeIndex ? data.color : undefined,
                  boxShadow: i === activeIndex ? `0 0 15px ${data.color}20` : undefined,
                }}
              >
                <span className="text-3xl">{data.icon}</span>
                <div>
                  <div className="font-heading font-bold text-text-primary">{data.name}</div>
                  <div className="text-text-muted text-xs">{data.archetypes.join(" · ")}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Class detail */}
          <div
            className="card p-8 border transition-all"
            style={{ borderColor: classData.color + "40" }}
          >
            <div className="text-6xl mb-4">{classData.icon}</div>
            <h3
              className="text-3xl font-heading font-bold mb-3"
              style={{ color: classData.color }}
            >
              {classData.name}
            </h3>
            <p className="text-text-secondary mb-6 leading-relaxed">
              {classData.description}
            </p>
            <div className="mb-6">
              <p className="text-text-muted text-xs uppercase tracking-wider mb-2">Archetypes</p>
              <div className="flex gap-2 flex-wrap">
                {classData.archetypes.map((a) => (
                  <span
                    key={a}
                    className="px-3 py-1 rounded text-xs font-medium border"
                    style={{ borderColor: classData.color + "60", color: classData.color }}
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href={`/classes/${className.toLowerCase()}`}
              className="btn-secondary text-sm inline-block"
              style={{ borderColor: classData.color, color: classData.color }}
            >
              Learn More →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
