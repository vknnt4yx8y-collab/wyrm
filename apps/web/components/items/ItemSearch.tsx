"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { itemApi } from "@/lib/api";
import { SearchBar } from "@/components/shared/SearchBar";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { getRarityColor } from "@/lib/utils";

const ITEM_TYPES = ["ALL", "WEAPON", "HELMET", "CHESTPLATE", "LEGGINGS", "BOOTS", "RING", "BRACELET", "NECKLACE"];
const ITEM_TIERS = ["ALL", "NORMAL", "UNIQUE", "RARE", "LEGENDARY", "FABLED", "MYTHIC", "SET"];

export function ItemSearch() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("ALL");
  const [tier, setTier] = useState("ALL");
  const [page, setPage] = useState(1);
  const PER_PAGE = 24;

  const { data, isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const res = await itemApi.list();
      return res.data;
    },
  });

  const items: Array<{ name: string; displayName: string; tier: string; type: string; level: number }> = data?.data || [];

  const filtered = items.filter((item) => {
    const matchesSearch = item.displayName.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = type === "ALL" || item.type === type;
    const matchesTier = tier === "ALL" || item.tier === tier;
    return matchesSearch && matchesType && matchesTier;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div>
      <div className="flex flex-col gap-4 mb-8">
        <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search items..." />
        <div className="flex gap-2 flex-wrap">
          {ITEM_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => { setType(t); setPage(1); }}
              className={`px-3 py-1 rounded text-xs font-medium transition-all uppercase tracking-wide ${
                type === t ? "bg-accent-gold text-bg-primary" : "bg-bg-card text-text-muted hover:text-text-primary border border-bg-elevated"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {ITEM_TIERS.map((t) => (
            <button
              key={t}
              onClick={() => { setTier(t); setPage(1); }}
              className="px-3 py-1 rounded text-xs font-medium transition-all border"
              style={{
                backgroundColor: tier === t ? (t === "ALL" ? "#f5c542" : getRarityColor(t)) : "transparent",
                color: tier === t ? "#0a0e14" : (t === "ALL" ? "#8899aa" : getRarityColor(t)),
                borderColor: t === "ALL" ? (tier === t ? "#f5c542" : "#222d3d") : getRarityColor(t) + "60",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8"><LoadingSpinner /></div>
      ) : (
        <>
          <p className="text-text-muted text-sm mb-4">{filtered.length} items found</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
            {paged.map((item) => (
              <Link key={item.name} href={`/items/${encodeURIComponent(item.name)}`} className="group">
                <div className="card p-3 hover:border-opacity-60 transition-all hover:-translate-y-0.5" style={{ borderColor: getRarityColor(item.tier) + "30" }}>
                  <p className="font-medium text-sm mb-0.5 group-hover:text-accent-gold transition-colors truncate" style={{ color: getRarityColor(item.tier) }}>
                    {item.displayName}
                  </p>
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span>{item.type}</span>
                    <span>Lv. {item.level}</span>
                  </div>
                </div>
              </Link>
            ))}
            {paged.length === 0 && (
              <div className="col-span-full text-center py-8 text-text-muted">No items found</div>
            )}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1} className="px-3 py-1 rounded bg-bg-card border border-bg-elevated text-text-secondary disabled:opacity-40">
                ←
              </button>
              <span className="px-3 py-1 text-text-muted text-sm">Page {page} of {totalPages}</span>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className="px-3 py-1 rounded bg-bg-card border border-bg-elevated text-text-secondary disabled:opacity-40">
                →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
