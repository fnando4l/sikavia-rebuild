import Link from "next/link";

const pillars = [
  {
    icon: "♻",
    title: "ECONYL® Recycled Nylon",
    desc: "All swim fabrics made from 100% regenerated ocean waste.",
  },
  {
    icon: "✦",
    title: "Ethical Production",
    desc: "Crafted in certified factories where every worker is paid fairly.",
  },
  {
    icon: "◈",
    title: "Plastic-Free Packaging",
    desc: "Every order ships in fully compostable, recycled materials.",
  },
];

export function SustainabilityBanner() {
  return (
    <section className="bg-espresso text-white py-20 sm:py-24">
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-10 lg:px-20">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-16">
          <div>
            <p className="font-body text-[9px] tracking-[0.6em] uppercase text-rose/50 mb-3">
              Our Commitment
            </p>
            <h2 className="font-display italic text-[clamp(2.2rem,5vw,4rem)] text-white leading-none">
              Consciously Made.
            </h2>
          </div>
          <Link
            href="/sustainability"
            className="font-body text-[10px] tracking-[0.3em] uppercase text-rose/60 hover:text-rose border-b border-rose/20 hover:border-rose/50 pb-0.5 transition-all duration-300 self-start sm:self-auto"
          >
            Read More →
          </Link>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/5">
          {pillars.map((p) => (
            <div key={p.title} className="bg-espresso p-10 space-y-4">
              <span className="text-rose text-2xl block">{p.icon}</span>
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-white/50">
                {p.title}
              </p>
              <p className="font-body text-[13px] text-white/40 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
