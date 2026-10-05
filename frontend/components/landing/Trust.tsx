"use client";

import { IconDatabase, IconEye, IconInfo, IconShield } from "@/components/landing/Icons";
import Reveal from "@/components/landing/Reveal";
import { useCopy } from "@/components/landing/useCopy";

const ICONS = [IconDatabase, IconShield, IconEye];

export default function Trust() {
  const c = useCopy().trust;
  return (
    <section className="bg-stone-100 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <p className="mb-4 flex items-center gap-3 text-sm font-bold text-gold-700">
            <span className="h-px w-10 bg-gold-500" aria-hidden="true" />
            {c.kicker}
          </p>
          <h2 className="font-heading text-3xl font-bold leading-[1.4] text-navy-900 sm:text-5xl sm:leading-[1.3]">
            {c.title}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {c.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={item.title} delay={i * 110}>
                <div className="h-full rounded-2xl border border-navy-900/10 bg-white p-7">
                  <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-gold-300">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="font-heading text-xl font-bold text-navy-900">{item.title}</h3>
                  <p className="mt-2 leading-7 text-navy-900/70">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={150}>
          <p className="mt-8 flex items-start gap-3 rounded-2xl border border-gold-500/40 bg-gold-50 p-5 text-[0.95rem] leading-7 text-navy-900/85">
            <IconInfo className="mt-1 h-5 w-5 shrink-0 text-gold-700" />
            {c.disclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
