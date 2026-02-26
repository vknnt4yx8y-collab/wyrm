"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { itemApi } from "@/lib/api";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { getRarityColor } from "@/lib/utils";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

interface ItemDetailProps {
  itemName: string;
}

export function ItemDetail({ itemName }: ItemDetailProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["item", itemName],
    queryFn: async () => {
      const res = await itemApi.get(itemName);
      return res.data;
    },
  });

  if (isLoading) return <div className="flex justify-center py-16"><LoadingSpinner size="lg" /></div>;

  if (error || !data) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">🗡️</div>
        <h2 className="font-heading font-bold text-xl text-text-primary mb-2">Item Not Found</h2>
        <p className="text-text-muted">Could not find item &quot;{itemName}&quot;</p>
      </div>
    );
  }

  const item = data.data || data;
  const rarityColor = getRarityColor(item.tier);

  return (
    <div>
      <Breadcrumbs crumbs={[{ label: "Items", href: "/items" }, { label: item.displayName }]} />

      <div className="mt-8 max-w-sm">
        {/* Minecraft-style tooltip */}
        <div className="bg-bg-primary border-2 rounded p-4 font-mono text-sm" style={{ borderColor: rarityColor }}>
          <p className="font-bold text-lg mb-1" style={{ color: rarityColor }}>
            {item.displayName}
          </p>
          <p className="text-text-muted text-xs mb-3">{item.tier} {item.type}</p>

          {item.level && (
            <p className="text-text-secondary text-xs mb-2">
              Min. Level: <span className="text-text-primary">{item.level}</span>
            </p>
          )}

          {item.baseDamage && (
            <div className="mb-3">
              <p className="text-text-secondary text-xs">Damage:</p>
              {Object.entries(item.baseDamage as Record<string, string>).map(([type, val]) => (
                <p key={type} className="text-xs pl-2">
                  <span className="text-text-muted">{type}: </span>
                  <span className="text-accent-gold">{val}</span>
                </p>
              ))}
            </div>
          )}

          {item.identifications && Object.keys(item.identifications).length > 0 && (
            <div className="border-t border-text-muted/20 pt-3 mt-3">
              <p className="text-text-muted text-xs mb-2">Identifications:</p>
              {Object.entries(item.identifications as Record<string, { min: number; max: number; raw: number }>).map(
                ([id, vals]) => (
                  <p key={id} className="text-xs">
                    <span className="text-accent-green">+{vals.raw}</span>
                    <span className="text-text-muted ml-1">{id}</span>
                  </p>
                )
              )}
            </div>
          )}

          {item.powderSlots > 0 && (
            <p className="text-text-muted text-xs mt-3">
              [{Array(item.powderSlots).fill("◆").join("")}] Powder Slots
            </p>
          )}

          {item.lore && (
            <p className="text-text-muted text-xs italic mt-3 border-t border-text-muted/20 pt-3">
              {item.lore}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
