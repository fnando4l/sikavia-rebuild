"use client";

import Image from "next/image";
import Link  from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const looks = [
  {
    num: "01",
    title: "Sun, Salt & Silk",
    caption: "La Palma One-Piece in Terracotta",
    href: "/product/la-palma-one-piece",
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=85",
  },
  {
    num: "02",
    title: "The Morning Swim",
    caption: "Soleil Bikini Set in Espresso",
    href: "/product/soleil-bikini-set",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=85",
  },
  {
    num: "03",
    title: "Golden Hour",
    caption: "Cleo Bodysuit in Rose",
    href: "/product/cleo-bodysuit",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=85",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function EditorialStrip() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-cream overflow-hidden">
      <div className="px-6 sm:px-10 lg:px-20 max-w-screen-2xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            <p className="font-body text-[9px] tracking-[0.6em] uppercase text-charcoal/30 mb-3">
              Editorial
            </p>
            <h2 className="font-display italic text-[clamp(2.5rem,6vw,5rem)] text-charcoal leading-none">
              The Edit
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Link
              href="/editorial"
              className="font-body text-[10px] tracking-[0.3em] uppercase text-charcoal/40 hover:text-charcoal border-b border-charcoal/15 hover:border-charcoal/40 pb-0.5 transition-all duration-300"
            >
              Full Lookbook →
            </Link>
          </motion.div>
        </div>

        {/* 3-column editorial grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {looks.map((look, i) => (
            <motion.div
              key={look.num}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.9, ease }}
            >
              <Link href={look.href} className="group block">
                {/* Image */}
                <div className={`relative overflow-hidden bg-blush ${i === 1 ? "aspect-[3/4] sm:mt-10" : "aspect-[3/4]"}`}>
                  <Image
                    src={look.image}
                    alt={look.title}
                    fill
                    className="object-cover object-top transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.05]"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C0A02]/50 via-transparent to-transparent" />

                  {/* Look number */}
                  <span className="absolute top-5 left-5 font-body text-[10px] tracking-[0.4em] text-white/60">
                    {look.num}
                  </span>

                  {/* Shop Now pill */}
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <span className="font-body text-[9px] tracking-[0.35em] uppercase text-rose">
                      Shop Look
                    </span>
                    <span className="text-rose text-xs">→</span>
                  </div>
                </div>

                {/* Caption */}
                <div className="mt-4 space-y-1">
                  <p className="font-display italic text-[1.15rem] text-charcoal leading-snug group-hover:text-terracotta transition-colors duration-300">
                    {look.title}
                  </p>
                  <p className="font-body text-[10px] tracking-[0.2em] uppercase text-charcoal/40">
                    {look.caption}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
