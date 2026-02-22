"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ProductCard } from "@/components/shared/ProductCard";
import type { ProductCard as ProductCardType } from "@/types";

const PRODUCTS: ProductCardType[] = [
  {
    id: "1",
    name: "La Palma One-Piece",
    slug: "la-palma-one-piece",
    images: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=85",
    ],
    basePrice: 8900, lowestPrice: 8900, highestPrice: 8900,
    featured: true, hasDiscount: false,
    collections: [{ name: "Swim", slug: "swim" }],
  },
  {
    id: "2",
    name: "Soleil Bikini Set",
    slug: "soleil-bikini-set",
    images: ["https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=85"],
    basePrice: 12000, lowestPrice: 8400, highestPrice: 12000,
    featured: false, hasDiscount: true,
    collections: [{ name: "Swim", slug: "swim" }],
  },
  {
    id: "3",
    name: "Cleo Bodysuit",
    slug: "cleo-bodysuit",
    images: ["https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85"],
    basePrice: 6500, lowestPrice: 6500, highestPrice: 6500,
    featured: true, hasDiscount: false,
    collections: [{ name: "Bodywear", slug: "bodywear" }],
  },
  {
    id: "4",
    name: "Riviera Triangle Top",
    slug: "riviera-triangle-top",
    images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85"],
    basePrice: 5500, lowestPrice: 5500, highestPrice: 5500,
    featured: false, hasDiscount: false,
    collections: [{ name: "Swim", slug: "swim" }],
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function FeaturedProducts() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-blush">
      <div className="px-6 sm:px-10 lg:px-20 max-w-screen-2xl mx-auto">

        {/* Header row */}
        <div className="flex items-end justify-between mb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease }}
          >
            <p className="font-body text-[9px] tracking-[0.6em] uppercase text-charcoal/30 mb-3">
              Curated for you
            </p>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-charcoal leading-none italic">
              New In
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Link
              href="/shop"
              className="font-body text-[10px] tracking-[0.3em] uppercase text-charcoal/40 hover:text-charcoal border-b border-charcoal/15 hover:border-charcoal/40 pb-0.5 transition-all duration-300"
            >
              Shop All →
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.9, ease }}
            >
              <ProductCard product={p} priority={i < 2} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
