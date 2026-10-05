import { useId } from "react";
import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function Input({
  label,
  error,
  className = "",
  ...props
}: InputProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-navy-900">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`rounded-control border bg-white px-3 py-3 text-sm text-navy-900 placeholder:text-navy-900/45 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-navy-700 ${error ? "border-danger-500" : "border-navy-900/15"} ${className}`}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-xs text-danger-500">
          {error}
        </p>
      )}
    </div>
  );
}