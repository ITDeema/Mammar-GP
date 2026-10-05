"use client";

import { useEffect, useId, useRef } from "react";

// A slowly drifting strip inspired by the Sadu pattern in the logo.
export default function SaduBand({
  className = "",
  opacity = 0.4,
}: {
  className?: string;
  opacity?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const patternId = `sadu-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ref.current?.pauseAnimations();
    }
  }, []);

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      className={className}
      width="100%"
      height="40"
      style={{ opacity }}
    >
      <defs>
        <pattern id={patternId} width="64" height="40" patternUnits="userSpaceOnUse">
          <animateTransform
            attributeName="patternTransform"
            type="translate"
            from="0 0"
            to="-64 0"
            dur="26s"
            repeatCount="indefinite"
          />
          <path d="M0 35 L16 11 L32 35 Z M32 5 L48 29 L64 5 Z" fill="currentColor" />
          <rect x="0" y="38" width="64" height="2" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="40" fill={`url(#${patternId})`} />
    </svg>
  );
}
