import React from "react";
import Link from "next/link";
import { FOOTER_LINKS, SOCIAL_LINKS, SERVER_IP } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-bg-elevated mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/">
              <span className="text-2xl font-heading font-bold text-accent-gold text-glow-gold">
                WYNNCRAFT
              </span>
            </Link>
            <p className="mt-3 text-text-muted text-sm">
              The Minecraft MMORPG
            </p>
            <p className="mt-2 text-text-muted text-xs font-mono">
              {SERVER_IP}
            </p>
            <div className="flex items-center gap-3 mt-4">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-accent-gold transition-colors text-sm"
                  aria-label={s.label}
                >
                  {s.label.charAt(0)}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-heading font-semibold text-text-primary mb-3 uppercase text-sm tracking-wider">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-text-muted hover:text-text-secondary text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-bg-elevated pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} Wynncraft. All rights reserved.
          </p>
          <p className="text-text-muted text-xs">
            Not affiliated with Mojang Studios or Microsoft Corporation.
          </p>
        </div>
      </div>
    </footer>
  );
}
