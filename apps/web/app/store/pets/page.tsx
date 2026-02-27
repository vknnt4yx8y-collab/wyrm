import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PetsShop } from "@/components/store/PetsShop";

export const metadata: Metadata = {
  title: "Pets - Store",
  description: "Adorable companion pets to join you on your Wynncraft adventures.",
};

export default function PetsPage() {
  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="section-title mb-4">Pet Companions</h1>
          <p className="section-subtitle">
            Adopt a loyal companion to join you on your adventures across Wynn
          </p>
        </div>
        <PetsShop />
      </div>
    </PageWrapper>
  );
}
