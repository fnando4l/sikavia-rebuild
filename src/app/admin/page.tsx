import type { Metadata } from "next";
import Link from "next/link";
import { Package, ShoppingBag, Layers, TrendingUp } from "lucide-react";

export const metadata: Metadata = { title: "Admin Dashboard" };

const stats = [
  { label: "Total Orders",    value: "142",    change: "+12%", icon: ShoppingBag },
  { label: "Products",        value: "38",     change: "+3",   icon: Package },
  { label: "Collections",     value: "6",      change: "—",    icon: Layers },
  { label: "Monthly Revenue", value: "$8,420", change: "+18%", icon: TrendingUp },
];

const quickLinks = [
  { href: "/admin/products",    label: "Manage Products" },
  { href: "/admin/orders",      label: "View Orders" },
  { href: "/admin/collections", label: "Collections" },
];

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-3xl text-charcoal mb-8">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(({ label, value, change, icon: Icon }) => (
          <div key={label} className="border border-border p-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="font-body text-xs text-muted uppercase tracking-wider">{label}</p>
              <Icon className="h-4 w-4 text-terracotta" />
            </div>
            <div>
              <p className="font-display text-2xl text-charcoal">{value}</p>
              <p className="font-body text-xs text-muted mt-0.5">{change} vs last month</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {quickLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="border border-border p-6 font-display text-lg text-charcoal hover:border-charcoal hover:text-terracotta transition-colors flex items-center justify-between"
          >
            {label}
            <span>→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
