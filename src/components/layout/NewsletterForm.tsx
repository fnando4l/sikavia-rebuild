"use client";

export function NewsletterForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex gap-0">
      <input
        type="email"
        placeholder="Enter your email"
        className="flex-1 min-w-0 bg-white/5 border border-white/15 px-4 py-2.5 font-body text-[12px] text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-colors"
      />
      <button
        type="submit"
        className="flex-shrink-0 border border-l-0 border-white/15 px-5 py-2.5 font-body text-[10px] tracking-[0.25em] uppercase text-white/70 hover:bg-white/5 hover:text-white transition-all"
      >
        Join
      </button>
    </form>
  );
}
