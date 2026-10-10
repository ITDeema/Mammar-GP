"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FACADES, heatColor, isSide } from "@/lib/analysis-detail";
import type { Facade, Side } from "@/lib/analysis-detail";
import type { LatLng } from "@/lib/geo";

type ResultMapProps = {
  lat: number; // plot center
  lng: number;
  width: number; // plot width in meters
  depth: number; // plot depth in meters
  setbacks: Record<Side, number>;
  heat: Record<Facade, number> | null; // 0..1 per façade, or null while unknown
  selected: Facade;
  tips: Record<Facade, string>; // hover text per façade
  label: string;
};

const LETTERS: Record<Facade, string> = {
  north: "N",
  northeast: "NE",
  east: "E",
  southeast: "SE",
  south: "S",
  southwest: "SW",
  west: "W",
  northwest: "NW",
};
const NEUTRAL = "#9AA7B4";

// Meters east (x) and north (y) from the plot center -> map coordinates.
function at(center: LatLng, x: number, y: number): L.LatLngTuple {
  return [
    center.lat + y / 111_320,
    center.lng + x / (111_320 * Math.cos((center.lat * Math.PI) / 180)),
  ];
}

export default function ResultMap({
  lat,
  lng,
  width,
  depth,
  setbacks,
  heat,
  selected,
  tips,
  label,
}: ResultMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const groupRef = useRef<L.LayerGroup | null>(null);

  // create the map once
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const map = L.map(container, { center: [lat, lng], zoom: 18, maxZoom: 21, scrollWheelZoom: false });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 21,
      maxNativeZoom: 19, // the tiles are stretched when you zoom in further
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    groupRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
      groupRef.current = null;
    };
    // The map is created once; the effects below keep it up to date.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // frame the plot
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const center = { lat, lng };
    const bounds = L.latLngBounds([at(center, -width / 2, -depth / 2), at(center, width / 2, depth / 2)]);
    map.fitBounds(bounds, { padding: [56, 56], maxZoom: 21 });
  }, [lat, lng, width, depth]);

  // draw the plot, the building and the colored façades
  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    group.clearLayers();

    const center = { lat, lng };
    const hw = width / 2;
    const hd = depth / 2;
    L.polygon(
      [at(center, -hw, hd), at(center, hw, hd), at(center, hw, -hd), at(center, -hw, -hd)],
      { color: "#072A4A", weight: 2, dashArray: "6 6", fillOpacity: 0 },
    ).addTo(group);

    const x0 = -hw + setbacks.west;
    const x1 = hw - setbacks.east;
    const y0 = -hd + setbacks.south;
    const y1 = hd - setbacks.north;
    const nw = at(center, x0, y1);
    const ne = at(center, x1, y1);
    const se = at(center, x1, y0);
    const sw = at(center, x0, y0);
    L.polygon([nw, ne, se, sw], {
      stroke: false,
      fillColor: "#072A4A",
      fillOpacity: 0.12,
    }).addTo(group);

    // the four sides are colored lines, the four diagonals are colored dots on the corners
    const sides: Record<Side, L.LatLngTuple[]> = {
      north: [nw, ne],
      east: [ne, se],
      south: [se, sw],
      west: [sw, nw],
    };
    const corners: Record<Exclude<Facade, Side>, L.LatLngTuple> = {
      northeast: ne,
      southeast: se,
      southwest: sw,
      northwest: nw,
    };
    FACADES.forEach((facade) => {
      const isSelected = facade === selected;
      const color = heat ? heatColor(heat[facade]) : NEUTRAL;
      if (isSide(facade)) {
        L.polyline(sides[facade], {
          color,
          weight: isSelected ? 12 : 7,
          opacity: isSelected ? 1 : 0.8,
          lineCap: "round",
        })
          .bindTooltip(tips[facade], { sticky: true })
          .addTo(group);
      }
    });
    FACADES.forEach((facade) => {
      if (isSide(facade)) return;
      const isSelected = facade === selected;
      L.circleMarker(corners[facade], {
        radius: isSelected ? 13 : 9,
        color: isSelected ? "#072A4A" : "#FFFFFF",
        weight: isSelected ? 3 : 2,
        fillColor: heat ? heatColor(heat[facade]) : NEUTRAL,
        fillOpacity: 1,
      })
        .bindTooltip(tips[facade], { sticky: true })
        .addTo(group);
    });

    // compass letters around the plot
    const spots: Record<Facade, [number, number]> = {
      north: [0, hd + 3],
      northeast: [hw + 3, hd + 3],
      east: [hw + 3, 0],
      southeast: [hw + 3, -hd - 3],
      south: [0, -hd - 3],
      southwest: [-hw - 3, -hd - 3],
      west: [-hw - 3, 0],
      northwest: [-hw - 3, hd + 3],
    };
    FACADES.forEach((facade) => {
      const isSelected = facade === selected;
      const [x, y] = spots[facade];
      L.marker(at(center, x, y), {
        interactive: false,
        keyboard: false,
        icon: L.divIcon({
          className: "",
          iconSize: [28, 28],
          iconAnchor: [14, 14],
          html: `<div style="width:28px;height:28px;border-radius:999px;display:flex;align-items:center;justify-content:center;font:700 11px sans-serif;background:${isSelected ? "#C08649" : "#fff"};color:#072A4A;border:1px solid rgba(7,42,74,.3);box-shadow:0 1px 4px rgba(7,42,74,.25)">${LETTERS[facade]}</div>`,
        }),
      }).addTo(group);
    });
  }, [lat, lng, width, depth, setbacks, heat, selected, tips]);

  return <div ref={containerRef} role="application" aria-label={label} className="h-full w-full" />;
}