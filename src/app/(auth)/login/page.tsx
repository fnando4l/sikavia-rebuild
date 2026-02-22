import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = { title: "Sign In" };

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-cream">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="font-display text-3xl tracking-[0.18em] text-charcoal">
            SIKAVIA
          </Link>
          <h1 className="mt-6 font-display text-2xl text-charcoal">Welcome back</h1>
          <p className="mt-2 font-body text-sm text-muted">Sign in to your account</p>
        </div>

        <div className="bg-white p-8 border border-border">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
