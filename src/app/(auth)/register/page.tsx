import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = { title: "Create Account" };

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-cream">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="font-display text-3xl tracking-[0.18em] text-charcoal">
            SIKAVIA
          </Link>
          <h1 className="mt-6 font-display text-2xl text-charcoal">Create an account</h1>
          <p className="mt-2 font-body text-sm text-muted">
            Join Sikavia and enjoy exclusive benefits
          </p>
        </div>

        <div className="bg-white p-8 border border-border">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
