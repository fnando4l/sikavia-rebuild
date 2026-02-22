"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export function BrandStatement() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative min-h-[85vh] overflow-hidden bg-[#0D0D0D] flex items-center">
      {/* Parallax image */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div className="absolute inset-[-10%]" style={{ y: imgY }}>
          <Image
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=85"
            alt="Sikavia"
            fill
            className="object-cover object-[center_30%] opacity-30"
            sizes="100vw"
          />
        </motion.div>
      </div>

      {/* Warm rose tint + grain overlay */}
      <div className="absolute inset-0 bg-[#3D1F0D]/20" aria-hidden />
      <div className="absolute inset-0 grain-dark" aria-hidden />

      {/* Content */}
      <div className="relative z-10 w-full px-8 sm:px-14 lg:px-20 py-28">

        <motion.p
          className="font-body text-[9px] tracking-[0.7em] uppercase text-white/25 mb-16"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          The Sikavia Promise
        </motion.p>

        <div className="max-w-5xl">
          {["Designed for", "the woman", "who moves"].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.p
                className={`font-display leading-[0.88] tracking-[-0.01em] text-white ${i === 2 ? "italic text-white/60" : ""}`}
                style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}
                initial={{ y: 80, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.15 + i * 0.12, duration: 0.9, ease }}
              >
                {line}
              </motion.p>
            </div>
          ))}
          <div className="overflow-hidden">
            <motion.p
              className="font-display italic text-rose leading-[0.88] tracking-[-0.01em]"
              style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}
              initial={{ y: 80, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.9, ease }}
            >
              beautifully.
            </motion.p>
          </div>
        </div>

        <motion.div
          className="flex items-center gap-8 mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.8, ease }}
        >
          <Link
            href="/shop"
            className="group inline-flex items-center gap-4 px-10 py-4 bg-white font-body text-[10px] tracking-[0.35em] uppercase text-charcoal hover:bg-terracotta hover:text-white transition-all duration-500"
          >
            Shop the Collection
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
          <Link
            href="/shop/new-arrivals"
            className="font-body text-[10px] tracking-[0.3em] uppercase text-white/30 hover:text-white border-b border-white/15 hover:border-white/40 pb-0.5 transition-all hidden sm:block"
          >
            New Arrivals
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
