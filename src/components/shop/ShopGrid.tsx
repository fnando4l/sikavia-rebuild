"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "@/components/shared/ProductCard";
import type { ProductCard as ProductCardType } from "@/types";

const ease = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.055, delayChildren: 0.05 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
};

export function ShopGrid({ products }: { products: ProductCardType[] }) {
  return (
    <AnimatePresence mode="wait">
      {products.length === 0 ? (
        <motion.div
          key="empty"
          className="py-32 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="font-display text-[clamp(2rem,5vw,4rem)] text-charcoal/15 mb-6">
            No results
          </p>
          <p className="font-body text-[11px] tracking-[0.25em] uppercase text-charcoal/35 mb-8">
            Try adjusting your filters
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-charcoal font-body text-[10px] tracking-[0.3em] uppercase text-white hover:bg-charcoal/80 transition-colors"
          >
            Clear all filters
          </Link>
        </motion.div>
      ) : (
        <motion.div
          key="grid"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {products.map((product, idx) => (
            <motion.div key={product.id} variants={cardVariant}>
              <ProductCard product={product} priority={idx < 4} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
