import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { CartSidebar } from "@/components/store/CartSidebar";

export const metadata: Metadata = { title: "Cart - Store" };

export default function CartPage() {
  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="section-title mb-8">Shopping Cart</h1>
        <CartSidebar />
      </div>
    </PageWrapper>
  );
}
