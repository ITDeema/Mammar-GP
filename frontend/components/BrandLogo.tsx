import Image from "next/image";

// Width/height ratios of the logo files in public/brand/
const RATIO = { full: 0.7185, symbol: 0.5747 } as const;

type BrandLogoProps = {
  variant?: "full" | "symbol"; // full = symbol + the word "معمار"
  tone?: "dark" | "light"; // light = for dark backgrounds
  height: number;
  alt?: string; // leave empty when the brand name is written next to it
  className?: string;
  priority?: boolean;
};

export default function BrandLogo({
  variant = "symbol",
  tone = "dark",
  height,
  alt = "",
  className,
  priority,
}: BrandLogoProps) {
  const base = variant === "full" ? "logo" : "symbol";
  const file = `${base}${tone === "light" ? "-light" : ""}.svg`;
  return (
    <Image
      src={`/brand/${file}`}
      alt={alt}
      width={Math.round(height * RATIO[variant])}
      height={height}
      unoptimized
      priority={priority}
      className={className}
    />
  );
}
