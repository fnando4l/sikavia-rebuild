import { Truck, RotateCcw, Shield, Star } from "lucide-react";

const values = [
  {
    icon: Truck,
    title: "Free Shipping",
    body: "On all orders — no minimum spend required.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    body: "30-day hassle-free returns on unworn items.",
  },
  {
    icon: Shield,
    title: "Secure Checkout",
    body: "256-bit SSL encryption on every order.",
  },
  {
    icon: Star,
    title: "Quality First",
    body: "Premium fabrics designed to last season after season.",
  },
];

export function ValueProps() {
  return (
    <section className="border-y border-border py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex flex-col items-center text-center gap-3">
              <div className="rounded-full bg-blush p-3">
                <Icon className="h-5 w-5 text-terracotta" />
              </div>
              <div>
                <p className="font-body text-sm font-semibold text-charcoal">{title}</p>
                <p className="mt-0.5 font-body text-xs text-muted leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
