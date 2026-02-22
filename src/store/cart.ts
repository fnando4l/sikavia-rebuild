"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem } from "@/types";

type CartStore = {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;

  // Computed helpers (not persisted)
  totalItems: () => number;
  subtotal: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      addItem: (incoming) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.variantId === incoming.variantId
          );
          if (existing) {
            // Increment quantity, cap at maxInventory
            return {
              items: state.items.map((i) =>
                i.variantId === incoming.variantId
                  ? {
                      ...i,
                      quantity: Math.min(
                        i.quantity + incoming.quantity,
                        i.maxInventory
                      ),
                    }
                  : i
              ),
              isOpen: true,
            };
          }
          return { items: [...state.items, incoming], isOpen: true };
        });
      },

      removeItem: (variantId) =>
        set((state) => ({
          items: state.items.filter((i) => i.variantId !== variantId),
        })),

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.variantId === variantId
              ? { ...i, quantity: Math.min(quantity, i.maxInventory) }
              : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: "sikavia-cart",
      storage: createJSONStorage(() => localStorage),
      // Only persist items, not UI state (isOpen)
      partialize: (state) => ({ items: state.items }),
    }
  )
);
