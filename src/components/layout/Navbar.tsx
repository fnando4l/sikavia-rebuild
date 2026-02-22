"use client";

import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, User, ShoppingBag, X, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";

const navLinks = [
  { label: "New In",    href: "/shop/new-arrivals" },
  { label: "Swim",      href: "/shop/swim" },
  { label: "Bodywear",  href: "/shop/bodywear" },
  { label: "Editorial", href: "/editorial" },
  { label: "Sale",      href: "/shop/sale" },
];

export function Navbar() {
  const pathname  = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);

  const totalItems = useCartStore((s) => s.totalItems());
  const toggleCart = useCartStore((s) => s.toggleCart);

  const isHome        = pathname === "/";
  const transparent   = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-500",
          transparent
            ? "bg-transparent border-b border-transparent"
            : "bg-cream border-b border-[#EDE5DC]"
        )}
      >
        <div className="relative flex h-12 items-center justify-between px-5 max-w-screen-2xl mx-auto">

          {/* Left — hamburger (mobile) / nav (desktop) */}
          <div className="flex items-center">
            <button
              className={cn("lg:hidden transition-colors", transparent ? "text-white" : "text-charcoal")}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-[18px] w-[18px]" />
            </button>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-body text-[11px] tracking-[0.18em] uppercase transition-colors duration-300",
                    transparent
                      ? "text-white/80 hover:text-white"
                      : pathname.startsWith(link.href)
                      ? "text-charcoal"
                      : "text-charcoal/60 hover:text-charcoal"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Center — wordmark */}
          <Link
            href="/"
            className={cn(
              "absolute left-1/2 -translate-x-1/2 font-body text-[13px] tracking-[0.4em] uppercase font-medium hover:opacity-70 transition-all duration-300",
              transparent ? "text-white" : "text-charcoal"
            )}
          >
            Sikavia
          </Link>

          {/* Right — icons */}
          <div className="flex items-center gap-0.5">
            <NavIcon href="/shop?q=" aria-label="Search" transparent={transparent}>
              <Search className="h-[18px] w-[18px]" />
            </NavIcon>
            <NavIcon href="/account/wishlist" aria-label="Wishlist" transparent={transparent}>
              <Heart className="h-[18px] w-[18px]" />
            </NavIcon>
            <NavIcon href="/account" aria-label="Account" transparent={transparent}>
              <User className="h-[18px] w-[18px]" />
            </NavIcon>

            <button
              onClick={toggleCart}
              className={cn(
                "relative p-2.5 hover:opacity-70 transition-all duration-300",
                transparent ? "text-white" : "text-charcoal"
              )}
              aria-label="Open cart"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {totalItems > 0 && (
                <span className={cn(
                  "absolute top-1.5 right-1.5 flex h-[14px] w-[14px] items-center justify-center rounded-full text-[9px] font-medium leading-none",
                  transparent ? "bg-white text-charcoal" : "bg-charcoal text-white"
                )}>
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMenuOpen(false)}
        aria-hidden
      />

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-[300px] bg-white flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] lg:hidden",
          menuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-[#F0EEEC]">
          <span className="font-body text-[13px] tracking-[0.4em] uppercase font-medium text-charcoal">Sikavia</span>
          <button onClick={() => setMenuOpen(false)} aria-label="Close">
            <X className="h-4 w-4 text-charcoal" />
          </button>
        </div>

        <nav className="flex flex-col px-6 pt-8 gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-4 font-display text-2xl text-charcoal border-b border-[#F0EEEC] hover:text-terracotta transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto px-6 py-8 flex flex-col gap-4">
          {[
            { href: "/account",          label: "My Account" },
            { href: "/account/wishlist", label: "Wishlist" },
            { href: "/account/orders",   label: "Orders" },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="font-body text-xs tracking-[0.2em] uppercase text-charcoal/50 hover:text-charcoal transition-colors">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

function NavIcon({
  href, children, transparent, ...props
}: {
  href: string; children: ReactNode; transparent?: boolean; "aria-label"?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "p-2.5 hover:opacity-70 transition-all duration-300",
        transparent ? "text-white" : "text-charcoal"
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
