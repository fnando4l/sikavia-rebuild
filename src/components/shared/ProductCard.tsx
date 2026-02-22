"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import type { ProductCard as ProductCardType } from "@/types";

const SWATCHES: Record<string, { hex: string; name: string }[]> = {
  "la-palma-one-piece": [
    { hex: "#C2785A", name: "Terracotta" },
    { hex: "#232323", name: "Onyx" },
    { hex: "#E8C5B4", name: "Rose" },
  ],
  "soleil-bikini-set": [
    { hex: "#3D1F0D", name: "Espresso" },
    { hex: "#C2785A", name: "Terracotta" },
  ],
  "cleo-bodysuit": [
    { hex: "#232323", name: "Onyx" },
    { hex: "#FDF6F0", name: "Cream" },
    { hex: "#C2785A", name: "Terracotta" },
    { hex: "#E8C5B4", name: "Rose" },
  ],
  "riviera-triangle-top": [
    { hex: "#C2785A", name: "Terracotta" },
    { hex: "#232323", name: "Onyx" },
  ],
};

interface ProductCardProps {
  product: ProductCardType;
  className?: string;
  priority?: boolean;
}

export function ProductCard({ product, className, priority = false }: ProductCardProps) {
  const [hovered, setHovered]     = useState(false);
  const [activeColor, setActiveColor] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const img1 = product.images[0];
  const img2 = product.images[1];
  const swatches = SWATCHES[product.slug] ?? [];
  const collectionLabel = product.collections[0]?.name ?? "";

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 12;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  const onMouseLeave = () => {
    setHovered(false);
    setActiveColor(null);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={cn("group", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      style={{
        transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: hovered
          ? "transform 0.1s ease-out"
          : "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Image */}
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[3/4] overflow-hidden bg-[#F5EBE4]"
        tabIndex={-1}
      >
        {img1 && (
          <Image
            src={img1}
            alt={product.name}
            fill
            priority={priority}
            className={cn(
              "object-cover object-top transition-all duration-700",
              hovered && img2 ? "opacity-0 scale-[1.04]" : "opacity-100 scale-100"
            )}
            sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        )}
        {img2 && (
          <Image
            src={img2}
            alt={product.name}
            fill
            className={cn(
              "object-cover object-top transition-all duration-700",
              hovered ? "opacity-100 scale-100" : "opacity-0 scale-[1.04]"
            )}
            sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        )}

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.hasDiscount && (
            <span className="bg-terracotta px-1.5 py-0.5 font-body text-[9px] tracking-[0.15em] uppercase text-white">
              Sale
            </span>
          )}
          {product.featured && !product.hasDiscount && (
            <span className="bg-charcoal px-1.5 py-0.5 font-body text-[9px] tracking-[0.15em] uppercase text-white">
              Best Seller
            </span>
          )}
        </div>

        {/* Quick Shop */}
        <div
          className={cn(
            "absolute bottom-0 inset-x-0 bg-charcoal/95 flex items-center justify-center h-10 transition-transform duration-300 ease-out",
            hovered ? "translate-y-0" : "translate-y-full"
          )}
        >
          <span className="font-body text-[9px] tracking-[0.3em] uppercase text-white">
            Quick Shop
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="mt-3 space-y-1.5">
        {collectionLabel && (
          <p className="font-body text-[9px] tracking-[0.25em] uppercase text-charcoal/40">
            {collectionLabel}
          </p>
        )}

        <div className="flex items-start justify-between gap-2">
          <Link href={`/product/${product.slug}`} className="flex-1 min-w-0">
            <p className="font-body text-[13px] text-charcoal leading-snug truncate hover:opacity-60 transition-opacity">
              {product.name}
            </p>
          </Link>
          <div className="flex-shrink-0 text-right">
            <p className={cn("font-body text-[13px]", product.hasDiscount ? "text-terracotta" : "text-charcoal")}>
              {formatPrice(product.lowestPrice)}
            </p>
            {product.hasDiscount && product.basePrice > product.lowestPrice && (
              <p className="font-body text-[11px] text-charcoal/30 line-through leading-none">
                {formatPrice(product.basePrice)}
              </p>
            )}
          </div>
        </div>

        {/* Swatches */}
        {swatches.length > 0 && (
          <div className="flex items-center gap-1.5 pt-0.5">
            {swatches.map((s, i) => (
              <button
                key={s.name}
                onClick={() => setActiveColor(i === activeColor ? null : i)}
                title={s.name}
                className={cn(
                  "h-3.5 w-3.5 rounded-full border transition-all duration-200",
                  i === activeColor
                    ? "border-charcoal scale-125"
                    : "border-transparent hover:border-charcoal/30"
                )}
                style={{ backgroundColor: s.hex }}
                aria-label={s.name}
              />
            ))}
            <span className="font-body text-[9px] text-charcoal/30 ml-0.5">
              {swatches.length} colors
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
