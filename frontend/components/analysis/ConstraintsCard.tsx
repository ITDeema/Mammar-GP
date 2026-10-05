"use client";

import Card from "@/components/Card";
import { FACADES } from "@/lib/analysis-detail";
import type { Constraints } from "@/lib/analysis-detail";
import { fill, useResultsCopy } from "@/lib/results-copy";

// The rules that apply to this plot. Shown to architects.
export default function ConstraintsCard({ constraints }: { constraints: Constraints }) {
  const c = useResultsCopy();
  const rows = [
    { label: c.constraints.maxCoverage, value: `${constraints.maxCoverage}%` },
    { label: c.constraints.maxHeight, value: `≈${constraints.maxHeight} m` },
    ...FACADES.map((facade) => ({
      label: fill(c.constraints.setback, { facade: c.facade.names[facade] }),
      value: `${constraints.setbacks[facade]} m`,
    })),
  ];

  return (
    <Card>
      <h2 className="text-sm font-bold">{c.constraints.title}</h2>
      <p className="mb-4 mt-1 text-xs leading-6 text-navy-900/70">{c.constraints.text}</p>
      <dl className="grid gap-3 text-sm">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-3">
            <dt className="text-navy-900/70">{row.label}</dt>
            <dd className="font-semibold">
              <bdi>{row.value}</bdi>
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}