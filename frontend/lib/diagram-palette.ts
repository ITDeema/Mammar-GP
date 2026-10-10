import type { LandUse } from "@/lib/site-surroundings";

// Colors of the analysis diagrams. A legend has to match its map exactly, so these
// data-visualization colors live together here instead of in globals.css.
// Review them with the team (CLAUDE.md asks for theme colors everywhere else).

export const INK = "#111111";
export const WHITE = "#ffffff";

// sun path and wind symbols
export const SUN = {
  end: "#F0703E",
  mid: "#F7A23B",
  top: "#FFD84A",
  arrow: "#FFD21F",
  arrowEdge: "#E0A000",
  hot: "#F39C1F",
  cool: "#2E9BD9",
};

// the selected site and transit stations
export const SITE = "#e11d48";
export const TRANSIT = "#d7263d";

// land use categories
export const USE_COLORS: Record<LandUse, string> = {
  residential: "#F4D35E",
  commercial: "#EE6C4D",
  industrial: "#9B7EDE",
  education: "#3D8FD4",
  religious: "#3B3B3B",
  health: "#E63E8A",
  civic: "#A0693C",
  park: "#5FBF6A",
  parking: "#B9BEC4",
  water: "#8EC9F0",
  vacant: "#EFE6D2",
  other: "#CFCFCF",
};

// the black and white plan under the sun diagram
export const PLAN = {
  areaStroke: "#bdbdbd",
  areaFill: "#f4f4f4",
  waterFill: "#e6e6e6",
  casing: "#9a9a9a",
  path: "#b5b5b5",
  rail: "#7a7a7a",
  buildingStroke: "#5f5f5f",
  buildingFill: "#d6d6d6",
};

// the land use diagram
export const LAND = {
  casing: "#c4c4c4",
  buildingStroke: "#333333",
};

// the roads diagram
export const ROAD_STYLE: Record<1 | 2 | 3, { color: string; w: number }> = {
  1: { color: "#6b5b57", w: 8 },
  2: { color: "#a89a95", w: 5 },
  3: { color: "#d2cac6", w: 3 },
};

export const ROADMAP = {
  greenStroke: "#c9cfcb",
  greenFill: "#e4e8e5",
  buildingStroke: "#555555",
};
