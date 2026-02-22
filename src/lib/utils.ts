import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merges Tailwind classes without conflicts */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format price from cents to display string, e.g. 4999 → "$49.99" */
export function formatPrice(cents: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

/** Generate a slug from a string */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Generate an order number in the format SKV-XXXXX */
export function generateOrderNumber(): string {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `SKV-${num}`;
}

/** Truncate text to n chars */
export function truncate(text: string, n: number): string {
  return text.length > n ? text.slice(0, n) + "…" : text;
}

/** Get the lowest price from product variants */
export function getLowestPrice(
  variants: { price: number }[]
): number {
  if (!variants.length) return 0;
  return Math.min(...variants.map((v) => v.price));
}

/** Get star rating display */
export function getStarRating(rating: number): string {
  return "★".repeat(Math.round(rating)) + "☆".repeat(5 - Math.round(rating));
}

/** Check if a variant is in stock */
export function isInStock(inventory: number): boolean {
  return inventory > 0;
}

/** Returns "Low stock" if ≤ 5, "In stock" if > 5, "Out of stock" if 0 */
export function stockLabel(inventory: number): string {
  if (inventory === 0) return "Out of stock";
  if (inventory <= 5) return `Only ${inventory} left`;
  return "In stock";
}
