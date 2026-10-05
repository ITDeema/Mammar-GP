"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { IconCheck } from "@/components/landing/Icons";
import Reveal from "@/components/landing/Reveal";
import { useCopy } from "@/components/landing/useCopy";
import type { LandingCopy } from "@/lib/landing-copy";

type Mode = "homeowner" | "architect";

function HomeownerMock({ m }: { m: LandingCopy["audiences"]["mock"] }) {
  return (
    <div className="flex flex-col gap-4 p-5 sm:p-7">
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-pill bg-success-50 text-success-500">
          <IconCheck className="h-6 w-6" strokeWidth={2.6} />
        </span>
        <div>
          <p className="font-heading text-lg font-bold text-navy-900">{m.ready}</p>
          <p className="text-sm text-navy-900/60">{m.readySub}</p>
        </div>
      </div>
      {m.decisions.map((decision, i) => (
        <div
          key={decision}
          className="lp-swap flex items-center justify-between gap-3 rounded-xl border border-navy-900/10 bg-stone-50 px-4 py-3.5"
          style={{ animationDelay: `${0.08 * (i + 1)}s` }}
        >
          <span className="flex items-center gap-3 text-[0.95rem] font-semibold text-navy-900">
            <span className="flex h-7 w-7 items-center justify-center rounded-pill bg-navy-900 text-xs font-bold text-white">
              {i + 1}
            </span>
            {decision}
          </span>
          <span className="shrink-0 rounded-pill bg-success-50 px-3 py-1 text-[11px] font-bold text-success-500">
            {m.ok}
          </span>
        </div>
      ))}
    </div>
  );
}

function ArchitectMock({ m }: { m: LandingCopy["audiences"]["mock"] }) {
  const bars = [0.91, 0.18, 0.42, 0.81];
  return (
    <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-7">
      <div className="rounded-xl border border-navy-900/10 bg-stone-50 p-4">
        <p className="mb-4 font-heading text-sm font-bold text-navy-900">{m.facade}</p>
        <div className="grid gap-3.5">
          {m.metrics.map((metric, i) => (
            <div key={metric}>
              <div className="mb-1.5 flex justify-between text-xs">
                <span className="text-navy-900/65">{metric}</span>
                <span className="font-bold text-navy-900"><bdi>{m.values[i]}</bdi></span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-pill bg-navy-900/10">
                <div
                  className="h-full rounded-pill bg-gradient-to-r from-navy-800 to-gold-500"
                  style={{ width: `${bars[i] * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="rounded-xl border border-navy-900/10 bg-stone-50 p-4">
          <p className="mb-3 font-heading text-sm font-bold text-navy-900">{m.constraints}</p>
          <dl className="grid gap-2 text-xs">
            {m.constraintRows.map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <dt className="text-navy-900/65">{label}</dt>
                <dd className="font-bold text-navy-900"><bdi>{value}</bdi></dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid gap-2">
          {m.decisions.map((decision) => (
            <div
              key={decision}
              className="flex items-center justify-between gap-2 rounded-lg border border-navy-900/10 bg-white px-3 py-2.5 text-xs font-semibold text-navy-900"
            >
              {decision}
              <IconCheck className="h-4 w-4 shrink-0 text-success-500" strokeWidth={2.8} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Audiences() {
  const c = useCopy().audiences;
  const [mode, setMode] = useState<Mode>("homeowner");
  const active = c[mode];
  const tabs: { id: Mode; label: string }[] = [
    { id: "homeowner", label: c.homeowner.tab },
    { id: "architect", label: c.architect.tab },
  ];

  return (
    <section id="audiences" className="bg-stone-50 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="mb-4 flex items-center gap-3 text-sm font-bold text-gold-700">
            <span className="h-px w-10 bg-gold-500" aria-hidden="true" />
            {c.kicker}
          </p>
          <h2 className="font-heading text-3xl font-bold leading-[1.4] text-navy-900 sm:text-5xl sm:leading-[1.3]">
            {c.title}
          </h2>

          <div
            role="tablist"
            className="relative mt-9 inline-grid grid-cols-2 rounded-pill bg-navy-900/8 p-1.5"
            style={{ ["--i" as string]: mode === "architect" ? 1 : 0 } as CSSProperties}
          >
            <span
              className="lp-switch-thumb absolute inset-y-1.5 start-1.5 w-[calc(50%-6px)] rounded-pill bg-navy-900 shadow-lg"
              style={{ transform: "translateX(calc(var(--dx) * 100% * var(--i)))" }}
              aria-hidden="true"
            />
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={mode === tab.id}
                onClick={() => setMode(tab.id)}
                className={`relative z-10 rounded-pill px-8 py-3 text-sm font-bold transition-colors duration-300 ${mode === tab.id ? "text-white" : "text-navy-900/70 hover:text-navy-900"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div key={mode} className="lp-swap mt-9">
            <h3 className="font-heading text-2xl font-bold text-navy-900">{active.heading}</h3>
            <ul className="mt-5 grid gap-3.5">
              {active.points.map((point) => (
                <li key={point} className="flex items-center gap-3 text-lg text-navy-900/80">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-pill bg-gold-100 text-gold-700">
                    <IconCheck className="h-4 w-4" strokeWidth={2.6} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal variant="scale" delay={120}>
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-gold-300/40 via-transparent to-navy-700/20 blur-2xl" aria-hidden="true" />
            <div className="overflow-hidden rounded-2xl border border-navy-900/15 bg-white shadow-[0_40px_80px_-30px_rgb(7_42_74/0.45)]">
              <div className="flex items-center gap-2 border-b border-navy-900/10 bg-navy-50 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-pill bg-navy-900/20" />
                <span className="h-2.5 w-2.5 rounded-pill bg-navy-900/20" />
                <span className="h-2.5 w-2.5 rounded-pill bg-navy-900/20" />
                <span className="mx-auto font-heading text-xs font-bold text-navy-900/70">{c.mock.title}</span>
                <span className="rounded-pill bg-gold-100 px-2.5 py-1 text-[10px] font-bold text-gold-700">
                  {c.mock.example}
                </span>
              </div>
              <div key={mode} className="lp-swap min-h-[360px]">
                {mode === "homeowner" ? <HomeownerMock m={c.mock} /> : <ArchitectMock m={c.mock} />}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
