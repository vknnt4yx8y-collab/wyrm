"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { NAV_LINKS, SERVER_IP } from "@/lib/constants";
import { Menu, X, ShoppingCart, User, ChevronDown, LogOut, Settings, ShoppingBag, Sword } from "lucide-react";
import { useCart } from "@/lib/hooks/useCart";

interface AuthUser {
  id: string;
  email: string;
  minecraftName: string;
  rank: string | null;
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const itemCount = useCart((s) => s.itemCount());

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => data?.user && setUser(data.user))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setUserDropdownOpen(false);
    window.location.href = "/";
  };

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

            {/* User / Auth area */}
            {user ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 p-2 text-text-secondary hover:text-accent-gold transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">{user.minecraftName}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                {userDropdownOpen && (
                  <div className="absolute top-full right-0 mt-1 w-52 bg-bg-secondary border border-bg-elevated rounded-lg shadow-xl py-1 z-50">
                    <div className="px-4 py-2 border-b border-bg-elevated">
                      <p className="text-text-primary text-sm font-semibold">{user.minecraftName}</p>
                      <p className="text-text-muted text-xs truncate">{user.email}</p>
                    </div>
                    <Link href="/account" className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors" onClick={() => setUserDropdownOpen(false)}>
                      <User className="w-4 h-4" /> My Account
                    </Link>
                    <Link href="/account/purchases" className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors" onClick={() => setUserDropdownOpen(false)}>
                      <ShoppingBag className="w-4 h-4" /> Purchases
                    </Link>
                    <Link href="/account/characters" className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors" onClick={() => setUserDropdownOpen(false)}>
                      <Sword className="w-4 h-4" /> Characters
                    </Link>
                    <Link href="/account/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors" onClick={() => setUserDropdownOpen(false)}>
                      <Settings className="w-4 h-4" /> Settings
                    </Link>
                    <div className="border-t border-bg-elevated mt-1 pt-1">
                      <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-accent-red hover:bg-bg-elevated transition-colors">
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/account/login"
                className="p-2 text-text-secondary hover:text-accent-gold transition-colors"
              >
                <User className="w-5 h-5" />
              </Link>
            )}

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
            <div className="pt-4 border-t border-bg-elevated space-y-2">
              {user ? (
                <>
                  <p className="text-text-muted text-sm">Signed in as <span className="text-accent-gold">{user.minecraftName}</span></p>
                  <Link href="/account" className="block py-1 text-text-secondary hover:text-text-primary text-sm" onClick={() => setIsMobileOpen(false)}>My Account</Link>
                  <Link href="/account/settings" className="block py-1 text-text-secondary hover:text-text-primary text-sm" onClick={() => setIsMobileOpen(false)}>Settings</Link>
                  <button onClick={handleLogout} className="block py-1 text-accent-red text-sm">Sign Out</button>
                </>
              ) : (
                <Link href="/account/login" className="block py-2 text-text-secondary hover:text-text-primary text-sm" onClick={() => setIsMobileOpen(false)}>
                  Sign In / Register
                </Link>
              )}
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

