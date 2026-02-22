import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Size Guide — Sikavia" };

const swimSizes = [
  { size: "XS", bust: '31–32"', waist: '24–25"', hip: '33–34"', bustCm: "79–81", waistCm: "61–64", hipCm: "84–86" },
  { size: "S",  bust: '33–34"', waist: '26–27"', hip: '35–36"', bustCm: "84–86", waistCm: "66–69", hipCm: "89–91" },
  { size: "M",  bust: '35–36"', waist: '28–29"', hip: '37–38"', bustCm: "89–91", waistCm: "71–74", hipCm: "94–97" },
  { size: "L",  bust: '37–39"', waist: '30–32"', hip: '39–41"', bustCm: "94–99", waistCm: "76–81", hipCm: "99–104" },
  { size: "XL", bust: '40–42"', waist: '33–35"', hip: '42–44"', bustCm: "102–107", waistCm: "84–89", hipCm: "107–112" },
  { size: "2X", bust: '43–45"', waist: '36–38"', hip: '45–47"', bustCm: "109–114", waistCm: "91–97", hipCm: "114–119" },
  { size: "3X", bust: '46–48"', waist: '39–41"', hip: '48–50"', bustCm: "117–122", waistCm: "99–104", hipCm: "122–127" },
];

const bodywearSizes = [
  { size: "XS", bust: '31–33"', waist: '23–25"', hip: '33–35"' },
  { size: "S",  bust: '34–35"', waist: '26–27"', hip: '36–37"' },
  { size: "M",  bust: '36–37"', waist: '28–30"', hip: '38–40"' },
  { size: "L",  bust: '38–40"', waist: '31–33"', hip: '41–43"' },
  { size: "XL", bust: '41–43"', waist: '34–36"', hip: '44–46"' },
];

const measures = [
  { name: "Bust", icon: "◈", how: "Measure around the fullest part of your chest, keeping the tape parallel to the floor." },
  { name: "Waist", icon: "◈", how: "Measure around your natural waistline — the narrowest part of your torso." },
  { name: "Hip", icon: "◈", how: "Stand with feet together. Measure around the fullest part of your hips and seat." },
];

