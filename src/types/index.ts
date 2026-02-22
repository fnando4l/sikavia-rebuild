// ─── Shared TypeScript types for Sikavia ─────────────────────────────────────
// These extend or complement Prisma-generated types with UI-friendly shapes.

export type CartItem = {
  id: string;          // productVariant id
  productId: string;
  variantId: string;
  name: string;
  slug: string;
  image: string;
  size: string;
  color?: string;
  colorHex?: string;
  price: number;       // in cents
  compareAt?: number;
  quantity: number;
  maxInventory: number;
};

export type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

export type ProductWithVariants = {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  images: string[];
  basePrice: number;
  status: "DRAFT" | "ACTIVE" | "ARCHIVED";
  featured: boolean;
  variants: VariantOption[];
  collections: { id: string; name: string; slug: string }[];
  reviews: ReviewSummary;
};

export type VariantOption = {
  id: string;
  sku: string;
  size: string;
  color?: string;
  colorHex?: string;
  price: number;
  compareAt?: number;
  inventory: number;
  images: string[];
};

export type ReviewSummary = {
  average: number;
  count: number;
  items: ReviewItem[];
};

export type ReviewItem = {
  id: string;
  name: string;
  rating: number;
  title?: string;
  body: string;
  verified: boolean;
  createdAt: string;
};

export type CollectionWithProducts = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  products: ProductCard[];
};

export type ProductCard = {
  id: string;
  name: string;
  slug: string;
  images: string[];
  basePrice: number;
  lowestPrice: number;
  highestPrice: number;
  featured: boolean;
  hasDiscount: boolean;
  collections: { name: string; slug: string }[];
};

export type OrderWithItems = {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  currency: string;
  createdAt: string;
  items: {
    id: string;
    name: string;
    image: string;
    size: string;
    color?: string;
    price: number;
    quantity: number;
  }[];
};

export type FilterState = {
  category?: string;
  sizes: string[];
  minPrice?: number;
  maxPrice?: number;
  sort: "newest" | "price-asc" | "price-desc" | "popular";
};

export type ToastType = "success" | "error" | "info";

export type SizeOption =
  | "XS"
  | "S"
  | "M"
  | "L"
  | "XL"
  | "XXL"
  | "1X"
  | "2X"
  | "3X";

export const SIZE_ORDER: SizeOption[] = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "1X",
  "2X",
  "3X",
];
