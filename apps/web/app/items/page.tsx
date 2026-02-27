import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ItemSearch } from "@/components/items/ItemSearch";

export const metadata: Metadata = {
  title: "Item Database",
  description: "Browse and search Wynncraft's complete item database.",
};

export default function ItemsPage() {
  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="section-title mb-2">Item Database</h1>
        <p className="section-subtitle mb-10">Search and filter all Wynncraft items</p>
        <ItemSearch />
      </div>
    </PageWrapper>
  );
}
