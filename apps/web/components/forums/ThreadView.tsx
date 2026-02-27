"use client";

import React from "react";
import Link from "next/link";
import { formatRelativeTime } from "@/lib/utils";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Avatar } from "@/components/shared/Avatar";
import { ThumbsUp } from "lucide-react";

const mockThread = {
  title: "Welcome to the Forums!",
  author: "Salted",
  createdAt: "2024-01-01",
  posts: [
    {
      id: "p1",
      author: "Salted",
      content: "<p>Welcome to the official Wynncraft forums! This is the place to discuss all things Wynncraft, share builds, report bugs, and connect with the community.</p><p>Please read the rules before posting.</p>",
      createdAt: "2024-01-01",
      reactions: { LIKE: 45, AGREE: 23 },
    },
    {
      id: "p2",
      author: "CommunityMember",
      content: "<p>Thanks for the warm welcome! Excited to be part of the Wynncraft community!</p>",
      createdAt: "2024-01-02",
      reactions: { LIKE: 12 },
    },
  ],
};

interface ThreadViewProps {
  threadId: string;
  categorySlug: string;
}

export function ThreadView({ threadId, categorySlug }: ThreadViewProps) {
  const thread = mockThread;

  return (
    <div>
      <Breadcrumbs
        crumbs={[
          { label: "Forums", href: "/forums" },
          { label: categorySlug, href: `/forums/${categorySlug}` },
          { label: thread.title },
        ]}
      />

      <h1 className="text-2xl font-heading font-bold text-text-primary mt-6 mb-8">
        {thread.title}
      </h1>

      <div className="space-y-4">
        {thread.posts.map((post) => (
          <div key={post.id} className="card overflow-hidden">
            <div className="flex">
              {/* Author sidebar */}
              <div className="w-32 flex-shrink-0 bg-bg-elevated p-4 flex flex-col items-center gap-2 border-r border-bg-card">
                <Avatar name={post.author} size={48} />
                <p className="text-text-primary text-xs font-medium text-center">{post.author}</p>
              </div>
              {/* Post content */}
              <div className="flex-1 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-text-muted text-xs">{formatRelativeTime(post.createdAt)}</span>
                </div>
                <div
                  className="text-text-secondary text-sm leading-relaxed prose-wynncraft"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                <div className="flex gap-3 mt-4 pt-3 border-t border-bg-elevated">
                  {Object.entries(post.reactions).map(([type, count]) => (
                    <button
                      key={type}
                      className="flex items-center gap-1.5 text-xs text-text-muted hover:text-accent-gold transition-colors"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{count}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 card p-4">
        <p className="text-text-muted text-sm mb-3 font-medium">Reply to thread</p>
        <textarea
          placeholder="Write your reply..."
          className="w-full bg-bg-elevated border border-bg-card rounded-lg p-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold text-sm resize-none h-24"
        />
        <div className="flex justify-end mt-3">
          <button className="btn-primary text-sm py-2 px-4">Post Reply</button>
        </div>
      </div>
    </div>
  );
}
