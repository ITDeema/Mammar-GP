"use client";

import Card from "@/components/Card";
import type { Facade, SiteIndicators } from "@/lib/analysis-detail";
import { fill, useResultsCopy } from "@/lib/results-copy";

// Where each side of the compass points, clockwise from north.
const BEARING: Record<Facade, number> = {
  north: 0,
  northeast: 45,
  east: 90,
  southeast: 135,
  south: 180,
  southwest: 225,
  west: 270,
  northwest: 315,
};
// A small compass. The arrow points the way the wind blows, so it starts
// on the side the wind comes from. Shown to everyone.
export default function WindCard({ site }: { site: SiteIndicators }) {
  const c = useResultsCopy();
  const angle = (BEARING[site.windFrom] + 180) % 360;
  const labelClass = (facade: Facade) =>
    facade === site.windFrom
      ? "fill-gold-700 text-[10px] font-bold"
      : "fill-navy-900/70 text-[10px]";

  return (
    <Card>
      <h2 className="text-sm font-bold">{c.wind.title}</h2>
      <div className="mt-4 flex items-center gap-4">
        <svg
          viewBox="0 0 140 140"
          role="img"
          aria-label={c.wind.diagram}
          className="h-36 w-36 shrink-0"
        >
          <circle cx={70} cy={70} r={44} className="fill-navy-50 stroke-navy-900/15" strokeWidth={1.5} />
          <text x={70} y={14} textAnchor="middle" className={labelClass("north")}>
            {c.facade.names.north}
          </text>
          <text x={70} y={133} textAnchor="middle" className={labelClass("south")}>
            {c.facade.names.south}
          </text>
          <text x={14} y={74} textAnchor="middle" className={labelClass("west")}>
            {c.facade.names.west}
          </text>
          <text x={126} y={74} textAnchor="middle" className={labelClass("east")}>
            {c.facade.names.east}
          </text>
          <g transform={`rotate(${angle} 70 70)`}>
            <circle cx={70} cy={98} r={3.5} className="fill-navy-700" />
            <line x1={70} y1={98} x2={70} y2={50} className="stroke-gold-600" strokeWidth={3} strokeLinecap="round" />
            <polygon points="70,34 60,54 80,54" className="fill-gold-600" />
          </g>
        </svg>
        <div className="min-w-0">
          <p className="text-sm font-semibold">{fill(c.wind.from, { facade: c.facade.names[site.windFrom] })}</p>
          <p className="mt-1 text-sm">
            <span className="text-navy-900/70">{c.site.windSpeed}: </span>
            <bdi className="font-semibold">{site.windSpeed} m/s</bdi>
          </p>
          <p className="mt-2 text-xs leading-6 text-navy-900/70">{c.wind.hint}</p>
        </div>
      </div>
    </Card>
  );
}
