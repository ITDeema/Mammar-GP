"use client";

import Card from "@/components/Card";
import type { Facade } from "@/lib/analysis-detail";
import { neighboursFor } from "@/lib/neighbourhood";
import { fill, useResultsCopy } from "@/lib/results-copy";

// Architects: what stands next to the selected façade (kind, height, distance).
// Only what exists is listed.
export default function NeighboursCard({ facade }: { facade: Facade }) {
  const c = useResultsCopy();
  const rows = neighboursFor(facade);

  return (
    <Card>
      <h2 className="text-sm font-bold">{c.neighbours.title}</h2>
      <p className="mb-4 mt-1 text-xs text-navy-900/70">
        {fill(c.neighbours.hint, { facade: c.facade.names[facade] })}
      </p>

      {rows.length === 0 ? (
        <p className="text-sm text-navy-900/70">{c.neighbours.empty}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-navy-900/70">
                <th scope="col" className="pb-2 text-start font-semibold">{c.neighbours.cols.kind}</th>
                <th scope="col" className="pb-2 text-start font-semibold">{c.neighbours.cols.height}</th>
                <th scope="col" className="pb-2 text-start font-semibold">{c.neighbours.cols.distance}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={`${row.kind}-${index}`} className="border-t border-navy-900/10">
                  <th scope="row" className="py-2 text-start font-semibold">{c.neighbours.kinds[row.kind]}</th>
                  <td className="py-2 text-start">
                    <bdi>{row.height == null ? "—" : `${row.height} m`}</bdi>
                  </td>
                  <td className="py-2 text-start">
                    <bdi>{`${row.distance} m`}</bdi>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
