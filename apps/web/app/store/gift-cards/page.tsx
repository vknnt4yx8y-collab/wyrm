import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { GiftCardsShop } from "@/components/store/GiftCardsShop";

export const metadata: Metadata = {
  title: "Gift Cards - Store",
  description: "Give the gift of adventure with Wynncraft gift cards.",
};

export default function GiftCardsPage() {
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="section-title mb-4">Gift Cards</h1>
          <p className="section-subtitle">
            Give someone the gift of adventure — redeemable in the Wynncraft store
          </p>
        </div>
        <GiftCardsShop />
      </div>
    </PageWrapper>
  );
}
