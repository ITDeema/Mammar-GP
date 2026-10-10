import type { Tone } from "@/lib/analysis-detail";
import { TONE_TEXT } from "@/lib/tone-styles";

const CX = 100;
const CY = 100;
const R = 76;

// A point on the circle. Angle in degrees: 180 = far left, 90 = top, 0 = far right.
function point(angle: number, radius: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: CX + radius * Math.cos(rad), y: CY - radius * Math.sin(rad) };
}

// An arc drawn over the top, from angle a1 to angle a2.
function arc(a1: number, a2: number) {
  const start = point(a1, R);
  const end = point(a2, R);
  return `M ${start.x} ${start.y} A ${R} ${R} 0 0 1 ${end.x} ${end.y}`;
}

const ARCS = [
  { from: 180, to: 122, className: "stroke-success-500" },
  { from: 118, to: 62, className: "stroke-warning-400" },
  { from: 58, to: 0, className: "stroke-danger-500" },
];

type GaugeProps = {
  fraction: number; // 0 = far left (good), 1 = far right (bad)
  tone: Tone; // color of the level word
  label: string;
  levelText: string;
  valueText?: string;
  ariaLabel: string; // read by screen readers
};

// A half-circle gauge: green, yellow and red zones with a needle.
export default function Gauge({ fraction, tone, label, levelText, valueText, ariaLabel }: GaugeProps) {
  const f = Math.min(1, Math.max(0, fraction));
  return (
    <figure className="flex flex-col items-center text-center">
      <svg viewBox="0 0 200 112" role="img" aria-label={ariaLabel} className="w-full max-w-48">
        {ARCS.map((zone) => (
          <path key={zone.className} d={arc(zone.from, zone.to)} fill="none" strokeWidth={16} className={zone.className} />
        ))}
        {/* the needle is drawn pointing left, then turned by the value */}
        <g transform={`rotate(${f * 180} ${CX} ${CY})`}>
          <line x1={CX} y1={CY} x2={CX - 60} y2={CY} strokeWidth={3} strokeLinecap="round" className="stroke-navy-900" />
        </g>
        <circle cx={CX} cy={CY} r={6} className="fill-navy-900" />
      </svg>
      <figcaption className="mt-1">
        <span className="block text-xs text-navy-900/70">{label}</span>
        <span className={`block text-sm font-bold ${TONE_TEXT[tone]}`}>{levelText}</span>
        {valueText && (
          <bdi className="block text-xs text-navy-900/70">{valueText}</bdi>
        )}
      </figcaption>
    </figure>
  );
}
