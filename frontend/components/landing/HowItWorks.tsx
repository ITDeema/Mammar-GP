"use client";

import { useEffect, useRef } from "react";
import {
  IconDatabase,
  IconPin,
  IconShield,
  IconSpark,
} from "@/components/landing/Icons";
import Reveal from "@/components/landing/Reveal";
import { useCopy } from "@/components/landing/useCopy";

const ICONS = [IconPin, IconDatabase, IconSpark, IconShield];

export default function HowItWorks() {
  const c = useCopy().how;
  const trackRef = useRef<HTMLOListElement>(null);

  // The gold line grows, and each step lights up, as you scroll down the list.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const steps = Array.from(track.querySelectorAll<HTMLElement>(".lp-step"));
    let frame = 0;

    const update = () => {
      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const line = vh * 0.62;
      const progress = Math.min(1, Math.max(0, (line - rect.top) / rect.height));
      track.style.setProperty("--p", progress.toFixed(3));
      steps.forEach((step) => {
        const r = step.getBoundingClientRect();
        step.dataset.active = String(r.top + r.height * 0.35 < line);
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
  }, [c.title]);

  return (
    <section id="how" className="relative overflow-hidden bg-navy-900 py-24 text-white sm:py-32">
      <div className="lp-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="mb-4 flex items-center gap-3 text-sm font-bold text-gold-400">
            <span className="h-px w-10 bg-gold-500" aria-hidden="true" />
            {c.kicker}
          </p>
          <h2 className="font-heading text-3xl font-bold leading-[1.4] sm:text-5xl sm:leading-[1.3]">
            {c.title}
          </h2>
        </Reveal>

        <ol ref={trackRef} className="relative flex flex-col gap-14">
          <span className="absolute bottom-4 top-4 w-px bg-white/15 start-7" aria-hidden="true" />
          <span
            className="lp-timeline-fill absolute bottom-4 top-4 w-px bg-gradient-to-b from-gold-300 to-gold-500 start-7"
            aria-hidden="true"
          />
          {c.steps.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <li key={step.title} className="lp-step relative flex gap-6" data-active="false">
                <span className="lp-step-num relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-pill border border-gold-500/60 bg-navy-900 font-heading text-lg font-bold text-gold-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="lp-step-body flex-1 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-7">
                  <Icon className="mb-4 h-7 w-7 text-gold-400" />
                  <h3 className="font-heading text-xl font-bold sm:text-2xl">{step.title}</h3>
                  <p className="mt-2 max-w-md leading-7 text-white/70">{step.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
