import type { InputHTMLAttributes } from "react";

type SearchInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string; // read by screen readers (there is no visible label)
};

export default function SearchInput({
  label,
  className = "",
  ...props
}: SearchInputProps) {
  return (
    <div className="relative">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-900/70"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        type="search"
        aria-label={label}
        className={`w-full rounded-control border border-navy-900/15 bg-white py-3 ps-10 pe-3 text-sm text-navy-900 placeholder:text-navy-900/45 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-navy-700 ${className}`}
        {...props}
      />
    </div>
  );
}