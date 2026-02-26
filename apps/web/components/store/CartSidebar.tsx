"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/lib/hooks/useCart";
import { Trash2, Plus, Minus } from "lucide-react";

export function CartSidebar() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="font-heading font-bold text-xl text-text-primary mb-2">Your cart is empty</h2>
        <p className="text-text-muted mb-6">Browse the store to find something you like.</p>
        <Link href="/store" className="btn-primary">Browse Store</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div key={item.id} className="card p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-bg-elevated rounded flex items-center justify-center text-2xl flex-shrink-0">
              👑
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-text-primary truncate">{item.name}</p>
              {item.recipientName && (
                <p className="text-text-muted text-xs">For: {item.recipientName}</p>
              )}
              <p className="text-accent-gold font-bold">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="p-1 rounded bg-bg-elevated hover:bg-bg-card transition-colors text-text-secondary"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-text-primary w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 rounded bg-bg-elevated hover:bg-bg-card transition-colors text-text-secondary"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="p-2 text-text-muted hover:text-accent-red transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="card p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-text-secondary">
            {itemCount()} item{itemCount() !== 1 ? "s" : ""}
          </span>
          <span className="text-2xl font-bold text-text-primary">${total().toFixed(2)}</span>
        </div>
        <Link href="/store/checkout" className="btn-primary w-full text-center block">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
