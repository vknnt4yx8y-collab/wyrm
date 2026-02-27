"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_LINKS, SERVER_IP } from "@/lib/constants";
import { Menu, X, ShoppingCart, User, ChevronDown } from "lucide-react";
import { useCart } from "@/lib/hooks/useCart";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const itemCount = useCart((s) => s.itemCount());

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-bg-primary/95 backdrop-blur-sm border-b border-bg-elevated shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-heading font-bold text-accent-gold text-glow-gold">
              WYNNCRAFT
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <div key={link.href} className="relative">
                {link.children ? (
                  <div
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button className="nav-link flex items-center gap-1 px-3 py-2 rounded text-sm">
                      {link.label}
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    {openDropdown === link.label && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-bg-secondary border border-bg-elevated rounded-lg shadow-xl py-1 z-50">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href={link.href} className="nav-link px-3 py-2 rounded text-sm block">
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/store/cart"
              className="relative p-2 text-text-secondary hover:text-accent-gold transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-gold text-bg-primary text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <Link
              href="/account"
              className="p-2 text-text-secondary hover:text-accent-gold transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>
            <a
              href={`minecraft://${SERVER_IP}`}
              className="btn-primary text-sm py-2 px-4"
            >
              Play Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-text-primary"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-bg-secondary border-t border-bg-elevated">
          <div className="px-4 py-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className="block py-2 text-text-secondary hover:text-text-primary transition-colors"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="pl-4 space-y-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block py-1 text-sm text-text-muted hover:text-text-secondary transition-colors"
                        onClick={() => setIsMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-bg-elevated">
              <a href={`minecraft://${SERVER_IP}`} className="btn-primary w-full text-center block">
                Play Now
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
