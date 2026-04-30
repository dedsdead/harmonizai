"use client";

import { Loader2 } from "lucide-react";
import { type ButtonHTMLAttributes, type ReactNode, useRef, useState } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children: ReactNode;
  disableRipple?: boolean;
}

interface RippleState {
  x: number;
  y: number;
  id: number;
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  children,
  className = "",
  disabled,
  disableRipple = false,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<RippleState[]>([]);
  const rippleIdRef = useRef(0);

  const baseStyles =
    "relative isolate inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 overflow-hidden";

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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disableRipple || isDisabled) {
      props.onClick?.(e);
      return;
    }

    const button = buttonRef.current;
    if (!button) {
      props.onClick?.(e);
      return;
    }

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple: RippleState = {
      x,
      y,
      id: rippleIdRef.current++,
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    props.onClick?.(e);
  };

  return (
    <button
      ref={buttonRef}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
      disabled={isDisabled}
      {...props}
      onClick={handleClick}
    >
      {/* Ripple effects */}
      {!disableRipple && !isDisabled && ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
