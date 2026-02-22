import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-body font-semibold uppercase tracking-widest text-[#232323]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full border border-[#E8DDD6] bg-white px-4 py-3 text-sm font-body",
            "text-[#232323] placeholder:text-[#7A6A62]",
            "transition-colors duration-150",
            "focus:border-[#232323] focus:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-60",
            error && "border-red-500 focus:border-red-500",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-600 font-body">{error}</p>
        )}
        {hint && !error && (
          <p className="text-xs text-[#7A6A62] font-body">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
