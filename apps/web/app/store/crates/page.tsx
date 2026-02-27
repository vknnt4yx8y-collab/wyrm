import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { CratesShop } from "@/components/store/CratesShop";

export const metadata: Metadata = {
  title: "Crates - Store",
  description: "Mystery crates containing exclusive rewards and cosmetics.",
};

export default function CratesPage() {
  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="section-title mb-4">Mystery Crates</h1>
          <p className="section-subtitle">
            Open crates to discover exclusive cosmetics, items, and surprises
          </p>
        </div>
        <CratesShop />
      </div>
    </PageWrapper>
  );
}
