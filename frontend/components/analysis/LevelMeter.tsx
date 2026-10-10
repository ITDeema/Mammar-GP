import type { Level, Tone } from "@/lib/analysis-detail";

const STEPS: Level[] = ["low", "medium", "high"];

const FILLED: Record<Tone, string> = {
  success: "bg-success-500",
  caution: "bg-caution-500",
  neutral: "bg-navy-700",
};

// Three segments: one filled for low, two for medium, three for high.
export default function LevelMeter({
  level,
  tone,
  label,
}: {
  level: Level;
  tone: Tone;
  label: string; // read by screen readers
}) {
  const filled = STEPS.indexOf(level) + 1;
  return (
    <div role="img" aria-label={label} className="flex gap-1">
      {STEPS.map((step, index) => (
        <span
          key={step}
          className={`h-1.5 flex-1 rounded-pill ${index < filled ? FILLED[tone] : "bg-navy-900/10"}`}
        />
      ))}
    </div>
  );
}
