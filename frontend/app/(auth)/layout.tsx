import type { ReactNode } from "react";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import SaduBand from "@/components/landing/SaduBand";

// Shared frame for login, sign-up and the other account screens.
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-6 px-4 py-10">
      <Link href="/" aria-label="معمار">
        <BrandLogo variant="full" height={92} alt="معمار" priority />
      </Link>
      {children}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 text-gold-500"
        aria-hidden="true"
      >
        <SaduBand opacity={0.35} />
      </div>
    </main>
  );
}