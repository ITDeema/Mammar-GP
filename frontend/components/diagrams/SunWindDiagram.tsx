"use client";

import { useEffect } from "react";
import DiagramFrame from "@/components/diagrams/DiagramFrame";
import LegendBox, { LegendRow } from "@/components/diagrams/LegendBox";
import { drawPlan } from "@/components/diagrams/draw";
import { useElementSize } from "@/components/diagrams/useElementSize";
import { useStaticMap } from "@/components/diagrams/useStaticMap";
import { SUN } from "@/lib/diagram-palette";
import { sunOverlay, waveArrow } from "@/lib/diagram-svg";
import type { Loadable } from "@/lib/loadable";
import type { SunPath } from "@/lib/site-api";
import type { Surroundings } from "@/lib/site-surroundings";
import { useResultsCopy } from "@/lib/results-copy";

const SUN_ZOOM = 17;

type SunWindDiagramProps = {
  lat: number;
  lng: number;
  sun: Loadable<SunPath>;
  around: Loadable<Surroundings>;
  onRetry: () => void;
};

// The sun's path over the site and the hot and cool winds, on a black and white plan.
export default function SunWindDiagram({ lat, lng, sun, around, onRetry }: SunWindDiagramProps) {
  const c = useResultsCopy();
  const [boxRef, size] = useElementSize<HTMLDivElement>();
  const { elRef, mapRef, layerRef } = useStaticMap();

  // frame the site and draw the plan under the sun and wind symbols
  useEffect(() => {
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!map || !layer || size.w === 0) return;
    map.invalidateSize();
    map.setView([lat, lng], SUN_ZOOM, { animate: false });
    layer.clearLayers();
    if (around.status === "ready") drawPlan(layer, around.data);
  }, [lat, lng, size, around, mapRef, layerRef]);

  const markup =
    sun.status === "ready" && size.w > 0 ? sunOverlay(size.w, size.h, sun.data, c.diagrams.north) : "";

  const wave = (color: string) =>
    waveArrow(0, 7, 46, 7, { amp: 3, waves: 1.5, w0: 0.6, w1: 3, color });

  return (
    <DiagramFrame title={c.diagrams.sun.title} status={sun.status} onRetry={onRetry} boxRef={boxRef}>
      {/* the map and the plan must not flip in right-to-left pages */}
      <div dir="ltr" className="absolute inset-0 isolate z-0">
        <div ref={elRef} className="h-full w-full bg-white!" />
      </div>
      <svg
        viewBox={`0 0 ${size.w || 1} ${size.h || 1}`}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
        dangerouslySetInnerHTML={{ __html: markup }}
      />
      {sun.status === "ready" && (
        <LegendBox>
          <LegendRow
            swatch={
              <span
                className="block h-2 w-12 rounded-pill"
                style={{ background: `linear-gradient(90deg, ${SUN.end}, ${SUN.top}, ${SUN.end})` }}
              />
            }
            label={c.diagrams.sun.sunPath}
          />
          <LegendRow
            swatch={
              <svg width="46" height="14" viewBox="0 0 46 14" aria-hidden="true" dangerouslySetInnerHTML={{ __html: wave(SUN.hot) }} />
            }
            label={c.diagrams.sun.hotWind}
          />
          <LegendRow
            swatch={
              <svg width="46" height="14" viewBox="0 0 46 14" aria-hidden="true" dangerouslySetInnerHTML={{ __html: wave(SUN.cool) }} />
            }
            label={c.diagrams.sun.coolWind}
          />
        </LegendBox>
      )}
    </DiagramFrame>
  );
}
