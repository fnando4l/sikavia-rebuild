"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const clearCart = useCartStore((s) => s.clearCart);

  const shipping = subtotal >= 10000 ? 0 : 999; // free over $100
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
  });

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    if (!items.length) {
      toast.error("Your bag is empty");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, shippingAddress: form }),
      });

      if (!res.ok) throw new Error("Checkout failed");

      const { url } = await res.json();
      if (url) {
        clearCart();
        router.push(url);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleCheckout} className="space-y-8">
      {/* Contact */}
      <section>
        <h2 className="font-display text-xl text-charcoal mb-5">Contact</h2>
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          required
        />
      </section>

      {/* Shipping */}
      <section>
        <h2 className="font-display text-xl text-charcoal mb-5">Shipping Address</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              autoComplete="given-name"
              value={form.firstName}
              onChange={(e) => set("firstName", e.target.value)}
              required
            />
            <Input
              label="Last Name"
              autoComplete="family-name"
              value={form.lastName}
              onChange={(e) => set("lastName", e.target.value)}
              required
            />
          </div>
          <Input
            label="Address"
            autoComplete="address-line1"
            value={form.line1}
            onChange={(e) => set("line1", e.target.value)}
            required
          />
          <Input
            label="Apartment, suite, etc. (optional)"
            autoComplete="address-line2"
            value={form.line2}
            onChange={(e) => set("line2", e.target.value)}
          />
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <Input
                label="City"
                autoComplete="address-level2"
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                label="State"
                autoComplete="address-level1"
                value={form.state}
                onChange={(e) => set("state", e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                label="ZIP"
                autoComplete="postal-code"
                value={form.postalCode}
                onChange={(e) => set("postalCode", e.target.value)}
                required
              />
            </div>
          </div>
        </div>
      </section>

      {/* Order summary */}
      <section className="border border-border p-5 space-y-3">
        <h2 className="font-display text-xl text-charcoal">Order Summary</h2>
        {items.map((item) => (
          <div key={item.variantId} className="flex justify-between text-sm font-body">
            <span className="text-charcoal">
              {item.name} <span className="text-muted">× {item.quantity}</span>
            </span>
            <span>{formatPrice(item.price * item.quantity)}</span>
          </div>
        ))}
        <div className="border-t border-border pt-3 space-y-2 text-sm font-body">
          <div className="flex justify-between text-muted">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-muted">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
          </div>
          <div className="flex justify-between text-muted">
            <span>Tax (8%)</span>
            <span>{formatPrice(tax)}</span>
          </div>
          <div className="flex justify-between font-semibold text-charcoal pt-2 border-t border-border">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </section>

      <Button type="submit" variant="primary" fullWidth size="lg" loading={loading}>
        Continue to Payment
      </Button>

      <p className="text-center font-body text-xs text-muted">
        Payments processed securely via Stripe.
      </p>
    </form>
  );
}
