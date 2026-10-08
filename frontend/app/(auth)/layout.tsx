
import type { ReactNode } from "react";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import SaduBand from "@/components/landing/SaduBand";

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    

<main className="flex min-h-dvh items-center justify-center bg-navy-50 lg:h-dvh">


      <div className="grid w-full overflow-hidden bg-white md:grid-cols-2 lg:h-full lg:min-h-0">



        {/* Brand section */}
        <section className="relative flex flex-col items-center justify-center gap-5 overflow-hidden bg-navy-900 px-6 py-10 text-center md:px-10">
          <Link href="/" aria-label="معمار">
            <BrandLogo
              variant="full"
              tone="light"
              height={115}
              alt="معمار"
              priority
            />
          </Link>

          <p className="text-sm text-white/80">
            نقرأ الأرض لـنصنع الـقرار
          </p>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 text-gold-500"
            aria-hidden="true"
          >
            <SaduBand opacity={0.35} />
          </div>
        </section>

        {/* Form section */}
        <section className="flex items-center justify-center px-5 py-8 sm:px-8 md:px-10">
          <div className="w-full max-w-md">
            {children}
          </div>
        </section>

      </div>
    </main>
  );
}
