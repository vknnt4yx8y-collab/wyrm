import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import Link from "next/link";

export const metadata: Metadata = { title: "Account" };

export default function AccountPage() {
  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="section-title mb-8">My Account</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Profile", href: "/account/settings", icon: "👤", desc: "Manage your profile and settings" },
            { label: "Purchases", href: "/account/purchases", icon: "🛍️", desc: "View your purchase history" },
            { label: "Characters", href: "/account/characters", icon: "⚔️", desc: "View your character list" },
            { label: "Settings", href: "/account/settings", icon: "⚙️", desc: "Account settings and security" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="group">
              <div className="card p-6 hover:border-accent-gold/30 transition-all hover:-translate-y-1">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h2 className="font-heading font-bold text-lg text-text-primary group-hover:text-accent-gold transition-colors mb-1">
                  {item.label}
                </h2>
                <p className="text-text-muted text-sm">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-text-muted text-sm">
            Not logged in?{" "}
            <Link href="/account/login" className="text-accent-gold hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
