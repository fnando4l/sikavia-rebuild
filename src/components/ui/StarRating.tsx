"use client";

import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;       // 0–5
  count?: number;       // optional review count
  size?: "sm" | "md";
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

export function StarRating({
  rating,
  count,
  size = "md",
  interactive = false,
  onChange,
  className,
}: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  const iconSize = size === "sm" ? "text-xs" : "text-base";

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5">
        {stars.map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            disabled={!interactive}
            onClick={() => interactive && onChange?.(star)}
            className={cn(
              iconSize,
              "transition-colors duration-100",
              interactive && "cursor-pointer hover:scale-110",
              !interactive && "cursor-default",
              star <= Math.round(rating)
                ? "text-[#C2785A]"
                : "text-[#E8DDD6]"
            )}
            aria-label={interactive ? `Rate ${star} stars` : undefined}
          >
            ★
          </button>
        ))}
      </div>
      {count !== undefined && (
        <span className="text-xs text-[#7A6A62] font-body">
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
}
