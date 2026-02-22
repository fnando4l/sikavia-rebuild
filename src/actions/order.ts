"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { generateOrderNumber } from "@/lib/utils";
import type { CartItem } from "@/types";

interface ShippingAddress {
  firstName: string;
  lastName:  string;
  line1:     string;
  line2?:    string;
  city:      string;
  state:     string;
  postalCode: string;
  country?:  string;
}

export async function createOrder(
  items: CartItem[],
  address: ShippingAddress,
  stripeSessionId: string
) {
  const session = await auth();

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal >= 10000 ? 0 : 999;
  const tax      = Math.round(subtotal * 0.08);
  const total    = subtotal + shipping + tax;

  // Upsert address if user is logged in
  let addressId: string | undefined;
  if (session?.user?.id) {
    const addr = await prisma.address.create({
      data: {
        userId:    session.user.id,
        firstName: address.firstName,
        lastName:  address.lastName,
        line1:     address.line1,
        line2:     address.line2,
        city:      address.city,
        state:     address.state,
        postalCode: address.postalCode,
        country:   address.country ?? "US",
      },
    });
    addressId = addr.id;
  }

  const order = await prisma.order.create({
    data: {
      orderNumber:     generateOrderNumber(),
      userId:          session?.user?.id ?? null,
      addressId,
      status:          "PROCESSING",
      subtotal,
      shipping,
      tax,
      total,
      currency:        "usd",
      stripeSessionId,
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          name:      item.name,
          image:     item.image,
          size:      item.size,
          color:     item.color,
          price:     item.price,
          quantity:  item.quantity,
        })),
      },
    },
  });

  return order;
}

export async function getUserOrders() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return prisma.order.findMany({
    where: { userId: session.user.id },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
}
