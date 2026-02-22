import type { Metadata } from "next";
import Link from "next/link";
import { Package } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "My Orders" };

const STATUS_BADGE: Record<string, "default" | "new" | "sale" | "soldout" | "success"> = {
  PENDING:    "default",
  PROCESSING: "new",
  SHIPPED:    "new",
  DELIVERED:  "success",
  CANCELLED:  "soldout",
  REFUNDED:   "soldout",
};

// Mock orders — replaced by DB fetch once connected
const MOCK_ORDERS = [
  {
    id: "ord_1",
    orderNumber: "SKV-10042",
    status: "DELIVERED",
    total: 8900,
    currency: "usd",
    createdAt: "2024-06-01T10:00:00Z",
    items: [{ id: "i1", name: "La Palma One-Piece", image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=200&q=80", size: "S", quantity: 1, price: 8900 }],
  },
  {
    id: "ord_2",
    orderNumber: "SKV-10041",
    status: "PROCESSING",
    total: 15400,
    currency: "usd",
    createdAt: "2024-05-20T10:00:00Z",
    items: [
      { id: "i2", name: "Cleo Bodysuit", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=200&q=80", size: "M", quantity: 1, price: 6500 },
      { id: "i3", name: "Soleil Bikini Set", image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=200&q=80", size: "S", quantity: 1, price: 8400 },
    ],
  },
];

export default function OrdersPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/account" className="font-body text-sm text-muted hover:text-charcoal transition-colors">
          Account
        </Link>
        <span className="text-muted">/</span>
        <h1 className="font-display text-3xl text-charcoal">Orders</h1>
      </div>

      {MOCK_ORDERS.length === 0 ? (
        <div className="text-center py-16">
          <Package className="h-12 w-12 text-muted mx-auto mb-4" />
          <p className="font-display text-xl text-charcoal">No orders yet</p>
          <p className="mt-2 font-body text-sm text-muted">Your orders will appear here.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {MOCK_ORDERS.map((order) => (
            <div key={order.id} className="border border-border p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-body text-xs text-muted uppercase tracking-wider">Order</p>
                  <p className="font-display text-xl text-charcoal">{order.orderNumber}</p>
                  <p className="font-body text-xs text-muted mt-0.5">
                    {new Date(order.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge variant={STATUS_BADGE[order.status] ?? "default"}>
                    {order.status}
                  </Badge>
                  <p className="font-body text-sm font-medium text-charcoal">{formatPrice(order.total)}</p>
                </div>
              </div>

              <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                {order.items.map((item) => (
                  <div key={item.id} className="flex-shrink-0 flex items-center gap-3 bg-blush p-3">
                    <div className="relative h-16 w-12 overflow-hidden">
                      <img src={item.image} alt={item.name} className="object-cover object-top h-full w-full" />
                    </div>
                    <div>
                      <p className="font-body text-xs font-medium text-charcoal">{item.name}</p>
                      <p className="font-body text-xs text-muted">Size: {item.size} · Qty: {item.quantity}</p>
                      <p className="font-body text-xs text-charcoal mt-0.5">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