export default function SizeGuidePage() {
  return (
    <div className="bg-cream min-h-screen">

      {/* Hero */}
      <div className="bg-blush border-b border-[#E5D4C8] py-20 sm:py-28 text-center">
        <p className="font-body text-[9px] tracking-[0.6em] uppercase text-charcoal/35 mb-4">
          Sikavia / Size Guide
        </p>
        <h1 className="font-display italic text-[clamp(3rem,8vw,6rem)] text-charcoal leading-none mb-6">
          Find Your Fit
        </h1>
        <p className="font-body text-[13px] text-charcoal/50 max-w-md mx-auto leading-relaxed px-6">
          All Sikavia pieces are designed with a true-to-size fit. If you're between sizes, we recommend sizing up for swimwear and sizing down for bodywear.
        </p>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-20 py-20 space-y-24">

        {/* How to Measure */}
        <section>
          <p className="font-body text-[9px] tracking-[0.6em] uppercase text-charcoal/30 mb-3">Step 1</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-charcoal mb-12 leading-none">
            How to Measure
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {measures.map((m) => (
              <div key={m.name} className="bg-white border border-[#EDE5DC] p-8 space-y-4">
                <span className="font-body text-[10px] tracking-[0.4em] uppercase text-terracotta">{m.name}</span>
                <p className="font-body text-[13px] text-charcoal/55 leading-relaxed">{m.how}</p>
              </div>
            ))}
          </div>
          <p className="font-body text-[11px] text-charcoal/35 mt-6 italic">
            Tip: Use a soft measuring tape and measure in your underwear for the most accurate results.
          </p>
        </section>

        {/* Swim Size Chart */}
        <section>
          <p className="font-body text-[9px] tracking-[0.6em] uppercase text-charcoal/30 mb-3">Step 2</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-charcoal mb-10 leading-none">
            Swimwear Sizing
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-[#EDE5DC]">
                  <th className="font-body text-[9px] tracking-[0.3em] uppercase text-charcoal/40 text-left py-4 pr-6">Size</th>
                  <th className="font-body text-[9px] tracking-[0.3em] uppercase text-charcoal/40 text-left py-4 px-4">Bust (in)</th>
                  <th className="font-body text-[9px] tracking-[0.3em] uppercase text-charcoal/40 text-left py-4 px-4">Waist (in)</th>
                  <th className="font-body text-[9px] tracking-[0.3em] uppercase text-charcoal/40 text-left py-4 px-4">Hip (in)</th>
                  <th className="font-body text-[9px] tracking-[0.3em] uppercase text-charcoal/40 text-left py-4 px-4">Bust (cm)</th>
                  <th className="font-body text-[9px] tracking-[0.3em] uppercase text-charcoal/40 text-left py-4 px-4">Waist (cm)</th>
                  <th className="font-body text-[9px] tracking-[0.3em] uppercase text-charcoal/40 text-left py-4 pl-4">Hip (cm)</th>
                </tr>
              </thead>
              <tbody>
                {swimSizes.map((row, i) => (
                  <tr key={row.size} className={`border-b border-[#EDE5DC] ${i % 2 === 0 ? "bg-white" : "bg-blush/30"}`}>
                    <td className="font-body text-[13px] font-semibold text-charcoal py-4 pr-6">{row.size}</td>
                    <td className="font-body text-[13px] text-charcoal/60 py-4 px-4">{row.bust}</td>
                    <td className="font-body text-[13px] text-charcoal/60 py-4 px-4">{row.waist}</td>
                    <td className="font-body text-[13px] text-charcoal/60 py-4 px-4">{row.hip}</td>
                    <td className="font-body text-[13px] text-charcoal/60 py-4 px-4">{row.bustCm}</td>
                    <td className="font-body text-[13px] text-charcoal/60 py-4 px-4">{row.waistCm}</td>
                    <td className="font-body text-[13px] text-charcoal/60 py-4 pl-4">{row.hipCm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bodywear Size Chart */}
        <section>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-charcoal mb-10 leading-none">
            Bodywear Sizing
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[400px]">
              <thead>
                <tr className="border-b-2 border-[#EDE5DC]">
                  <th className="font-body text-[9px] tracking-[0.3em] uppercase text-charcoal/40 text-left py-4 pr-6">Size</th>
                  <th className="font-body text-[9px] tracking-[0.3em] uppercase text-charcoal/40 text-left py-4 px-4">Bust</th>
                  <th className="font-body text-[9px] tracking-[0.3em] uppercase text-charcoal/40 text-left py-4 px-4">Waist</th>
                  <th className="font-body text-[9px] tracking-[0.3em] uppercase text-charcoal/40 text-left py-4 pl-4">Hip</th>
                </tr>
              </thead>
              <tbody>
                {bodywearSizes.map((row, i) => (
                  <tr key={row.size} className={`border-b border-[#EDE5DC] ${i % 2 === 0 ? "bg-white" : "bg-blush/30"}`}>
                    <td className="font-body text-[13px] font-semibold text-charcoal py-4 pr-6">{row.size}</td>
                    <td className="font-body text-[13px] text-charcoal/60 py-4 px-4">{row.bust}</td>
                    <td className="font-body text-[13px] text-charcoal/60 py-4 px-4">{row.waist}</td>
                    <td className="font-body text-[13px] text-charcoal/60 py-4 pl-4">{row.hip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Fit Notes */}
        <section className="bg-blush p-10 sm:p-14 space-y-8">
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] text-charcoal leading-none">
            Fit Notes
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {[
              { style: "One-Pieces", note: "Our one-pieces are designed with adjustable ties and stretch fabric for a customised fit. If you have a longer torso (above 5'8\"), size up." },
              { style: "Bikini Sets", note: "Tops and bottoms can be sized separately. Mix and match to get the perfect fit for your shape." },
              { style: "Bodysuits", note: "Our bodysuits run true to size with a slight compression fit. If you prefer a looser feel, size up." },
              { style: "Still Unsure?", note: "Email us at fit@sikavia.com or use our live chat — our fit specialists reply within 2 hours." },
            ].map(({ style, note }) => (
              <div key={style} className="space-y-2">
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-terracotta">{style}</p>
                <p className="font-body text-[13px] text-charcoal/60 leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <p className="font-body text-[13px] text-charcoal/45 mb-6">Still have questions about sizing?</p>
          <Link
            href="/faq"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-charcoal font-body text-[10px] tracking-[0.3em] uppercase text-white hover:bg-espresso transition-colors duration-300"
          >
            View FAQ
          </Link>
        </div>

      </div>
    </div>
  );
}
