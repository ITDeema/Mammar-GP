"use client";

import { useEffect, useRef } from "react";
import { useCopy } from "@/components/landing/useCopy";

// Words light up one by one as the paragraph scrolls through the screen.
export default function Manifesto() {
  const c = useCopy().manifesto;
  const ref = useRef<HTMLParagraphElement>(null);
  const words = c.text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLElement>(".lp-word"));
    let frame = 0;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (vh * 0.9 - rect.top) / (rect.height + vh * 0.4)));
      const lit = progress * spans.length * 1.2;
      spans.forEach((span, i) => {
        const o = Math.min(1, Math.max(0.16, lit - i + 0.16));
        span.style.setProperty("--o", o.toFixed(2));
      });
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [c.text]);

  return (
    <section className="bg-stone-50 py-28 sm:py-36">
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-8 flex items-center gap-3 text-sm font-bold text-gold-700">
          <span className="h-px w-10 bg-gold-500" aria-hidden="true" />
          {c.kicker}
        </p>
        <p
          ref={ref}
          className="font-heading text-[1.7rem] font-semibold leading-[1.75] text-navy-900 sm:text-4xl sm:leading-[1.7] lg:text-[2.6rem]"
        >
          {words.map((word, i) => (
            <span key={`${word}-${i}`} className="lp-word">
              {word}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
