"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Package,
  FileText,
  LogOut,
  Shield,
  BarChart2,
} from "lucide-react";

const stats = [
  { label: "Total Users", value: "14,832", icon: Users, color: "#f5c542", change: "+128 this week" },
  { label: "Total Purchases", value: "3,291", icon: ShoppingBag, color: "#55ff55", change: "+47 today" },
  { label: "Revenue (Month)", value: "$18,420", icon: DollarSign, color: "#55ffff", change: "+12% vs last month" },
  { label: "Active Players", value: "2,104", icon: TrendingUp, color: "#ff55ff", change: "Currently online" },
];

const recentOrders = [
  { id: "ORD-2024-9841", user: "CoolPlayer123", item: "HERO Rank", amount: "$54.99", status: "Delivered", date: "2024-12-10" },
  { id: "ORD-2024-9840", user: "StarMage77", item: "Heroic Crate x2", amount: "$15.98", status: "Delivered", date: "2024-12-10" },
  { id: "ORD-2024-9839", user: "DragonKing", item: "Baby Dragon Pet", amount: "$12.99", status: "Pending", date: "2024-12-09" },
  { id: "ORD-2024-9838", user: "NightArcher", item: "Mega Bomb", amount: "$5.99", status: "Delivered", date: "2024-12-09" },
  { id: "ORD-2024-9837", user: "IceWizard22", item: "VIP+ Rank", amount: "$29.99", status: "Refunded", date: "2024-12-08" },
];

const recentUsers = [
  { username: "NewPlayer2024", email: "newplayer@example.com", rank: "None", joined: "2024-12-10", status: "Active" },
  { username: "CoolPlayer123", email: "cool@example.com", rank: "HERO", joined: "2024-06-15", status: "Active" },
  { username: "StarMage77", email: "star@example.com", rank: "VIP", joined: "2024-09-01", status: "Active" },
  { username: "BannedUser01", email: "banned@example.com", rank: "None", joined: "2024-11-20", status: "Banned" },
];

const statusColors: Record<string, string> = {
  Delivered: "text-accent-green",
  Pending: "text-accent-gold",
  Refunded: "text-accent-red",
  Active: "text-accent-green",
  Banned: "text-accent-red",
};

export default function AdminDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("admin-auth") !== "true") {
      router.replace("/admin");
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin-auth");
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Admin Navbar */}
      <nav className="bg-bg-secondary border-b border-bg-elevated px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-accent-gold" />
          <span className="font-heading font-bold text-accent-gold text-lg">WYNNCRAFT ADMIN</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-text-muted hover:text-text-secondary text-sm transition-colors">
            View Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-text-muted hover:text-accent-red transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="font-heading font-bold text-3xl text-text-primary mb-1">Dashboard</h1>
          <p className="text-text-muted text-sm">Welcome back, Administrator</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="card p-5">
              <div className="flex items-start justify-between mb-3">
                <p className="text-text-muted text-sm">{stat.label}</p>
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <p className="text-3xl font-bold text-text-primary mb-1">{stat.value}</p>
              <p className="text-xs" style={{ color: stat.color }}>{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Manage Users", icon: Users, href: "#users" },
            { label: "Manage Shop", icon: Package, href: "#shop" },
            { label: "Order Log", icon: FileText, href: "#orders" },
            { label: "Analytics", icon: BarChart2, href: "#analytics" },
          ].map((action) => (
            <a
              key={action.label}
              href={action.href}
              className="card p-4 flex flex-col items-center gap-2 hover:border-accent-gold/30 transition-all hover:-translate-y-0.5 text-center"
            >
              <action.icon className="w-5 h-5 text-accent-gold" />
              <span className="text-text-secondary text-sm font-medium">{action.label}</span>
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div id="orders" className="card overflow-hidden">
            <div className="px-5 py-4 border-b border-bg-elevated">
              <h2 className="font-heading font-bold text-lg text-text-primary">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-bg-elevated">
                    <th className="text-left px-4 py-3 text-text-muted text-xs font-semibold uppercase">User</th>
                    <th className="text-left px-4 py-3 text-text-muted text-xs font-semibold uppercase hidden sm:table-cell">Item</th>
                    <th className="text-right px-4 py-3 text-text-muted text-xs font-semibold uppercase">Amount</th>
                    <th className="text-right px-4 py-3 text-text-muted text-xs font-semibold uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-bg-elevated last:border-0 hover:bg-bg-elevated/30">
                      <td className="px-4 py-3">
                        <p className="text-text-primary text-sm font-medium">{order.user}</p>
                        <p className="text-text-muted text-xs">{order.date}</p>
                      </td>
                      <td className="px-4 py-3 text-text-secondary text-sm hidden sm:table-cell">{order.item}</td>
                      <td className="px-4 py-3 text-right text-text-primary text-sm font-semibold">{order.amount}</td>
                      <td className="px-4 py-3 text-right">
                        <span className={`text-xs font-semibold ${statusColors[order.status] || "text-text-muted"}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* User Management */}
          <div id="users" className="card overflow-hidden">
            <div className="px-5 py-4 border-b border-bg-elevated flex items-center justify-between">
              <h2 className="font-heading font-bold text-lg text-text-primary">User Management</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-bg-elevated">
                    <th className="text-left px-4 py-3 text-text-muted text-xs font-semibold uppercase">User</th>
                    <th className="text-left px-4 py-3 text-text-muted text-xs font-semibold uppercase hidden sm:table-cell">Rank</th>
                    <th className="text-right px-4 py-3 text-text-muted text-xs font-semibold uppercase">Status</th>
                    <th className="text-right px-4 py-3 text-text-muted text-xs font-semibold uppercase">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user.username} className="border-b border-bg-elevated last:border-0 hover:bg-bg-elevated/30">
                      <td className="px-4 py-3">
                        <p className="text-text-primary text-sm font-medium">{user.username}</p>
                        <p className="text-text-muted text-xs">{user.email}</p>
                      </td>
                      <td className="px-4 py-3 text-text-secondary text-sm hidden sm:table-cell">{user.rank}</td>
                      <td className="px-4 py-3 text-right">
                        <span className={`text-xs font-semibold ${statusColors[user.status] || "text-text-muted"}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-xs text-text-muted hover:text-accent-red transition-colors">
                          {user.status === "Banned" ? "Unban" : "Ban"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Shop Management */}
        <div id="shop" className="card p-6 mt-6">
          <h2 className="font-heading font-bold text-lg text-text-primary mb-4">Shop Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {["Ranks", "Crates", "Pets", "Bombs", "Cosmetics", "Gift Cards"].map((cat) => (
              <div key={cat} className="bg-bg-elevated rounded-lg p-3 text-center">
                <p className="text-text-primary text-sm font-medium mb-1">{cat}</p>
                <button className="text-xs text-accent-gold hover:underline">Manage</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
