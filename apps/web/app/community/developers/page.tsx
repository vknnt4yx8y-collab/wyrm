import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";

export const metadata: Metadata = { title: "Developer API - Community" };

export default function DevelopersPage() {
  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="section-title mb-2">Developer API</h1>
        <p className="section-subtitle mb-8">Build tools and applications with the Wynncraft API</p>
        <div className="card p-6 mb-6">
          <h2 className="font-heading font-bold text-lg text-text-primary mb-3">Base URL</h2>
          <code className="bg-bg-elevated px-3 py-2 rounded text-accent-green font-mono text-sm block">
            https://wynncraft.com/api/v3/
          </code>
        </div>
        <div className="card p-6 mb-6">
          <h2 className="font-heading font-bold text-lg text-text-primary mb-3">Rate Limiting</h2>
          <p className="text-text-muted text-sm">120 requests per minute per IP address.</p>
        </div>
        <div className="space-y-3">
          {[
            { method: "GET", path: "/player/{username}", desc: "Get player data" },
            { method: "GET", path: "/guild/{name}", desc: "Get guild data" },
            { method: "GET", path: "/leaderboard/{type}", desc: "Get leaderboard" },
            { method: "GET", path: "/item", desc: "Get all items" },
            { method: "GET", path: "/map/locations/markers", desc: "Get map markers" },
            { method: "GET", path: "/server/status", desc: "Get server status" },
          ].map((endpoint) => (
            <div key={endpoint.path} className="card p-4 flex items-center gap-4">
              <span className="text-xs font-bold font-mono text-accent-green bg-accent-green/10 px-2 py-0.5 rounded flex-shrink-0">
                {endpoint.method}
              </span>
              <code className="text-text-primary font-mono text-sm flex-1">{endpoint.path}</code>
              <span className="text-text-muted text-sm">{endpoint.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
