export type LatLng = { lat: number; lng: number };

export const RIYADH_CENTER: LatLng = { lat: 24.7136, lng: 46.6753 };

// A rough box around Riyadh, used only to give instant feedback in the browser.
// The real "is this inside the city?" check must come from the server.
const RIYADH_BOUNDS = { south: 24.3, north: 25.2, west: 46.2, east: 47.3 };

export function isInsideRiyadh(point: LatLng): boolean {
  return (
    point.lat >= RIYADH_BOUNDS.south &&
    point.lat <= RIYADH_BOUNDS.north &&
    point.lng >= RIYADH_BOUNDS.west &&
    point.lng <= RIYADH_BOUNDS.east
  );
}

export type CoordinatesResult =
  | { ok: true; point: LatLng }
  | { ok: false; error: "missing" | "invalid" | "outside" };

// Turns Arabic-Indic digits and the Arabic decimal mark into normal ones.
function normalize(text: string): string {
  return text
    .trim()
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[٫,]/g, ".");
}

export function parseCoordinates(latText: string, lngText: string): CoordinatesResult {
  const latClean = normalize(latText);
  const lngClean = normalize(lngText);
  if (latClean === "" || lngClean === "") return { ok: false, error: "missing" };

  const lat = Number(latClean);
  const lng = Number(lngClean);
  const valid =
    Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
  if (!valid) return { ok: false, error: "invalid" };

  const point = { lat, lng };
  if (!isInsideRiyadh(point)) return { ok: false, error: "outside" };
  return { ok: true, point };
}

// The four corners of a plot (in meters) around its center point.
export function plotPolygon(center: LatLng, width: number, depth: number): LatLng[] {
  const dLat = depth / 2 / 111_320;
  const dLng = width / 2 / (111_320 * Math.cos((center.lat * Math.PI) / 180));
  return [
    { lat: center.lat + dLat, lng: center.lng - dLng },
    { lat: center.lat + dLat, lng: center.lng + dLng },
    { lat: center.lat - dLat, lng: center.lng + dLng },
    { lat: center.lat - dLat, lng: center.lng - dLng },
  ];
}

export function formatCoordinates(point: LatLng): string {
  return `${point.lat.toFixed(5)}, ${point.lng.toFixed(5)}`;
}