"use client";

import { useState, use } from "react";
import { notFound }       from "next/navigation";
import Image              from "next/image";
import Link               from "next/link";
import { motion }         from "framer-motion";
import { formatPrice }    from "@/lib/utils";
import { cn }             from "@/lib/utils";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { ReviewsSection }  from "@/components/product/ReviewsSection";
import { VariantSelector } from "@/components/product/VariantSelector";
import type { ProductWithVariants } from "@/types";

const MOCK_PRODUCTS: Record<string, ProductWithVariants> = {
  "la-palma-one-piece": {
    id: "1",
    name: "La Palma One-Piece",
    slug: "la-palma-one-piece",
    description:
      "The La Palma is our signature one-piece — crafted from chlorine-resistant fabric with a flattering wrap-front design. Adjustable ties at the back let you customize the fit, while the built-in UPF 50+ protection keeps you covered.",
    features: [
      "Chlorine-resistant, quick-dry fabric",
      "Adjustable wrap-front ties",
      "Built-in UPF 50+ protection",
      "Removable soft cups",
      "Moderate coverage bottom",
    ],
    images: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=85",
    ],
    basePrice: 8900,
    status: "ACTIVE",
    featured: true,
    variants: [
      { id: "v1", sku: "LP-XS", size: "XS", price: 8900, inventory: 3,  images: [] },
      { id: "v2", sku: "LP-S",  size: "S",  price: 8900, inventory: 8,  images: [] },
      { id: "v3", sku: "LP-M",  size: "M",  price: 8900, inventory: 0,  images: [] },
      { id: "v4", sku: "LP-L",  size: "L",  price: 8900, inventory: 5,  images: [] },
      { id: "v5", sku: "LP-XL", size: "XL", price: 8900, inventory: 2,  images: [] },
    ],
    collections: [{ id: "c1", name: "Swim", slug: "swim" }],
    reviews: {
      average: 4.8, count: 24,
      items: [
        { id: "r1", name: "Camille R.", rating: 5, title: "Absolutely perfect", body: "This is the most flattering swimsuit I have ever owned. The fabric is luxurious.", verified: true, createdAt: "2024-06-12T10:00:00Z" },
        { id: "r2", name: "Sofia M.",   rating: 5, body: "Sizing is true to size. I ordered my usual medium and it fits beautifully.", verified: true,  createdAt: "2024-05-28T10:00:00Z" },
        { id: "r3", name: "Nadia T.",   rating: 4, body: "Love the style and quality. Only giving 4 stars because the ties could be a bit longer.", verified: false, createdAt: "2024-05-10T10:00:00Z" },
      ],
    },
  },
  "soleil-bikini-set": {
    id: "2", name: "Soleil Bikini Set", slug: "soleil-bikini-set",
    description: "Sun-drenched and effortlessly chic, the Soleil set pairs a bandeau top with high-waist bottoms. Made from our signature recycled nylon blend.",
    features: ["Recycled nylon blend", "Bandeau top with boning", "High-waist bottoms", "3 colorways"],
    images: ["https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=85"],
    basePrice: 12000, status: "ACTIVE", featured: false,
    variants: [
      { id: "v6", sku: "SB-XS", size: "XS", price: 8400, compareAt: 12000, inventory: 6, images: [] },
      { id: "v7", sku: "SB-S",  size: "S",  price: 8400, compareAt: 12000, inventory: 4, images: [] },
      { id: "v8", sku: "SB-M",  size: "M",  price: 8400, compareAt: 12000, inventory: 0, images: [] },
      { id: "v9", sku: "SB-L",  size: "L",  price: 8400, compareAt: 12000, inventory: 3, images: [] },
    ],
    collections: [{ id: "c1", name: "Swim", slug: "swim" }],
    reviews: { average: 4.5, count: 12, items: [] },
  },
  "cleo-bodysuit": {
    id: "3", name: "Cleo Bodysuit", slug: "cleo-bodysuit",
    description: "Sleek, seamless, and endlessly versatile. The Cleo bodysuit pairs with everything from high-waist jeans to tailored trousers.",
    features: ["Seamless rib-knit", "Snap closure", "Scoop neck", "Machine washable"],
    images: ["https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85"],
    basePrice: 6500, status: "ACTIVE", featured: true,
    variants: [
      { id: "v10", sku: "CB-XS", size: "XS", price: 6500, inventory: 10, images: [] },
      { id: "v11", sku: "CB-S",  size: "S",  price: 6500, inventory: 8,  images: [] },
      { id: "v12", sku: "CB-M",  size: "M",  price: 6500, inventory: 6,  images: [] },
      { id: "v13", sku: "CB-L",  size: "L",  price: 6500, inventory: 4,  images: [] },
      { id: "v14", sku: "CB-XL", size: "XL", price: 6500, inventory: 2,  images: [] },
    ],
    collections: [{ id: "c2", name: "Bodywear", slug: "bodywear" }],
    reviews: { average: 4.9, count: 31, items: [] },
  },
};

