import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { RankComparison } from "@/components/store/RankComparison";

export const metadata: Metadata = {
  title: "Ranks - Store",
  description: "Purchase a rank to unlock exclusive perks and support Wynncraft.",
};

export default function RanksPage() {
  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="section-title mb-4">Rank Packages</h1>
          <p className="section-subtitle">
            Support Wynncraft and unlock exclusive in-game perks
          </p>
        </div>
        <RankComparison />
      </div>
    </PageWrapper>
  );
}
