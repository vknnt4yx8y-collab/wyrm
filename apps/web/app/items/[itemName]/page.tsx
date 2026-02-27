import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ItemDetail } from "@/components/items/ItemDetail";

interface Props {
  params: Promise<{ itemName: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { itemName } = await params;
  const name = decodeURIComponent(itemName);
  return {
    title: `${name} - Item Database`,
    description: `View stats and details for ${name}.`,
  };
}

export default async function ItemDetailPage({ params }: Props) {
  const { itemName } = await params;
  const name = decodeURIComponent(itemName);
  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <ItemDetail itemName={name} />
      </div>
    </PageWrapper>
  );
}
