"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent, ReactNode } from "react";
import { IconCheck, IconPin, IconShield } from "@/components/landing/Icons";
import Reveal from "@/components/landing/Reveal";
import { useCopy } from "@/components/landing/useCopy";

/* ---------- helpers ---------- */

// true only while the element is on screen and the user allows motion
function useActive(ref: React.RefObject<HTMLElement | null>) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      threshold: 0.3,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return active;
}

function useCycle(length: number, ms: number, active: boolean, start = 0) {
  const [index, setIndex] = useState(start);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % length), ms);
    return () => clearInterval(id);
  }, [active, length, ms]);
  return index;
}

function Card({
  className = "",
  visualClass = "min-h-[200px]",
  title,
  text,
  children,
}: {
  className?: string;
  visualClass?: string; // height of the illustration area
  title: string;
  text: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`lp-card flex flex-col overflow-hidden rounded-2xl border border-navy-900/10 bg-white p-6 sm:p-7 ${className}`}
    >
      <div className={`relative mb-6 flex-1 ${visualClass}`}>{children}</div>
      <h3 className="font-heading text-xl font-bold text-navy-900">{title}</h3>
      <p className="mt-2 text-[0.95rem] leading-7 text-navy-900/70">{text}</p>
    </div>
  );
}

/* ---------- card visuals ---------- */

function PlotVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-xl bg-navy-50">
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <pattern id="fv-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" fill="none" stroke="#072A4A" strokeOpacity="0.08" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#fv-grid)" />
        <path d="M-10 118 C 90 90, 150 140, 280 100" fill="none" stroke="#072A4A" strokeOpacity="0.12" strokeWidth="10" />
      </svg>
      <div className="absolute start-[38%] top-[44%]">
        <span className="lp-ripple absolute -inset-5 rounded-pill border border-gold-500" />
        <span className="lp-ripple absolute -inset-5 rounded-pill border border-gold-500" style={{ ["--d" as string]: "1.5s" }} />
        <span className="absolute -inset-2 rounded-md border-2 border-dashed border-gold-600/70 bg-gold-500/15" />
        <IconPin className="lp-pin-drop relative -mt-7 h-9 w-9 text-navy-900" strokeWidth={1.6} fill="#C08649" />
      </div>
      <p className="absolute bottom-3 start-3 rounded-pill bg-white px-3 py-1 text-[11px] font-bold text-navy-900 shadow-sm">
        24.71°N · 46.67°E
      </p>
    </div>
  );
}

const ENV_VALUES = [
  { bars: [0.44, 0.62, 0.71, 0.58], text: ["3.1", "62%", "0.71", "0.58"] },
  { bars: [0.69, 0.35, 0.55, 0.69], text: ["4.8", "35%", "0.55", "0.69"] },
  { bars: [0.91, 0.18, 0.42, 0.81], text: ["6.4", "18%", "0.42", "0.81"] },
  { bars: [0.84, 0.22, 0.48, 0.74], text: ["5.9", "22%", "0.48", "0.74"] },
];

