import type { ReactNode } from "react";

type Tone = "error" | "success" | "info";

const styles: Record<Tone, string> = {
  error: "border-danger-500/40 bg-danger-50 text-danger-500",
  success: "border-success-500/40 bg-success-50 text-success-500",
  info: "border-navy-700/30 bg-navy-50 text-navy-900",
};

// A short message that screen readers announce when it appears.
export default function StatusMessage({
  tone,
  children,
}: {
  tone: Tone;
  children: ReactNode;
}) {
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={`rounded-control border px-3 py-2.5 text-sm font-semibold ${styles[tone]}`}
    >
      {children}
    </p>
  );
}