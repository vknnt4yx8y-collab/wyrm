import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { CLASS_DATA } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Classes",
  description: "Learn about Wynncraft's 5 unique classes and their archetypes.",
};

export default function ClassesPage() {
  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="section-title mb-4">Choose Your Class</h1>
          <p className="section-subtitle">Five unique playstyles, each with three archetypes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(CLASS_DATA).map(([key, cls]) => (
            <Link key={key} href={`/classes/${key.toLowerCase()}`} className="group">
              <div
                className="card p-6 h-full hover:-translate-y-1 transition-all duration-300"
                style={{ borderColor: cls.color + "30" }}
              >
                <div className="text-5xl mb-4">{cls.icon}</div>
                <h2
                  className="font-heading font-bold text-2xl mb-3"
                  style={{ color: cls.color }}
                >
                  {cls.name}
                </h2>
                <p className="text-text-muted text-sm leading-relaxed mb-4">
                  {cls.description}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {cls.archetypes.map((a) => (
                    <span
                      key={a}
                      className="px-2 py-0.5 text-xs rounded border"
                      style={{ borderColor: cls.color + "40", color: cls.color + "cc" }}
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
