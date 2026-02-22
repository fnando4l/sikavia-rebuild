import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "sale" | "new" | "soldout" | "success";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default:  "bg-[#F5E6DC] text-[#3D1F0D]",
  sale:     "bg-[#C2785A] text-white",
  new:      "bg-[#232323] text-white",
  soldout:  "bg-gray-300 text-gray-600",
  success:  "bg-green-100 text-green-800",
};

export function Badge({ variant = "default", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-2.5 py-0.5 text-[10px] font-body font-semibold uppercase tracking-widest",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