const ease = [0.16, 1, 0.3, 1] as const;

function ProductPageContent({ slug }: { slug: string }) {
  const product = MOCK_PRODUCTS[slug];
  if (!product) notFound();

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [activeImg, setActiveImg] = useState(0);
  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId) ?? null;
  const displayPrice = selectedVariant?.price ?? product.basePrice;
  const compareAt    = selectedVariant?.compareAt ?? null;

  return (
    <div className="bg-cream">
      {/* Breadcrumb */}
      <div className="px-8 sm:px-14 lg:px-20 pt-8">
        <p className="font-body text-[9px] tracking-[0.4em] uppercase text-charcoal/35">
          <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
          {" / "}
          {product.collections[0] && (
            <>
              <Link href={`/shop/${product.collections[0].slug}`} className="hover:text-charcoal transition-colors">
                {product.collections[0].name}
              </Link>
              {" / "}
            </>
          )}
          {product.name}
        </p>
      </div>

      {/* Main: split screen */}
      <div className="flex flex-col lg:flex-row min-h-screen">

        {/* LEFT — sticky gallery (60%) */}
        <div className="lg:w-[58%] lg:sticky lg:top-12 lg:self-start">

          {/* Main image */}
          <motion.div
            className="relative aspect-[4/5] overflow-hidden bg-[#F0EBE5]"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease }}
          >
            <Image
              src={product.images[activeImg] ?? product.images[0]}
              alt={product.name}
              fill
              priority
              className="object-cover object-top transition-opacity duration-500"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />

            {/* Image counter */}
            {product.images.length > 1 && (
              <div className="absolute bottom-5 right-5 font-body text-[10px] tracking-[0.2em] text-white/60 bg-black/30 px-2.5 py-1 backdrop-blur-sm">
                {activeImg + 1} / {product.images.length}
              </div>
            )}
          </motion.div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 p-4 overflow-x-auto scrollbar-hide">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    "relative flex-shrink-0 w-20 aspect-square overflow-hidden transition-all duration-300",
                    i === activeImg ? "ring-1 ring-charcoal ring-offset-1" : "opacity-50 hover:opacity-100"
                  )}
                >
                  <Image src={img} alt={`View ${i + 1}`} fill className="object-cover object-top" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT — product info (40%) */}
        <motion.div
          className="lg:w-[42%] px-8 sm:px-12 lg:px-16 py-10 lg:py-16 space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9, ease }}
        >
          {/* Collection */}
          <p className="font-body text-[9px] tracking-[0.5em] uppercase text-charcoal/35">
            {product.collections[0]?.name}
          </p>

          {/* Name */}
          <h1 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] text-charcoal leading-[1] tracking-[-0.01em]">
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-baseline gap-4">
            <span className={cn("font-body text-xl", compareAt ? "text-terracotta" : "text-charcoal")}>
              {formatPrice(displayPrice)}
            </span>
            {compareAt && compareAt > displayPrice && (
              <span className="font-body text-base text-charcoal/30 line-through">
                {formatPrice(compareAt)}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3 pb-1">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < Math.round(product.reviews.average) ? "text-terracotta" : "text-charcoal/15"}>
                  ★
                </span>
              ))}
            </div>
            <span className="font-body text-[11px] text-charcoal/40">
              {product.reviews.average} ({product.reviews.count} reviews)
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-charcoal/8" />

          {/* Variants */}
          <VariantSelector
            variants={product.variants}
            selectedId={selectedVariantId}
            onSelect={setSelectedVariantId}
          />

          {/* Size guide link */}
          <Link
            href="/size-guide"
            className="inline-flex items-center gap-2 font-body text-[10px] tracking-[0.25em] uppercase text-charcoal/40 hover:text-terracotta border-b border-charcoal/15 hover:border-terracotta/40 pb-0.5 transition-all duration-300"
          >
            <span>◈</span> Size Guide &amp; Fit Notes
          </Link>

          {/* Add to cart */}
          <AddToCartButton
            productId={product.id}
            productName={product.name}
            slug={product.slug}
            image={product.images[0]}
            variant={selectedVariant}
          />

          {/* Divider */}
          <div className="h-px bg-charcoal/8" />

          {/* Description */}
          <p className="font-body text-[13px] text-charcoal/55 leading-[1.8]">
            {product.description}
          </p>

          {/* Features */}
          {product.features.length > 0 && (
            <div>
              <p className="font-body text-[9px] tracking-[0.4em] uppercase text-charcoal/35 mb-4">
                Product Details
              </p>
              <ul className="space-y-2.5">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 font-body text-[12px] text-charcoal/55">
                    <span className="text-terracotta mt-0.5 flex-shrink-0">—</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Material & Care */}
          <div className="bg-blush p-6 space-y-5">
            <p className="font-body text-[9px] tracking-[0.4em] uppercase text-charcoal/35">
              Material &amp; Care
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="font-body text-[9px] tracking-[0.25em] uppercase text-terracotta flex-shrink-0 pt-0.5">Fabric</span>
                <span className="font-body text-[12px] text-charcoal/55">78% ECONYL® Regenerated Nylon, 22% Elastane. Made from 100% recycled ocean waste.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-body text-[9px] tracking-[0.25em] uppercase text-terracotta flex-shrink-0 pt-0.5">Care</span>
                <span className="font-body text-[12px] text-charcoal/55">Hand wash cold. Rinse after sea or pool use. Lay flat to dry. Do not tumble dry or wring.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-body text-[9px] tracking-[0.25em] uppercase text-terracotta flex-shrink-0 pt-0.5">UPF</span>
                <span className="font-body text-[12px] text-charcoal/55">UPF 50+ — blocks 98% of UVA and UVB rays.</span>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-4 py-4 border-y border-charcoal/8">
            {[
              { icon: "↩", label: "30-Day Returns", href: "/shipping" },
              { icon: "⊕", label: "Free Shipping",  href: "/shipping" },
              { icon: "✦", label: "Premium Quality", href: "/sustainability" },
            ].map(({ icon, label, href }) => (
              <Link key={label} href={href} className="flex flex-col items-center gap-2 text-center hover:opacity-70 transition-opacity">
                <span className="text-charcoal/30 text-base">{icon}</span>
                <span className="font-body text-[9px] tracking-[0.2em] uppercase text-charcoal/40">{label}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Reviews */}
      <div className="border-t border-charcoal/8">
        <ReviewsSection reviews={product.reviews} />
      </div>

      {/* Complete the Look */}
      <div className="border-t border-charcoal/8 bg-cream py-20 sm:py-28">
        <div className="max-w-screen-2xl mx-auto px-8 sm:px-14 lg:px-20">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="font-body text-[9px] tracking-[0.5em] uppercase text-charcoal/30 mb-3">Pair It With</p>
              <h2 className="font-display italic text-[clamp(2rem,5vw,3.5rem)] text-charcoal leading-none">Complete the Look</h2>
            </div>
            <Link href="/shop" className="font-body text-[10px] tracking-[0.3em] uppercase text-charcoal/40 hover:text-charcoal border-b border-charcoal/15 pb-0.5 transition-all duration-300">
              Shop All →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
            {[
              { name: "Paloma High-Waist Bottom", slug: "paloma-high-waist-bottom", price: "$49", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80" },
              { name: "Riviera Triangle Top",     slug: "riviera-triangle-top",     price: "$55", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80" },
              { name: "Cleo Bodysuit",            slug: "cleo-bodysuit",            price: "$65", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80" },
              { name: "Soleil Bikini Set",        slug: "soleil-bikini-set",        price: "From $84", img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80" },
            ].map((p) => (
              <Link key={p.slug} href={`/product/${p.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#F5EBE4] mb-3">
                  <Image src={p.img} alt={p.name} fill className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" sizes="(max-width: 640px) 50vw, 25vw" />
                </div>
                <p className="font-body text-[12px] text-charcoal group-hover:opacity-60 transition-opacity leading-snug">{p.name}</p>
                <p className="font-body text-[12px] text-charcoal/50 mt-0.5">{p.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  return <ProductPageContent slug={slug} />;
}
