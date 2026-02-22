import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Order Confirmed" };

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-blush p-4">
            <CheckCircle className="h-12 w-12 text-terracotta" />
          </div>
        </div>

        <div>
          <h1 className="font-display text-3xl text-charcoal">Order Confirmed!</h1>
          <p className="mt-3 font-body text-sm text-muted leading-relaxed">
            Thank you for your order. We&apos;ve received your payment and are getting your
            pieces ready. You&apos;ll receive a confirmation email shortly.
          </p>
        </div>

        <div className="border border-border p-5 text-left space-y-2">
          <p className="font-body text-xs text-muted uppercase tracking-wider">Order Number</p>
          <p className="font-display text-2xl text-charcoal">{id.toUpperCase()}</p>
        </div>

        <div className="flex flex-col gap-3">
          <Button variant="primary" fullWidth>
            <Link href="/account/orders">View My Orders</Link>
          </Button>
          <Button variant="outline" fullWidth>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
