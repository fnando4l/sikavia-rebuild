"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [active, setActive] = useState(0);

  if (!images.length) {
    return <div className="aspect-[3/4] bg-blush w-full" />;
  }

  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="hidden sm:flex flex-col gap-2 w-16 flex-shrink-0">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-square overflow-hidden border-2 transition-colors",
                i === active ? "border-charcoal" : "border-transparent hover:border-border"
              )}
            >
              <Image
                src={src}
                alt={`${name} view ${i + 1}`}
                fill
                className="object-cover object-top"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="flex-1 relative aspect-[3/4] overflow-hidden bg-blush">
        <Image
          src={images[active]}
          alt={name}
          fill
          className="object-cover object-top"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Mobile dots */}
        {images.length > 1 && (
          <div className="sm:hidden absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === active ? "w-6 bg-charcoal" : "w-1.5 bg-charcoal/30"
                )}
                aria-label={`View image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
