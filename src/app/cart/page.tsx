"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export default function CartPage() {
  const items       = useCartStore((s) => s.items);
  const subtotal    = useCartStore((s) => s.subtotal());
  const removeItem  = useCartStore((s) => s.removeItem);
  const updateQty   = useCartStore((s) => s.updateQuantity);

  const shipping = subtotal >= 10000 ? 0 : 999;
  const tax      = Math.round(subtotal * 0.08);
  const total    = subtotal + shipping + tax;

  if (!items.length) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-5 text-center px-4">
        <div className="rounded-full bg-blush p-6">
          <ShoppingBag className="h-10 w-10 text-terracotta" />
        </div>
        <div>
          <h1 className="font-display text-3xl text-charcoal">Your bag is empty</h1>
          <p className="mt-2 font-body text-sm text-muted">
            Add some pieces you love and they&apos;ll appear here.
          </p>
        </div>
        <Button variant="primary">
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-3xl text-charcoal mb-8">
        Shopping Bag <span className="font-body text-base text-muted">({items.length})</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Item list */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.variantId} className="flex gap-5 border-b border-border pb-6">
              <Link href={`/product/${item.slug}`} className="relative h-32 w-24 flex-shrink-0 overflow-hidden bg-blush">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover object-top"
                  sizes="96px"
                />
              </Link>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between">
                  <div>
                    <Link href={`/product/${item.slug}`} className="font-body text-sm font-medium text-charcoal hover:text-terracotta transition-colors">
                      {item.name}
                    </Link>
                    <p className="mt-0.5 font-body text-xs text-muted">Size: {item.size}{item.color && ` · ${item.color}`}</p>
                  </div>
                  <button onClick={() => removeItem(item.variantId)} className="p-1 text-muted hover:text-charcoal transition-colors" aria-label="Remove">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-border">
                    <button onClick={() => updateQty(item.variantId, item.quantity - 1)} className="p-2 hover:bg-blush transition-colors" aria-label="Decrease">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center font-body text-sm">{item.quantity}</span>
                    <button onClick={() => updateQty(item.variantId, item.quantity + 1)} disabled={item.quantity >= item.maxInventory} className="p-2 hover:bg-blush transition-colors disabled:opacity-40" aria-label="Increase">
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <span className="font-body text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="border border-border p-6 h-fit space-y-4">
          <h2 className="font-display text-xl text-charcoal">Order Summary</h2>
          <div className="space-y-2 text-sm font-body">
            <div className="flex justify-between text-muted">
              <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Estimated Tax</span><span>{formatPrice(tax)}</span>
            </div>
          </div>
          <div className="border-t border-border pt-4 flex justify-between font-body font-semibold text-charcoal">
            <span>Total</span><span>{formatPrice(total)}</span>
          </div>
          <Button variant="primary" fullWidth size="lg">
            <Link href="/checkout" className="w-full text-center">Proceed to Checkout</Link>
          </Button>
          <Link href="/shop" className="block text-center font-body text-sm text-muted hover:text-charcoal transition-colors underline-offset-4 hover:underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
