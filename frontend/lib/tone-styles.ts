import type { Tone } from "@/lib/analysis-detail";

// One place for the indicator colors: green, yellow, red.
// To change a color, change it here only.
export const TONE_FILL: Record<Tone, string> = {
  success: "bg-success-500",
  caution: "bg-warning-400",
  danger: "bg-danger-500",
  neutral: "bg-navy-700",
};

export const TONE_TEXT: Record<Tone, string> = {
  success: "text-success-500",
  caution: "text-caution-700",
  danger: "text-danger-500",
  neutral: "text-navy-900/70",
};
