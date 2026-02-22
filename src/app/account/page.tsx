import type { Metadata } from "next";
import Link from "next/link";
import { Package, Heart, Settings, LogOut } from "lucide-react";

export const metadata: Metadata = { title: "My Account" };

const links = [
  { href: "/account/orders",   icon: Package,  label: "Orders",         desc: "View and track your orders" },
  { href: "/account/wishlist", icon: Heart,    label: "Wishlist",        desc: "Your saved pieces" },
  { href: "/account/settings", icon: Settings, label: "Account Settings", desc: "Name, email, password" },
];

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12">
      <h1 className="font-display text-3xl text-charcoal mb-8">My Account</h1>

      <div className="space-y-3">
        {links.map(({ href, icon: Icon, label, desc }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-5 border border-border p-5 hover:border-charcoal transition-colors group"
          >
            <div className="rounded-full bg-blush p-3 group-hover:bg-rose transition-colors">
              <Icon className="h-5 w-5 text-terracotta" />
            </div>
            <div>
              <p className="font-body text-sm font-medium text-charcoal">{label}</p>
              <p className="font-body text-xs text-muted">{desc}</p>
            </div>
            <span className="ml-auto text-muted group-hover:text-charcoal">→</span>
          </Link>
        ))}

        {/* Sign out */}
        <form action="/api/auth/signout" method="post">
          <button
            type="submit"
            className="w-full flex items-center gap-5 border border-border p-5 hover:border-charcoal transition-colors group text-left"
          >
            <div className="rounded-full bg-blush p-3 group-hover:bg-rose transition-colors">
              <LogOut className="h-5 w-5 text-terracotta" />
            </div>
            <div>
              <p className="font-body text-sm font-medium text-charcoal">Sign Out</p>
              <p className="font-body text-xs text-muted">Log out of your account</p>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}
