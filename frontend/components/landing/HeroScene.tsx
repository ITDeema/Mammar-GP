"use client";

import { useEffect, useRef } from "react";
import { IconCheck } from "@/components/landing/Icons";
import { useCopy } from "@/components/landing/useCopy";

// The animated site-plan illustration in the hero: a plot, a building,
// sun path, wind and the heat on each façade. Purely illustrative.
export default function HeroScene() {
  const copy = useCopy().hero;
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      svgRef.current?.pauseAnimations();
    }
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[620px]">
      <div
        className="transition-transform duration-300 ease-out"
        style={{
          transform:
            "translate(calc(var(--px, 0) * 8px), calc(var(--py, 0) * 6px))",
        }}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 560 520"
          className="h-auto w-full"
          role="img"
          aria-label={copy.example}
        >
          <defs>
            <radialGradient id="hs-sun" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F6D9A8" stopOpacity="1" />
              <stop offset="35%" stopColor="#E3B97F" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#C08649" stopOpacity="0" />
            </radialGradient>
            <filter id="hs-blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
            <path id="hs-sun-path" d="M 56 262 Q 280 -34 504 262" />
          </defs>

          {/* radar rings, echoing the ripple in the logo */}
          <g className="lp-spin-slow" opacity="0.55">
            <circle cx="280" cy="270" r="246" fill="none" stroke="#F6F4EF" strokeOpacity="0.14" strokeDasharray="2 9" />
            <circle cx="280" cy="270" r="196" fill="none" stroke="#C08649" strokeOpacity="0.22" strokeDasharray="1 7" />
          </g>
          <ellipse className="lp-ripple" cx="280" cy="400" rx="190" ry="54" fill="none" stroke="#C08649" strokeOpacity="0.6" strokeWidth="1.5" />
          <ellipse className="lp-ripple" style={{ ["--d" as string]: "2s" }} cx="280" cy="400" rx="190" ry="54" fill="none" stroke="#C08649" strokeOpacity="0.6" strokeWidth="1.5" />
          <ellipse className="lp-ripple" style={{ ["--d" as string]: "4s" }} cx="280" cy="400" rx="190" ry="54" fill="none" stroke="#C08649" strokeOpacity="0.6" strokeWidth="1.5" />

          {/* street and neighbours */}
          <rect x="0" y="462" width="560" height="38" fill="#F6F4EF" fillOpacity="0.05" />
          <line x1="0" y1="481" x2="560" y2="481" stroke="#F6F4EF" strokeOpacity="0.25" strokeDasharray="14 12" />
          <g fill="#F6F4EF" fillOpacity="0.06" stroke="#F6F4EF" strokeOpacity="0.16">
            <rect x="26" y="150" width="78" height="96" rx="2" />
            <rect x="468" y="112" width="68" height="84" rx="2" />
            <rect x="34" y="312" width="70" height="112" rx="2" />
            <rect x="478" y="300" width="58" height="112" rx="2" />
          </g>

          {/* plot boundary and setback line */}
          <polygon points="130,215 420,185 462,392 150,424" fill="#F6F4EF" fillOpacity="0.05" stroke="#F6F4EF" strokeOpacity="0.45" strokeDasharray="6 6" />
          <polygon points="158,238 398,214 434,372 176,398" fill="none" stroke="#D19A58" strokeOpacity="0.65" strokeDasharray="3 5" />

          {/* heat on each façade */}
          <g filter="url(#hs-blur)" strokeLinecap="round" strokeWidth="15" fill="none">
            <line className="lp-pulse" x1="200" y1="262" x2="360" y2="246" stroke="#3E7CB1" />
            <line className="lp-pulse" style={{ ["--d" as string]: "1.2s" }} x1="360" y1="246" x2="372" y2="330" stroke="#E3B97F" />
            <polyline className="lp-pulse" style={{ ["--d" as string]: "2.2s" }} points="214,380 304,372" stroke="#F2C27E" />
            <polyline className="lp-pulse" style={{ ["--d" as string]: "2.2s" }} points="300,336 372,330" stroke="#F2C27E" />
            <line className="lp-pulse" style={{ ["--d" as string]: "3s" }} x1="200" y1="262" x2="214" y2="380" stroke="#E8A95F" />
          </g>

          {/* building footprint */}
          <polygon points="200,262 360,246 372,330 300,336 304,372 214,380" fill="#0B3A63" stroke="#F6F4EF" strokeOpacity="0.9" strokeWidth="1.5" strokeLinejoin="round" />
          <polyline points="214,282 346,268 354,318" fill="none" stroke="#F6F4EF" strokeOpacity="0.18" />

          {/* façade letters */}
          <g fill="#F6F4EF" fillOpacity="0.75" fontSize="13" fontWeight="700" textAnchor="middle">
            <text x="280" y="168">N</text>
            <text x="252" y="418">S</text>
            <text x="452" y="296">E</text>
            <text x="112" y="322">W</text>
          </g>

          {/* wind */}
          <g fill="none" stroke="#7FB2E5" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round">
            <path className="lp-flow" d="M 30 96 C 130 66, 214 126, 314 96 S 464 66, 548 106" />
            <path className="lp-flow" style={{ animationDelay: "-0.8s" }} d="M 30 122 C 130 92, 214 152, 314 122 S 464 92, 548 132" strokeOpacity="0.4" />
            <path className="lp-flow" style={{ animationDelay: "-1.6s" }} d="M 30 148 C 130 118, 214 178, 314 148 S 464 118, 548 158" strokeOpacity="0.28" />
          </g>

          {/* sun and its path */}
          <use href="#hs-sun-path" fill="none" stroke="#D19A58" strokeOpacity="0.55" strokeDasharray="3 8" />
          <g>
            <circle r="34" fill="url(#hs-sun)" />
            <circle r="11" fill="#F6D9A8" />
            <animateMotion dur="14s" repeatCount="indefinite" rotate="0">
              <mpath href="#hs-sun-path" />
            </animateMotion>
          </g>

          {/* compass */}
          <g transform="translate(500 66)">
            <circle r="26" fill="none" stroke="#F6F4EF" strokeOpacity="0.3" />
            <polygon points="0,-20 6,4 0,0 -6,4" fill="#C08649" />
            <text y="-30" textAnchor="middle" fontSize="11" fontWeight="700" fill="#F6F4EF" fillOpacity="0.75">N</text>
          </g>
        </svg>
      </div>

      {/* floating indicator cards */}
      <div
        className="absolute start-0 top-[34%] transition-transform duration-300 ease-out"
        style={{ transform: "translate(calc(var(--px, 0) * -16px), calc(var(--py, 0) * -10px))" }}
      >
        <div className="lp-float rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5 text-white shadow-2xl backdrop-blur-md" style={{ ["--d" as string]: "0s" }}>
          <p className="text-[11px] text-white/70">{copy.chipShade}</p>
          <p className="font-heading text-lg font-bold text-gold-300"><bdi>{copy.chipShadeValue}</bdi></p>
        </div>
      </div>

      <div
        className="absolute bottom-[16%] start-[2%] transition-transform duration-300 ease-out"
        style={{ transform: "translate(calc(var(--px, 0) * -20px), calc(var(--py, 0) * 12px))" }}
      >
        <div className="lp-float min-w-[180px] rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5 text-white shadow-2xl backdrop-blur-md" style={{ ["--d" as string]: "1.4s" }}>
          <p className="text-[11px] text-white/70">{copy.chipSolar}</p>
          <p className="font-heading text-lg font-bold text-gold-300"><bdi>{copy.chipSolarValue}</bdi></p>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-pill bg-white/15">
            <div className="h-full w-[88%] rounded-pill bg-gradient-to-r from-gold-500 to-gold-300" />
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-[3%] end-[2%] transition-transform duration-300 ease-out"
        style={{ transform: "translate(calc(var(--px, 0) * 18px), calc(var(--py, 0) * 12px))" }}
      >
        <div className="lp-float flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-2xl backdrop-blur-md" style={{ ["--d" as string]: "2.6s" }}>
          <span className="flex h-6 w-6 items-center justify-center rounded-pill bg-success-500 text-white">
            <IconCheck className="h-4 w-4" strokeWidth={2.6} />
          </span>
          {copy.chipCode}
        </div>
      </div>

      <p className="absolute -bottom-6 start-1/2 -translate-x-1/2 text-[11px] tracking-wide text-white/45 rtl:translate-x-1/2">
        {copy.example}
      </p>
    </div>
  );
}
