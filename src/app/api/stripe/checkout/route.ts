import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/lib/auth";
import type { CartItem } from "@/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    const { items, shippingAddress }: { items: CartItem[]; shippingAddress: Record<string, string> } =
      await req.json();

    if (!items?.length) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    const origin = req.headers.get("origin") ?? "http://localhost:3000";

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: shippingAddress.email ?? session?.user?.email ?? undefined,
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            description: `Size: ${item.size}${item.color ? ` · ${item.color}` : ""}`,
            images: item.image ? [item.image] : [],
            metadata: { variantId: item.variantId, productId: item.productId },
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      })),
      shipping_address_collection: { allowed_countries: ["US", "CA", "GB"] },
      success_url: `${origin}/order/{CHECKOUT_SESSION_ID}`,
      cancel_url:  `${origin}/cart`,
      metadata: {
        userId: session?.user?.id ?? "guest",
        shippingAddress: JSON.stringify(shippingAddress),
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (err) {
    console.error("[stripe/checkout]", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
