import React from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

interface ClassData {
  name: string;
  description: string;
  color: string;
  icon: string;
  archetypes: string[];
  baseStats: { health: number; damage: string; defense: number; speed: number };
}

interface ClassCardProps {
  className: string;
  data: ClassData;
}

export function ClassCard({ className, data }: ClassCardProps) {
  return (
    <div>
      <Breadcrumbs crumbs={[{ label: "Classes", href: "/classes" }, { label: data.name }]} />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main info */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="text-6xl w-20 h-20 flex items-center justify-center rounded-xl"
              style={{ backgroundColor: data.color + "20" }}
            >
              {data.icon}
            </div>
            <div>
              <h1 className="text-4xl font-heading font-bold" style={{ color: data.color }}>
                {data.name}
              </h1>
              <div className="flex gap-2 mt-2 flex-wrap">
                {data.archetypes.map((a) => (
                  <span
                    key={a}
                    className="px-3 py-0.5 rounded text-sm border"
                    style={{ borderColor: data.color + "50", color: data.color + "cc" }}
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="card p-6 mb-6">
            <h2 className="font-heading font-bold text-text-primary text-xl mb-3">Overview</h2>
            <p className="text-text-secondary leading-relaxed">{data.description}</p>
          </div>

          <div className="card p-6">
            <h2 className="font-heading font-bold text-text-primary text-xl mb-4">Archetypes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {data.archetypes.map((arch, i) => (
                <div
                  key={arch}
                  className="p-4 rounded-lg border"
                  style={{ borderColor: data.color + "30", backgroundColor: data.color + "08" }}
                >
                  <p className="font-heading font-bold text-lg mb-1" style={{ color: data.color }}>
                    {arch}
                  </p>
                  <p className="text-text-muted text-xs">Archetype {i + 1}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats sidebar */}
        <div>
          <div className="card p-5 mb-4">
            <h3 className="font-heading font-bold text-text-primary mb-4">Base Stats</h3>
            {Object.entries(data.baseStats).map(([stat, value]) => (
              <div key={stat} className="flex justify-between py-2 border-b border-bg-elevated last:border-0">
                <span className="text-text-muted text-sm capitalize">{stat}</span>
                <span className="text-text-primary text-sm font-medium">{String(value)}</span>
              </div>
            ))}
          </div>
          <div className="card p-5">
            <h3 className="font-heading font-bold text-text-primary mb-3">Other Classes</h3>
            <div className="space-y-2">
              {["WARRIOR", "MAGE", "ARCHER", "ASSASSIN", "SHAMAN"]
                .filter((c) => c !== className)
                .map((c) => (
                  <Link
                    key={c}
                    href={`/classes/${c.toLowerCase()}`}
                    className="block text-text-muted hover:text-text-primary text-sm transition-colors"
                  >
                    → {c.charAt(0) + c.slice(1).toLowerCase()}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
