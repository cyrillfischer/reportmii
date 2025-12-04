import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "light" | "dark" | "ghost" | "unstyled";
  full?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "unstyled",
  full = false,
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl px-5 py-2.5";

  const variants = {
    // MINT BUTTON (Hauptfarbe)
    primary:
      "bg-[#7eb6b8] text-black shadow-[0_0_25px_rgba(126,182,184,0.35)] hover:bg-[#1b1f23] hover:text-white",

    // Weißer Button mit feinem Rand (Landingpage Style)
    secondary:
      "border border-gray-300 text-gray-800 bg-white hover:bg-gray-100",

    // Ultra-light Button
    light:
      "bg-white border border-gray-200 text-gray-800 shadow-soft hover:bg-gray-50",

    // DARK CHARCOAL (Landingpage CTA)
    dark:
      "bg-[#1b1f23] text-white shadow-[0_0_20px_rgba(0,0,0,0.4)] hover:brightness-110",

    // Ghost Button (z.B. für kleine Links)
    ghost:
      "text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2",

    // Kein Style → erlaubt vollständige Kontrolle über className
    unstyled: "",
  };

  const variantClass = variants[variant];
  const fullClass = full ? "w-full" : "";
  const classes = [baseStyles, variantClass, fullClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}
