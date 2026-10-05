"use client";

import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { IconArrow } from "@/components/landing/Icons";
import Reveal from "@/components/landing/Reveal";
import SaduBand from "@/components/landing/SaduBand";
import { useCopy } from "@/components/landing/useCopy";

export default function FinalCta() {
  const c = useCopy().cta;
  return (
    <section className="lp-hero relative isolate overflow-hidden py-28 text-center text-white sm:py-36">
      <div className="lp-grid absolute inset-0 -z-10" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center" aria-hidden="true">
        {[0, 1.6, 3.2].map((delay) => (
          <span
            key={delay}
            className="lp-ripple absolute h-[34rem] w-[34rem] rounded-pill border border-gold-500/60"
            style={{ ["--d" as string]: `${delay}s` }}
          />
        ))}
      </div>

      <Reveal className="mx-auto max-w-3xl px-6">
        <div className="mb-8 flex justify-center">
          <BrandLogo variant="full" tone="light" height={120} alt="معمار" />
        </div>
        <h2 className="font-heading text-3xl font-bold leading-[1.4] sm:text-5xl sm:leading-[1.3]">
          {c.title}
        </h2>
        <p className="mt-5 text-lg text-white/70">{c.sub}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/signup"
            className="lp-btn lp-btn-gold inline-flex items-center gap-3 rounded-control px-8 py-4 text-base font-bold"
          >
            {c.primary}
            <IconArrow className="lp-btn-arrow flip-rtl h-5 w-5" />
          </Link>
          <Link
            href="/login"
            className="lp-btn inline-flex items-center rounded-control border border-white/25 px-8 py-4 text-base font-semibold hover:bg-white/10"
          >
            {c.secondary}
          </Link>
        </div>
      </Reveal>

      <div className="absolute inset-x-0 bottom-0" aria-hidden="true">
        <SaduBand className="text-gold-500" opacity={0.5} />
      </div>
    </section>
  );
}
