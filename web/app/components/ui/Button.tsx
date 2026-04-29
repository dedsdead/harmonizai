"use client";

import { Loader2 } from "lucide-react";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2";

  const variants = {
    primary:
      "bg-primary-600 text-white shadow-resting hover:bg-primary-700 hover:shadow-hover hover:-translate-y-0.5 active:translate-y-0 active:shadow-active",
    secondary:
      "bg-secondary-500 text-white shadow-resting hover:bg-secondary-600 hover:shadow-hover hover:-translate-y-0.5 active:translate-y-0 active:shadow-active",
    ghost:
      "text-neutral-600 hover:text-primary-600 hover:bg-primary-50",
    outline:
      "border-2 border-neutral-300 text-neutral-700 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
