import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { CosmeticsShop } from "@/components/store/CosmeticsShop";

export const metadata: Metadata = {
  title: "Cosmetics - Store",
  description: "Stand out with unique visual effects, particles, hats, and more.",
};

export default function CosmeticsPage() {
  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="section-title mb-4">Cosmetics</h1>
          <p className="section-subtitle">
            Express yourself with exclusive visual effects and accessories
          </p>
        </div>
        <CosmeticsShop />
      </div>
    </PageWrapper>
  );
}
