import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { generateOrderNumber } from "@/lib/utils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

export async function POST(req: Request) {
  const body = await req.text();
  const sig  = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("[webhook] signature error", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    await handleCheckoutComplete(session);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  try {
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ["data.price.product"],
    });

    const userId = session.metadata?.userId !== "guest" ? session.metadata?.userId : null;
    const subtotal = (session.amount_subtotal ?? 0);
    const shipping = (session.shipping_cost?.amount_total ?? 0);
    const tax      = (session.total_details?.amount_tax ?? 0);
    const total    = (session.amount_total ?? 0);

    await prisma.order.create({
      data: {
        orderNumber:     generateOrderNumber(),
        userId:          userId ?? null,
        status:          "PROCESSING",
        subtotal,
        shipping,
        tax,
        total,
        currency:        session.currency ?? "usd",
        stripeSessionId: session.id,
        stripePaymentId: session.payment_intent as string | null,
        items: {
          create: lineItems.data.map((li) => {
            const product = li.price?.product as Stripe.Product | undefined;
            return {
              productId: product?.metadata?.productId ?? "unknown",
              variantId: product?.metadata?.variantId ?? "unknown",
              name:      li.description ?? "Product",
              image:     product?.images?.[0] ?? "",
              size:      "N/A",
              price:     li.price?.unit_amount ?? 0,
              quantity:  li.quantity ?? 1,
            };
          }),
        },
      },
    });
  } catch (err) {
    console.error("[webhook] order creation error", err);
  }
}
