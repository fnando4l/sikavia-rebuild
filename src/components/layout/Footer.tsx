import Link from "next/link";
import { NewsletterForm } from "./NewsletterForm";

const cols = [
  {
    heading: "Shop",
    links: [
      { label: "New In",       href: "/shop/new-arrivals" },
      { label: "Swim",         href: "/shop/swim" },
      { label: "Bodywear",     href: "/shop/bodywear" },
      { label: "Editorial",    href: "/editorial" },
      { label: "Sale",         href: "/shop/sale" },
    ],
  },
  {
    heading: "Help",
    links: [
      { label: "Size Guide",        href: "/size-guide" },
      { label: "Shipping & Returns", href: "/shipping" },
      { label: "FAQ",               href: "/faq" },
      { label: "Contact",           href: "/contact" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "Our Story",      href: "/about" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Sign In",        href: "/login" },
      { label: "My Account",     href: "/account" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-espresso text-white">
      <div className="max-w-screen-2xl mx-auto px-5 pt-14 pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1 space-y-5">
            <Link href="/" className="font-body text-[13px] tracking-[0.4em] uppercase font-medium text-white hover:opacity-70 transition-opacity">
              Sikavia
            </Link>
            <p className="font-body text-[12px] text-white/40 leading-relaxed max-w-[180px]">
              Elevated swimwear and bodywear for every body.
            </p>
            <div className="flex gap-4">
              {[
                { label: "IG",  href: "https://instagram.com" },
                { label: "TK",  href: "https://tiktok.com" },
                { label: "FB",  href: "https://facebook.com" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[10px] tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.heading}>
              <p className="font-body text-[10px] tracking-[0.35em] uppercase text-white/30 mb-5">
                {col.heading}
              </p>
              <ul className="space-y-3.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="font-body text-[12px] text-white/60 hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/10 mt-12 pt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
          <div>
            <p className="font-body text-[10px] tracking-[0.35em] uppercase text-white/30 mb-3">
              Newsletter
            </p>
            <p className="font-body text-[12px] text-white/50">
              Early access to new drops. No spam, ever.
            </p>
          </div>
          <NewsletterForm />
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-body text-[11px] text-white/30">
            &copy; {new Date().getFullYear()} Sikavia. All rights reserved.
          </p>
          <div className="flex gap-6">
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms",   href: "/terms" },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="font-body text-[11px] text-white/30 hover:text-white/60 transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
