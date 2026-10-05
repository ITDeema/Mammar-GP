"use client";

import { useT } from "@/lib/i18n";
import { plotCopy } from "@/lib/plot-copy";

// Returns the plot-selection / analysis text in the current language.
export function usePlotCopy() {
  const { lang } = useT();
  return plotCopy[lang];
}