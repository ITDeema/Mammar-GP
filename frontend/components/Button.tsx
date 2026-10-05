import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "danger";
type Size = "md" | "sm";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
};

const variants: Record<Variant, string> = {
  primary: "bg-gold-500 text-navy-950 hover:bg-gold-400 active:bg-gold-600",
  secondary:
    "bg-white text-navy-900 border border-navy-900/15 hover:bg-navy-50",
  danger: "bg-danger-500 text-white hover:opacity-90",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-3 text-sm",
  sm: "px-3 py-2 text-xs",
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`rounded-control font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-700 disabled:cursor-not-allowed disabled:opacity-50 ${sizes[size]} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    />
  );
}