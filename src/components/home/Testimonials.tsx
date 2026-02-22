"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const reviews = [
  {
    id: "1",
    name: "Camille R.",
    body: "The most flattering swimsuit I've ever owned. The fabric holds its shape all day and fits like it was made for me.",
    product: "La Palma One-Piece",
  },
  {
    id: "2",
    name: "Sofia M.",
    body: "Sikavia has completely changed how I shop for swimwear. Every piece feels genuinely high-end and the sizing is so inclusive.",
    product: "Cleo Bodysuit",
  },
  {
    id: "3",
    name: "Nadia T.",
    body: "Fast shipping, beautiful packaging, quality that exceeded every expectation. Already ordering my second piece.",
    product: "Riviera Top",
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const r = reviews[active];

  return (
    <section className="py-24 sm:py-32 bg-blush overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-8 sm:px-14 lg:px-20">

        {/* Label */}
        <p className="font-body text-[9px] tracking-[0.6em] uppercase text-charcoal/30 mb-12">
          What They Say
        </p>

        {/* Large quote */}
        <div className="max-w-4xl">
          {/* Decorative quote mark */}
          <p className="font-display text-[7rem] leading-[0.7] text-rose/60 mb-2 select-none">&ldquo;</p>

          <blockquote
            key={r.id}
            className="font-display italic text-[clamp(1.6rem,4vw,3.2rem)] text-charcoal leading-[1.15] tracking-tight"
            style={{ transition: "opacity 0.4s ease" }}
          >
            {r.body}
          </blockquote>

          <div className="mt-10 flex items-center gap-8">
            <div className="flex gap-0.5 mr-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-terracotta text-xs">★</span>
              ))}
            </div>
            <div>
              <p className="font-body text-[12px] font-medium text-charcoal tracking-wide">{r.name}</p>
              <p className="font-body text-[11px] text-charcoal/40 mt-0.5">{r.product}</p>
            </div>

            {/* Selector dots */}
            <div className="flex gap-3 ml-auto">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={cn(
                    "transition-all duration-300",
                    i === active
                      ? "w-6 h-1 bg-terracotta"
                      : "w-1 h-1 rounded-full bg-terracotta/25 hover:bg-terracotta/50"
                  )}
                  aria-label={`Review ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
