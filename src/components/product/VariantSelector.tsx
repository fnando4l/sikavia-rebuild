"use client";

import { cn } from "@/lib/utils";
import { stockLabel } from "@/lib/utils";
import type { VariantOption } from "@/types";
import { SIZE_ORDER } from "@/types";

interface VariantSelectorProps {
  variants: VariantOption[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function VariantSelector({ variants, selectedId, onSelect }: VariantSelectorProps) {
  const selected = variants.find((v) => v.id === selectedId);

  // Group by size in order
  const sizes = SIZE_ORDER.filter((s) => variants.some((v) => v.size === s));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-body text-sm font-medium text-charcoal">
          Size{selected ? `: ${selected.size}` : ""}
        </p>
        {selected && (
          <p className="font-body text-xs text-muted">{stockLabel(selected.inventory)}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const variant = variants.find((v) => v.size === size);
          if (!variant) return null;
          const outOfStock = variant.inventory === 0;
          const isSelected = variant.id === selectedId;

          return (
            <button
              key={variant.id}
              onClick={() => !outOfStock && onSelect(variant.id)}
              disabled={outOfStock}
              className={cn(
                "relative px-4 py-2 font-body text-sm border transition-colors",
                isSelected
                  ? "border-charcoal bg-charcoal text-white"
                  : outOfStock
                  ? "border-border text-border cursor-not-allowed"
                  : "border-border text-charcoal hover:border-charcoal"
              )}
            >
              {size}
              {outOfStock && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="block h-px w-full bg-border rotate-45 absolute" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
