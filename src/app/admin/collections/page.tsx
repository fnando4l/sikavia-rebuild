import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";

export const metadata: Metadata = { title: "Collections — Admin" };

const MOCK_COLLECTIONS = [
  { id: "c1", name: "Swim",         slug: "swim",         products: 4, featured: true  },
  { id: "c2", name: "Bodywear",     slug: "bodywear",     products: 2, featured: true  },
  { id: "c3", name: "New Arrivals", slug: "new-arrivals", products: 3, featured: false },
  { id: "c4", name: "Sale",         slug: "sale",         products: 2, featured: false },
];

export default function AdminCollectionsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="font-body text-sm text-muted hover:text-charcoal transition-colors">Admin</Link>
          <span className="text-muted">/</span>
          <h1 className="font-display text-3xl text-charcoal">Collections</h1>
        </div>
        <button className="flex items-center gap-2 bg-charcoal text-white px-4 py-2.5 font-body text-sm hover:bg-espresso transition-colors">
          <Plus className="h-4 w-4" /> Add Collection
        </button>
      </div>

      <div className="space-y-3">
        {MOCK_COLLECTIONS.map((col) => (
          <div key={col.id} className="flex items-center justify-between border border-border p-5 hover:border-charcoal transition-colors">
            <div>
              <p className="font-body text-sm font-medium text-charcoal">{col.name}</p>
              <p className="font-body text-xs text-muted mt-0.5">
                /shop/{col.slug} · {col.products} products
                {col.featured && " · Featured"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/shop/${col.slug}`} className="font-body text-xs text-muted hover:text-charcoal transition-colors">
                View →
              </Link>
              <button className="font-body text-xs text-terracotta hover:underline underline-offset-4">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
