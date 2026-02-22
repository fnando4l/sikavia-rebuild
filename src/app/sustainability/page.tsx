import type { Metadata } from "next";
import Image from "next/image";
import Link  from "next/link";

export const metadata: Metadata = { title: "Sustainability — Sikavia" };

const materials = [
  {
    name: "ECONYL® Regenerated Nylon",
    badge: "Primary Fabric",
    desc: "Made from 100% recycled nylon waste — from fishing nets, fabric scraps, and carpet flooring rescued from landfill and ocean waste. ECONYL® can be recycled, recreated, and remoulded again and again.",
  },
  {
    name: "REPREVE® Recycled Polyester",
    badge: "Lining",
    desc: "Our linings use REPREVE® — certified recycled polyester made from plastic bottles. Each Sikavia swimsuit repurposes the equivalent of 4–6 plastic bottles.",
  },
  {
    name: "Organic Cotton",
    badge: "Bodywear",
    desc: "Our bodywear range uses GOTS-certified organic cotton — grown without synthetic pesticides, with 90% less water usage than conventional cotton.",
  },
];

const commitments = [
  { year: "2023", action: "Moved to 100% plastic-free packaging across all markets." },
  { year: "2024", action: "Achieved B Corp certification for our Portuguese production partner." },
  { year: "2024", action: "Launched our Swimwear Takeback Programme — return worn pieces for recycling." },
  { year: "2025", action: "Target: carbon-neutral shipping on all domestic orders." },
  { year: "2026", action: "Target: 100% renewable energy in all production facilities." },
];

export default function SustainabilityPage() {
  return (
    <div className="bg-cream min-h-screen">

      {/* Hero */}
      <div className="relative h-[60vh] overflow-hidden bg-espresso">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85"
          alt="Sustainable ocean"
          fill
          priority
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="font-body text-[9px] tracking-[0.6em] uppercase text-rose/60 mb-6">
            Our Commitment
          </p>
          <h1 className="font-display italic text-[clamp(3rem,9vw,6rem)] text-white leading-none mb-6">
            Wear it Again.
          </h1>
          <p className="font-body text-[13px] text-white/50 max-w-lg leading-relaxed">
            Fashion's relationship with the planet has to change. Ours already has.
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-20 py-24 space-y-28">

        {/* Intro */}
        <section className="max-w-3xl">
          <p className="font-body text-[9px] tracking-[0.6em] uppercase text-charcoal/30 mb-4">The Sikavia Way</p>
          <p className="font-display text-[clamp(1.8rem,4vw,3rem)] text-charcoal leading-[1.2] mb-8">
            We believe that the most beautiful swimwear is made with integrity — for the body <em>and</em> for the world it lives in.
          </p>
          <p className="font-body text-[14px] text-charcoal/55 leading-[1.9]">
            From the fabrics we source to the factories we partner with to the box we ship in — every decision at Sikavia is made with sustainability at its core. We're not perfect. But we publish our progress, celebrate our wins, and are brutally honest about what still needs to change.
          </p>
        </section>

        {/* Materials */}
        <section>
          <p className="font-body text-[9px] tracking-[0.6em] uppercase text-charcoal/30 mb-3">What We Use</p>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] text-charcoal leading-none mb-14">
            Our Materials
          </h2>
          <div className="space-y-px">
            {materials.map((m) => (
              <div key={m.name} className="grid sm:grid-cols-[200px_1fr] gap-8 bg-white border border-[#EDE5DC] p-10">
                <div>
                  <span className="font-body text-[9px] tracking-[0.3em] uppercase text-terracotta block mb-2">{m.badge}</span>
                  <p className="font-display text-xl text-charcoal leading-snug">{m.name}</p>
                </div>
                <p className="font-body text-[13px] text-charcoal/55 leading-relaxed self-center">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Packaging */}
        <section className="bg-blush p-12 sm:p-16 grid sm:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <p className="font-body text-[9px] tracking-[0.6em] uppercase text-charcoal/35">Packaging</p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-charcoal leading-none">
              Nothing ends up in landfill.
            </h2>
            <p className="font-body text-[13px] text-charcoal/55 leading-relaxed">
              Every Sikavia order ships in FSC-certified paper boxes, sealed with compostable tape. Tissue paper is acid-free and recyclable. Your invoice is sent digitally. Even the ribbon is made from organic cotton.
            </p>
          </div>
          <div className="space-y-4">
            {[
              "FSC-certified paper box",
              "Compostable mailing tape",
              "Recycled acid-free tissue",
              "Organic cotton ribbon",
              "Digital invoice only",
            ].map((item) => (
              <div key={item} className="flex items-center gap-4">
                <span className="text-terracotta flex-shrink-0">—</span>
                <span className="font-body text-[13px] text-charcoal/60">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section>
          <p className="font-body text-[9px] tracking-[0.6em] uppercase text-charcoal/30 mb-3">Our Progress</p>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] text-charcoal leading-none mb-14">
            Commitments & Milestones
          </h2>
          <div className="space-y-0 border-l-2 border-[#EDE5DC] pl-8">
            {commitments.map((c) => (
              <div key={c.year + c.action} className="relative pb-10 last:pb-0">
                <div className="absolute -left-[2.6rem] top-1 h-4 w-4 rounded-full bg-blush border-2 border-terracotta flex-shrink-0" />
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-terracotta mb-2">{c.year}</p>
                <p className="font-body text-[14px] text-charcoal/65 leading-relaxed">{c.action}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center space-y-4">
          <p className="font-body text-[13px] text-charcoal/40">
            Want to learn more about the brands and certifications we work with?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 font-body text-[10px] tracking-[0.3em] uppercase text-charcoal/50 hover:text-charcoal border-b border-charcoal/20 pb-0.5 transition-all duration-300"
          >
            Get in Touch →
          </Link>
        </div>

      </div>
    </div>
  );
}
