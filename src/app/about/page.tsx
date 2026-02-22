import type { Metadata } from "next";
import Image from "next/image";
import Link  from "next/link";

export const metadata: Metadata = { title: "Our Story — Sikavia" };

const values = [
  { title: "Craftsmanship",   desc: "Every stitch, every seam — made to last seasons, not just weekends." },
  { title: "Inclusivity",     desc: "Sizes XS–3X because beauty is not a size range. Every body deserves luxury." },
  { title: "Sustainability",  desc: "ECONYL® recycled fabrics and plastic-free packaging in every order." },
  { title: "Confidence",      desc: "Designed to make you feel undeniably yourself, wherever the water takes you." },
];

export default function AboutPage() {
  return (
    <div className="bg-cream min-h-screen">

      {/* Hero */}
      <div className="relative h-[70vh] overflow-hidden bg-espresso">
        <Image
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1800&q=85"
          alt="Sikavia — Our Story"
          fill
          priority
          className="object-cover object-center opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C0A02]/30 to-[#1C0A02]/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="font-body text-[9px] tracking-[0.6em] uppercase text-white/40 mb-6">Our Story</p>
          <h1 className="font-display italic text-[clamp(3rem,9vw,7rem)] text-white leading-none">
            Made with Intent
          </h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-20 py-24 space-y-28">

        {/* Founding Story */}
        <section className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-7">
            <p className="font-body text-[9px] tracking-[0.6em] uppercase text-charcoal/30">The Beginning</p>
            <h2 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] text-charcoal leading-[1.05]">
              Born from a love of<br />
              <em>the sea and the self.</em>
            </h2>
            <div className="space-y-5 font-body text-[14px] text-charcoal/55 leading-[1.9]">
              <p>
                Sikavia was founded in 2022 by two women who were tired of choosing between swimwear that looked beautiful and swimwear that actually fit. After years spent between the shores of the French Riviera and the beaches of São Paulo, they set out to build something different.
              </p>
              <p>
                The name Sikavia draws from the Swahili word for "to shape" — because that's what we believe great swimwear does. Not just to the body, but to how you carry yourself in the world.
              </p>
              <p>
                Today, Sikavia is worn by women in 47 countries. Every piece is designed in Paris, ethically produced in a family-owned factory in Portugal, and shipped in 100% plastic-free packaging.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden bg-blush">
            <Image
              src="https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=900&q=85"
              alt="Sikavia Founder"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </section>

        {/* Values */}
        <section>
          <div className="text-center mb-16">
            <p className="font-body text-[9px] tracking-[0.6em] uppercase text-charcoal/30 mb-3">What Drives Us</p>
            <h2 className="font-display italic text-[clamp(2.5rem,6vw,4.5rem)] text-charcoal leading-none">
              Our Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#EDE5DC]">
            {values.map((v) => (
              <div key={v.title} className="bg-cream p-12 space-y-4">
                <h3 className="font-display text-2xl text-charcoal">{v.title}</h3>
                <p className="font-body text-[13px] text-charcoal/50 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Numbers */}
        <section className="bg-blush py-16 px-10 sm:px-16 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { num: "2022", label: "Founded" },
            { num: "47",   label: "Countries" },
            { num: "XS–3X", label: "Size Range" },
            { num: "100%", label: "Recycled Fabrics" },
          ].map(({ num, label }) => (
            <div key={label} className="space-y-2">
              <p className="font-display italic text-[clamp(2rem,5vw,3.5rem)] text-charcoal leading-none">{num}</p>
              <p className="font-body text-[9px] tracking-[0.4em] uppercase text-charcoal/40">{label}</p>
            </div>
          ))}
        </section>

        {/* CTA */}
        <div className="text-center space-y-6">
          <p className="font-display italic text-[clamp(1.5rem,4vw,2.8rem)] text-charcoal">
            Ready to find your piece?
          </p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-terracotta font-body text-[10px] tracking-[0.3em] uppercase text-white hover:bg-espresso transition-colors duration-300"
            >
              Shop the Collection
            </Link>
            <Link
              href="/sustainability"
              className="font-body text-[10px] tracking-[0.3em] uppercase text-charcoal/40 hover:text-charcoal border-b border-charcoal/20 hover:border-charcoal/50 pb-0.5 transition-all duration-300"
            >
              Our Sustainability Pledge
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
