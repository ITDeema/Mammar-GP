import L from "leaflet";
import { LAND, PLAN, ROAD_STYLE, ROADMAP, SITE, TRANSIT, USE_COLORS, WHITE, INK } from "@/lib/diagram-palette";
import { LAND_RADIUS } from "@/lib/site-surroundings";
import type { Area, LandUse, Surroundings } from "@/lib/site-surroundings";

// Drawing of the three plans on a Leaflet layer group.

const quiet = { interactive: false } as const;
const round = { lineCap: "round", lineJoin: "round" } as const;

// The zoom at which a circle of `pixels` radius covers LAND_RADIUS meters.
export function zoomForRadius(lat: number, pixels: number): number {
  return Math.log2((156543.03392 * Math.cos((lat * Math.PI) / 180) * pixels) / LAND_RADIUS);
}

// Road widths are given for zoom 17: scale them to the zoom of the map.
const roadWidth = (zoom: number) => (w: number) => Math.max(1.2, w * Math.pow(2, zoom - 17) * 1.15);

/* ---------- sun diagram: black and white plan ---------- */

export function drawPlan(layer: L.LayerGroup, d: Surroundings) {
  d.areas
    .filter((a) => a.plan)
    .forEach((a) => {
      L.polygon(a.pts, {
        color: PLAN.areaStroke, weight: 1, dashArray: "4 3",
        fillColor: a.water ? PLAN.waterFill : PLAN.areaFill, fillOpacity: 1, ...quiet,
      }).addTo(layer);
    });
  d.casings.forEach((c) => {
    L.polyline(c.pts, { color: PLAN.casing, weight: c.w + 2, ...round, ...quiet }).addTo(layer);
  });
  d.fills.forEach((c) => {
    L.polyline(c.pts, { color: WHITE, weight: c.w, ...round, ...quiet }).addTo(layer);
  });
  d.paths.forEach((pts) => {
    L.polyline(pts, { color: PLAN.path, weight: 1.2, dashArray: "2 3", ...quiet }).addTo(layer);
  });
  d.rails.forEach((pts) => {
    L.polyline(pts, { color: PLAN.rail, weight: 2, dashArray: "8 4", ...quiet }).addTo(layer);
  });
  d.buildings.forEach((b) => {
    L.polygon(b.pts, {
      color: PLAN.buildingStroke, weight: 1, fillColor: PLAN.buildingFill, fillOpacity: 1, ...quiet,
    }).addTo(layer);
  });
}

/* ---------- land use diagram: colored by use ---------- */

const rank = (c: LandUse) => (c === "park" || c === "water" || c === "parking" ? 2 : 1);

export function drawLandUse(layer: L.LayerGroup, d: Surroundings, zoom: number) {
  const rw = roadWidth(zoom);

  // 1) zones: land use first, then parks, water and parking on top
  d.areas
    .filter((a): a is Area & { cat: LandUse } => a.cat !== null)
    .sort((a, b) => rank(a.cat) - rank(b.cat))
    .forEach((a) => {
      L.polygon(a.pts, {
        color: USE_COLORS[a.cat], weight: 0.8, opacity: 0.9,
        fillColor: USE_COLORS[a.cat], fillOpacity: rank(a.cat) === 2 ? 0.85 : 0.45, ...quiet,
      }).addTo(layer);
    });

  // 2) roads, paths and rails
  d.casings.forEach((c) => {
    L.polyline(c.pts, { color: LAND.casing, weight: rw(c.w) + 1.6, ...round, ...quiet }).addTo(layer);
  });
  d.fills.forEach((c) => {
    L.polyline(c.pts, { color: WHITE, weight: rw(c.w), ...round, ...quiet }).addTo(layer);
  });
  d.paths.forEach((pts) => {
    L.polyline(pts, { color: PLAN.path, weight: 1.2, dashArray: "2 3", ...quiet }).addTo(layer);
  });
  d.rails.forEach((pts) => {
    L.polyline(pts, { color: PLAN.rail, weight: 2, dashArray: "8 4", ...quiet }).addTo(layer);
  });

  // 3) buildings colored by function
  d.buildings.forEach((b) => {
    L.polygon(b.pts, {
      color: LAND.buildingStroke, weight: 1, fillColor: USE_COLORS[b.cat], fillOpacity: 1, ...quiet,
    }).addTo(layer);
  });

  // 4) outline the building that contains the site, if any
  if (d.siteBuilding) {
    L.polygon(d.siteBuilding, { color: SITE, weight: 3, fill: false, ...quiet }).addTo(layer);
  }
}

/* ---------- roads diagram: road hierarchy and transit ---------- */

export function drawRoads(layer: L.LayerGroup, d: Surroundings, zoom: number) {
  const scale = Math.pow(2, zoom - 17);

  // 1) green areas and water in light grey
  d.areas
    .filter((a) => a.cat === "park" || a.cat === "water")
    .forEach((a) => {
      L.polygon(a.pts, {
        color: ROADMAP.greenStroke, weight: 0.8, fillColor: ROADMAP.greenFill, fillOpacity: 1, ...quiet,
      }).addTo(layer);
    });

  // 2) buildings: white with a thin outline
  d.buildings.forEach((b) => {
    L.polygon(b.pts, {
      color: ROADMAP.buildingStroke, weight: 0.6, fillColor: WHITE, fillOpacity: 1, ...quiet,
    }).addTo(layer);
  });

  // 3) roads: local first, arterial on top
  ([3, 2, 1] as const).forEach((cls) => {
    const style = ROAD_STYLE[cls];
    d.roads
      .filter((road) => road.cls === cls)
      .forEach((road) => {
        L.polyline(road.pts, {
          color: style.color, weight: Math.max(1.2, style.w * scale * 1.15), ...round, ...quiet,
        }).addTo(layer);
      });
  });

  d.paths.forEach((pts) => {
    L.polyline(pts, { color: PLAN.path, weight: 1.1, dashArray: "2 3", ...quiet }).addTo(layer);
  });
  d.rails.forEach((pts) => {
    L.polyline(pts, { color: TRANSIT, weight: 2.2, dashArray: "8 4", ...quiet }).addTo(layer);
  });

  // 4) transit stops
  d.stops.forEach((stop) => {
    L.circleMarker(
      [stop.lat, stop.lon],
      stop.k === "metro"
        ? { radius: 7, color: WHITE, weight: 2, fillColor: TRANSIT, fillOpacity: 1, ...quiet }
        : { radius: 5, color: INK, weight: 1.5, fillColor: WHITE, fillOpacity: 1, ...quiet },
    ).addTo(layer);
  });
}
