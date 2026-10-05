"use client";

import { useCopy } from "@/components/landing/useCopy";

export default function SourcesMarquee() {
  const c = useCopy().sources;
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {c.items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-8 font-heading text-xl font-semibold text-navy-900/55 transition-colors hover:text-navy-900">
            {item}
          </span>
          <span className="h-2 w-2 rotate-45 bg-gold-500/70" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <section id="sources" className="border-b border-navy-900/10 bg-stone-50 py-10">
      <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.18em] text-gold-700">
        {c.label}
      </p>
      <div className="lp-marquee-mask overflow-hidden">
        <div className="lp-marquee">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
