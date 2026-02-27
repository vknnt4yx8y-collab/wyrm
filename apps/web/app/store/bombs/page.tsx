import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BombsShop } from "@/components/store/BombsShop";

export const metadata: Metadata = {
  title: "Bombs - Store",
  description: "Server-wide experience and loot boost bombs for the entire server.",
};

export default function BombsPage() {
  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="section-title mb-4">Boost Bombs</h1>
          <p className="section-subtitle">
            Detonate a bomb to grant server-wide bonuses — everyone benefits!
          </p>
        </div>
        <BombsShop />
      </div>
    </PageWrapper>
  );
}
