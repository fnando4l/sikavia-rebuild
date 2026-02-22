const items = [
  "Complimentary Worldwide Shipping",
  "Every Body  XS–3X",
  "Conscious Luxury Fabrics",
  "Effortless 30-Day Returns",
  "New Arrivals Every Week",
  "Crafted with Care",
];

export function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="bg-blush border-y border-[#E5D4C8] overflow-hidden py-3 select-none">
      <div
        className="flex w-max"
        style={{ animation: "marquee 30s linear infinite" }}
      >
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-7 flex-shrink-0 px-7">
            <span className="font-body text-[10px] tracking-[0.3em] uppercase text-espresso/50 whitespace-nowrap">
              {item}
            </span>
            <span className="text-rose text-xs">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
