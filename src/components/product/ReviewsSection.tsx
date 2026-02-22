"use client";

import { useState } from "react";
import { StarRating } from "@/components/ui/StarRating";
import type { ReviewSummary } from "@/types";

interface ReviewsSectionProps {
  reviews: ReviewSummary;
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? reviews.items : reviews.items.slice(0, 3);

  return (
    <div className="py-12 border-t border-border">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="font-display text-2xl text-charcoal">
            Customer Reviews
          </h2>
          {reviews.count > 0 && (
            <div className="mt-2 flex items-center gap-3">
              <StarRating rating={reviews.average} />
              <span className="font-body text-sm text-muted">
                {reviews.average.toFixed(1)} · {reviews.count} review{reviews.count !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>
      </div>

      {reviews.items.length === 0 ? (
        <p className="font-body text-sm text-muted">
          No reviews yet. Be the first to review this product.
        </p>
      ) : (
        <div className="space-y-8">
          {visible.map((r) => (
            <div key={r.id} className="border-b border-border pb-8 last:border-0">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-body text-sm font-semibold text-charcoal">{r.name}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <StarRating rating={r.rating} size="sm" />
                    {r.verified && (
                      <span className="font-body text-xs text-terracotta">✓ Verified</span>
                    )}
                  </div>
                </div>
                <p className="font-body text-xs text-muted">
                  {new Date(r.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              {r.title && (
                <p className="mt-3 font-body text-sm font-medium text-charcoal">{r.title}</p>
              )}
              <p className="mt-2 font-body text-sm text-muted leading-relaxed">{r.body}</p>
            </div>
          ))}

          {reviews.items.length > 3 && (
            <button
              onClick={() => setExpanded((e) => !e)}
              className="font-body text-sm text-charcoal underline underline-offset-4 hover:text-terracotta transition-colors"
            >
              {expanded ? "Show less" : `Show all ${reviews.items.length} reviews`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
