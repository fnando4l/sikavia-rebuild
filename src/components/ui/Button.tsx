import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
type Size = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[#232323] text-white hover:bg-[#3D1F0D] active:bg-[#232323] shadow-sm",
  secondary:
    "bg-[#C2785A] text-white hover:bg-[#A5634A] active:bg-[#C2785A] shadow-sm",
  outline:
    "border border-[#232323] text-[#232323] hover:bg-[#232323] hover:text-white",
  ghost:
    "text-[#232323] hover:bg-[#F5E6DC]",
  destructive:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-600",
};

const sizeClasses: Record<Size, string> = {
  sm:   "px-3 py-1.5 text-xs",
  md:   "px-5 py-2.5 text-sm",
  lg:   "px-8 py-3.5 text-base",
  icon: "p-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-none font-body font-medium tracking-wide",
          "transition-all duration-200 ease-out",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2785A] focus-visible:ring-offset-2",
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>Loading…</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
