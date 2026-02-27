"use client";

import React, { useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Eye, EyeOff, Save, User, Lock, Bell } from "lucide-react";

export default function SettingsPage() {
  const [displayName, setDisplayName] = useState("CoolPlayer123");
  const [email, setEmail] = useState("player@example.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [notifications, setNotifications] = useState({
    news: true,
    purchases: true,
    events: false,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <PageWrapper>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="section-title mb-8">Account Settings</h1>

        <form onSubmit={handleSave} className="space-y-6">
          {saved && (
            <div className="bg-accent-green/10 border border-accent-green/30 text-accent-green text-sm px-4 py-3 rounded-lg">
              ✓ Settings saved successfully
            </div>
          )}

          {/* Profile Section */}
          <div className="card p-6">
            <h2 className="font-heading font-bold text-lg text-text-primary mb-5 flex items-center gap-2">
              <User className="w-5 h-5 text-accent-gold" />
              Profile Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-text-secondary text-sm mb-1.5">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-bg-elevated border border-bg-card rounded-lg px-3 py-2.5 text-text-primary focus:outline-none focus:border-accent-gold text-sm"
                />
              </div>
              <div>
                <label className="block text-text-secondary text-sm mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-bg-elevated border border-bg-card rounded-lg px-3 py-2.5 text-text-primary focus:outline-none focus:border-accent-gold text-sm"
                />
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="card p-6">
            <h2 className="font-heading font-bold text-lg text-text-primary mb-5 flex items-center gap-2">
              <Lock className="w-5 h-5 text-accent-gold" />
              Change Password
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-text-secondary text-sm mb-1.5">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPw ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-bg-elevated border border-bg-card rounded-lg px-3 py-2.5 pr-10 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPw(!showCurrentPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
                  >
                    {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-text-secondary text-sm mb-1.5">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPw ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-bg-elevated border border-bg-card rounded-lg px-3 py-2.5 pr-10 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPw(!showNewPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
                  >
                    {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-text-muted text-xs mt-1">Minimum 8 characters</p>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="card p-6">
            <h2 className="font-heading font-bold text-lg text-text-primary mb-5 flex items-center gap-2">
              <Bell className="w-5 h-5 text-accent-gold" />
              Email Notifications
            </h2>
            <div className="space-y-3">
              {(Object.keys(notifications) as (keyof typeof notifications)[]).map((key) => (
                <label key={key} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications[key]}
                    onChange={(e) =>
                      setNotifications((prev) => ({ ...prev, [key]: e.target.checked }))
                    }
                    className="w-4 h-4 accent-accent-gold"
                  />
                  <span className="text-text-secondary text-sm capitalize">
                    {key === "news" && "News & updates"}
                    {key === "purchases" && "Purchase confirmations"}
                    {key === "events" && "In-game events & promotions"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-primary w-full py-3 flex items-center justify-center gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </form>
      </div>
    </PageWrapper>
  );
}
