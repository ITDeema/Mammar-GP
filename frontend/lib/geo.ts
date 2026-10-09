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

// Turns the rotation text typed by the user into degrees (0 to 359).
// Empty text means 0. Returns null when the text is not a number.
export function parseRotation(text: string): number | null {
  const clean = normalize(text);
  if (clean === "") return 0;
  const value = Number(clean);
  if (!Number.isFinite(value)) return null;
  return ((value % 360) + 360) % 360;
}

// The four corners of a plot (in meters) around its center point.
// rotation is in degrees, clockwise from north (0 = the plot faces north).
// Corners are returned in this order: north-west, north-east, south-east, south-west.
export function plotPolygon(
  center: LatLng,
  width: number,
  depth: number,
  rotation = 0,
): LatLng[] {
  const theta = (rotation * Math.PI) / 180;
  const cos = Math.cos(theta);
  const sin = Math.sin(theta);
  const metersPerLat = 111_320;
  const metersPerLng = 111_320 * Math.cos((center.lat * Math.PI) / 180);
  const hw = width / 2;
  const hd = depth / 2;
  const corners: [number, number][] = [
    [-hw, hd],
    [hw, hd],
    [hw, -hd],
    [-hw, -hd],
  ];
  return corners.map(([x, y]) => {
    const east = x * cos + y * sin;
    const north = -x * sin + y * cos;
    return {
      lat: center.lat + north / metersPerLat,
      lng: center.lng + east / metersPerLng,
    };
  });
}

export function formatCoordinates(point: LatLng): string {
  return `${point.lat.toFixed(5)}, ${point.lng.toFixed(5)}`;
}
