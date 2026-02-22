"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const isOpen       = useCartStore((s) => s.isOpen);
  const items        = useCartStore((s) => s.items);
  const subtotal     = useCartStore((s) => s.subtotal());
  const closeCart    = useCartStore((s) => s.closeCart);
  const removeItem   = useCartStore((s) => s.removeItem);
  const updateQty    = useCartStore((s) => s.updateQuantity);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-charcoal/40 transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={closeCart}
        aria-hidden
      />

      {/* Drawer panel */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-cream shadow-xl",
          "transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-label="Shopping cart"
        role="dialog"
        aria-modal="true"
      >
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-display text-xl tracking-wide text-charcoal">
            Your Bag
            {items.length > 0 && (
              <span className="ml-2 font-body text-sm text-muted">({items.length})</span>
            )}
          </h2>
          <button
            onClick={closeCart}
            className="p-1.5 text-charcoal hover:opacity-70 transition-opacity"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ── Body ───────────────────────────────────────────────────── */}
        {items.length === 0 ? (
          <EmptyCart onClose={closeCart} />
        ) : (
          <>
            {/* Item list */}
            <ul className="flex-1 overflow-y-auto px-5 py-4 space-y-5 scrollbar-hide">
              {items.map((item) => (
                <li key={item.variantId} className="flex gap-4">
                  {/* Product image */}
                  <Link
                    href={`/product/${item.slug}`}
                    onClick={closeCart}
                    className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded bg-blush"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover object-top"
                      sizes="80px"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeCart}
                        className="font-body text-sm font-medium text-charcoal hover:text-terracotta transition-colors line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-0.5 text-xs text-muted">
                        Size: {item.size}
                        {item.color && ` · ${item.color}`}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Qty stepper */}
                      <div className="flex items-center gap-2 border border-border">
                        <button
                          onClick={() => updateQty(item.variantId, item.quantity - 1)}
                          className="p-1.5 text-charcoal hover:bg-blush transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center font-body text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.variantId, item.quantity + 1)}
                          disabled={item.quantity >= item.maxInventory}
                          className="p-1.5 text-charcoal hover:bg-blush transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Price + remove */}
                      <div className="flex items-center gap-3">
                        <span className="font-body text-sm font-medium text-charcoal">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="text-muted hover:text-charcoal transition-colors"
                          aria-label={`Remove ${item.name}`}
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* ── Footer ─────────────────────────────────────────────── */}
            <div className="border-t border-border px-5 py-5 space-y-4">
              {/* Subtotal */}
              <div className="flex justify-between text-sm">
                <span className="font-body text-muted">Subtotal</span>
                <span className="font-body font-medium text-charcoal">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-muted">Shipping and taxes calculated at checkout.</p>

              {/* CTAs */}
              <div className="flex flex-col gap-2">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={closeCart}
                  // href would be used with a Link wrapper, but Button is a button
                >
                  <Link href="/checkout" className="w-full text-center" onClick={closeCart}>
                    Checkout
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={closeCart}
                >
                  <Link href="/cart" className="w-full text-center" onClick={closeCart}>
                    View Cart
                  </Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
      <div className="rounded-full bg-blush p-5">
        <ShoppingBag className="h-8 w-8 text-terracotta" />
      </div>
      <div>
        <p className="font-display text-xl text-charcoal">Your bag is empty</p>
        <p className="mt-1 text-sm text-muted">Add some pieces you love.</p>
      </div>
      <Button variant="primary" onClick={onClose}>
        <Link href="/shop">Shop Now</Link>
      </Button>
    </div>
  );
}
