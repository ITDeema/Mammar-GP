"use client";

import { useState } from "react";
import { IconPlus } from "@/components/landing/Icons";
import Reveal from "@/components/landing/Reveal";
import { useCopy } from "@/components/landing/useCopy";

export default function Faq() {
  const c = useCopy().faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-stone-50 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.7fr_1.3fr]">
        <Reveal>
          <p className="mb-4 flex items-center gap-3 text-sm font-bold text-gold-700">
            <span className="h-px w-10 bg-gold-500" aria-hidden="true" />
            {c.kicker}
          </p>
          <h2 className="font-heading text-3xl font-bold leading-[1.4] text-navy-900 sm:text-5xl sm:leading-[1.3]">
            {c.title}
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="divide-y divide-navy-900/10 border-y border-navy-900/10">
            {c.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q} className="lp-faq" data-open={isOpen}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-6 text-start font-heading text-lg font-bold text-navy-900 transition-colors hover:text-gold-700 sm:text-xl"
                    >
                      {item.q}
                      <span className="lp-faq-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-pill border border-navy-900/20">
                        <IconPlus className="h-4 w-4" />
                      </span>
                    </button>
                  </h3>
                  <div id={`faq-panel-${i}`} role="region" className="lp-faq-panel">
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-6 leading-8 text-navy-900/70">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
