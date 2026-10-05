import type { ReactNode } from "react";

type Tone = "success" | "caution" | "danger" | "neutral";

const tones: Record<Tone, string> = {
  success: "bg-success-50 text-success-500",
  caution: "bg-caution-50 text-caution-500",
  danger: "bg-danger-50 text-danger-500",
  neutral: "bg-stone-100 text-stone-600",
};

export default function Badge({
  tone = "neutral",
  children,
}: {
  tone?: Tone;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-block rounded-pill px-3 py-1 text-xs font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}