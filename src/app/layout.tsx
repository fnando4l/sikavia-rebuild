import type { Metadata } from "next";
import { Cormorant_Garamond, Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar }          from "@/components/layout/Navbar";
import { CartDrawer }      from "@/components/layout/CartDrawer";
import { Footer }          from "@/components/layout/Footer";
import { CustomCursor }    from "@/components/layout/CustomCursor";
import { Preloader }       from "@/components/layout/Preloader";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sikavia — Elevated Swimwear & Bodywear",
    template: "%s | Sikavia",
  },
  description:
    "Shop Sikavia's collection of elevated swimwear and bodywear, crafted for every curve and every moment.",
  openGraph: { siteName: "Sikavia", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${poppins.variable}`}>
      <body className="antialiased bg-cream text-charcoal font-body flex flex-col min-h-screen cursor-none">
        <Preloader />
        <CustomCursor />

        <AnnouncementBar />
        <Navbar />
        <CartDrawer />

        <main className="flex-1">{children}</main>

        <Footer />

        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              fontFamily: "var(--font-body)",
              fontSize: "0.8rem",
              borderRadius: "0",
              background: "#232323",
              color: "#fff",
              letterSpacing: "0.05em",
            },
            success: { iconTheme: { primary: "#C2785A", secondary: "#fff" } },
          }}
        />
      </body>
    </html>
  );
}
