"use client";

import React, { useState } from "react";
import { useCart } from "@/lib/hooks/useCart";
import { useToast } from "@/components/shared/Toast";
import { Gift, Mail, CreditCard } from "lucide-react";

const giftCards = [
  {
    id: "gift-10",
    name: "$10 Gift Card",
    price: 10.0,
    icon: "🎁",
    color: "#55ff55",
    value: 10,
    description: "A $10 store credit redeemable on any Wynncraft purchase.",
    bonus: null,
  },
  {
    id: "gift-25",
    name: "$25 Gift Card",
    price: 25.0,
    icon: "🎁",
    color: "#f5c542",
    value: 25,
    description: "A $25 store credit — the most popular gift option.",
    bonus: null,
    popular: true,
  },
  {
    id: "gift-50",
    name: "$50 Gift Card",
    price: 50.0,
    icon: "🎁",
    color: "#55ffff",
    value: 50,
    description: "A $50 store credit with a little extra bonus value.",
    bonus: "$5 bonus credit",
  },
  {
    id: "gift-100",
    name: "$100 Gift Card",
    price: 100.0,
    icon: "🎁",
    color: "#ff55ff",
    value: 100,
    description: "A $100 store credit — the ultimate gift for any Wynncraft fan.",
    bonus: "$15 bonus credit",
  },
];

export function GiftCardsShop() {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (card: (typeof giftCards)[0]) => {
    if (!recipientEmail.trim()) {
      showToast("Please enter the recipient's email address", "error");
      return;
    }
    addItem({
      id: card.id,
      name: card.name,
      price: card.price,
      category: "GIFT_CARD",
      recipientName: recipientEmail,
      isGift: true,
    });
    showToast(`${card.name} added to cart!`, "success");
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {giftCards.map((card) => (
          <div
            key={card.id}
            className="card p-6 flex flex-col relative"
            style={{ borderColor: card.popular ? card.color + "60" : undefined }}
          >
            {card.popular && (
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-0.5 rounded-full text-bg-primary"
                style={{ backgroundColor: card.color }}
              >
                POPULAR
              </div>
            )}
            <div className="text-5xl mb-3 text-center">{card.icon}</div>
            <h3
              className="font-heading font-bold text-xl mb-1 text-center"
              style={{ color: card.color }}
            >
              {card.name}
            </h3>
            <p className="text-3xl font-bold text-text-primary text-center mb-2">
              ${card.price.toFixed(2)}
            </p>
            {card.bonus && (
              <p className="text-xs text-center mb-2" style={{ color: card.color }}>
                + {card.bonus}
              </p>
            )}
            <p className="text-text-muted text-sm text-center mb-5 flex-1">{card.description}</p>
            <button
              onClick={() => handleAddToCart(card)}
              className="w-full py-2 px-4 rounded font-heading font-bold text-sm transition-all hover:brightness-110"
              style={{ backgroundColor: card.color, color: "#0a0e14" }}
            >
              Select
            </button>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <h2 className="font-heading font-bold text-lg text-text-primary mb-5 flex items-center gap-2">
          <Gift className="w-5 h-5 text-accent-gold" />
          Gift Card Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-text-secondary text-sm mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              Recipient&apos;s Email
            </label>
            <input
              type="email"
              placeholder="friend@example.com"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              className="w-full bg-bg-elevated border border-bg-card rounded-lg px-3 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold text-sm"
            />
          </div>
          <div>
            <label className="block text-text-secondary text-sm mb-1.5 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5" />
              Your Name (optional)
            </label>
            <input
              type="text"
              placeholder="Your name"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="w-full bg-bg-elevated border border-bg-card rounded-lg px-3 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-text-secondary text-sm mb-1.5">
              Personal Message (optional)
            </label>
            <textarea
              placeholder="Write a message to go with your gift..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full bg-bg-elevated border border-bg-card rounded-lg px-3 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold text-sm resize-none"
            />
          </div>
        </div>
        <p className="text-text-muted text-xs mt-4">
          Gift cards are delivered by email instantly after purchase. They can be redeemed on any item
          in the Wynncraft store. Gift cards never expire.
        </p>
      </div>
    </div>
  );
}
