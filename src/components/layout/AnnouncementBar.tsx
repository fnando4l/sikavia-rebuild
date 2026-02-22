"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const messages = [
  "Complimentary shipping on all orders",
  "New arrivals — the Summer Swim edit is here",
  "Buy 2 pieces, save 15% — code BODY15",
];

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  const [index, setIndex]         = useState(0);

  // Auto-rotate
  useEffect(() => {
    if (dismissed) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % messages.length), 4000);
    return () => clearInterval(id);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div className="relative bg-terracotta text-white flex items-center justify-center h-9 px-10">
      <p className="font-body text-[11px] tracking-[0.18em] uppercase text-center">
        {messages[index]}
      </p>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
        aria-label="Dismiss"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}
