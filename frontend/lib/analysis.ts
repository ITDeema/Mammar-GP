import type { LatLng } from "@/lib/geo";

/*
 * TEMPORARY MOCK DATA LAYER.
 * Every function here pretends to be the backend. When the API exists,
 * replace the bodies of lookupPlot() and runAnalysis() with real requests.
 * The screens will not need to change.
 */

export const USE_MOCK_DATA = true;

/* ---------- plot lookup ---------- */

export type Direction8 =
  | "north"
  | "northEast"
  | "east"
  | "southEast"
  | "south"
  | "southWest"
  | "west"
  | "northWest";

const DIRECTIONS: Direction8[] = [
  "north",
  "northEast",
  "east",
  "southEast",
  "south",
  "southWest",
  "west",
  "northWest",
];

const NEIGHBORHOODS = ["الملقا", "النرجس", "الياسمين", "حطين", "الواحة", "العارض"];

export type PlotInfo = {
  width: number; // meters
  depth: number; // meters
  area: number; // square meters
  neighborhood: string;
  orientation: Direction8;
};

function hashPoint(point: LatLng): number {
  const text = `${point.lat.toFixed(4)},${point.lng.toFixed(4)}`;
  let hash = 0;
  for (let i = 0; i < text.length; i++) hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  return hash;
}

// Pretends to look up the plot under a point. The same point always gives the same plot.
export async function lookupPlot(point: LatLng): Promise<PlotInfo> {
  await new Promise((resolve) => setTimeout(resolve, 450));
  const hash = hashPoint(point);
  const width = 16 + (hash % 13);
  const depth = 20 + ((hash >>> 4) % 12);
  return {
    width,
    depth,
    area: Math.round(width * depth),
    neighborhood: NEIGHBORHOODS[hash % NEIGHBORHOODS.length],
    orientation: DIRECTIONS[(hash >>> 8) % DIRECTIONS.length],
  };
}

/* ---------- running an analysis ---------- */

export type AnalysisStep = "environment" | "buildings" | "model" | "compliance";

export const ANALYSIS_STEPS: AnalysisStep[] = [
  "environment",
  "buildings",
  "model",
  "compliance",
];

export type AnalysisInput = {
  lat: number;
  lng: number;
  area: number;
  demo?: string | null; // "fail" simulates a data source that cannot be reached
};

export class AnalysisError extends Error {
  step: AnalysisStep;
  constructor(step: AnalysisStep) {
    super(`Analysis failed at step: ${step}`);
    this.step = step;
  }
}

function wait(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) return reject(new DOMException("Aborted", "AbortError"));
    const timer = setTimeout(resolve, ms);
    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      },
      { once: true },
    );
  });
}

// Pretends to run the whole analysis. Calls onStep(i) when step i starts.
export async function runAnalysis(
  input: AnalysisInput,
  onStep: (index: number) => void,
  signal: AbortSignal,
): Promise<void> {
  for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
    onStep(i);
    await wait(1400, signal);
    if (input.demo === "fail" && i === 1) throw new AnalysisError(ANALYSIS_STEPS[i]);
  }
}