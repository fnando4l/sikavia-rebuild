import type { Metadata } from "next";
import Image from "next/image";
import Link  from "next/link";

export const metadata: Metadata = { title: "The Edit — Sikavia" };

const editorials = [
  {
    id: "1",
    season: "S/S 2025",
    title: "Sun, Salt & Silk",
    sub: "The summer one-piece edit.",
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=900&q=85",
    href: "/shop/swim",
    large: true,
  },
  {
    id: "2",
    season: "Resort 2025",
    title: "The Morning Swim",
    sub: "Golden hour in the bodywear collection.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=700&q=85",
    href: "/shop/bodywear",
    large: false,
  },
  {
    id: "3",
    season: "S/S 2025",
    title: "Riviera Days",
    sub: "Bikini sets for the season.",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=700&q=85",
    href: "/shop/swim",
    large: false,
  },
  {
    id: "4",
    season: "Bodywear Edit",
    title: "Second Skin",
    sub: "The effortless bodywear collection.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85",
    href: "/shop/bodywear",
    large: true,
  },
  {
    id: "5",
    season: "New Arrivals",
    title: "Golden Hour",
    sub: "Just landed — the warmest pieces of the season.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=85",
    href: "/shop/new-arrivals",
    large: false,
  },
  {
    id: "6",
    season: "S/S 2025",
    title: "Salt Lines",
    sub: "The sea-inspired swim edit.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=85",
    href: "/shop/swim",
    large: false,
  },
];

export default function EditorialPage() {
  const [first, ...rest] = editorials;
  const secondRow = rest.slice(0, 2);
  const thirdRow  = rest.slice(2, 3);
  const fourthRow = rest.slice(3, 5);

  return (
    <div className="bg-cream min-h-screen">

      {/* Header */}
      <div className="border-b border-[#EDE5DC] py-16 sm:py-20 text-center bg-cream">
        <p className="font-body text-[9px] tracking-[0.6em] uppercase text-charcoal/30 mb-4">Lookbook</p>
        <h1 className="font-display italic text-[clamp(3.5rem,10vw,8rem)] text-charcoal leading-none">
          The Edit
        </h1>
        <p className="font-body text-[12px] tracking-[0.25em] uppercase text-charcoal/35 mt-5">
          Summer / Spring 2025
        </p>
      </div>

      {/* Grid */}
      <div className="space-y-1.5 bg-[#EDE5DC]">

        {/* Hero editorial */}
        <div className="bg-cream">
          <Link href={first.href} className="group relative block h-[85vh] overflow-hidden bg-blush">
            <Image
              src={first.image}
              alt={first.title}
              fill
              priority
              className="object-cover object-top transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C0A02]/65 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-10 sm:p-16 flex items-end justify-between">
              <div>
                <p className="font-body text-[9px] tracking-[0.5em] uppercase text-rose/70 mb-3">{first.season}</p>
                <h2 className="font-display italic text-[clamp(2.5rem,6vw,5.5rem)] text-white leading-none">{first.title}</h2>
                <p className="font-body text-[11px] tracking-[0.2em] uppercase text-white/50 mt-3">{first.sub}</p>
              </div>
              <span className="font-body text-[9px] tracking-[0.4em] uppercase text-rose border border-rose/40 px-5 py-3 opacity-0 group-hover:opacity-100 transition-all duration-500 flex-shrink-0">
                Shop Look
              </span>
            </div>
          </Link>
        </div>

        {/* Second row: 2 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {secondRow.map((e) => (
            <Link key={e.id} href={e.href} className="group relative block h-[60vh] overflow-hidden bg-blush">
              <Image
                src={e.image}
                alt={e.title}
                fill
                className="object-cover object-top transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C0A02]/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 sm:p-10">
                <p className="font-body text-[9px] tracking-[0.5em] uppercase text-rose/60 mb-2">{e.season}</p>
                <h3 className="font-display italic text-[clamp(1.8rem,4vw,3.2rem)] text-white leading-none">{e.title}</h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Third row: full width */}
        <Link href={thirdRow[0].href} className="group relative block h-[70vh] overflow-hidden bg-blush">
          <Image
            src={thirdRow[0].image}
            alt={thirdRow[0].title}
            fill
            className="object-cover object-[center_30%] transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C0A02]/70 via-transparent to-transparent" />
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-center p-12 sm:p-20 max-w-lg">
            <p className="font-body text-[9px] tracking-[0.5em] uppercase text-rose/70 mb-4">{thirdRow[0].season}</p>
            <h2 className="font-display italic text-[clamp(2.5rem,5vw,4.5rem)] text-white leading-none mb-4">{thirdRow[0].title}</h2>
            <p className="font-body text-[12px] text-white/50 mb-8 tracking-wide">{thirdRow[0].sub}</p>
            <span className="font-body text-[9px] tracking-[0.4em] uppercase text-rose border-b border-rose/40 pb-0.5 self-start opacity-0 group-hover:opacity-100 transition-opacity duration-400">
              Shop Now →
            </span>
          </div>
        </Link>

        {/* Fourth row: 2 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {fourthRow.map((e) => (
            <Link key={e.id} href={e.href} className="group relative block h-[60vh] overflow-hidden bg-blush">
              <Image
                src={e.image}
                alt={e.title}
                fill
                className="object-cover object-top transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C0A02]/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 sm:p-10">
                <p className="font-body text-[9px] tracking-[0.5em] uppercase text-rose/60 mb-2">{e.season}</p>
                <h3 className="font-display italic text-[clamp(1.8rem,4vw,3.2rem)] text-white leading-none">{e.title}</h3>
              </div>
            </Link>
          ))}
        </div>

      </div>

      {/* Shop CTA */}
      <div className="py-24 text-center bg-cream">
        <p className="font-body text-[9px] tracking-[0.6em] uppercase text-charcoal/30 mb-6">Shop The Looks</p>
        <div className="flex items-center justify-center gap-6 flex-wrap">
          <Link href="/shop/swim" className="inline-flex items-center gap-3 px-8 py-3.5 bg-terracotta font-body text-[10px] tracking-[0.3em] uppercase text-white hover:bg-espresso transition-colors">
            Shop Swim
          </Link>
          <Link href="/shop/bodywear" className="inline-flex items-center gap-3 px-8 py-3.5 border border-charcoal font-body text-[10px] tracking-[0.3em] uppercase text-charcoal hover:bg-charcoal hover:text-white transition-all duration-300">
            Shop Bodywear
          </Link>
        </div>
      </div>
    </div>
  );
}
