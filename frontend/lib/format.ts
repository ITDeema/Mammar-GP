import type { Lang } from "@/lib/i18n";

// "2026-09-16" -> "16 سبتمبر 2026" / "16 September 2026"
export function formatDate(iso: string, lang: Lang): string {
  const locale = lang === "ar" ? "ar-u-nu-latn" : "en-GB";
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}