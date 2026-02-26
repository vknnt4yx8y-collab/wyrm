"use client";

import React from "react";
import Link from "next/link";
import { formatRelativeTime } from "@/lib/utils";
import { Pin, Lock } from "lucide-react";

const mockThreads = [
  { id: "1", title: "Welcome to the Forums!", isPinned: true, isLocked: false, replyCount: 45, viewCount: 1200, author: "Salted", updatedAt: "2024-10-15" },
  { id: "2", title: "How to get started with Wynncraft?", isPinned: false, isLocked: false, replyCount: 23, viewCount: 567, author: "NewPlayer123", updatedAt: "2024-10-14" },
  { id: "3", title: "Best warrior builds for endgame?", isPinned: false, isLocked: false, replyCount: 67, viewCount: 2340, author: "WarriorPro", updatedAt: "2024-10-13" },
  { id: "4", title: "Bug Report: Quest NPC missing", isPinned: false, isLocked: true, replyCount: 5, viewCount: 234, author: "BugFinder99", updatedAt: "2024-10-12" },
];

interface ThreadListProps {
  categorySlug: string;
}

export function ThreadList({ categorySlug }: ThreadListProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="section-title capitalize">{categorySlug.replace(/-/g, " ")}</h1>
        <Link href="/forums/create" className="btn-primary text-sm">New Thread</Link>
      </div>

      <div className="space-y-2">
        {mockThreads.map((thread) => (
          <Link key={thread.id} href={`/forums/${categorySlug}/${thread.id}`} className="group block">
            <div className="card p-4 hover:border-accent-gold/30 transition-all">
              <div className="flex items-start gap-3">
                <div className="flex flex-col gap-1 mt-0.5">
                  {thread.isPinned && <Pin className="w-3.5 h-3.5 text-accent-gold" />}
                  {thread.isLocked && <Lock className="w-3.5 h-3.5 text-text-muted" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-text-primary group-hover:text-accent-gold transition-colors truncate">
                    {thread.title}
                  </h3>
                  <p className="text-text-muted text-xs mt-0.5">
                    by <span className="text-text-secondary">{thread.author}</span> · {formatRelativeTime(thread.updatedAt)}
                  </p>
                </div>
                <div className="flex gap-4 text-xs text-text-muted flex-shrink-0">
                  <span>{thread.replyCount} replies</span>
                  <span>{thread.viewCount} views</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
