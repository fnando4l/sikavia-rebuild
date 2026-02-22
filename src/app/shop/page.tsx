import { Suspense }   from "react";
import type { Metadata } from "next";
import { ShopHeader }  from "@/components/shop/ShopHeader";
import { FilterBar }   from "@/components/shop/FilterBar";
import { ShopGrid }    from "@/components/shop/ShopGrid";
import type { ProductCard } from "@/types";

export const metadata: Metadata = { title: "Shop" };

const ALL_PRODUCTS: ProductCard[] = [
  {
    id: "1", name: "La Palma One-Piece", slug: "la-palma-one-piece",
    images: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=85",
    ],
    basePrice: 8900, lowestPrice: 8900, highestPrice: 8900,
    featured: true, hasDiscount: false,
    collections: [{ name: "Swim", slug: "swim" }],
  },
  {
    id: "2", name: "Soleil Bikini Set", slug: "soleil-bikini-set",
    images: ["https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=85"],
    basePrice: 12000, lowestPrice: 8400, highestPrice: 12000,
    featured: false, hasDiscount: true,
    collections: [{ name: "Swim", slug: "swim" }],
  },
  {
    id: "3", name: "Cleo Bodysuit", slug: "cleo-bodysuit",
    images: ["https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85"],
    basePrice: 6500, lowestPrice: 6500, highestPrice: 6500,
    featured: true, hasDiscount: false,
    collections: [{ name: "Bodywear", slug: "bodywear" }],
  },
  {
    id: "4", name: "Riviera Triangle Top", slug: "riviera-triangle-top",
    images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85"],
    basePrice: 5500, lowestPrice: 5500, highestPrice: 5500,
    featured: false, hasDiscount: false,
    collections: [{ name: "Swim", slug: "swim" }],
  },
  {
    id: "5", name: "Paloma High-Waist Bottom", slug: "paloma-high-waist-bottom",
    images: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=85"],
    basePrice: 4900, lowestPrice: 4900, highestPrice: 4900,
    featured: false, hasDiscount: false,
    collections: [{ name: "Swim", slug: "swim" }],
  },
  {
    id: "6", name: "Mirage Halter One-Piece", slug: "mirage-halter-one-piece",
    images: ["https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=85"],
    basePrice: 9500, lowestPrice: 6650, highestPrice: 9500,
    featured: false, hasDiscount: true,
    collections: [{ name: "Swim", slug: "swim" }],
  },
  {
    id: "7", name: "Côte d'Azur Wrap Set", slug: "cote-dazur-wrap-set",
    images: ["https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=85"],
    basePrice: 13500, lowestPrice: 13500, highestPrice: 13500,
    featured: false, hasDiscount: false,
    collections: [{ name: "New Arrivals", slug: "new-arrivals" }],
  },
  {
    id: "8", name: "Siren Plunge Bodysuit", slug: "siren-plunge-bodysuit",
    images: ["https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85"],
    basePrice: 7200, lowestPrice: 7200, highestPrice: 7200,
    featured: true, hasDiscount: false,
    collections: [{ name: "Bodywear", slug: "bodywear" }],
  },
  {
    id: "9", name: "Paradiso Bandeau Set", slug: "paradiso-bandeau-set",
    images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85"],
    basePrice: 10500, lowestPrice: 7350, highestPrice: 10500,
    featured: false, hasDiscount: true,
    collections: [{ name: "Swim", slug: "swim" }],
  },
  {
    id: "10", name: "Amalfi Wrap Skirt", slug: "amalfi-wrap-skirt",
    images: ["https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=85"],
    basePrice: 7800, lowestPrice: 7800, highestPrice: 7800,
    featured: false, hasDiscount: false,
    collections: [{ name: "New Arrivals", slug: "new-arrivals" }],
  },
  {
    id: "11", name: "Valencia Plunge One-Piece", slug: "valencia-plunge-one-piece",
    images: ["https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=85"],
    basePrice: 9200, lowestPrice: 9200, highestPrice: 9200,
    featured: true, hasDiscount: false,
    collections: [{ name: "Swim", slug: "swim" }],
  },
  {
    id: "12", name: "Monaco Rib Bodysuit", slug: "monaco-rib-bodysuit",
    images: ["https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85"],
    basePrice: 5900, lowestPrice: 4130, highestPrice: 5900,
    featured: false, hasDiscount: true,
    collections: [{ name: "Bodywear", slug: "bodywear" }],
  },
];

interface PageProps {
  searchParams: Promise<{ sort?: string; price?: string; color?: string }>;
}

export default async function ShopPage({ searchParams }: PageProps) {
  const p     = await searchParams;
  const sort  = p.sort ?? "newest";
  const price = p.price?.split("-").map(Number) ?? [];

  let products = [...ALL_PRODUCTS];

  if (price.length === 2) {
    products = products.filter(
      (prod) => prod.lowestPrice >= price[0] && prod.lowestPrice <= price[1]
    );
  }

  if (sort === "price-asc")  products.sort((a, b) => a.lowestPrice - b.lowestPrice);
  if (sort === "price-desc") products.sort((a, b) => b.lowestPrice - a.lowestPrice);
  if (sort === "popular")    products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  return (
    <>
      <Suspense>
        <ShopHeader title="All Products" count={products.length} />
      </Suspense>

      <Suspense>
        <FilterBar total={products.length} />
      </Suspense>

      <div className="px-6 sm:px-10 lg:px-14 py-10 sm:py-14 max-w-screen-2xl mx-auto">
        <ShopGrid products={products} />
      </div>
    </>
  );
}
