"use client";

import { useRef } from "react";
import type { PointerEvent } from "react";
import Link from "next/link";
import HeroScene from "@/components/landing/HeroScene";
import { IconArrow, IconCheck } from "@/components/landing/Icons";
import SaduBand from "@/components/landing/SaduBand";
import { useCopy } from "@/components/landing/useCopy";

const delay = (ms: number) => ({ ["--d" as string]: `${ms}ms` });

export default function Hero() {
  const c = useCopy().hero;
  const ref = useRef<HTMLElement>(null);

  // Subtle parallax that follows the pointer (mouse only, never for reduced motion).
  function handleMove(event: PointerEvent<HTMLElement>) {
    const el = ref.current;
    if (!el || event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", String(((event.clientX - r.left) / r.width - 0.5) * 2));
    el.style.setProperty("--py", String(((event.clientY - r.top) / r.height - 0.5) * 2));
  }

  return (
    <section
      ref={ref}
      onPointerMove={handleMove}
      className="lp-hero relative isolate overflow-hidden text-stone-50"
    >
      <div className="lp-grid absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto grid min-h-[100svh] max-w-7xl items-center gap-14 px-6 pb-28 pt-28 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <div>
          <p
            className="lp-rise inline-flex items-center gap-2.5 rounded-pill border border-gold-400/40 bg-gold-500/10 px-4 py-2 text-sm text-gold-300"
            style={delay(0)}
          >
            <span className="relative flex h-2 w-2">
              <span className="lp-ripple absolute inset-0 rounded-pill bg-gold-400" />
              <span className="relative h-2 w-2 rounded-pill bg-gold-400" />
            </span>
            {c.eyebrow}
          </p>

          <h1
            className="lp-rise mt-7 font-heading text-[2.5rem] font-bold leading-[1.3] sm:text-6xl lg:text-[4.2rem]"
            style={delay(120)}
          >
            {c.titleBefore} <span className="lp-underline">{c.titleHighlight}</span>{" "}
            {c.titleAfter}
          </h1>

          <p
            className="lp-rise mt-7 max-w-xl text-lg leading-8 text-white/75"
            style={delay(260)}
          >
            {c.sub}
          </p>

          <div className="lp-rise mt-10 flex flex-wrap gap-4" style={delay(400)}>
            <Link
              href="/signup"
              className="lp-btn lp-btn-gold inline-flex items-center gap-3 rounded-control px-7 py-4 text-base font-bold"
            >
              {c.cta}
              <IconArrow className="lp-btn-arrow flip-rtl h-5 w-5" />
            </Link>
            <a
              href="#how"
              className="lp-btn inline-flex items-center rounded-control border border-white/25 px-7 py-4 text-base font-semibold text-white hover:bg-white/10"
            >
              {c.ctaSecondary}
            </a>
          </div>

          <ul
            className="lp-rise mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/70"
            style={delay(520)}
          >
            {c.points.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <IconCheck className="h-4 w-4 text-gold-400" strokeWidth={2.4} />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="lp-rise" style={delay(300)}>
          <HeroScene />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0" aria-hidden="true">
        <SaduBand className="text-gold-500" opacity={0.5} />
      </div>
      <a
        href="#sources"
        className="absolute bottom-14 start-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-white/50 hover:text-white/80 rtl:translate-x-1/2 lg:flex"
      >
        {c.scroll}
        <IconArrow className="lp-nudge h-4 w-4 rotate-90" />
      </a>
    </section>
  );
}