function EnvVisual() {
  const c = useCopy().features.env;
  const ref = useRef<HTMLDivElement>(null);
  const active = useActive(ref);
  const facade = useCycle(4, 2600, active, 2);
  const data = ENV_VALUES[facade];

  return (
    <div ref={ref} className="absolute inset-0 flex flex-col gap-4 rounded-xl bg-navy-50 p-4 sm:p-5">
      <div className="flex gap-2">
        {c.facades.map((name, i) => (
          <span
            key={name}
            className={`flex-1 rounded-control border px-2 py-2 text-center text-xs font-bold transition-colors duration-500 ${i === facade ? "border-navy-900 bg-navy-900 text-white" : "border-navy-900/15 bg-white text-navy-900/70"}`}
          >
            {name}
          </span>
        ))}
      </div>
      <div className="grid flex-1 content-center gap-3.5">
        {c.metrics.map((metric, i) => (
          <div key={metric}>
            <div className="mb-1.5 flex justify-between text-xs">
              <span className="text-navy-900/70">{metric}</span>
              <span className="font-bold text-navy-900">{data.text[i]}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-pill bg-navy-900/10">
              <div
                className="lp-bar h-full rounded-pill bg-gradient-to-r from-navy-800 to-gold-500"
                style={{ transform: `scaleX(${data.bars[i]})` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AiVisual() {
  const rows = useCopy().features.ai.rows;
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-3 rounded-xl bg-navy-50 p-4">
      {rows.map((row, i) => (
        <div
          key={row}
          className="lp-row flex items-center gap-3 rounded-xl border border-navy-900/10 bg-white px-3.5 py-3 text-sm font-semibold text-navy-900 shadow-sm"
          style={{ ["--d" as string]: `${i * 0.9}s` }}
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-pill bg-gold-100 text-gold-700">
            <IconCheck className="h-4 w-4" strokeWidth={2.6} />
          </span>
          {row}
        </div>
      ))}
    </div>
  );
}

function CodeVisual() {
  const rows = useCopy().features.code.rows;
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-3 rounded-xl bg-navy-50 p-4">
      <div className="mb-1 flex items-center gap-2 text-navy-900">
        <IconShield className="h-6 w-6 text-gold-600" />
        <span className="h-px flex-1 bg-navy-900/15" />
      </div>
      {rows.map((row, i) => (
        <div
          key={row}
          className="lp-row flex items-center justify-between rounded-xl border border-navy-900/10 bg-white px-3.5 py-3 text-sm font-semibold text-navy-900 shadow-sm"
          style={{ ["--d" as string]: `${i * 0.9}s` }}
        >
          {row}
          <span className="flex h-6 w-6 items-center justify-center rounded-pill bg-success-50 text-success-500">
            <IconCheck className="h-4 w-4" strokeWidth={2.8} />
          </span>
        </div>
      ))}
    </div>
  );
}

function RolesVisual() {
  const c = useCopy().features.roles;
  const ref = useRef<HTMLDivElement>(null);
  const active = useActive(ref);
  const mode = useCycle(2, 3200, active);

  return (
    <div ref={ref} className="absolute inset-0 flex flex-col gap-4 rounded-xl bg-navy-50 p-4">
      <div className="grid grid-cols-2 gap-1 rounded-pill bg-navy-900/10 p-1 text-center text-xs font-bold">
        {[c.homeowner, c.architect].map((label, i) => (
          <span
            key={label}
            className={`rounded-pill px-3 py-2 transition-colors duration-500 ${mode === i ? "bg-navy-900 text-white" : "text-navy-900/70"}`}
          >
            {label}
          </span>
        ))}
      </div>
      <div key={mode} className="lp-swap flex flex-1 flex-col justify-center gap-2.5">
        {mode === 0 ? (
          <>
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-white px-3 py-3 shadow-sm">
                <span className="flex h-7 w-7 items-center justify-center rounded-pill bg-success-50 text-success-500">
                  <IconCheck className="h-4 w-4" strokeWidth={2.6} />
                </span>
                <span className="h-2.5 flex-1 rounded-pill bg-navy-900/15" />
              </div>
            ))}
          </>
        ) : (
          <>
            {[0.9, 0.55, 0.72, 0.4, 0.8].map((w, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="h-2 w-8 rounded-pill bg-navy-900/25" />
                <span className="h-2 rounded-pill bg-gradient-to-r from-navy-800 to-gold-500" style={{ width: `${w * 100}%` }} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

function ReportVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const active = useActive(ref);
  const arabic = useCycle(2, 2800, active) === 0;

  return (
    <div ref={ref} className="absolute inset-0 flex items-center justify-center rounded-xl bg-navy-50">
      <div key={String(arabic)} className="lp-swap relative h-[150px] w-[118px] rounded-lg border border-navy-900/15 bg-white p-3 shadow-lg" dir={arabic ? "rtl" : "ltr"}>
        <span className="absolute -top-3 end-3 rounded-pill bg-gold-500 px-2.5 py-1 text-[10px] font-extrabold text-navy-950">
          {arabic ? "AR" : "EN"}
        </span>
        <span className="block h-2.5 w-2/3 rounded-pill bg-navy-900" />
        <span className="mt-3 block h-1.5 w-full rounded-pill bg-navy-900/15" />
        <span className="mt-1.5 block h-1.5 w-5/6 rounded-pill bg-navy-900/15" />
        <span className="mt-1.5 block h-1.5 w-full rounded-pill bg-navy-900/15" />
        <span className="mt-4 flex gap-1.5">
          <span className="h-9 flex-1 rounded bg-gold-100" />
          <span className="h-9 flex-1 rounded bg-navy-100" />
        </span>
        <span className="mt-3 block h-1.5 w-3/4 rounded-pill bg-navy-900/15" />
      </div>
    </div>
  );
}

/* ---------- section ---------- */

export default function Features() {
  const c = useCopy().features;

  // gold glow that follows the pointer inside each card
  function handleMove(event: PointerEvent<HTMLDivElement>) {
    const card = (event.target as HTMLElement).closest<HTMLElement>(".lp-card");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    card.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <section id="features" className="bg-stone-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <p className="mb-4 flex items-center gap-3 text-sm font-bold text-gold-700">
            <span className="h-px w-10 bg-gold-500" aria-hidden="true" />
            {c.kicker}
          </p>
          <h2 className="font-heading text-3xl font-bold leading-[1.4] text-navy-900 sm:text-5xl sm:leading-[1.3]">
            {c.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-navy-900/70">{c.sub}</p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-6" onPointerMove={handleMove}>
          <Reveal className="md:col-span-2" delay={0}>
            <Card className="h-full" visualClass="min-h-[210px]" title={c.plot.title} text={c.plot.text}>
              <PlotVisual />
            </Card>
          </Reveal>
          <Reveal className="md:col-span-4" delay={100}>
            <Card className="h-full" visualClass="min-h-[270px]" title={c.env.title} text={c.env.text}>
              <EnvVisual />
            </Card>
          </Reveal>
          <Reveal className="md:col-span-3" delay={0}>
            <Card className="h-full" visualClass="min-h-[250px]" title={c.ai.title} text={c.ai.text}>
              <AiVisual />
            </Card>
          </Reveal>
          <Reveal className="md:col-span-3" delay={100}>
            <Card className="h-full" visualClass="min-h-[250px]" title={c.code.title} text={c.code.text}>
              <CodeVisual />
            </Card>
          </Reveal>
          <Reveal className="md:col-span-3" delay={0}>
            <Card className="h-full" visualClass="min-h-[250px]" title={c.roles.title} text={c.roles.text}>
              <RolesVisual />
            </Card>
          </Reveal>
          <Reveal className="md:col-span-3" delay={100}>
            <Card className="h-full" visualClass="min-h-[250px]" title={c.report.title} text={c.report.text}>
              <ReportVisual />
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
