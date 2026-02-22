"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SIZE_ORDER } from "@/types";

const PRICE_RANGES = [
  { label: "Under $50", min: 0, max: 5000 },
  { label: "$50 – $100", min: 5000, max: 10000 },
  { label: "$100 – $150", min: 10000, max: 15000 },
  { label: "$150+", min: 15000, max: 99999 },
];

export function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const update = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const toggleSize = useCallback(
    (size: string) => {
      const current = searchParams.get("sizes")?.split(",").filter(Boolean) ?? [];
      const next = current.includes(size)
        ? current.filter((s) => s !== size)
        : [...current, size];
      update("sizes", next.length ? next.join(",") : null);
    },
    [searchParams, update]
  );

  const selectedSizes = searchParams.get("sizes")?.split(",").filter(Boolean) ?? [];
  const selectedPrice = searchParams.get("price") ?? null;
  const hasFilters = selectedSizes.length > 0 || selectedPrice;

  return (
    <aside className="space-y-8">
      {/* Clear all */}
      {hasFilters && (
        <button
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            params.delete("sizes");
            params.delete("price");
            params.delete("page");
            router.push(`${pathname}?${params.toString()}`);
          }}
          className="flex items-center gap-1.5 font-body text-xs text-muted hover:text-charcoal transition-colors"
        >
          <X className="h-3 w-3" /> Clear filters
        </button>
      )}

      {/* Sizes */}
      <div>
        <h3 className="font-body text-xs font-semibold tracking-widest text-charcoal uppercase mb-4">
          Size
        </h3>
        <div className="flex flex-wrap gap-2">
          {SIZE_ORDER.map((size) => {
            const active = selectedSizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={cn(
                  "px-3 py-1.5 font-body text-xs border transition-colors",
                  active
                    ? "border-charcoal bg-charcoal text-white"
                    : "border-border text-charcoal hover:border-charcoal"
                )}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-body text-xs font-semibold tracking-widest text-charcoal uppercase mb-4">
          Price
        </h3>
        <div className="space-y-2">
          {PRICE_RANGES.map((range) => {
            const val = `${range.min}-${range.max}`;
            const active = selectedPrice === val;
            return (
              <button
                key={val}
                onClick={() => update("price", active ? null : val)}
                className={cn(
                  "block font-body text-sm transition-colors",
                  active ? "text-charcoal font-medium" : "text-muted hover:text-charcoal"
                )}
              >
                {active && "✓ "}
                {range.label}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
