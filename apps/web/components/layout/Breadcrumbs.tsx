import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  crumbs: Crumb[];
}

export function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-1 text-sm text-text-muted">
      <Link href="/" className="hover:text-text-secondary transition-colors">
        Home
      </Link>
      {crumbs.map((crumb, i) => (
        <React.Fragment key={i}>
          <ChevronRight className="w-3 h-3" />
          {crumb.href && i < crumbs.length - 1 ? (
            <Link href={crumb.href} className="hover:text-text-secondary transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-text-secondary">{crumb.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
