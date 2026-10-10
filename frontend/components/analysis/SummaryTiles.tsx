"use client";

import Card from "@/components/Card";
import LevelMeter from "@/components/analysis/LevelMeter";
import type { IndicatorsState } from "@/components/analysis/IndicatorsPanel";
import { buildSummary, formatMetric } from "@/lib/analysis-detail";
import { fill, useResultsCopy } from "@/lib/results-copy";
import type { Role } from "@/lib/user";

// Four quick tiles at the top of the dashboard. Homeowners see the level,
// architects see the number as well.
export default function SummaryTiles({ state, role }: { state: IndicatorsState; role: Role }) {
  const c = useResultsCopy();
  const detailed = role === "architect";

  // if the indicators failed, their own section already shows the error
  if (state.status === "error") return null;

  return (
    <section>
      <h2 className="text-sm font-bold">{c.summary.title}</h2>
      <p className="mb-3 mt-1 text-xs text-navy-900/70">{c.summary.hint}</p>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {state.status === "loading" &&
          [0, 1, 2, 3].map((n) => (
            <div key={n} className="h-28 animate-pulse rounded-card bg-navy-50" />
          ))}

        {state.status === "ready" &&
          buildSummary(state.data).map((item) => {
            const label = item.key === "noise" ? c.site.noise : c.indicators.metrics[item.key];
            const levelText = c.indicators.levels[item.level];
            const number =
              item.key === "noise"
                ? `${Math.round(item.value)} dB`
                : formatMetric(item.key, item.value);
            return (
              <Card key={item.key} className="flex flex-col gap-1 p-4">
                <p className="text-xs text-navy-900/70">{label}</p>
                <p className="mt-1 text-lg font-bold">
                  <bdi>{detailed ? number : levelText}</bdi>
                </p>
                <p className="min-h-4 text-xs text-navy-900/70">{detailed ? levelText : ""}</p>
                <div className="mt-2">
                  <LevelMeter
                    level={item.level}
                    tone={item.tone}
                    label={fill(c.summary.meterLabel, { metric: label, level: levelText })}
                  />
                </div>
              </Card>
            );
          })}
      </div>
    </section>
  );
}
