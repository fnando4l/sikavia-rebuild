import type { Metadata } from "next";
import Link from "next/link";
import { Heart } from "lucide-react";
import { ProductGrid } from "@/components/shared/ProductGrid";
import type { ProductCard } from "@/types";

export const metadata: Metadata = { title: "Wishlist" };

// Mock wishlist — replaced by DB fetch once connected
const MOCK_WISHLIST: ProductCard[] = [
  {
    id: "3",
    name: "Cleo Bodysuit",
    slug: "cleo-bodysuit",
    images: ["https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80"],
    basePrice: 6500, lowestPrice: 6500, highestPrice: 6500,
    featured: true, hasDiscount: false,
    collections: [{ name: "Bodywear", slug: "bodywear" }],
  },
];

export default function WishlistPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/account" className="font-body text-sm text-muted hover:text-charcoal transition-colors">
          Account
        </Link>
        <span className="text-muted">/</span>
        <h1 className="font-display text-3xl text-charcoal">Wishlist</h1>
      </div>

      {MOCK_WISHLIST.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="h-12 w-12 text-muted mx-auto mb-4" />
          <p className="font-display text-xl text-charcoal">Your wishlist is empty</p>
          <p className="mt-2 font-body text-sm text-muted">Save pieces you love for later.</p>
          <Link href="/shop" className="mt-6 inline-block font-body text-sm text-charcoal underline underline-offset-4">
            Browse the collection
          </Link>
        </div>
      ) : (
        <ProductGrid products={MOCK_WISHLIST} />
      )}
    </div>
  );
}
