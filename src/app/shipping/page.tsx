import type { Metadata } from "next";
import Link  from "next/link";

export const metadata: Metadata = { title: "Shipping & Returns — Sikavia" };

const shipping = [
  { zone: "United States", standard: "5–7 business days", express: "2–3 business days", standardFee: "Free over $75 / $6.95", expressFee: "$14.95" },
  { zone: "Canada",         standard: "7–10 business days", express: "3–5 business days", standardFee: "Free over $100 / $9.95", expressFee: "$19.95" },
  { zone: "United Kingdom", standard: "4–7 business days", express: "2–3 business days", standardFee: "Free over £65 / £5.95", expressFee: "£12.95" },
  { zone: "Europe",         standard: "5–9 business days", express: "3–5 business days", standardFee: "Free over €80 / €7.95", expressFee: "€15.95" },
  { zone: "Australia / NZ", standard: "8–14 business days", express: "4–6 business days", standardFee: "Free over A$120 / A$11.95", expressFee: "A$22.95" },
  { zone: "Rest of World",  standard: "10–18 business days", express: "5–8 business days", standardFee: "$12.95", expressFee: "$24.95" },
];

const returnSteps = [
  { step: "01", title: "Start Your Return", desc: "Visit our returns portal at returns.sikavia.com within 30 days of receiving your order. Enter your order number and select the items you'd like to return." },
  { step: "02", title: "Pack Your Items", desc: "Place items in their original packaging (or any secure packaging). Attach the prepaid return label included in your parcel, or print one from the portal." },
  { step: "03", title: "Drop Off", desc: "Drop your parcel at any authorised carrier location. Keep your receipt — it's your proof of postage." },
  { step: "04", title: "Refund Processed", desc: "Once received and inspected (usually 3–5 business days), your refund will be processed to the original payment method within 5–7 business days." },
];

export default function ShippingPage() {
  return (
    <div className="bg-cream min-h-screen">

      {/* Header */}
      <div className="bg-blush border-b border-[#E5D4C8] py-20 sm:py-24 text-center">
        <p className="font-body text-[9px] tracking-[0.6em] uppercase text-charcoal/35 mb-4">Help / </p>
        <h1 className="font-display italic text-[clamp(3rem,8vw,6rem)] text-charcoal leading-none">
          Shipping & Returns
        </h1>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-20 py-20 space-y-24">

        {/* Shipping Rates */}
        <section>
          <p className="font-body text-[9px] tracking-[0.6em] uppercase text-charcoal/30 mb-3">Delivery</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-charcoal mb-3 leading-none">Shipping Rates</h2>
          <p className="font-body text-[13px] text-charcoal/50 mb-10 leading-relaxed max-w-2xl">
            All orders are processed within 1–2 business days. You'll receive a tracking email as soon as your order ships.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[560px]">
              <thead>
                <tr className="border-b-2 border-[#EDE5DC]">
                  <th className="font-body text-[9px] tracking-[0.3em] uppercase text-charcoal/40 text-left py-4 pr-6">Region</th>
                  <th className="font-body text-[9px] tracking-[0.3em] uppercase text-charcoal/40 text-left py-4 px-4">Standard Delivery</th>
                  <th className="font-body text-[9px] tracking-[0.3em] uppercase text-charcoal/40 text-left py-4 px-4">Standard Rate</th>
                  <th className="font-body text-[9px] tracking-[0.3em] uppercase text-charcoal/40 text-left py-4 px-4">Express Delivery</th>
                  <th className="font-body text-[9px] tracking-[0.3em] uppercase text-charcoal/40 text-left py-4 pl-4">Express Rate</th>
                </tr>
              </thead>
              <tbody>
                {shipping.map((row, i) => (
                  <tr key={row.zone} className={`border-b border-[#EDE5DC] ${i % 2 === 0 ? "bg-white" : "bg-blush/25"}`}>
                    <td className="font-body text-[13px] font-medium text-charcoal py-4 pr-6">{row.zone}</td>
                    <td className="font-body text-[12px] text-charcoal/55 py-4 px-4">{row.standard}</td>
                    <td className="font-body text-[12px] text-charcoal/55 py-4 px-4">{row.standardFee}</td>
                    <td className="font-body text-[12px] text-charcoal/55 py-4 px-4">{row.express}</td>
                    <td className="font-body text-[12px] text-charcoal/55 py-4 pl-4">{row.expressFee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-body text-[11px] text-charcoal/35 mt-4 italic">
            Duties and taxes may apply for international orders. These are calculated at checkout.
          </p>
        </section>

        {/* Returns */}
        <section>
          <p className="font-body text-[9px] tracking-[0.6em] uppercase text-charcoal/30 mb-3">Returns</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-charcoal mb-3 leading-none">30-Day Free Returns</h2>
          <p className="font-body text-[13px] text-charcoal/50 mb-14 leading-relaxed max-w-2xl">
            Not the right fit? We get it. Return or exchange any unworn, unwashed item within 30 days of delivery — completely free.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#EDE5DC]">
            {returnSteps.map((s) => (
              <div key={s.step} className="bg-cream p-8 space-y-4">
                <span className="font-display italic text-4xl text-charcoal/15">{s.step}</span>
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-charcoal/60">{s.title}</p>
                <p className="font-body text-[12px] text-charcoal/50 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Return Policy Notes */}
        <section className="bg-blush p-10 sm:p-14">
          <h3 className="font-display text-2xl text-charcoal mb-8">Return Policy</h3>
          <div className="space-y-4">
            {[
              "Items must be unworn, unwashed, and in original condition with all tags attached.",
              "Hygiene stickers on swimwear bottoms must be intact.",
              "Sale items are eligible for exchange or store credit only — not refunds.",
              "Gift orders can be exchanged or returned for store credit.",
              "We do not accept returns on personalised or made-to-order pieces.",
              "Refunds are issued to the original payment method — allow 5–7 business days after we receive your return.",
            ].map((note) => (
              <div key={note} className="flex items-start gap-4">
                <span className="text-terracotta flex-shrink-0 mt-0.5">—</span>
                <span className="font-body text-[13px] text-charcoal/60 leading-relaxed">{note}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center space-y-4">
          <p className="font-body text-[13px] text-charcoal/40">Still have questions?</p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <Link href="/faq" className="inline-flex items-center gap-3 px-8 py-3.5 bg-charcoal font-body text-[10px] tracking-[0.3em] uppercase text-white hover:bg-espresso transition-colors duration-300">
              View FAQ
            </Link>
            <Link href="/contact" className="font-body text-[10px] tracking-[0.3em] uppercase text-charcoal/40 hover:text-charcoal border-b border-charcoal/20 pb-0.5 transition-all duration-300">
              Contact Us →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
