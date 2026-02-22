import Image from "next/image";
import Link  from "next/link";

const posts = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=600&q=80",
    alt: "La Palma One-Piece",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80",
    alt: "Soleil Bikini Set",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    alt: "Beach Editorial",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    alt: "Riviera Triangle Top",
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
    alt: "Mirage One-Piece",
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
    alt: "Cleo Bodysuit",
  },
];

export function InstagramSection() {
  return (
    <section className="py-20 sm:py-28 bg-cream">
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-10 lg:px-20">
        <div className="text-center mb-12">
          <p className="font-body text-[9px] tracking-[0.6em] uppercase text-charcoal/30 mb-3">
            Follow Along
          </p>
          <h2 className="font-display italic text-[clamp(2rem,5vw,4rem)] text-charcoal leading-none">
            @sikavia
          </h2>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
          {posts.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden block bg-blush"
            >
              <Image
                src={post.image}
                alt={post.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                sizes="(max-width: 640px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/25 transition-colors duration-400 flex items-center justify-center">
                <span className="font-body text-[9px] tracking-[0.3em] uppercase text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-body text-[10px] tracking-[0.3em] uppercase text-charcoal/40 hover:text-charcoal border-b border-charcoal/15 hover:border-charcoal/40 pb-0.5 transition-all duration-300"
          >
            Follow @sikavia on Instagram →
          </a>
        </div>
      </div>
    </section>
  );
}
