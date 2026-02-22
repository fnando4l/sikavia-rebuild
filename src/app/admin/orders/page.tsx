import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "Orders — Admin" };

const STATUS_BADGE: Record<string, "default" | "new" | "success" | "soldout"> = {
  PENDING:    "default",
  PROCESSING: "new",
  SHIPPED:    "new",
  DELIVERED:  "success",
  CANCELLED:  "soldout",
  REFUNDED:   "soldout",
};

const MOCK_ORDERS = [
  { id: "o1", orderNumber: "SKV-10042", customer: "Camille R.",  email: "camille@example.com", status: "DELIVERED",  total: 8900,  date: "2024-06-01", items: 1 },
  { id: "o2", orderNumber: "SKV-10041", customer: "Sofia M.",    email: "sofia@example.com",   status: "PROCESSING", total: 15400, date: "2024-05-20", items: 2 },
  { id: "o3", orderNumber: "SKV-10040", customer: "Nadia T.",    email: "nadia@example.com",   status: "SHIPPED",    total: 5500,  date: "2024-05-18", items: 1 },
  { id: "o4", orderNumber: "SKV-10039", customer: "Elena B.",    email: "elena@example.com",   status: "PENDING",    total: 6500,  date: "2024-05-15", items: 1 },
  { id: "o5", orderNumber: "SKV-10038", customer: "Maria C.",    email: "maria@example.com",   status: "CANCELLED",  total: 8900,  date: "2024-05-10", items: 1 },
];

export default function AdminOrdersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin" className="font-body text-sm text-muted hover:text-charcoal transition-colors">Admin</Link>
        <span className="text-muted">/</span>
        <h1 className="font-display text-3xl text-charcoal">Orders</h1>
      </div>

      <div className="border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-off-white border-b border-border">
            <tr>
              {["Order", "Customer", "Date", "Items", "Total", "Status"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-body text-xs font-semibold text-muted uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {MOCK_ORDERS.map((o) => (
              <tr key={o.id} className="hover:bg-off-white transition-colors">
                <td className="px-4 py-4 font-body text-sm font-medium text-charcoal">{o.orderNumber}</td>
                <td className="px-4 py-4">
                  <p className="font-body text-sm text-charcoal">{o.customer}</p>
                  <p className="font-body text-xs text-muted">{o.email}</p>
                </td>
                <td className="px-4 py-4 font-body text-sm text-muted">
                  {new Date(o.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </td>
                <td className="px-4 py-4 font-body text-sm text-muted">{o.items}</td>
                <td className="px-4 py-4 font-body text-sm text-charcoal">{formatPrice(o.total)}</td>
                <td className="px-4 py-4">
                  <Badge variant={STATUS_BADGE[o.status] ?? "default"}>{o.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
