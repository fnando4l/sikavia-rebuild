"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#111] -mt-12">
      {/* Full-bleed image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Image
          src="https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=1800&q=90"
          alt="Sikavia Summer 2025"
          fill
          priority
          className="object-cover object-[55%_25%]"
          sizes="100vw"
        />
      </motion.div>

      {/* Gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C0A02]/50 via-black/5 to-[#1A0906]/78" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1C0A02]/25 to-transparent" />

      {/* Main content */}
      <div className="relative h-full flex flex-col justify-between px-8 sm:px-14 lg:px-20 pt-24 pb-14">

        {/* Season label */}
        <motion.p
          className="font-body text-[9px] tracking-[0.7em] uppercase text-white/40 self-start"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease }}
        >
          S/S 2025
        </motion.p>

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-10">

          {/* Headline */}
          <div className="overflow-hidden">
            <motion.h1
              className="font-display text-[clamp(4rem,13vw,10rem)] text-white leading-[0.82] tracking-[-0.02em]"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.1, ease }}
            >
              Summer,
              <br />
              <motion.em
                className="font-light"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.75, duration: 1.1, ease }}
                style={{ fontStyle: "italic", color: "#E8C5B4" }}
              >
                Redefined.
              </motion.em>
            </motion.h1>
          </div>

          {/* Right side: stats + CTA */}
          <motion.div
            className="flex flex-col items-start sm:items-end gap-6 flex-shrink-0 sm:pb-2"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1, ease }}
          >
            {/* Stat pills */}
            <div className="flex gap-6">
              {[["40+", "Styles"], ["XS–3X", "Sizing"], ["100%", "Recycled"]].map(([num, label]) => (
                <div key={label} className="text-center">
                  <p className="font-display text-xl text-white leading-none">{num}</p>
                  <p className="font-body text-[9px] tracking-[0.3em] uppercase text-white/40 mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/shop"
              className="group inline-flex items-center gap-3 px-8 py-3.5 bg-terracotta font-body text-[10px] tracking-[0.3em] uppercase text-white hover:bg-rose hover:text-charcoal transition-all duration-500"
            >
              Shop the Collection
              <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        <motion.div
          className="w-px h-10 bg-white/40 origin-top"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
