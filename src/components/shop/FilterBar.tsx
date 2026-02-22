"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SIZE_ORDER } from "@/types";

const PRICE_RANGES = [
  { label: "Under $50",    min: 0,     max: 5000  },
  { label: "$50 – $100",  min: 5000,  max: 10000 },
  { label: "$100 – $150", min: 10000, max: 15000 },
  { label: "$150+",       min: 15000, max: 99999 },
];

const COLORS = [
  { name: "Onyx",       hex: "#232323" },
  { name: "Cream",      hex: "#FDF6F0" },
  { name: "Terracotta", hex: "#C2785A" },
  { name: "Rose",       hex: "#E8C5B4" },
  { name: "Espresso",   hex: "#3D1F0D" },
];

const SORT_LABELS: Record<string, string> = {
  newest:       "Newest",
  "price-asc":  "Price: Low to High",
  "price-desc": "Price: High to Low",
  popular:      "Best Selling",
};

type Dropdown = "size" | "price" | "color" | "sort" | null;

const panelVariants = {
  hidden: { opacity: 0, y: -6, scale: 0.98 },
  show:   { opacity: 1, y: 0,  scale: 1 },
  exit:   { opacity: 0, y: -4, scale: 0.98 },
};

export function FilterBar({ total }: { total: number }) {
  const router   = useRouter();
  const pathname = usePathname();
  const params   = useSearchParams();
  const [open, setOpen] = useState<Dropdown>(null);

  const selectedSizes = params.get("sizes")?.split(",").filter(Boolean) ?? [];
  const selectedPrice = params.get("price") ?? null;
  const selectedColor = params.get("color") ?? null;
  const selectedSort  = params.get("sort")  ?? "newest";

  const activeCount = [
    selectedSizes.length > 0,
    !!selectedPrice,
    !!selectedColor,
  ].filter(Boolean).length;

  const update = useCallback(
    (key: string, value: string | null) => {
      const p = new URLSearchParams(params.toString());
      if (value === null) p.delete(key); else p.set(key, value);
      p.delete("page");
      router.push(`${pathname}?${p.toString()}`);
    },
    [router, pathname, params]
  );

  const toggleSize = useCallback(
    (size: string) => {
      const next = selectedSizes.includes(size)
        ? selectedSizes.filter((s: string) => s !== size)
        : [...selectedSizes, size];
      update("sizes", next.length ? next.join(",") : null);
    },
    [selectedSizes, update]
  );

  const clearAll = useCallback(() => {
    const p = new URLSearchParams(params.toString());
    ["sizes", "price", "color", "page"].forEach((k) => p.delete(k));
    router.push(`${pathname}?${p.toString()}`);
    setOpen(null);
  }, [router, pathname, params]);

  const toggle = (d: Dropdown) => setOpen((o) => (o === d ? null : d));

  return (
    <div className="relative border-b border-[#EBEBEB] bg-white">
      <div className="flex items-center justify-between px-6 sm:px-10 lg:px-14 max-w-screen-2xl mx-auto h-12 gap-2 overflow-x-auto scrollbar-hide">

        {/* Left: filter pills */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <FilterBtn
            label={activeCount > 0 ? `Filters (${activeCount})` : "Filters"}
            active={activeCount > 0}
            open={open === "size"}
            onClick={() => toggle("size")}
            icon={<SlidersHorizontal className="h-3 w-3" />}
          />
          <FilterBtn label="Size"  active={selectedSizes.length > 0} open={open === "size"}  onClick={() => toggle("size")} />
          <FilterBtn label="Price" active={!!selectedPrice}           open={open === "price"} onClick={() => toggle("price")} />
          <FilterBtn label="Color" active={!!selectedColor}           open={open === "color"} onClick={() => toggle("color")} />

          <AnimatePresence>
            {activeCount > 0 && (
              <motion.button
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.25 }}
                onClick={clearAll}
                className="flex items-center gap-1 px-3 py-1 font-body text-[9px] tracking-[0.2em] uppercase text-charcoal/35 hover:text-charcoal transition-colors ml-1"
              >
                <X className="h-2.5 w-2.5" /> Clear
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Right: count + sort */}
        <div className="flex items-center gap-5 flex-shrink-0">
          <span className="font-body text-[10px] text-charcoal/30 whitespace-nowrap hidden sm:block tracking-wide">
            {total} {total === 1 ? "piece" : "pieces"}
          </span>
          <FilterBtn
            label={SORT_LABELS[selectedSort] ?? "Sort"}
            open={open === "sort"}
            onClick={() => toggle("sort")}
          />
        </div>
      </div>

      {/* Dropdown panels */}
      <AnimatePresence>
        {open === "size" && (
          <motion.div
            key="size"
            variants={panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-6 sm:left-10 lg:left-14 z-20 bg-white border border-[#E8E8E8] shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-5 min-w-[260px]"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-body text-[9px] tracking-[0.4em] uppercase text-charcoal/30 mb-4">Size</p>
            <div className="flex flex-wrap gap-2">
              {SIZE_ORDER.map((size) => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={cn(
                    "px-4 py-2 font-body text-[11px] border transition-all duration-200",
                    selectedSizes.includes(size)
                      ? "border-charcoal bg-charcoal text-white"
                      : "border-[#E0E0E0] text-charcoal hover:border-charcoal"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {open === "price" && (
          <motion.div
            key="price"
            variants={panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-6 sm:left-10 lg:left-14 z-20 bg-white border border-[#E8E8E8] shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-5 min-w-[240px]"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-body text-[9px] tracking-[0.4em] uppercase text-charcoal/30 mb-4">Price Range</p>
            <div className="flex flex-col gap-1.5">
              {PRICE_RANGES.map((r) => {
                const val    = `${r.min}-${r.max}`;
                const active = selectedPrice === val;
                return (
                  <button
                    key={val}
                    onClick={() => { update("price", active ? null : val); setOpen(null); }}
                    className={cn(
                      "flex items-center justify-between px-4 py-2.5 font-body text-[12px] border transition-all duration-200 text-left",
                      active
                        ? "border-charcoal bg-charcoal text-white"
                        : "border-[#E0E0E0] text-charcoal hover:border-charcoal"
                    )}
                  >
                    {r.label}
                    {active && <span className="text-[10px]">✓</span>}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {open === "color" && (
          <motion.div
            key="color"
            variants={panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-6 sm:left-10 lg:left-14 z-20 bg-white border border-[#E8E8E8] shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-body text-[9px] tracking-[0.4em] uppercase text-charcoal/30 mb-4">Color</p>
            <div className="flex gap-4">
              {COLORS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => { update("color", selectedColor === c.name ? null : c.name); setOpen(null); }}
                  className="flex flex-col items-center gap-2"
                  title={c.name}
                >
                  <span
                    className={cn(
                      "h-7 w-7 rounded-full border-2 transition-all duration-200",
                      selectedColor === c.name
                        ? "border-charcoal scale-110 shadow-[0_0_0_2px_white,0_0_0_3px_#232323]"
                        : "border-transparent hover:scale-105"
                    )}
                    style={{
                      backgroundColor: c.hex,
                      boxShadow: c.hex === "#FDF6F0" ? "inset 0 0 0 1px #ddd" : undefined,
                    }}
                  />
                  <span className="font-body text-[9px] tracking-[0.1em] text-charcoal/40">{c.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {open === "sort" && (
          <motion.div
            key="sort"
            variants={panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full right-6 sm:right-10 lg:right-14 z-20 bg-white border border-[#E8E8E8] shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-2 min-w-[200px]"
            onClick={(e) => e.stopPropagation()}
          >
            {Object.entries(SORT_LABELS).map(([val, label]) => (
              <button
                key={val}
                onClick={() => { update("sort", val); setOpen(null); }}
                className={cn(
                  "w-full text-left px-4 py-3 font-body text-[11px] tracking-wide rounded-sm transition-colors",
                  selectedSort === val
                    ? "text-charcoal bg-[#F5F3F1] font-medium"
                    : "text-charcoal/45 hover:text-charcoal hover:bg-[#F9F8F7]"
                )}
              >
                {selectedSort === val && <span className="mr-2 text-terracotta">✓</span>}
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop to close */}
      {open && (
        <div className="fixed inset-0 z-[15]" onClick={() => setOpen(null)} />
      )}
    </div>
  );
}

function FilterBtn({
  label, active, open, onClick, icon,
}: {
  label: string; active?: boolean; open?: boolean; onClick: () => void; icon?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 font-body text-[9px] tracking-[0.2em] uppercase border transition-all duration-200 whitespace-nowrap",
        active || open
          ? "border-charcoal text-charcoal bg-charcoal/[0.03]"
          : "border-transparent text-charcoal/40 hover:text-charcoal hover:border-charcoal/20"
      )}
    >
      {icon}
      {label}
      <motion.span
        animate={{ rotate: open ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="inline-flex"
      >
        <ChevronDown className="h-2.5 w-2.5" />
      </motion.span>
    </button>
  );
}
