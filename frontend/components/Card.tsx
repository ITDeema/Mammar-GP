import type { HTMLAttributes } from "react";

export default function Card({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-card border border-navy-900/15 bg-white p-5 ${className}`}
      {...props}
    />
  );
}