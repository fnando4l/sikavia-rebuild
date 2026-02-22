"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const TABS = [
  { label: "All",      href: "/shop" },
  { label: "New In",   href: "/shop/new-arrivals" },
  { label: "Swim",     href: "/shop/swim" },
  { label: "Bodywear", href: "/shop/bodywear" },
  { label: "Sale",     href: "/shop/sale" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function ShopHeader({ title, count }: { title: string; count: number }) {
  const pathname = usePathname();

  const activeHref = TABS.find((t) =>
    t.href === "/shop" ? pathname === "/shop" : pathname.startsWith(t.href)
  )?.href ?? "/shop";

  return (
    <div className="bg-[#FAF1EB] border-b border-[#EDE0D4]">
      {/* Title row */}
      <div className="px-6 sm:px-10 lg:px-14 pt-10 pb-7 flex items-end justify-between max-w-screen-2xl mx-auto">
        <div>
          <motion.p
            className="font-body text-[9px] tracking-[0.5em] uppercase text-charcoal/30 mb-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            Sikavia / {title}
          </motion.p>
          <motion.h1
            className="font-display italic text-[clamp(2.8rem,7vw,5.5rem)] text-charcoal leading-none tracking-[-0.01em]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.9, ease }}
          >
            {title}
          </motion.h1>
        </div>

        <motion.p
          className="font-display text-[clamp(1.8rem,4vw,3rem)] text-charcoal/15 leading-none hidden sm:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {count}
        </motion.p>
      </div>

      {/* Category tabs */}
      <div className="px-6 sm:px-10 lg:px-14 max-w-screen-2xl mx-auto overflow-x-auto scrollbar-hide">
        <div className="flex gap-0 min-w-max">
          {TABS.map((tab, i) => {
            const isActive = tab.href === activeHref;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="relative flex-shrink-0"
              >
                <motion.span
                  className={`block px-5 py-3.5 font-body text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 ${
                    isActive ? "text-charcoal" : "text-charcoal/35 hover:text-charcoal/70"
                  }`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.6, ease }}
                >
                  {tab.label}
                </motion.span>

                {isActive && (
                  <motion.div
                    layoutId="shop-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-terracotta"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
