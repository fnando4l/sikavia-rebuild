"use client";

import Image from "next/image";
import Link  from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const collections = [
  {
    name: "Swim",
    sub:  "The new season edit",
    slug: "swim",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85",
    pos:  "object-center",
  },
  {
    name: "Bodywear",
    sub:  "Second-skin luxe",
    slug: "bodywear",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85",
    pos:  "object-top",
  },
  {
    name: "New In",
    sub:  "Just arrived",
    slug: "new-arrivals",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=85",
    pos:  "object-[center_20%]",
  },
];

type Col = (typeof collections)[0];
const ease = [0.16, 1, 0.3, 1] as const;

function CollectionPanel({ col, index, large = false }: { col: Col; index: number; large?: boolean }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden bg-[#1A1A1A] ${large ? "h-[80vh] min-h-[500px]" : "flex-1 min-h-[37vh]"}`}
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
      transition={{ delay: index * 0.12, duration: 1.1, ease }}
    >
      <Link href={`/shop/${col.slug}`} className="group relative block w-full h-full">
        <Image
          src={col.image}
          alt={col.name}
          fill
          className={`object-cover ${col.pos} transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.06]`}
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C0A02]/75 via-black/10 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9 flex items-end justify-between">
          <div>
            <motion.p
              className="font-body text-[9px] tracking-[0.5em] uppercase text-white/40 mb-2"
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.12 + 0.6, duration: 0.7, ease }}
            >
              {col.sub}
            </motion.p>
            <motion.h3
              className={`font-display italic text-white leading-none ${large ? "text-[clamp(2.5rem,5vw,4.5rem)]" : "text-[clamp(2rem,3.5vw,3.2rem)]"}`}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.12 + 0.75, duration: 0.8, ease }}
            >
              {col.name}
            </motion.h3>
          </div>

          <span className="font-body text-[9px] tracking-[0.4em] uppercase text-rose border border-rose/50 px-4 py-2.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
            Shop
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export function CollectionGrid() {
  const [main, ...rest] = collections;

  return (
    <section className="grid grid-cols-2 gap-px bg-[#111]">
      <CollectionPanel col={main} index={0} large />
      <div className="flex flex-col gap-px">
        {rest.map((col, i) => (
          <CollectionPanel key={col.slug} col={col} index={i + 1} />
        ))}
      </div>
    </section>
  );
}
