import { Hero }                from "@/components/home/Hero";
import { Marquee }             from "@/components/home/Marquee";
import { CollectionGrid }      from "@/components/home/CollectionGrid";
import { BrandStatement }      from "@/components/home/BrandStatement";
import { FeaturedProducts }    from "@/components/home/FeaturedProducts";
import { EditorialStrip }      from "@/components/home/EditorialStrip";
import { SustainabilityBanner } from "@/components/home/SustainabilityBanner";
import { Testimonials }        from "@/components/home/Testimonials";
import { InstagramSection }    from "@/components/home/InstagramSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <CollectionGrid />
      <FeaturedProducts />
      <EditorialStrip />
      <BrandStatement />
      <SustainabilityBanner />
      <Testimonials />
      <InstagramSection />
    </>
  );
}
