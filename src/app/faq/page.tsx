"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const sections = [
  {
    category: "Ordering & Payment",
    items: [
      { q: "What payment methods do you accept?", a: "We accept all major credit and debit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, Google Pay, and Klarna (Buy Now, Pay Later in 4 interest-free instalments)." },
      { q: "Can I modify or cancel my order?", a: "Orders can be modified or cancelled within 1 hour of placing them. After that, the order enters fulfilment and cannot be changed. Please contact us immediately at hello@sikavia.com if you need to make a change." },
      { q: "Do you offer gift wrapping?", a: "Yes — select 'Gift Wrap' at checkout for an additional $5. We'll include a handwritten gift note and wrap the piece in our signature organza ribbon and tissue." },
      { q: "Is it safe to pay on sikavia.com?", a: "Absolutely. All transactions are processed via SSL-encrypted servers. We never store your card details. Payments are handled by Stripe, one of the world's most trusted payment providers." },
    ],
  },
  {
    category: "Sizing & Fit",
    items: [
      { q: "How do I find my size?", a: "Visit our full Size Guide for detailed measurements and fit notes. If you're between sizes, we generally recommend sizing up for swimwear and sizing down for bodywear. Our customer care team can also advise." },
      { q: "Do your sizes run true to size?", a: "Yes — all Sikavia pieces are designed to fit true to the measurements on our size chart. The fabric has a 4-way stretch, so there is some flexibility within each size." },
      { q: "Can I order tops and bottoms in different sizes?", a: "Absolutely — our bikini sets can be mixed and matched by size. Simply add each piece to your cart separately." },
      { q: "What if I'm a size 2X or 3X?", a: "Our extended sizes (2X–3X) are available across most swim styles and all bodywear. Extended sizes are designed with additional fabric panels, not simply scaled up, to ensure the same flattering fit." },
    ],
  },
  {
    category: "Shipping & Delivery",
    items: [
      { q: "How long does shipping take?", a: "Standard US shipping takes 5–7 business days. Express takes 2–3. International timelines vary by region — see our full Shipping page for details by country." },
      { q: "Do you ship internationally?", a: "Yes — we ship to 80+ countries. Visit our Shipping page for rates and delivery times by region. Duties and taxes may apply for some international orders." },
      { q: "How do I track my order?", a: "Once your order ships, you'll receive an email with a tracking number. You can track your parcel directly on our website via the 'Track Order' link in your confirmation email." },
      { q: "What if my order arrives damaged?", a: "We're so sorry to hear that. Please email us at hello@sikavia.com within 48 hours of delivery with a photo of the damage. We'll send a replacement immediately at no cost to you." },
    ],
  },
  {
    category: "Returns & Exchanges",
    items: [
      { q: "What is your returns policy?", a: "We offer free returns within 30 days of delivery on all unworn, unwashed items with tags attached. Sale items can be exchanged or returned for store credit only." },
      { q: "How do I start a return?", a: "Visit returns.sikavia.com, enter your order number, and follow the prompts. You'll receive a prepaid return label by email within minutes." },
      { q: "When will I receive my refund?", a: "Once we receive and inspect your return (usually 3–5 business days), your refund will be issued to the original payment method within 5–7 business days. You'll receive a confirmation email." },
      { q: "Can I exchange for a different size or colour?", a: "Yes — select 'Exchange' instead of 'Return' in the returns portal and choose your preferred size or colour. Exchanges are processed as priority and ship within 1–2 business days of us receiving your return." },
    ],
  },
  {
    category: "Product & Care",
    items: [
      { q: "How do I care for my Sikavia swimwear?", a: "Hand wash in cold water with a gentle detergent after each use. Rinse immediately after chlorine or saltwater exposure. Lay flat to dry away from direct sunlight. Never tumble dry or wring the fabric." },
      { q: "Are your fabrics sustainable?", a: "Yes — all swim fabrics are made from ECONYL® regenerated nylon, produced from recycled ocean waste. Our bodywear uses GOTS-certified organic cotton. See our Sustainability page for full details." },
      { q: "Does the fabric have UV protection?", a: "Yes — all Sikavia swim fabrics offer UPF 50+ protection, blocking 98% of UVA and UVB rays." },
      { q: "Will the colours fade?", a: "Sikavia fabrics are dye-certified and colourfast under normal use and care. To preserve vibrancy, always rinse after saltwater/chlorine exposure and avoid prolonged direct sunlight when not wearing." },
    ],
  },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#EDE5DC]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-body text-[13px] text-charcoal leading-snug">{q}</span>
        <ChevronDown
          className={cn("flex-shrink-0 h-4 w-4 text-charcoal/40 transition-transform duration-300", open && "rotate-180")}
        />
      </button>
      <div className={cn("overflow-hidden transition-all duration-400", open ? "max-h-96 pb-5" : "max-h-0")}>
        <p className="font-body text-[13px] text-charcoal/55 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="bg-cream min-h-screen">

      {/* Header */}
      <div className="bg-blush border-b border-[#E5D4C8] py-20 sm:py-24 text-center">
        <p className="font-body text-[9px] tracking-[0.6em] uppercase text-charcoal/35 mb-4">Help</p>
        <h1 className="font-display italic text-[clamp(3rem,8vw,6rem)] text-charcoal leading-none mb-6">
          Frequently Asked
        </h1>
        <p className="font-body text-[13px] text-charcoal/50 max-w-sm mx-auto">
          Can&apos;t find what you&apos;re looking for? Email us at{" "}
          <a href="mailto:hello@sikavia.com" className="text-terracotta hover:underline">hello@sikavia.com</a>
        </p>
      </div>

      <div className="max-w-screen-lg mx-auto px-6 sm:px-10 py-20 space-y-16">
        {sections.map((section) => (
          <section key={section.category}>
            <p className="font-body text-[9px] tracking-[0.6em] uppercase text-terracotta mb-6">
              {section.category}
            </p>
            <div>
              {section.items.map((item) => (
                <AccordionItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </section>
        ))}

        <div className="bg-blush p-10 sm:p-14 text-center space-y-4">
          <h3 className="font-display italic text-2xl text-charcoal">Still need help?</h3>
          <p className="font-body text-[13px] text-charcoal/50">Our team replies within 2 hours on weekdays.</p>
          <div className="flex items-center justify-center gap-6 flex-wrap pt-2">
            <a href="mailto:hello@sikavia.com" className="inline-flex items-center gap-3 px-8 py-3.5 bg-charcoal font-body text-[10px] tracking-[0.3em] uppercase text-white hover:bg-espresso transition-colors">
              Email Us
            </a>
            <Link href="/shipping" className="font-body text-[10px] tracking-[0.3em] uppercase text-charcoal/40 hover:text-charcoal border-b border-charcoal/20 pb-0.5 transition-all">
              Shipping Info →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
