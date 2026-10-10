"use client";

import Gauge from "@/components/analysis/Gauge";
import type { SiteIndicators } from "@/lib/analysis-detail";
import {
  badnessTone,
  densityFraction,
  densityLevelOf,
  noiseFraction,
  noiseLevelOf,
} from "@/lib/neighbourhood";
import { fill, useResultsCopy } from "@/lib/results-copy";

export function NoiseGauge({ site }: { site: SiteIndicators }) {
  const c = useResultsCopy();
  const level = noiseLevelOf(site.noise);
  const levelText = c.indicators.levels[level];
  return (
    <Gauge
      fraction={noiseFraction(site.noise)}
      tone={badnessTone(level)}
      label={c.site.noise}
      levelText={levelText}
      valueText={`${Math.round(site.noise)} dB`}
      ariaLabel={fill(c.hood.gaugeLabel, { metric: c.site.noise, level: levelText })}
    />
  );
}

export function DensityGauge({ site }: { site: SiteIndicators }) {
  const c = useResultsCopy();
  const level = densityLevelOf(site.density);
  const levelText = c.site.densityLevels[level];
  return (
    <Gauge
      fraction={densityFraction(site.density)}
      tone={badnessTone(level)}
      label={c.site.density}
      levelText={levelText}
      valueText={`${Math.round(site.density * 100)}%`}
      ariaLabel={fill(c.hood.gaugeLabel, { metric: c.site.density, level: levelText })}
    />
  );
}
