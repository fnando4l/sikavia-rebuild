"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cart";
import type { VariantOption } from "@/types";

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  slug: string;
  image: string;
  variant: VariantOption | null;
}

export function AddToCartButton({
  productId,
  productName,
  slug,
  image,
  variant,
}: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  function handleAdd() {
    if (!variant) {
      toast.error("Please select a size");
      return;
    }
    if (variant.inventory === 0) {
      toast.error("This size is out of stock");
      return;
    }

    setLoading(true);

    addItem({
      id: variant.id,
      productId,
      variantId: variant.id,
      name: productName,
      slug,
      image,
      size: variant.size,
      color: variant.color,
      colorHex: variant.colorHex,
      price: variant.price,
      compareAt: variant.compareAt,
      quantity: 1,
      maxInventory: variant.inventory,
    });

    toast.success(`${productName} added to bag`);
    setTimeout(() => setLoading(false), 500);
  }

  const outOfStock = variant !== null && variant.inventory === 0;

  return (
    <Button
      variant="primary"
      size="lg"
      fullWidth
      loading={loading}
      disabled={outOfStock}
      onClick={handleAdd}
    >
      <ShoppingBag className="h-4 w-4" />
      {outOfStock ? "Out of Stock" : "Add to Bag"}
    </Button>
  );
}
