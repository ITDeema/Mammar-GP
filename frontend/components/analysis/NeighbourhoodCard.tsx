"use client";

import Card from "@/components/Card";
import { DensityGauge, NoiseGauge } from "@/components/analysis/SiteGauges";
import type { SiteIndicators } from "@/lib/analysis-detail";
import { nearestServices } from "@/lib/neighbourhood";
import { useResultsCopy } from "@/lib/results-copy";

// Homeowners: two gauges (noise, density) and the nearest services.
export default function NeighbourhoodCard({ site }: { site: SiteIndicators }) {
  const c = useResultsCopy();
  const services = nearestServices();

  return (
    <Card>
      <h2 className="mb-4 text-sm font-bold">{c.hood.title}</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="mb-3 text-xs font-bold text-navy-900/70">{c.hood.services}</h3>
          <dl className="grid gap-3 text-sm">
            {services.map((service) => (
              <div
                key={service.kind}
                className="flex items-center justify-between gap-3 border-b border-navy-900/10 pb-3 last:border-b-0 last:pb-0"
              >
                <dt className="text-navy-900/80">{c.hood.kinds[service.kind]}</dt>
                <dd className="font-semibold">
                  <bdi>{service.distance == null ? "—" : `${service.distance} m`}</bdi>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <NoiseGauge site={site} />
          <DensityGauge site={site} />
        </div>
      </div>
    </Card>
  );
}
