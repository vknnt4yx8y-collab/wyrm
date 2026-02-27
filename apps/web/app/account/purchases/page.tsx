import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import Link from "next/link";
import { ShoppingBag, ExternalLink } from "lucide-react";

export const metadata: Metadata = { title: "Purchases - Account" };

const mockPurchases = [
  {
    id: "ORD-20241201-001",
    date: "2024-12-01",
    item: "HERO Rank",
    category: "Rank",
    price: 54.99,
    status: "Delivered",
    recipient: "CoolPlayer123",
  },
  {
    id: "ORD-20241115-002",
    date: "2024-11-15",
    item: "Heroic Crate x3",
    category: "Crate",
    price: 23.97,
    status: "Delivered",
    recipient: "CoolPlayer123",
  },
  {
    id: "ORD-20241030-003",
    date: "2024-10-30",
    item: "Baby Dragon Pet",
    category: "Pet",
    price: 12.99,
    status: "Delivered",
    recipient: "CoolPlayer123",
  },
  {
    id: "ORD-20241010-004",
    date: "2024-10-10",
    item: "Mega Bomb x2",
    category: "Bomb",
    price: 11.98,
    status: "Delivered",
    recipient: "CoolPlayer123",
  },
  {
    id: "ORD-20240920-005",
    date: "2024-09-20",
    item: "Golden Aura",
    category: "Cosmetic",
    price: 4.99,
    status: "Delivered",
    recipient: "CoolPlayer123",
  },
];

const statusColor: Record<string, string> = {
  Delivered: "text-accent-green",
  Pending: "text-accent-gold",
  Refunded: "text-accent-red",
};

export default function PurchasesPage() {
  const total = mockPurchases.reduce((sum, p) => sum + p.price, 0);

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag className="w-7 h-7 text-accent-gold" />
          <h1 className="section-title">Purchase History</h1>
        </div>

        <div className="card p-4 mb-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div>
            <p className="text-text-muted text-sm">Total Spent</p>
            <p className="text-2xl font-bold text-accent-gold">${total.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-text-muted text-sm">Total Orders</p>
            <p className="text-2xl font-bold text-text-primary">{mockPurchases.length}</p>
          </div>
          <Link href="/store" className="btn-primary text-sm py-2 px-4">
            Visit Store
          </Link>
        </div>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-bg-elevated">
                  <th className="text-left px-5 py-3 text-text-muted text-xs font-semibold uppercase tracking-wide">
                    Order ID
                  </th>
                  <th className="text-left px-5 py-3 text-text-muted text-xs font-semibold uppercase tracking-wide">
                    Item
                  </th>
                  <th className="text-left px-5 py-3 text-text-muted text-xs font-semibold uppercase tracking-wide hidden sm:table-cell">
                    Date
                  </th>
                  <th className="text-right px-5 py-3 text-text-muted text-xs font-semibold uppercase tracking-wide">
                    Price
                  </th>
                  <th className="text-right px-5 py-3 text-text-muted text-xs font-semibold uppercase tracking-wide">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockPurchases.map((purchase, idx) => (
                  <tr
                    key={purchase.id}
                    className={`border-b border-bg-elevated last:border-0 hover:bg-bg-elevated/30 transition-colors ${
                      idx % 2 === 0 ? "" : "bg-bg-elevated/10"
                    }`}
                  >
                    <td className="px-5 py-3.5 text-text-muted text-xs font-mono">
                      {purchase.id}
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-text-primary text-sm font-medium">{purchase.item}</p>
                      <p className="text-text-muted text-xs">{purchase.category}</p>
                    </td>
                    <td className="px-5 py-3.5 text-text-muted text-sm hidden sm:table-cell">
                      {purchase.date}
                    </td>
                    <td className="px-5 py-3.5 text-right text-text-primary text-sm font-semibold">
                      ${purchase.price.toFixed(2)}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className={`text-xs font-semibold ${statusColor[purchase.status] || "text-text-muted"}`}>
                        {purchase.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-text-muted text-xs text-center mt-4">
          Need help with a purchase?{" "}
          <Link href="/help" className="text-accent-gold hover:underline inline-flex items-center gap-1">
            Contact Support <ExternalLink className="w-3 h-3" />
          </Link>
        </p>
      </div>
    </PageWrapper>
  );
}
