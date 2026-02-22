import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "Products — Admin" };

const MOCK_PRODUCTS = [
  { id: "1", name: "La Palma One-Piece",    slug: "la-palma-one-piece",    status: "ACTIVE",   basePrice: 8900,  variants: 5, stock: 18 },
  { id: "2", name: "Soleil Bikini Set",     slug: "soleil-bikini-set",     status: "ACTIVE",   basePrice: 8400,  variants: 4, stock: 13 },
  { id: "3", name: "Cleo Bodysuit",         slug: "cleo-bodysuit",         status: "ACTIVE",   basePrice: 6500,  variants: 5, stock: 30 },
  { id: "4", name: "Riviera Triangle Top",  slug: "riviera-triangle-top",  status: "ACTIVE",   basePrice: 5500,  variants: 4, stock: 0  },
  { id: "5", name: "Mirage Halter",         slug: "mirage-halter-one-piece",status: "DRAFT",   basePrice: 9500,  variants: 3, stock: 0  },
];

const STATUS_BADGE: Record<string, "default" | "success" | "soldout" | "new"> = {
  ACTIVE:   "success",
  DRAFT:    "default",
  ARCHIVED: "soldout",
};

export default function AdminProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="font-body text-sm text-muted hover:text-charcoal transition-colors">Admin</Link>
          <span className="text-muted">/</span>
          <h1 className="font-display text-3xl text-charcoal">Products</h1>
        </div>
        <button className="flex items-center gap-2 bg-charcoal text-white px-4 py-2.5 font-body text-sm hover:bg-espresso transition-colors">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      <div className="border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-off-white border-b border-border">
            <tr>
              {["Product", "Status", "Price", "Variants", "Stock", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-body text-xs font-semibold text-muted uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {MOCK_PRODUCTS.map((p) => (
              <tr key={p.id} className="hover:bg-off-white transition-colors">
                <td className="px-4 py-4">
                  <Link href={`/product/${p.slug}`} className="font-body text-sm font-medium text-charcoal hover:text-terracotta transition-colors">
                    {p.name}
                  </Link>
                </td>
                <td className="px-4 py-4">
                  <Badge variant={STATUS_BADGE[p.status] ?? "default"}>{p.status}</Badge>
                </td>
                <td className="px-4 py-4 font-body text-sm text-charcoal">{formatPrice(p.basePrice)}</td>
                <td className="px-4 py-4 font-body text-sm text-muted">{p.variants}</td>
                <td className="px-4 py-4">
                  <span className={`font-body text-sm ${p.stock === 0 ? "text-red-500" : "text-charcoal"}`}>
                    {p.stock === 0 ? "Out of stock" : p.stock}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <button className="font-body text-xs text-terracotta hover:underline underline-offset-4">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
