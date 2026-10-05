"use client";

import { useT } from "@/lib/i18n";
import { landingCopy } from "@/lib/landing-copy";

// Returns the landing-page text in the current language.
export function useCopy() {
  const { lang } = useT();
  return landingCopy[lang];
}
