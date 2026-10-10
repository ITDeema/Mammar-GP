import type { ReactNode } from "react";

// The legend in the corner of a diagram. It never blocks clicks on the page.
export default function LegendBox({ children }: { children: ReactNode }) {
  return (
    <ul className="pointer-events-none absolute bottom-3 start-3 z-[2] m-0 grid list-none gap-1.5 rounded-control border border-navy-900/15 bg-white/95 p-3 text-xs text-navy-900">
      {children}
    </ul>
  );
}

export function LegendRow({ swatch, label }: { swatch: ReactNode; label: string }) {
  return (
    <li className="flex items-center gap-2">
      <span className="flex w-12 shrink-0 items-center justify-center">{swatch}</span>
      <span>{label}</span>
    </li>
  );
}
